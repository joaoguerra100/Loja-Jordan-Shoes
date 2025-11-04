using System.ComponentModel.DataAnnotations;

namespace JordanShoes.Api.DTOs.Pedido;

public class CriarPedidoDTO
{
    [Required]
    [MinLength(1, ErrorMessage = "O carrinho nao pode estar vazio")]
    public List<ItemCarrinhoDTO>? Itens { get; set; }
}