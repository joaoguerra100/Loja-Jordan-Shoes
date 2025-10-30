namespace JordanShoes.Api.DTOs;

public class AtualizarProdutoDTO
{
    public string? Image { get; set; }
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public decimal Preco { get; set; }
}