using System.Text.Json;
using JordanShoes.Api.Models;
using JordanShoes.Api.Repository.Interface;

namespace JordanShoes.Api.Repository;

public class PedidoRepository : IPedidoRepository
{
    private readonly string _caminhoArquivo = "FakeData/Pedidos.json";
    private List<Pedido> _pedidos;

    public PedidoRepository()
    {
        if (!File.Exists(_caminhoArquivo))
        {
            File.WriteAllText(_caminhoArquivo, "[]");
        }
        var json = File.ReadAllText(_caminhoArquivo);
        _pedidos = JsonSerializer.Deserialize<List<Pedido>>(json) ?? new List<Pedido>();
    }

    private async Task SalvarDadosAsync()
    {
        var json = JsonSerializer.Serialize(_pedidos, new JsonSerializerOptions
        {
            WriteIndented = true
        });
        await File.WriteAllTextAsync(_caminhoArquivo, json);
    }

    public async Task<Pedido> CreateAsync(Pedido pedido)
    {
        pedido.Id = _pedidos.Any() ? _pedidos.Max(p => p.Id) + 1 : 1;
        _pedidos.Add(pedido);
        await SalvarDadosAsync();
        return pedido;
    }
}