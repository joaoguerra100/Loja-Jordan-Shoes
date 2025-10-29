using JordanShoes.Api.Models;

namespace JordanShoes.Api.Repository.Interface;

public interface IProdutoRepository
{
    Task<IEnumerable<Produto>> GetAllProdutosAsync();
    Task<Produto?> GetProdutoByIdAsync(int id);
}