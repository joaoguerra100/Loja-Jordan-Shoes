using JordanShoes.Api.DTOs.Cliente;
using JordanShoes.Api.Models;
using JordanShoes.Api.Repository.Interface;
using JordanShoes.Api.Service.Interface;

namespace JordanShoes.Api.Service;

public class ClienteService : IClienteService
{
    private readonly IClienteRepository _repository;
    private readonly IUsuarioRepository _usuarioRepository;

    public ClienteService(IClienteRepository repository, IUsuarioRepository usuarioRepository)
    {
        _repository = repository;
        _usuarioRepository = usuarioRepository;
    }

    public async Task<IEnumerable<ClienteDTO>> GetAllClientesAsync()
    {
        var clientes = await _repository.GetAllClientesAsync();

        var usuarios = await _usuarioRepository.GetAllUsuariosAsync();
        // Cria um dicionário para busca rápida de e-mail pelo ID do usuário
        var mapaUsuarios = usuarios.ToDictionary(u => u.Id, u => u.Email);

        return clientes.Select(c => new ClienteDTO
        {
            Id = c.Id,
            UsuarioId = c.UsuarioId,
            Email = mapaUsuarios.ContainsKey(c.UsuarioId) ? mapaUsuarios[c.UsuarioId] : "Usuário não encontrado",
            Nome = c.Nome,
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

        var usuario = await _usuarioRepository.GetUsuarioByIdAsync(cliente.UsuarioId);

        return new ClienteDTO
        {
            Id = cliente.Id,
            UsuarioId = cliente.UsuarioId,
            Email = usuario?.Email,
            Nome = cliente.Nome,
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

    public async Task<ClienteDTO?> GetClienteByUsuarioIdAsync(int usuarioId)
    {
        var cliente = await _repository.GetByUsuarioIdAsync(usuarioId);
        if (cliente == null) return null;

        var usuario = await _usuarioRepository.GetUsuarioByIdAsync(cliente.UsuarioId);

        return new ClienteDTO
        {
            Id = cliente.Id,
            UsuarioId = cliente.UsuarioId,
            Email = usuario?.Email,
            Nome = cliente.Nome,
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

    public async Task<ClienteDTO> CreateClienteAsync(CriarClienteDTO dto, int usuarioId)
    {
        var usuario = await _usuarioRepository.GetUsuarioByIdAsync(usuarioId);
        if (usuario == null) return null!;

        var clienteExistente = await _repository.GetByUsuarioIdAsync(usuarioId);
        if (clienteExistente != null) return null!;

        var novoCLiente = new Cliente
        {
            UsuarioId = usuarioId,
            Nome = dto.Nome,
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
            UsuarioId = clienteCriado.UsuarioId,
            Email = usuario.Email,
            Nome = clienteCriado.Nome,
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

        var usuario = await _usuarioRepository.GetUsuarioByIdAsync(clienteAtualizado.UsuarioId);

        return new ClienteDTO
        {
            Id = clienteAtualizado.Id,
            UsuarioId = clienteAtualizado.UsuarioId,
            Email = usuario?.Email,
            Nome = clienteAtualizado.Nome,
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