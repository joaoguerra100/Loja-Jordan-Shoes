using JordanShoes.Api.DTOs;

namespace JordanShoes.Api.Service.Interface;

public interface IProdutoService
{
    Task<IEnumerable<ProdutoDTO>> GetAllProdutosAsync();
    Task<ProdutoDTO> GetProdutoByIdAsync(int id);
}