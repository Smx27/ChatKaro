using ChatKaro.API.Data.Interfaces;

namespace ChatKaro.API.Services;

public class FileService : IFileService
{
    public bool Exists(string path)
    {
        return File.Exists(path);
    }

    public void Delete(string path)
    {
        File.Delete(path);
    }

    public Stream Create(string path)
    {
        return new FileStream(path, FileMode.CreateNew);
    }
}