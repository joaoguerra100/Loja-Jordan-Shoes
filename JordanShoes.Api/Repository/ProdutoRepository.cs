using System.Text.Json;
using JordanShoes.Api.Models;
using JordanShoes.Api.Repository.Interface;

namespace JordanShoes.Api.Repository;

public class ProdutoRepository : IProdutoRepository
{
    private readonly string _caminhoArquivo = "FakeData/Produtos.json";
    private List<Produto> _produtos;

    public ProdutoRepository()
    {
        // Garante que o arquivo exista
        if (!File.Exists(_caminhoArquivo))
        {
            // Se não existir, cria com uma lista vazia
            File.WriteAllText(_caminhoArquivo, "[]");
        }

        var json = File.ReadAllText(_caminhoArquivo);

        // Deserializa em um dicionário para pegar apenas a chave "Produtos"
        _produtos = JsonSerializer.Deserialize<List<Produto>>(json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new List<Produto>();
    }

    private async Task SalvarDadosAsync()
    {
        var jsonNovo = JsonSerializer.Serialize(_produtos, new JsonSerializerOptions { WriteIndented = true });
        await File.WriteAllTextAsync(_caminhoArquivo, jsonNovo);
    }

    public async Task<IEnumerable<Produto>> GetAllProdutosAsync()
    {
        return await Task.FromResult(_produtos);
    }

    public async Task<Produto?> GetProdutoByIdAsync(int id)
    {
        var produto = _produtos.FirstOrDefault(p => p.Id == id);
        return await Task.FromResult(produto);
    }

    public async Task<Produto> CreateProdutoAsync(Produto produto)
    {
        produto.Id = _produtos.Any() ? _produtos.Max(p => p.Id) + 1 : 1;
        _produtos.Add(produto);

        await SalvarDadosAsync();

        return produto;
    }

    public async Task<Produto?> UpdateProdutoAsync(int id, Produto produto)
    {
        var produtoExistente = _produtos.FirstOrDefault(p => p.Id == id);
        if (produtoExistente == null) return null!;

        produtoExistente.Nome = produto.Nome;
        produtoExistente.Descricao = produto.Descricao;
        produtoExistente.Image = produto.Image;
        produtoExistente.Preco = produto.Preco;

        await SalvarDadosAsync();

        return produtoExistente;
    }

    public async Task<bool> DeleteProdutoAsync(int id)
    {
        var produtoParaRemover = _produtos.FirstOrDefault(p => p.Id == id);
        if (produtoParaRemover == null) return false;

        _produtos.Remove(produtoParaRemover);
        await SalvarDadosAsync();

        return true;
    }
}