namespace ChatKaro.API.Data.Interfaces;

public interface IFileService
{
    bool Exists(string path);
    void Delete(string path);
    Stream Create(string path);
}