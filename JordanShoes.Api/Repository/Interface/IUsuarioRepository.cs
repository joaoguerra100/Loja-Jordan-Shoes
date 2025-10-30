using JordanShoes.Api.Models;

namespace JordanShoes.Api.Repository.Interface;

public interface IUsuarioRepository
{
    Task<IEnumerable<Usuario>> GetAllUsuariosAsync();
    Task<Usuario?> GetByEmailAsync(string email);
    Task<Usuario?> GetUsuarioByIdAsync(int id);
    Task<Usuario> CreateAsync(Usuario usuario);
    Task<Usuario> UpdateUsuarioAsync(int id, Usuario usuario);
    Task<bool> DeleteUsuarioAsync(int id);
}