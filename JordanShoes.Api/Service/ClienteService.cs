using JordanShoes.Api.DTOs.Cliente;
using JordanShoes.Api.Models;
using JordanShoes.Api.Repository.Interface;
using JordanShoes.Api.Service.Interface;

namespace JordanShoes.Api.Service;

public class ClienteService : IClienteService
{
    private readonly IClienteRepository _repository;

    public ClienteService(IClienteRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ClienteDTO>> GetAllClientesAsync()
    {
        var clientes = await _repository.GetAllClientesAsync();

        return clientes.Select(c => new ClienteDTO
        {
            Id = c.Id,
            Nome = c.Nome,
            Email = c.Email,
            Telefone = c.Telefone,
            Cep = c.Cep,
            Endereco = c.Endereco,
            Numero = c.Numero,
            Bairro = c.Bairro,
            Complemento = c.Complemento,
            Cidade = c.Cidade,
            Estado = c.Estado
        });
    }

    public async Task<ClienteDTO?> GetClienteByIdAsync(int id)
    {
        var cliente = await _repository.GetClienteByIdAsync(id);

        if (cliente == null) return null!;

        return new ClienteDTO
        {
            Id = cliente.Id,
            Nome = cliente.Nome,
            Email = cliente.Email,
            Telefone = cliente.Telefone,
            Cep = cliente.Cep,
            Endereco = cliente.Endereco,
            Numero = cliente.Numero,
            Bairro = cliente.Bairro,
            Complemento = cliente.Complemento,
            Cidade = cliente.Cidade,
            Estado = cliente.Estado
        };
    }

    public async Task<ClienteDTO> CreateClienteAsync(CriarClienteDTO dto)
    {
        var novoCLiente = new Cliente
        {
            Nome = dto.Nome,
            Email = dto.Email,
            Telefone = dto.Telefone,
            Cep = dto.Cep,
            Endereco = dto.Endereco,
            Numero = dto.Numero,
            Bairro = dto.Bairro,
            Complemento = dto.Complemento,
            Cidade = dto.Cidade,
            Estado = dto.Estado
        };

        var clienteCriado = await _repository.CreateClienteAsync(novoCLiente);

        return new ClienteDTO
        {
            Id = clienteCriado.Id,
            Nome = clienteCriado.Nome,
            Email = clienteCriado.Email,
            Telefone = clienteCriado.Telefone,
            Cep = clienteCriado.Cep,
            Endereco = clienteCriado.Endereco,
            Numero = clienteCriado.Numero,
            Bairro = clienteCriado.Bairro,
            Complemento = clienteCriado.Complemento,
            Cidade = clienteCriado.Cidade,
            Estado = clienteCriado.Estado
        };
    }

    public async Task<ClienteDTO?> UpdateClienteAsync(int id, AtualizarClienteDTO dto)
    {
        var clienteParaAtualizar = new Cliente
        {
            Nome = dto.Nome,
            Email = dto.Email,
            Telefone = dto.Telefone,
            Cep = dto.Cep,
            Endereco = dto.Endereco,
            Numero = dto.Numero,
            Bairro = dto.Bairro,
            Complemento = dto.Complemento,
            Cidade = dto.Cidade,
            Estado = dto.Estado
        };

        var clienteAtualizado = await _repository.UpdateClienteAsync(id, clienteParaAtualizar);
        if (clienteAtualizado == null) return null!;

        return new ClienteDTO
        {
            Id = clienteAtualizado.Id,
            Nome = clienteAtualizado.Nome,
            Email = clienteAtualizado.Email,
            Telefone = clienteAtualizado.Telefone,
            Cep = clienteAtualizado.Cep,
            Endereco = clienteAtualizado.Endereco,
            Numero = clienteAtualizado.Numero,
            Bairro = clienteAtualizado.Bairro,
            Complemento = clienteAtualizado.Complemento,
            Cidade = clienteAtualizado.Cidade,
            Estado = clienteAtualizado.Estado
        };
    }

    public async Task<bool> DeleteClienteAsync(int id)
    {
        return await _repository.DeleteClienteAsync(id);
    }
}