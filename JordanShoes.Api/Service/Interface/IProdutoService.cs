using JordanShoes.Api.DTOs.Produto;

namespace JordanShoes.Api.Service.Interface;

public interface IProdutoService
{
    Task<IEnumerable<ProdutoDTO>> GetAllProdutosAsync();
    Task<ProdutoDTO?> GetProdutoByIdAsync(int id);
    Task<ProdutoDTO> CreateProdutoAsync(CriarProdutoDTO dto);
    Task<ProdutoDTO?> UpdateProdutoAsync(int id, AtualizarProdutoDTO dto);
    Task<bool> DeleteProdutoAsync(int id);
}