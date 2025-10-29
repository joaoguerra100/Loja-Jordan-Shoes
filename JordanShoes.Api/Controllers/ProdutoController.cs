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
}