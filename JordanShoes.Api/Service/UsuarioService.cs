using JordanShoes.Api.DTOs;
using JordanShoes.Api.Models;
using JordanShoes.Api.Repository.Interface;
using JordanShoes.Api.Service.Interface;

namespace JordanShoes.Api.Service;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _repository;

    public UsuarioService(IUsuarioRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<UsuarioInfoDTO>> GetAllUsuariosAsync()
    {
        var usuarios = await _repository.GetAllUsuariosAsync();

        return usuarios.Select(u => new UsuarioInfoDTO
        {
            Id = u.Id,
            Email = u.Email,
        });
    }

    public async Task<(bool sucesso, string Mensagem)> RegistrarAsync(RegistrarUsuarioDTO dto)
    {
        var usuarioExistente = await _repository.GetByEmailAsync(dto.Email!);
        if (usuarioExistente != null)
        {
            return (false, "Este e-mail ja esta em uso");
        }

        // Gera o Hash da senha
        string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        var novoUsuario = new Usuario
        {
            Email = dto.Email,
            PasswordHash = passwordHash
        };

        await _repository.CreateAsync(novoUsuario);

        return (true, "Usuario registrado com sucesso");
    }

    public async Task<UsuarioInfoDTO> UpdateUsuarioAsync(int id, AtualizarUsuarioDTO dto)
    {
        var usuarioExistente = await _repository.GetUsuarioByIdAsync(id);
        if (usuarioExistente == null) return null!;

        usuarioExistente.Email = dto.Email;

        if (!string.IsNullOrEmpty(dto.Password))
        {
            usuarioExistente.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        }

        var usuarioAtualizado = await _repository.UpdateUsuarioAsync(id, usuarioExistente);
        if (usuarioAtualizado == null) return null!;

        return new UsuarioInfoDTO
        {
            Id = usuarioAtualizado.Id,
            Email = usuarioAtualizado.Email
        };
    }

    public async Task<bool> DeleteUsuarioAsync(int id)
    {
        return await _repository.DeleteUsuarioAsync(id);
    }
}