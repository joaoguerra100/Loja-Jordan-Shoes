using JordanShoes.Api.DTOs.Produto;
using JordanShoes.Api.Models;
using JordanShoes.Api.Repository.Interface;
using JordanShoes.Api.Service.Interface;

namespace JordanShoes.Api.Service;

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

    public async Task<ProdutoDTO?> GetProdutoByIdAsync(int id)
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

    public async Task<ProdutoDTO> CreateProdutoAsync(CriarProdutoDTO dto)
    {
        var produto = new Produto
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            Image = dto.Image,
            Preco = dto.Preco
        };

        var produtoCriado = await _repository.CreateProdutoAsync(produto);

        return new ProdutoDTO
        {
            Id = produtoCriado.Id,
            Nome = produtoCriado.Nome,
            Descricao = produtoCriado.Descricao,
            Image = produtoCriado.Image,
            Preco = produtoCriado.Preco
        };
    }

    public async Task<ProdutoDTO?> UpdateProdutoAsync(int id, AtualizarProdutoDTO dto)
    {
        var produtoParaAtualizar = new Produto
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            Image = dto.Image,
            Preco = dto.Preco
        };

        var produtoAtualizado = await _repository.UpdateProdutoAsync(id, produtoParaAtualizar);
        if (produtoAtualizado == null) return null;

        return new ProdutoDTO
        {
            Id = produtoAtualizado.Id,
            Nome = produtoAtualizado.Nome,
            Descricao = produtoAtualizado.Descricao,
            Image = produtoAtualizado.Image,
            Preco = produtoAtualizado.Preco
        };
    }

    public async Task<bool> DeleteProdutoAsync(int id)
    {
        return await _repository.DeleteProdutoAsync(id);
    }
}