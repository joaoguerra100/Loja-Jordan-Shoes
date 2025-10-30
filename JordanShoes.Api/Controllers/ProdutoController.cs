using JordanShoes.Api.DTOs;
using JordanShoes.Api.Service.Interface;
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
        try
        {
            var produtos = await _service.GetAllProdutosAsync();
            return Ok(produtos);
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel procurar todos os produtos{e.Message}");
        }

    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAllProdutoById(int id)
    {
        try
        {
            var produtos = await _service.GetProdutoByIdAsync(id);
            if (produtos == null)
            {
                return NotFound();
            }

            return Ok(produtos);
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel procurar produto pelo id{e.Message}");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CriarProduto([FromBody] CriarProdutoDTO dto)
    {
        try
        {
            var novoProduto = await _service.CreateProdutoAsync(dto);

            return CreatedAtAction(nameof(GetAllProdutoById), new { id = novoProduto.Id }, novoProduto);
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel Criar produto{e.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarProduto(int id, [FromBody] AtualizarProdutoDTO dto)
    {
        try
        {
            var produtoAtualizado = await _service.UpdateProdutoAsync(id, dto);
            if (produtoAtualizado == null) return NotFound();

            return Ok(produtoAtualizado);
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel Atualizar produto{e.Message}");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarProduto(int id)
    {
        try
        {
            var success = await _service.DeleteProdutoAsync(id);
            if (!success) return NotFound();

            return NoContent();
        }
        catch (Exception e)
        {
            return BadRequest($"Nao foi possivel Atualizar produto{e.Message}");
        }
    }
}