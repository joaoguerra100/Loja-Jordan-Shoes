using System.Text.Json;
using JordanShoes.Api.Models;
using JordanShoes.Api.Repository.Interface;

namespace JordanShoes.Api.Repository;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly string _caminhoArquivo = "FakeData/Usuarios.json";
    private List<Usuario> _usuarios;

    public UsuarioRepository()
    {
        if (!File.Exists(_caminhoArquivo))
        {
            File.WriteAllText(_caminhoArquivo, "[]");
        }

        var json = File.ReadAllText(_caminhoArquivo);
        _usuarios = JsonSerializer.Deserialize<List<Usuario>>(json) ?? new List<Usuario>();
    }

    private async Task SalvarDadosAsync()
    {
        var jsonNovo = JsonSerializer.Serialize(_usuarios, new JsonSerializerOptions
        {
            WriteIndented = true
        });
        await File.WriteAllTextAsync(_caminhoArquivo, jsonNovo);
    }

    public async Task<IEnumerable<Usuario>> GetAllUsuariosAsync()
    {
        return await Task.FromResult(_usuarios);
    }

    public async Task<Usuario?> GetUsuarioByIdAsync(int id)
    {
        var usuario = _usuarios.FirstOrDefault(p => p.Id == id);
        return await Task.FromResult(usuario);
    }

    public async Task<Usuario?> GetByEmailAsync(string email)
    {
        var usuario = _usuarios.FirstOrDefault(u => u.Email!.Equals(email, StringComparison.OrdinalIgnoreCase));
        return await Task.FromResult(usuario);
    }

    public async Task<Usuario> CreateAsync(Usuario usuario)
    {
        usuario.Id = _usuarios.Any() ? _usuarios.Max(u => u.Id) + 1 : 1;
        _usuarios.Add(usuario);
        await SalvarDadosAsync();
        return usuario;
    }

    public async Task<Usuario> UpdateUsuarioAsync(int id, Usuario usuario)
    {
        var usuarioExistente = _usuarios.FirstOrDefault(p => p.Id == id);
        if (usuarioExistente == null) return null!;

        usuarioExistente.Email = usuario.Email;
        usuarioExistente.PasswordHash = usuario.PasswordHash;

        await SalvarDadosAsync();

        return usuarioExistente;
    }

    public async Task<bool> DeleteUsuarioAsync(int id)
    {
        var usuarioParaRemover = _usuarios.FirstOrDefault(u => u.Id == id);
        if (usuarioParaRemover == null) return false;

        _usuarios.Remove(usuarioParaRemover);
        await SalvarDadosAsync();

        return true;
    }
}