namespace ChatKaro.API.Utilities;

/// <summary>
/// Utility class for all utility function 
/// </summary>
public static class Utility
{
    private static readonly string[] ImageExtensions =
    [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif"
    ];
    /// <summary>
    /// Method to check if the file is supported image or not 
    /// </summary>
    /// <param name="fileFullName">Full name of the file with extension</param>
    /// <returns>If the file is imag eor not</returns>
    public static bool IsImageExtension(string fileFullName)
    {
        var extension = Path.GetExtension(fileFullName);
        return ImageExtensions.Contains(extension);
    }
    
    
}