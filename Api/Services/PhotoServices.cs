using ChatKaro.API.Data.Interfaces;
using ChatKaro.API.Utilities;

namespace ChatKaro.API.Services;

/// <summary>
/// Service for handling photo-related operations such as adding and deleting photos.
/// </summary>
public class PhotoServices : IPhotoServices
{
    private readonly IFileService _fileService;

    public PhotoServices(IFileService fileService)
    {
        _fileService = fileService;
    }

    /// <summary>
    /// Adds a photo asynchronously to the server storage.
    /// </summary>
    /// <param name="file">The image file to be added.</param>
    /// <exception cref="InvalidOperationException">Thrown when the file format is not supported.</exception>
    public async Task AddPhotoAsync(IFormFile file)
    {
        if (!Utility.IsImageExtension(file.FileName))
        {
            throw new InvalidOperationException("File format is not supported.");
        }

        var path = Path.Combine("Upload/Image", file.FileName);

        await using Stream image = _fileService.Create(path);
        await file.CopyToAsync(image);
    }

    /// <summary>
    /// Deletes a photo asynchronously from the server storage by its identifier.
    /// </summary>
    /// <param name="photoId">The unique identifier of the photo to be deleted.</param>
    /// <returns>A task that represents the asynchronous delete operation.</returns>
    /// <exception cref="FileNotFoundException">Thrown when the photo with the given ID is not found.</exception>
    public async Task DeletePhotoAsync(string photoId)
    {
        var path = Path.Combine("Upload/Image", photoId);

        if (!_fileService.Exists(path))
        {
            throw new FileNotFoundException("Photo not found.", photoId);
        }

        _fileService.Delete(path);
        await Task.CompletedTask;
    }
}