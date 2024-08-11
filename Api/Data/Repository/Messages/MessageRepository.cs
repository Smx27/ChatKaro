using ChatKaro.API.Data.Entities;
using ChatKaro.API.Data.Interfaces;
using ChatKaro.API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace ChatKaro.API.Data.Repository.Messages;

public class MessageRepository : GenericRepository<Message>, IMessageRepository
{
    private readonly DataContext _context;
    
    public MessageRepository (DataContext context) : base(context)
    {
        _context = context;
    }
    
    public async Task<PagedList<Message>> GetMessageForUser(MessageParams messageParams)
    {
        // getting message for user order by message sent
        var query = _context.Messages
            .OrderByDescending(m => m.MessageSent).AsQueryable();
        
        // Checking for message type 
        query = messageParams.Container switch
        {
            "Inbox" => query.Where(
                u => u.RecipientUserName == messageParams.UserName && u.RecipientDeleted == false),
            "Outbox" => query.Where(u => u.SenderUserName == messageParams.UserName && u.SenderDeleted == false),
            _ => query.Where(u =>
                u.RecipientUserName == messageParams.UserName && u.RecipientDeleted == false && u.DateRead == null)
        };
        
        return await PagedList<Message>.CreateAsync(query, messageParams.PageNumber, messageParams.PageSize);
    }

    public async Task<IEnumerable<Message>> GetMessageThread(string currentUsername, string recipientUsername)
    {
        // Getting user message with recipient with filters 
        var query = _context.Messages.Where(m => m.RecipientUserName == currentUsername
                                                 && m.RecipientDeleted == false &&
                                                 m.SenderUserName == recipientUsername ||
                                                 m.RecipientUserName == recipientUsername && m.SenderDeleted == false &&
                                                 m.SenderUserName == currentUsername)
            .OrderBy(m => m.MessageSent).AsQueryable();
        // checking for unread message
        var unreadMessages = await query.Where(m => m.DateRead == null && m.RecipientUserName == currentUsername)
            .ToListAsync();
        // if no unread message send the list back 
        if (unreadMessages.Count == 0) return await query.ToListAsync();
        // Else read all the message 
        foreach (var message in unreadMessages)
        {
            message.DateRead = DateTime.UtcNow;
        }

        return await query.ToListAsync();
    }

    public async Task AddGroup(Group? group)
    {
        await _context.Groups.AddAsync(group);
    }

    public Task RemoveConnection(Connection? connection)
    {
        _context.Connections.Remove(connection);
        
        return Task.CompletedTask;
    }

    public async Task<Connection?> GetConnection(string connectionId)
    {
        return await _context.Connections
            .Where(c => c != null && c.ConnectionId == connectionId)
            .FirstOrDefaultAsync();
    }

    public async Task<Group?> GetMessageGroup(string groupName)
    {
        return await _context.Groups
            .Where(g => g != null && g.Name == groupName)
            .FirstOrDefaultAsync();
    }

    public async Task<Group?> GetGroupForConnection(string connectionId)
    {
        return await _context.Groups
            .Include(x => x.Connections)
            .Where(c => c != null && c.Connections.Any(x => x.ConnectionId == connectionId))
            .FirstOrDefaultAsync();
    }
}