using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using JordanShoes.Api.DTOs.Usuario;
using JordanShoes.Api.Models;
using JordanShoes.Api.Repository.Interface;
using JordanShoes.Api.Service.Interface;
using Microsoft.IdentityModel.Tokens;

namespace JordanShoes.Api.Service;

public class UsuarioService : IUsuarioService
{
    private readonly IUsuarioRepository _repository;
    private readonly IConfiguration _configuration;

    public UsuarioService(IUsuarioRepository repository, IConfiguration configuration)
    {
        _repository = repository;
        _configuration = configuration;
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
            PasswordHash = passwordHash,
            Role = "Cliente"
        };

        await _repository.CreateAsync(novoUsuario);

        return (true, "Usuario registrado com sucesso");
    }

    public async Task<string?> LoginAsync(LoginDTO dto)
    {
        var usuario = await _repository.GetByEmailAsync(dto.Email!);
        if (usuario == null)
        {
            return null;
        }

        bool senhaValida = BCrypt.Net.BCrypt.Verify(dto.Password, usuario.PasswordHash);
        if (!senhaValida)
        {
            return null;
        }

        var token = GerarTokenJwt(usuario);
        return token;
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

    private string GerarTokenJwt(Usuario usuario)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var issuer = _configuration["Jwt:Issuer"];
        var audience = _configuration["Jwt:Audience"];

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
            new Claim("role", usuario.Role), 
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}