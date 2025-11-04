using System.Security.Claims;
using JordanShoes.Api.DTOs.Usuario;
using JordanShoes.Api.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JordanShoes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsuarioController : Controller
{
    private readonly IUsuarioService _service;

    public UsuarioController(IUsuarioService service)
    {
        _service = service;
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllUsuarios()
    {
        var usuarios = await _service.GetAllUsuariosAsync();
        return Ok(usuarios);
    }

    [HttpPost("registrar")]
    public async Task<IActionResult> Registrar([FromBody] RegistrarUsuarioDTO dto)
    {
        var resultado = await _service.RegistrarAsync(dto);

        if (!resultado.sucesso)
        {
            return BadRequest(new { message = resultado.Mensagem });
        }

        return Ok(new { message = resultado.Mensagem });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
        var token = await _service.LoginAsync(dto);

        if (token == null)
        {
            return Unauthorized(new { message = "Email ou senha invalidos" });
        }

        return Ok(new { token = token });
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> AtualizarUsuario(int id, [FromBody] AtualizarUsuarioDTO dto)
    {
        var idDoToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var papelDoToken = User.FindFirst(ClaimTypes.Role)?.Value;

        if (idDoToken == null) return Unauthorized();
        if (papelDoToken != "Admin" && idDoToken != id.ToString())
        {
            return Forbid();
        }

        var usuarioAtualizado = await _service.UpdateUsuarioAsync(id, dto);
        if (usuarioAtualizado == null) return NotFound();

        return Ok(usuarioAtualizado);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeletarUsuario(int id)
    {
        var idDoToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var papelDoToken = User.FindFirst(ClaimTypes.Role)?.Value;

        if (idDoToken == null) return Unauthorized();

        if (papelDoToken != "Admin" && idDoToken != id.ToString())
        {
            return Forbid();
        }

        var success = await _service.DeleteUsuarioAsync(id);
        if (!success) return NotFound();

        return NoContent();
    }
}