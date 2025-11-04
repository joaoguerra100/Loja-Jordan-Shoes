using System.Net;
using System.Text.Json;

namespace JordanShoes.Api.Middleware;

public class GlobalExceptionHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;

    public GlobalExceptionHandlerMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        context.Response.ContentType = "application/json";

        // Loga o erro para fins de depuração
        _logger.LogError(exception, "Ocorreu um erro inesperado: {Message}", exception.Message);

        // Cria um objeto de resposta de erro padronizado
        var errorResponse = new
        {
            StatusCode = context.Response.StatusCode,
            Message = "Occorreu um erro interno no servidor. Por favor, tente novamente mais tarde.",
        };

        // Serializa o objeto de resposta para um JSON e escre no corpo da resposta
        var jsonResponse = JsonSerializer.Serialize(errorResponse);
        await context.Response.WriteAsync(jsonResponse);
    }
}