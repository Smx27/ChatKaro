using System.ComponentModel.DataAnnotations;

namespace ChatKaro.API.Data.Entities;

/// <summary>
/// Represents a group in the chat application.
/// </summary>
public class Group
{
    /// <summary>
    /// Initializes a new instance of the <see cref="Group"/> class.
    /// </summary>
    public Group()
    {
    }

    /// <summary>
    /// Initializes a new instance of the <see cref="Group"/> class with a specified name.
    /// </summary>
    /// <param name="name">The name of the group.</param>
    public Group(string name)
    {
        Name = name;
    }

    /// <summary>
    /// Gets or sets the name of the group.
    /// </summary>
    /// <value>The name of the group.</value>
    [Key]
    public string Name { get; set; }

    /// <summary>
    /// Gets or sets the collection of connections associated with the group.
    /// </summary>
    /// <value>A collection of <see cref="Connection"/> objects representing the group connections.</value>
    public ICollection<Connection> Connections { get; set; } = new List<Connection>();
}