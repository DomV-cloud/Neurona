using NeuronaLabs.Application.ApplicationServices.Diagnoses;
using NeuronaLabs.Application.GraphQL.Inputs;
using NeuronaLabs.Application.GraphQL.Types;
using NeuronaLabs.Domain.Diagnoses;

namespace NeuronaLabs.Infrastructure.Services.Diagnoses;

public class DiagnosisService(IDiagnosisRepository diagnosisRepository) : IDiagnosisService
{
    private readonly IDiagnosisRepository _diagnosisRepository = diagnosisRepository;

    public async Task<CreatedPatientDiagnosisType> CreateDiagnosisAsync(
        CreateDiagnosisInput diagnosis,
        CancellationToken cancellationToken
    )
    {
        ArgumentNullException.ThrowIfNull(diagnosis);

        var createdDiagnosis = await _diagnosisRepository.AddDiagnosisAsync(
            new Diagnosis(diagnosis.PatientID, diagnosis.DiagnosisText, diagnosis.Notes),
            cancellationToken
        );

        return new CreatedPatientDiagnosisType(
            createdDiagnosis.PatientID,
            createdDiagnosis.DiagnosisText,
            createdDiagnosis.Notes
        );
    }

    public async Task<UpdatedPatientDiagnosisType> UpdateDiagnosisAsync(
        UpdatePatientDiagnosisInput request,
        CancellationToken cancellationToken
    )
    {
        var diagnosis =
            await _diagnosisRepository.GetByPatientAndIdAsync(
                request.PatientID,
                request.DiagnosisID,
                cancellationToken
            )
            ?? throw new InvalidOperationException(
                $"Patient '{request.PatientID}' or Diagnosis '{request.DiagnosisID}' not found."
            );

        diagnosis.UpdateDiagnosis(request.DiagnosisText, request.Notes);

        await _diagnosisRepository.SaveChangesAsync(cancellationToken);

        return new UpdatedPatientDiagnosisType(
            diagnosis.PatientID,
            diagnosis.ID,
            diagnosis.DiagnosisText,
            diagnosis.Notes,
            diagnosis.UpdatedAt
        );
    }
}
