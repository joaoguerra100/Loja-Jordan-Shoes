using JordanShoes.Api.DTOs.Cliente;

namespace JordanShoes.Api.Service.Interface;

public interface IClienteService
{
    Task<IEnumerable<ClienteDTO>> GetAllClientesAsync();
    Task<ClienteDTO?> GetClienteByIdAsync(int id);
    Task<ClienteDTO?> GetClienteByUsuarioIdAsync(int usuarioId);
    Task<ClienteDTO> CreateClienteAsync(CriarClienteDTO dto, int usarioId);
    Task<ClienteDTO?> UpdateClienteAsync(int id ,AtualizarClienteDTO dto);
    Task<bool> DeleteClienteAsync(int id);
}