"use client";

import { useRouter } from "next/navigation";
import { Patient } from "@/types/patient";

interface PatientCardProps {
  patient: Patient;
}

export default function PatientCard({ patient }: PatientCardProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => router.push(`/patient/${patient.patientID}`)}
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {patient.firstName} {patient.lastName}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Age: {patient.age} • ID: {patient.patientID}
        </p>
      </div>

      {patient.lastDiagnosticRecord && (
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Latest Diagnosis</h4>
          <p className="text-sm font-medium text-blue-800 mb-1">
            {patient.lastDiagnosticRecord.diagnosisText}
          </p>
          <p className="text-xs text-gray-600 mb-2">
            {formatDate(patient.lastDiagnosticRecord.createdAt)}
          </p>
          <p className="text-sm text-gray-700">
            {patient.lastDiagnosticRecord.notes}
          </p>
        </div>
      )}

      {!patient.lastDiagnosticRecord && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-500 italic">
            No diagnostic records available
          </p>
        </div>
      )}
    </div>
  );
}
