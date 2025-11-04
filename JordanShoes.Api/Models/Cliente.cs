using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JordanShoes.Api.Models;

public class Cliente
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UsuarioId { get; set; }

    [Required]
    public string? Nome { get; set; }

    [Required]
    public string? Telefone { get; set; }

    // Endereco
    [Required]
    public string? Cep { get; set; }

    [Required]
    public string? Endereco { get; set; }

    [Required]
    public string? Numero { get; set; }

    [Required]
    public string? Bairro { get; set; }

    public string? Complemento { get; set; }

    [Required]
    public string? Cidade { get; set; }

    [Required]
    [MaxLength(2, ErrorMessage = "Estado deve ter no maximo 2 caracteres")]
    public string? Estado { get; set; }
}