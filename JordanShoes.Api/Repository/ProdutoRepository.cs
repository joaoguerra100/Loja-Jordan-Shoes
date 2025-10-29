using JordanShoes.Api.Models;
using JordanShoes.Api.Repository.Interface;

namespace JordanShoes.Api.Repository;

public class ProdutoRepository : IProdutoRepository
{
    public Task<IEnumerable<Produto>> GetAllProdutosAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Produto?> GetProdutoByIdAsync(int id)
    {
        throw new NotImplementedException();
    }
}