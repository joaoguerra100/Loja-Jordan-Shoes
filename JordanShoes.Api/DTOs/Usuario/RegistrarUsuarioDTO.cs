using System.ComponentModel.DataAnnotations;

namespace JordanShoes.Api.DTOs.Usuario;

public class RegistrarUsuarioDTO
{
    [Required(ErrorMessage = "O e-mail e obrigatorio")]
    [EmailAddress(ErrorMessage = "Fromato de e-mail invalido")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "A senha e obrigatoria")]
    [MinLength(5, ErrorMessage = "A senha deve ter no minimo 5 caracteres")]
    public string? Password { get; set; }

    [Compare("Password", ErrorMessage = "As senhas nao coincidem")]
    public string? ConfirmPassword { get; set; }
}