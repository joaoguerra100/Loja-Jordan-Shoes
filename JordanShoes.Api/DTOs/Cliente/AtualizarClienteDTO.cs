using System.ComponentModel.DataAnnotations;

namespace JordanShoes.Api.DTOs.Cliente;

public class AtualizarClienteDTO
{
    [Required]
    public string? Nome { get; set; }

    [Required]
    public string? Email { get; set; }

    [Required]
    public string? Telefone { get; set; }

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
}