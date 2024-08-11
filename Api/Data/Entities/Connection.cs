namespace ChatKaro.API.Data.Entities;

/// <summary>
/// Represents a connection in the chat application.
/// </summary>
public class Connection
{
    /// <summary>
    /// Initializes a new instance of the <see cref="Connection"/> class.
    /// </summary>
    public Connection()
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="Connection"/> class with specified connection ID and username.
    /// </summary>
    /// <param name="connectionId">The unique identifier for the connection.</param>
    /// <param name="username">The username associated with the connection.</param>
    public Connection(string connectionId, string username)
    {
        ConnectionId = connectionId;
        UserName = username;
    }

    /// <summary>
    /// Gets or sets the unique identifier for the connection.
    /// </summary>
    /// <value>The unique connection ID.</value>
    public string ConnectionId { get; set; }

    /// <summary>
    /// Gets or sets the username associated with the connection.
    /// </summary>
    /// <value>The username of the user connected.</value>
    public string UserName { get; set; }
}