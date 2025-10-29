using JordanShoes.Api.DTOs;
using JordanShoes.Api.Service.Interface;

namespace JordanShoes.Api.Repository.Interface;

public class ProdutoService : IProdutoService
{
    private readonly IProdutoRepository _repository;

    public ProdutoService(IProdutoRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ProdutoDTO>> GetAllProdutosAsync()
    {
        var produtos = await _repository.GetAllProdutosAsync();

        return produtos.Select(p => new ProdutoDTO
        {
            Id = p.Id,
            Nome = p.Nome,
            Descricao = p.Descricao,
            Image = p.Image,
            Preco = p.Preco
        });
    }

    public async Task<ProdutoDTO> GetProdutoByIdAsync(int id)
    {
        var produto = await _repository.GetProdutoByIdAsync(id);

        if (produto == null)
        {
            return null!;
        }
        
        return new ProdutoDTO
        {
            Id = produto.Id,
            Nome = produto.Nome,
            Descricao = produto.Descricao,
            Image = produto.Image,
            Preco = produto.Preco
        };
    }
}