using System.ComponentModel.DataAnnotations;

namespace JordanShoes.Api.Models;

public class Pedido
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int ClienteId { get; set; }

    [Required]
    public DateTime DataPedido { get; set; }

    [Required]
    public decimal ValorTotal { get; set; }

    public string? Status { get; set; }
}