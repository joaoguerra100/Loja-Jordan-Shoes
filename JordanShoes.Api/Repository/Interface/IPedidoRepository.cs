using JordanShoes.Api.Models;

namespace JordanShoes.Api.Repository.Interface;

public interface IPedidoRepository
{
    Task<Pedido> CreateAsync(Pedido pedido);
}