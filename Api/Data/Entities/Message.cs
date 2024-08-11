using System.ComponentModel.DataAnnotations;
using ChatKaro.API.Data.Enums;

namespace ChatKaro.API.Data.Entities;

/// <summary>
/// Represents a message entity in the application.
/// </summary>
public class Message
{
    /// <summary>
    /// Gets or sets the unique identifier for the message.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the ID of the user who sent the message.
    /// </summary>
    public int SenderId { get; set; }

    /// <summary>
    /// Gets or sets the username of the user who sent the message.
    /// </summary>
    [StringLength(100)]
    public string SenderUserName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the user entity that represents the sender of the message.
    /// </summary>
    public AppUser? Sender { get; set; } 

    /// <summary>
    /// Gets or sets the ID of the user who received the message.
    /// </summary>
    public int RecipientId { get; set; }

    /// <summary>
    /// Gets or sets the username of the user who received the message.
    /// </summary>
    [StringLength(100)]
    public string RecipientUserName { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the user entity that represents the recipient of the message.
    /// </summary>
    public AppUser? Recipient { get; set; }

    /// <summary>
    /// Gets or sets the content of the message.
    /// </summary>
    [StringLength(int.MaxValue)]
    public string Content { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the date and time when the message was read by the recipient.
    /// </summary>
    public DateTime? DateRead { get; set; }

    /// <summary>
    /// Gets or sets the date and time when the message was sent.
    /// </summary>
    public DateTime MessageSent { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the message has been deleted by the sender.
    /// </summary>
    public bool SenderDeleted { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the message has been deleted by the recipient.
    /// </summary>
    public bool RecipientDeleted { get; set; }

    /// <summary>
    /// Gets or set a value indicating type of the message 
    /// </summary>
    public MessageType MessageType { get; set; } = MessageType.Text;
}