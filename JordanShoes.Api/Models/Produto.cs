using System.ComponentModel.DataAnnotations;

namespace JordanShoes.Api.Models;

public class Produto
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public string? Image { get; set; }

    [Required]
    public string? Nome { get; set; }

    [Required]
    public string? Descricao { get; set; }

    [Required]
    public decimal Preco { get; set; }
}