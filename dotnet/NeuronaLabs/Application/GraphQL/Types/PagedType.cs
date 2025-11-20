namespace NeuronaLabs.Application.DTOs.Responses;

public record PagedType<T>(IReadOnlyCollection<T> Items, int TotalCount, int Page, int PageSize);
