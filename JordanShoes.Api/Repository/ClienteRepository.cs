using System.Text.Json;
using JordanShoes.Api.Models;
using JordanShoes.Api.Repository.Interface;

namespace JordanShoes.Api.Repository;

public class ClienteRepository : IClienteRepository
{
    private readonly string _caminhoArquivo = "FakeData/Clientes.json";
    private List<Cliente> _clientes;

    public ClienteRepository()
    {
        if (!File.Exists(_caminhoArquivo))
        {
            File.WriteAllText(_caminhoArquivo, "[]");
        }
        var json = File.ReadAllText(_caminhoArquivo);
        _clientes = JsonSerializer.Deserialize<List<Cliente>>(json) ?? new List<Cliente>();
    }

    public async Task SalvarDadosAsync()
    {
        var jsonNovo = JsonSerializer.Serialize(_clientes, new JsonSerializerOptions
        {
            WriteIndented = true
        });
        await File.WriteAllTextAsync(_caminhoArquivo, jsonNovo);
    }

    public async Task<IEnumerable<Cliente>> GetAllClientesAsync()
    {
        return await Task.FromResult(_clientes);
    }

    public async Task<Cliente?> GetClienteByIdAsync(int id)
    {
        var cliente = _clientes.FirstOrDefault(c => c.Id == id);
        return await Task.FromResult(cliente);
    }

    public async Task<Cliente> CreateClienteAsync(Cliente cliente)
    {
        cliente.Id = _clientes.Any() ? _clientes.Max(c => c.Id) + 1 : 1;
        _clientes.Add(cliente);
        await SalvarDadosAsync();
        return cliente;
    }

    public async Task<Cliente> UpdateClienteAsync(int id, Cliente cliente)
    {
        var clienteExistente = _clientes.FirstOrDefault(c => c.Id == id);
        if (clienteExistente == null) return null!;

        clienteExistente.Nome = cliente.Nome;
        clienteExistente.Email = cliente.Email;
        clienteExistente.Telefone = cliente.Telefone;
        clienteExistente.Cep = cliente.Cep;
        clienteExistente.Endereco = cliente.Endereco;
        clienteExistente.Numero = cliente.Numero;
        clienteExistente.Bairro = cliente.Bairro;
        clienteExistente.Complemento = cliente.Complemento;
        clienteExistente.Cidade = cliente.Cidade;
        clienteExistente.Estado = cliente.Estado;

        await SalvarDadosAsync();
        return clienteExistente;
    }

    public async Task<bool> DeleteClienteAsync(int id)
    {
        var clienteParaRemover = _clientes.FirstOrDefault(c => c.Id == id);
        if (clienteParaRemover == null) return false;

        _clientes.Remove(clienteParaRemover);
        await SalvarDadosAsync();
        
        return true;
    }
}