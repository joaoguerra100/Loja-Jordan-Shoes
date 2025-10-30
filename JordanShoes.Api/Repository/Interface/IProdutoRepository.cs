using JordanShoes.Api.Models;

namespace JordanShoes.Api.Repository.Interface;

public interface IProdutoRepository
{
    Task<IEnumerable<Produto>> GetAllProdutosAsync();
    Task<Produto?> GetProdutoByIdAsync(int id);
    Task<Produto> CreateProdutoAsync(Produto produto);
    Task<Produto?> UpdateProdutoAsync(int id,Produto produto);
    Task<bool> DeleteProdutoAsync(int id);
}