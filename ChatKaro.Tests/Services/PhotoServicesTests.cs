using ChatKaro.API.Data.Interfaces;
using ChatKaro.API.Services;
using Microsoft.AspNetCore.Http;
using Moq;
using Xunit;

namespace ChatKaro.Tests.Services;

public class PhotoServicesTests
{
    private readonly Mock<IFileService> _fileServiceMock;
    private readonly PhotoServices _service;

    public PhotoServicesTests()
    {
        _fileServiceMock = new Mock<IFileService>();
        _service = new PhotoServices(_fileServiceMock.Object);
    }

    [Fact]
    public async Task AddPhotoAsync_UploadsFile_WhenFormatIsSupported()
    {
        // Arrange
        var fileMock = new Mock<IFormFile>();
        fileMock.Setup(f => f.FileName).Returns("test.jpg");
        fileMock.Setup(f => f.CopyToAsync(It.IsAny<Stream>(), It.IsAny<CancellationToken>()))
            .Returns(Task.CompletedTask);

        var streamMock = new MemoryStream();
        _fileServiceMock.Setup(x => x.Create(It.IsAny<string>())).Returns(streamMock);

        // Act
        await _service.AddPhotoAsync(fileMock.Object);

        // Assert
        _fileServiceMock.Verify(x => x.Create(It.Is<string>(s => s.EndsWith("test.jpg"))), Times.Once);
        fileMock.Verify(x => x.CopyToAsync(It.IsAny<Stream>(), It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task AddPhotoAsync_ThrowsException_WhenFormatIsNotSupported()
    {
        // Arrange
        var fileMock = new Mock<IFormFile>();
        fileMock.Setup(f => f.FileName).Returns("test.txt");

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(() => _service.AddPhotoAsync(fileMock.Object));
    }

    [Fact]
    public async Task DeletePhotoAsync_DeletesFile_WhenFileExists()
    {
        // Arrange
        var photoId = "photo.jpg";
        _fileServiceMock.Setup(x => x.Exists(It.IsAny<string>())).Returns(true);

        // Act
        await _service.DeletePhotoAsync(photoId);

        // Assert
        _fileServiceMock.Verify(x => x.Delete(It.Is<string>(s => s.EndsWith(photoId))), Times.Once);
    }

    [Fact]
    public async Task DeletePhotoAsync_ThrowsException_WhenFileDoesNotExist()
    {
        // Arrange
        var photoId = "photo.jpg";
        _fileServiceMock.Setup(x => x.Exists(It.IsAny<string>())).Returns(false);

        // Act & Assert
        await Assert.ThrowsAsync<FileNotFoundException>(() => _service.DeletePhotoAsync(photoId));
    }
}