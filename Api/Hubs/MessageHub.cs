using ChatKaro.API.Data.Entities;
using ChatKaro.API.Data.Interfaces;
using ChatKaro.API.DTOs;
using ChatKaro.API.Extensions;
using ChatKaro.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace ChatKaro.API.Hubs;

[Authorize]
public class MessageHub : Hub
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHubContext<PresenceHub> _presenceHub;
    private readonly PresenceTracker _tracker;

    public MessageHub(IUnitOfWork unitOfWork, IHubContext<PresenceHub> presenceHub,
        PresenceTracker tracker)
    {
        _unitOfWork = unitOfWork;
        _presenceHub = presenceHub;
        _tracker = tracker;
    }

    public override async Task OnConnectedAsync()
    {
        var httpContext = Context.GetHttpContext();
        var otherUser = httpContext?.Request.Query["user"].ToString();
        var groupName = GetGroupName(Context.User.GetUsername(), otherUser);
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        var group = await AddToGroup(groupName);

        await Clients.Group(groupName).SendAsync("UpdatedGroup", group);

        // Send existing messages to the caller
        var messages = await _unitOfWork.MessageRepository
            .GetMessageThread(Context.User.GetUsername(), otherUser);

        // Manual Map since we don't have AutoMapper configured in plan scope
        var messageDtos = messages.Select(m => new MessageDto
        {
             Id = m.Id,
             SenderId = m.SenderId,
             SenderUsername = m.SenderUserName,
             SenderPhotoUrl = m.Sender?.Photos?.FirstOrDefault(x => x.IsMain)?.Url ?? "",
             RecipientId = m.RecipientId,
             RecipientUsername = m.RecipientUserName,
             RecipientPhotoUrl = m.Recipient?.Photos?.FirstOrDefault(x => x.IsMain)?.Url ?? "",
             Content = m.Content,
             DateRead = m.DateRead,
             MessageSent = m.MessageSent
        });

        if (_unitOfWork.HasChanges()) await _unitOfWork.Complete();

        // Sending initial thread
        // await Clients.Caller.SendAsync("ReceiveMessageThread", messageDtos);
        // User requirements said "REST endpoints to fetch initial message history/threads if not done purely via SignalR."
        // I will add it here as it is standard practice to send thread on connect for a "room" or 1-1 chat
        await Clients.Caller.SendAsync("ReceiveMessageThread", messageDtos);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var group = await RemoveFromMessageGroup();
        await Clients.Group(group.Name).SendAsync("UpdatedGroup", group);
        await base.OnDisconnectedAsync(exception);
    }

    public async Task SendMessage(CreateMessageDto createMessageDto)
    {
        var username = Context.User.GetUsername();

        if (username == createMessageDto.RecipientUsername.ToLower())
            throw new HubException("You cannot send messages to yourself");

        var sender = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
        var recipient = await _unitOfWork.UserRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

        if (recipient == null) throw new HubException("Not found user");

        var message = new Message
        {
            Sender = sender,
            Recipient = recipient,
            SenderUserName = sender.UserName,
            RecipientUserName = recipient.UserName,
            Content = createMessageDto.Content,
            MessageSent = DateTime.UtcNow
        };

        var groupName = GetGroupName(sender.UserName, recipient.UserName);

        var group = await _unitOfWork.MessageRepository.GetMessageGroup(groupName);

        if (group.Connections.Any(x => x.Username == recipient.UserName))
        {
            message.DateRead = DateTime.UtcNow;
        }
        else
        {
            var connections = await _tracker.GetConnectionsForUser(recipient.UserName);
            if (connections != null)
            {
                await _presenceHub.Clients.Clients(connections).SendAsync("NewMessageReceived",
                    new { username = sender.UserName, knownAs = sender.KnownAs });
            }
        }

        _unitOfWork.MessageRepository.AddMessage(message);

        if (await _unitOfWork.Complete())
        {
             var messageDto = new MessageDto
            {
                 Id = message.Id,
                 SenderId = message.SenderId,
                 SenderUsername = message.SenderUserName,
                 SenderPhotoUrl = message.Sender?.Photos?.FirstOrDefault(x => x.IsMain)?.Url ?? "",
                 RecipientId = message.RecipientId,
                 RecipientUsername = message.RecipientUserName,
                 RecipientPhotoUrl = message.Recipient?.Photos?.FirstOrDefault(x => x.IsMain)?.Url ?? "",
                 Content = message.Content,
                 DateRead = message.DateRead,
                 MessageSent = message.MessageSent
            };
            await Clients.Group(groupName).SendAsync("NewMessage", messageDto);
        }
    }

    private string GetGroupName(string caller, string other)
    {
        var stringCompare = string.CompareOrdinal(caller, other) < 0;
        return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
    }

    private async Task<Group> AddToGroup(string groupName)
    {
        var group = await _unitOfWork.MessageRepository.GetMessageGroup(groupName);
        var connection = new Connection(Context.ConnectionId, Context.User.GetUsername());

        if (group == null)
        {
            group = new Group(groupName);
            _unitOfWork.MessageRepository.AddGroup(group);
        }

        group.Connections.Add(connection);

        if (await _unitOfWork.Complete()) return group;

        throw new HubException("Failed to join group");
    }

    private async Task<Group> RemoveFromMessageGroup()
    {
        var group = await _unitOfWork.MessageRepository.GetGroupForConnection(Context.ConnectionId);
        var connection = group.Connections.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
        _unitOfWork.MessageRepository.RemoveConnection(connection);
        if (await _unitOfWork.Complete()) return group;

        throw new HubException("Failed to remove from group");
    }
}