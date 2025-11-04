using JordanShoes.Api.Models;

namespace JordanShoes.Api.Repository.Interface;

public interface IClienteRepository
{
    Task<IEnumerable<Cliente>> GetAllClientesAsync();
    Task<Cliente?> GetClienteByIdAsync(int id);
    Task<Cliente?> GetByUsuarioIdAsync(int usuarioId);
    Task<Cliente> CreateClienteAsync(Cliente cliente);
    Task<Cliente> UpdateClienteAsync(int id, Cliente cliente);
    Task<bool> DeleteClienteAsync(int id);
}