using JordanShoes.Api.DTOs;
using JordanShoes.Api.Service.Interface;
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
    public async Task<IActionResult> GetAllUsuarios()
    {
        try
        {
            var usuarios = await _service.GetAllUsuariosAsync();
            return Ok(usuarios);
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel procurar todos os usuarios{e.Message}");
        }
    }

    [HttpPost("registrar")]
    public async Task<IActionResult> Registrar([FromBody] RegistrarUsuarioDTO dto)
    {
        try
        {
            var resultado = await _service.RegistrarAsync(dto);

            if (!resultado.sucesso)
            {
                return BadRequest(new { message = resultado.Mensagem });
            }

            return Ok(new { message = resultado.Mensagem });
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel Registrar o usuario{e.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarUsuario(int id, [FromBody] AtualizarUsuarioDTO dto)
    {
        try
        {
            var usuarioAtualizado = await _service.UpdateUsuarioAsync(id, dto);
            if (usuarioAtualizado == null) return NotFound();

            return Ok(usuarioAtualizado);
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel Atualizar usuario{e.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarUsuario(int id)
    {
        try
        {
            var success = await _service.DeleteUsuarioAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel Atualizar produto{e.Message}");
        }
    }
}