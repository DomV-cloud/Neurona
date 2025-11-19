"use client";

import { useQuery } from "@apollo/client/react";
import { useParams, useRouter } from "next/navigation";
import { GET_PATIENT } from "../../../lib/graphql/queries";
import { GetPatientResponse, DiagnosticRecord, ExaminationImage } from "../../../types/patient";
import { 
  ArrowLeft, Calendar, User, Mail, Edit3, FileText, 
  Heart, Thermometer, Weight, Activity, Phone, MapPin,
  AlertTriangle, Pill, History, Image as ImageIcon,
  Clock, TrendingUp, Shield, Stethoscope
} from "lucide-react";
import { Suspense, useState } from "react";
import EditDiagnosisModal from "../../../components/patients/EditDiagnosisModal";

function PatientDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;
  const [editingDiagnosis, setEditingDiagnosis] = useState<DiagnosticRecord | null>(null);

  const { data, loading, error } = useQuery<GetPatientResponse>(GET_PATIENT, {
    variables: { patientId },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Loading patient details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">
              Error loading patient: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.patientDetails) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-yellow-800">Patient not found</p>
          </div>
        </div>
      </div>
    );
  }

  const patient = data.patientDetails;

  // Mock enhanced data for demonstration (in real app, this would come from API)
  const mockPatientData = {
    ...patient,
    dateOfBirth: "1985-03-15",
    gender: "Male" as const,
    phone: "+1 (555) 123-4567",
    address: "123 Medical Center Dr, Health City, HC 12345",
    bloodType: "A+",
    allergies: ["Penicillin", "Shellfish"],
    medications: ["Lisinopril 10mg", "Metformin 500mg", "Aspirin 81mg"],
    medicalHistory: "Hypertension diagnosed 2020, Type 2 diabetes diagnosed 2021",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543"
    },
    vitalSigns: {
      bloodPressure: "128/82",
      heartRate: 72,
      temperature: 98.6,
      weight: 75,
      height: 178,
      lastUpdated: "2024-11-19T10:30:00Z"
    },
    diagnosticRecords: patient.diagnosticRecords.map((record, index) => ({
      ...record,
      severity: index % 4 === 0 ? 'High' : index % 3 === 0 ? 'Medium' : 'Low',
      category: index % 2 === 0 ? 'Neurology' : 'Cardiology',
      treatment: `Treatment plan ${index + 1}`,
      followUpRequired: index % 3 === 0,
      examinationImages: index === 0 ? [
        {
          id: "img1",
          type: "MRI" as const,
          url: "/images/examinations/brain-mri-sample.jpg",
          description: "Brain MRI showing normal brain structure with no abnormalities",
          timestamp: record.timestamp,
          bodyPart: "Brain"
        }
      ] : index === 1 ? [
        {
          id: "img2",
          type: "CT" as const,
          url: "/images/examinations/chest-ct-sample.jpg",
          description: "Chest CT scan revealing clear lung fields",
          timestamp: record.timestamp,
          bodyPart: "Chest"
        }
      ] : []
    }))
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-500" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {patient.firstName} {patient.lastName}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Patient Details & Medical History
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Patient Information Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Patient Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Full Name
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {patient.firstName} {patient.lastName}
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Age</span>
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {patient.age} years
                </p>
              </div>

              {patient.email && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Mail className="w-4 h-4 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Email
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 break-all">
                    {patient.email}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Diagnostic Records */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Diagnostic History ({patient.diagnosticRecords.length} records)
            </h2>

            {patient.diagnosticRecords.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500 text-lg">
                  No diagnostic records found
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Diagnostic records will appear here once they are added to the
                  patient's file.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {patient.diagnosticRecords.map((record, index) => (
                  <div
                    key={record.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">
                          {record.diagnosisText}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(record.timestamp)}</span>
                        </div>
                        {record.notes && (
                          <div className="bg-gray-50 rounded-md p-3 mt-3">
                            <div className="flex items-center mb-2">
                              <FileText className="w-4 h-4 text-gray-500 mr-2" />
                              <span className="text-sm font-medium text-gray-700">
                                Notes
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">
                              {record.notes}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingDiagnosis(record)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit diagnosis"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Record #{patient.diagnosticRecords.length - index}
                        </span>
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          ID: {record.id}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit Diagnosis Modal */}
      {editingDiagnosis && (
        <EditDiagnosisModal
          isOpen={!!editingDiagnosis}
          onClose={() => setEditingDiagnosis(null)}
          patientId={patientId}
          diagnosis={editingDiagnosis}
        />
      )}
    </div>
  );
}

export default function PatientDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <PatientDetailsContent />
    </Suspense>
  );
}
