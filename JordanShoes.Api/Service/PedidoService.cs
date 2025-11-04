using JordanShoes.Api.DTOs.Pedido;
using JordanShoes.Api.Models;
using JordanShoes.Api.Repository.Interface;
using JordanShoes.Api.Service.Interface;

namespace JordanShoes.Api.Service;

public class PedidoService : IPedidoService
{
    private readonly IPedidoRepository _pedidoRepository;
    private readonly IItemPedidoRepository _itemPedidoRepository;
    private readonly IProdutoRepository _produtoRepository;

    public PedidoService(IPedidoRepository pedidoRepository, IItemPedidoRepository itemPedidoRepository, IProdutoRepository produtoRepository)
    {
        _pedidoRepository = pedidoRepository;
        _itemPedidoRepository = itemPedidoRepository;
        _produtoRepository = produtoRepository;
    }

    public async Task<PedidoDTO> CreatePedidoAsync(CriarPedidoDTO dto, int clienteId)
    {
        decimal valorTotal = 0;
        var itensParaSalvar = new List<ItemPedido>();
        var itensParaRetornar = new List<ItemPedidoDTO>();

        // 1. Validar cada item e calcular o valor total
        foreach (var itemCarrinho in dto.Itens!)
        {
            var produto = await _produtoRepository.GetProdutoByIdAsync(itemCarrinho.ProdutoId);
            if (produto == null)
            {
                // Se um produto não existe, falha a operação inteira.
                throw new Exception($"Produto com ID {itemCarrinho.ProdutoId} não foi encontrado.");
            }

            valorTotal += produto.Preco * itemCarrinho.Quantidade;

            itensParaSalvar.Add(new ItemPedido
            {
                ProdutoId = itemCarrinho.ProdutoId,
                Quantidade = itemCarrinho.Quantidade,
                PrecoUnitario = produto.Preco
            });

            itensParaRetornar.Add(new ItemPedidoDTO
            {
                ProdutoId = produto.Id,
                NomeProduto = produto.Nome,
                Quantidade = itemCarrinho.Quantidade,
                PrecoUnitario = produto.Preco
            });
        }

        // 2. Criar o registro do Pedido principal
        var novoPedido = new Pedido
        {
            ClienteId = clienteId,
            DataPedido = DateTime.UtcNow,
            ValorTotal = valorTotal,
            Status = "Processando"
        };

        var pedidoSalvo = await _pedidoRepository.CreateAsync(novoPedido);

        // 3. Vincular cada item de pedido ao pedido que acabamos de salvar
        foreach (var item in itensParaSalvar)
        {
            item.PedidoId = pedidoSalvo.Id;
        }

        // 4. Salvar todos os itens do pedido
        await _itemPedidoRepository.CreateVariosAsync(itensParaSalvar);

        // 5. Montar e retornar o DTO de resposta completo
        return new PedidoDTO
        {
            Id = pedidoSalvo.Id,
            ClienteId = pedidoSalvo.ClienteId,
            DataPedido = pedidoSalvo.DataPedido,
            ValorTotal = pedidoSalvo.ValorTotal,
            Status = pedidoSalvo.Status,
            Itens = itensParaRetornar
        };
    }
}