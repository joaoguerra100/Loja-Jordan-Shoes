using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JordanShoes.Api.Models;

public class Cliente
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string? Nome { get; set; }

    [Required]
    [EmailAddress]
    public string? Email { get; set; }

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
    public string? Estado { get; set; }

    [ForeignKey("Usuario")]
    public int? UsuarioId { get; set; }
    public Usuario? Usuario { get; set; }
}