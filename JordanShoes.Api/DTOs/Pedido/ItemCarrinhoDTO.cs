using System.ComponentModel.DataAnnotations;

namespace JordanShoes.Api.DTOs.Pedido;

public class ItemCarrinhoDTO
{
    [Required]
    public int ProdutoId { get; set; }

    [Required]
    [Range(1, 100)]
    public int Quantidade { get; set; }
}