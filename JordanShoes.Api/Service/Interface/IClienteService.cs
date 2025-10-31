using JordanShoes.Api.DTOs.Cliente;

namespace JordanShoes.Api.Service.Interface;

public interface IClienteService
{
    Task<IEnumerable<ClienteDTO>> GetAllClientesAsync();
    Task<ClienteDTO?> GetClienteByIdAsync(int id);
    Task<ClienteDTO> CreateClienteAsync(CriarClienteDTO dto);
    Task<ClienteDTO?> UpdateClienteAsync(int id ,AtualizarClienteDTO dto);
    Task<bool> DeleteClienteAsync(int id);
}