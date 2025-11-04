namespace JordanShoes.Api.DTOs.Pedido;

public class PedidoDTO
{
    public int Id { get; set; }
    public int ClienteId { get; set; }
    public DateTime DataPedido { get; set; }
    public decimal ValorTotal { get; set; }
    public string? Status { get; set; }
    public List<ItemPedidoDTO>? Itens { get; set; }
}