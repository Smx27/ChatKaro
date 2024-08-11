namespace ChatKaro.API.Data.Interfaces;

public interface IPhotoServices
{
    Task AddPhotoAsync(IFormFile file);
    Task DeletePhotoAsync(string photoId);
}