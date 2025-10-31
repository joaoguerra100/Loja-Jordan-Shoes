using JordanShoes.Api.DTOs.Cliente;
using JordanShoes.Api.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace JordanShoes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
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
        try
        {
            var clientes = await _service.GetAllClientesAsync();
            return Ok(clientes);
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel procurar todos os clientes{e.Message}");
        }
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetClienteById(int id)
    {
        try
        {
            var cliente = await _service.GetClienteByIdAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(cliente);
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel procurar cliente pelo id:{id}{e.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CriarCliente([FromBody] CriarClienteDTO dto)
    {
        try
        {
            var novoCliente = await _service.CreateClienteAsync(dto);

            return CreatedAtAction(nameof(GetClienteById), new { id = novoCliente.Id }, novoCliente);
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel Criar cliente{e.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarCliente(int id, [FromBody] AtualizarClienteDTO dto)
    {
        try
        {
            var clienteAtualizado = await _service.UpdateClienteAsync(id, dto);
            if (clienteAtualizado == null) return NotFound();

            return Ok(clienteAtualizado);
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel Atualizar cliente{e.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarCliente(int id)
    {
        try
        {
            var success = await _service.DeleteClienteAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel deletar Cliente{e.Message}");
        }
    }

}