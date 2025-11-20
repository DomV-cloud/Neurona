namespace NeuronaLabs.Application.DTOs.Responses;

public record PagedResponse<T>(
    IReadOnlyCollection<T> Items,
    int TotalCount,
    int Page,
    int PageSize
);
