using JordanShoes.Api.Models;

namespace JordanShoes.Api.Repository.Interface;

public interface IItemPedidoRepository
{
    Task<IEnumerable<ItemPedido>> CreateVariosAsync(List<ItemPedido> itens);
}