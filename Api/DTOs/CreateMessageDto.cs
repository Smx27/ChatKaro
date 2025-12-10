using System.ComponentModel.DataAnnotations;

namespace ChatKaro.API.DTOs;

public class CreateMessageDto
{
    [Required]
    public string RecipientUsername { get; set; } = string.Empty;

    [Required]
    public string Content { get; set; } = string.Empty;
}