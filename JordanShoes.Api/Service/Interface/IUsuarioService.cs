using JordanShoes.Api.DTOs.Usuario;

namespace JordanShoes.Api.Service.Interface;

public interface IUsuarioService
{
    Task<IEnumerable<UsuarioInfoDTO>> GetAllUsuariosAsync();
    Task<(bool sucesso, string Mensagem)> RegistrarAsync(RegistrarUsuarioDTO dto);
    Task<string?> LoginAsync(LoginDTO dto);
    Task<UsuarioInfoDTO> UpdateUsuarioAsync(int id, AtualizarUsuarioDTO dto);
    Task<bool> DeleteUsuarioAsync(int id);
}