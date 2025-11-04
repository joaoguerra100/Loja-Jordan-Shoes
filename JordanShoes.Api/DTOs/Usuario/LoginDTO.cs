using System.ComponentModel.DataAnnotations;

namespace JordanShoes.Api.DTOs.Usuario;

public class LoginDTO
{
    [Required(ErrorMessage = "O e-mail e obrigatorio")]
    [EmailAddress]
    public string? Email { get; set; }

    [Required(ErrorMessage = "A senha e obrigatoria")]
    public string? Password { get; set; }
}