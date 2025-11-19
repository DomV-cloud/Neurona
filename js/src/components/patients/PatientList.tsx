"use client";

import { useQuery } from "@apollo/client/react";
import { GET_PATIENTS } from "../../lib/graphql/queries";
import { Patient, GetPatientsResponse } from "../../types/patient";
import PatientCard from "./PatientCard";

interface PatientListProps {}

export default function PatientList() {
  const { data, loading, error, refetch } = useQuery<GetPatientsResponse>(
    GET_PATIENTS,
    {
      variables: { pageSize: 10, page: 1 },
    }
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Loading patients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error loading patients: {error.message}</p>
      </div>
    );
  }

  const patients = data?.all?.items || [];

  if (patients.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500 text-lg">No patients found.</p>
        <p className="text-gray-400 text-sm mt-2">
          Click "Add New Patient" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {patients.map((patient: Patient) => (
        <PatientCard key={patient.patientID} patient={patient} />
      ))}
    </div>
  );
}
