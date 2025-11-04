namespace JordanShoes.Api.DTOs.Pedido;

public class ItemPedidoDTO
{
    public int ProdutoId { get; set; }
    public string? NomeProduto { get; set; }
    public int Quantidade { get; set; }
    public decimal PrecoUnitario { get; set; }
}