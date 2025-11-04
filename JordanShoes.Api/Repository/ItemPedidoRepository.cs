using System.Text.Json;
using JordanShoes.Api.Models;
using JordanShoes.Api.Repository.Interface;

namespace JordanShoes.Api.Repository;

public class ItemPedidoRepository : IItemPedidoRepository
{
    private readonly string _caminhoArquivo = "FakeData/ItensPedido.json";
    private List<ItemPedido> _itensPedido;

    public ItemPedidoRepository()
    {
        if (!File.Exists(_caminhoArquivo))
        {
            File.WriteAllText(_caminhoArquivo, "[]");
        }
        var json = File.ReadAllText(_caminhoArquivo);
        _itensPedido = JsonSerializer.Deserialize<List<ItemPedido>>(json) ?? new List<ItemPedido>();
    }

    private async Task SalvarDadosAsync()
    {
        var json = JsonSerializer.Serialize(_itensPedido, new JsonSerializerOptions { WriteIndented = true });
        await File.WriteAllTextAsync(_caminhoArquivo, json);
    }

    public async Task<IEnumerable<ItemPedido>> CreateVariosAsync(List<ItemPedido> itens)
    {
        var proximoId = _itensPedido.Any() ? _itensPedido.Max(i => i.Id) + 1 : 1;
        foreach (var item in itens)
        {
            item.Id = proximoId++;
            _itensPedido.Add(item);
        }
        await SalvarDadosAsync();
        return itens;
    }
}