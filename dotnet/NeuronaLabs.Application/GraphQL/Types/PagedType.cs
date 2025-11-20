namespace NeuronaLabs.Application.GraphQL.Types;

public record PagedType<T>(IReadOnlyCollection<T> Items, int TotalCount, int Page, int PageSize);
