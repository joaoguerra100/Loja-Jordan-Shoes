using System.Security.Claims;
using JordanShoes.Api.DTOs.Pedido;
using JordanShoes.Api.Repository.Interface;
using JordanShoes.Api.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JordanShoes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PedidoController : Controller
{
    private readonly IPedidoService _pedidoService;
    private readonly IClienteRepository _clienteRepository;

    public PedidoController(IPedidoService pedidoService, IClienteRepository clienteRepository)
    {
        _pedidoService = pedidoService;
        _clienteRepository = clienteRepository;
    }

    [HttpPost]
    public async Task<IActionResult> CriarPedido([FromBody] CriarPedidoDTO dto)
    {
        var usuarioId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var cliente = await _clienteRepository.GetByUsuarioIdAsync(usuarioId);
        if (cliente == null)
        {
            return BadRequest(new { message = "O usuário não possui um perfil de cliente cadastrado." });
        }

        var novoPedido = await _pedidoService.CreatePedidoAsync(dto, cliente.Id);

        return CreatedAtAction(null, new { id = novoPedido.Id }, novoPedido);
    }
}