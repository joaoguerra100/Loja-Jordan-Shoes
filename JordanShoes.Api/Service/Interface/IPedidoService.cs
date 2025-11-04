using JordanShoes.Api.DTOs.Pedido;

namespace JordanShoes.Api.Service.Interface;

public interface IPedidoService
{
    Task<PedidoDTO> CreatePedidoAsync(CriarPedidoDTO dto, int clienteId);
}