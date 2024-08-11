using ChatKaro.API.Controllers.DTO.Message;
using ChatKaro.API.Data.Entities;
using ChatKaro.API.Helpers;

namespace ChatKaro.API.Data.Interfaces;

public interface IMessageRepository : IGenericRepository<Message>
{
    Task<PagedList<Message>> GetMessageForUser(MessageParams messageParams);
    Task<IEnumerable<Message>> GetMessageThread(string currentUsername, string recipientUsername);

    //Track group
    Task AddGroup(Group? group);
    Task RemoveConnection(Connection? connection);
    Task<Connection?> GetConnection(string connectionId);
    Task<Group?> GetMessageGroup(string groupName);
    Task<Group?> GetGroupForConnection(string connectionId);
}