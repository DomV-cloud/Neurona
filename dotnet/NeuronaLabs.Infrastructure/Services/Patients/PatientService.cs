using Microsoft.EntityFrameworkCore;
using NeuronaLabs.Application.ApplicationServices.Patients;
using NeuronaLabs.Application.GraphQL.Types;
using NeuronaLabs.Domain.Patients;

namespace NeuronaLabs.Infrastructure.Services.Patients;

public class PatientService(IPatientRepository patientRepository) : IPatientService
{
    private readonly IPatientRepository _patientRepository = patientRepository;

    public async Task<PagedType<GetAllPatientsType>> GetAllPatientsAsync(
        int pageSize,
        int page,
        CancellationToken cancellationToken
    )
    {
        var query = _patientRepository.GetPatientsQuery();

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new GetAllPatientsType(
                p.ID,
                p.FirstName,
                p.LastName,
                p.Age,
                p.Diagnoses.OrderByDescending(dr => dr.CreatedAt)
                    .Select(dr => new GetDiagnosisType(
                        dr.ID,
                        dr.DiagnosisText,
                        dr.Notes,
                        dr.CreatedAt,
                        dr.UpdatedAt
                    ))
                    .FirstOrDefault()
            ))
            .ToListAsync(cancellationToken);

        return new PagedType<GetAllPatientsType>(items, page, pageSize, totalCount);
    }

    public Task<GetPatientDetailInfoType> GetPatientDetailInfoAsync(
        Guid patientID,
        CancellationToken cancellationToken
    )
    {
        var patientDetail =
            _patientRepository
                .GetPatientByIDAsync(patientID)
                .Select(p => new GetPatientDetailInfoType(
                    p.FirstName,
                    p.LastName,
                    p.Email,
                    p.Age,
                    p.Diagnoses.OrderByDescending(d => d.CreatedAt)
                        .Select(dr => new GetDiagnosisType(
                            dr.ID,
                            dr.DiagnosisText,
                            dr.Notes,
                            dr.CreatedAt,
                            dr.UpdatedAt
                        ))
                        .ToList()
                ))
                .FirstOrDefaultAsync(cancellationToken)
            ?? throw new InvalidOperationException($"Patient with ID '{patientID}' was not found.");

        return patientDetail;
    }
}
