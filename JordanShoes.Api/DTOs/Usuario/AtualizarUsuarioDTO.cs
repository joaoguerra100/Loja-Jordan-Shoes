using System.ComponentModel.DataAnnotations;

namespace JordanShoes.Api.DTOs;

public class AtualizarUsuarioDTO
{
    [EmailAddress(ErrorMessage = "Fromato de e-mail invalido")]
    public string? Email { get; set; }

    [MinLength(5, ErrorMessage = "A senha deve ter no minimo 5 caracteres")]
    public string? Password { get; set; }
}