namespace ChatKaro.API.Data.Entities;

/// <summary>
/// Represents a photo entity in the application.
/// </summary>
public class Photo
{
    /// <summary>
    /// Gets or sets the unique identifier for the photo.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Gets or sets the URL of the photo.
    /// </summary>
    public string Url { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets a value indicating whether this photo is the main photo for the user.
    /// </summary>
    public bool IsMain { get; set; }

    /// <summary>
    /// Gets or sets the public identifier for the photo, usually provided by the external storage service.
    /// </summary>
    public string PublicId { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the ID of the user associated with this photo.
    /// </summary>
    public int AppUserId { get; set; }

    /// <summary>
    /// Gets or sets the user associated with this photo.
    /// </summary>
    public AppUser? AppUser { get; set; }
}