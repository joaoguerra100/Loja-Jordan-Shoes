using System.Security.Claims;
using JordanShoes.Api.DTOs.Cliente;
using JordanShoes.Api.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JordanShoes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ClienteController : Controller
{
    private readonly IClienteService _service;

    public ClienteController(IClienteService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllClientes()
    {
        var clientes = await _service.GetAllClientesAsync();
        return Ok(clientes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetClienteById(int id)
    {
        var idDoToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var papelDoToken = User.FindFirst(ClaimTypes.Role)?.Value;

        if (idDoToken == null) return Unauthorized();

        if (papelDoToken != "Admin" && idDoToken != id.ToString())
        {
            return Forbid();
        }

        var cliente = await _service.GetClienteByIdAsync(id);
        if (cliente == null)
        {
            return NotFound();
        }

        return Ok(cliente);
    }

    [HttpPost]
    public async Task<IActionResult> CriarCliente([FromBody] CriarClienteDTO dto)
    {
        var usuarioIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (usuarioIdClaim == null)
        {
            return Unauthorized("Token inválido ou não contém o ID do usuário.");
        }

        var usuarioId = int.Parse(usuarioIdClaim.Value);

        var novoCliente = await _service.CreateClienteAsync(dto, usuarioId);

        if (novoCliente == null)
        {
            return BadRequest("Não foi possível criar o cliente. O usuário já pode ter um perfil.");
        }

        return CreatedAtAction(nameof(GetClienteById), new { id = novoCliente.Id }, novoCliente);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarCliente(int id, [FromBody] AtualizarClienteDTO dto)
    {
        var idDoToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var papelDoToken = User.FindFirst(ClaimTypes.Role)?.Value;

        if (idDoToken == null) return Unauthorized();

        if (papelDoToken != "Admin" && idDoToken != id.ToString())
        {
            return Forbid();
        }

        var clienteAtualizado = await _service.UpdateClienteAsync(id, dto);
        if (clienteAtualizado == null) return NotFound();

        return Ok(clienteAtualizado);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarCliente(int id)
    {
        var idDoToken = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var papelDoToken = User.FindFirst(ClaimTypes.Role)?.Value;

        if (idDoToken == null) return Unauthorized();

        if (papelDoToken != "Admin" && idDoToken != id.ToString())
        {
            return Forbid();
        }

        var success = await _service.DeleteClienteAsync(id);
        if (!success) return NotFound();

        return NoContent();
    }

}