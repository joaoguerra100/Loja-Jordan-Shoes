using System.ComponentModel.DataAnnotations;

namespace JordanShoes.Api.Models;

public class ItemPedido
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int PedidoId { get; set; }

    [Required]
    public int ProdutoId { get; set; }

    [Required]
    public int Quantidade { get; set; }

    [Required]
    public decimal PrecoUnitario { get; set; }
}