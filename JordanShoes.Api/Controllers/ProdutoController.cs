using JordanShoes.Api.DTOs.Produto;
using JordanShoes.Api.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace JordanShoes.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutoController : Controller
{
    private readonly IProdutoService _service;

    public ProdutoController(IProdutoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProdutos()
    {
        var produtos = await _service.GetAllProdutosAsync();
        return Ok(produtos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetProdutoById(int id)
    {
        var produtos = await _service.GetProdutoByIdAsync(id);
        if (produtos == null)
        {
            return NotFound();
        }

        return Ok(produtos);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CriarProduto([FromBody] CriarProdutoDTO dto)
    {
        var novoProduto = await _service.CreateProdutoAsync(dto);

        return CreatedAtAction(nameof(GetProdutoById), new { id = novoProduto.Id }, novoProduto);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> AtualizarProduto(int id, [FromBody] AtualizarProdutoDTO dto)
    {
        var produtoAtualizado = await _service.UpdateProdutoAsync(id, dto);
        if (produtoAtualizado == null) return NotFound();

        return Ok(produtoAtualizado);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeletarProduto(int id)
    {
        var success = await _service.DeleteProdutoAsync(id);
        if (!success) return NotFound();

        return NoContent();
    }
}