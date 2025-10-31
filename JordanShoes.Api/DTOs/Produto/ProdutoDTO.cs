namespace JordanShoes.Api.DTOs.Produto;

public class ProdutoDTO
{
    public int Id { get; set; }
    public string? Image { get; set; }
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public decimal Preco { get; set; }
}