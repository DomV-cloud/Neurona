"use client";

import { useQuery } from "@apollo/client/react";
import { useParams, useRouter } from "next/navigation";
import { GET_PATIENT } from "../../../lib/graphql/queries";
import {
  GetPatientResponse,
  DiagnosticRecord,
  ExaminationImage,
} from "../../../types/patient";
import {
  ArrowLeft,
  Calendar,
  User,
  Mail,
  Edit3,
  FileText,
  Heart,
  Thermometer,
  Weight,
  Activity,
  Phone,
  MapPin,
  AlertTriangle,
  Pill,
  History,
  Image as ImageIcon,
  Clock,
  TrendingUp,
  Shield,
  Stethoscope,
} from "lucide-react";
import { Suspense, useState } from "react";
import EditDiagnosisModal from "../../../components/patients/EditDiagnosisModal";
import ImageViewerModal from "../../../components/patients/ImageViewerModal";

function PatientDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;
  const [editingDiagnosis, setEditingDiagnosis] =
    useState<DiagnosticRecord | null>(null);
  const [viewingImage, setViewingImage] = useState<ExaminationImage | null>(
    null
  );

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
    medicalHistory:
      "Hypertension diagnosed 2020, Type 2 diabetes diagnosed 2021",
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543",
    },
    vitalSigns: {
      bloodPressure: "128/82",
      heartRate: 72,
      temperature: 98.6,
      weight: 75,
      height: 178,
      lastUpdated: "2024-11-19T10:30:00Z",
    },
    diagnosticRecords: patient.diagnosticRecords.map((record, index) => ({
      ...record,
      severity: (index % 4 === 0
        ? "High"
        : index % 3 === 0
        ? "Medium"
        : "Low") as "Low" | "Medium" | "High" | "Critical",
      category: index % 2 === 0 ? "Neurology" : "Cardiology",
      treatment: `Treatment plan ${index + 1}`,
      followUpRequired: index % 3 === 0,
      examinationImages:
        index === 0
          ? [
              {
                id: "brain_mri_001",
                type: "MRI" as const,
                url: "/images/examinations/MRI Scann.png",
                description:
                  "Axial FLAIR brain MRI demonstrating normal brain parenchyma with clear delineation of gray and white matter structures. No evidence of acute infarction, hemorrhage, or space-occupying lesions.",
                timestamp: record.timestamp,
                bodyPart: "Brain",
              },
            ]
          : [],
    })),
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Patient Overview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="font-semibold text-gray-900">
                    {mockPatientData.firstName} {mockPatientData.lastName}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Age</label>
                    <p className="font-semibold text-gray-900">
                      {mockPatientData.age} years
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Gender</label>
                    <p className="font-semibold text-gray-900">
                      {mockPatientData.gender}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Blood Type</label>
                  <p className="font-semibold text-red-600">
                    {mockPatientData.bloodType}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Date of Birth</label>
                  <p className="font-semibold text-gray-900">
                    {new Date(mockPatientData.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-600" />
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p className="font-semibold text-gray-900">
                    {mockPatientData.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-semibold text-gray-900">
                    {mockPatientData.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Address</label>
                  <p className="font-semibold text-gray-900 text-sm leading-relaxed">
                    {mockPatientData.address}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <label className="text-sm text-gray-500">
                    Emergency Contact
                  </label>
                  <p className="font-semibold text-gray-900">
                    {mockPatientData.emergencyContact?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {mockPatientData.emergencyContact?.relationship} •{" "}
                    {mockPatientData.emergencyContact?.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Vital Signs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-500" />
                Current Vital Signs
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Activity className="w-4 h-4 text-red-600 mr-2" />
                      <span className="text-xs text-gray-600">
                        Blood Pressure
                      </span>
                    </div>
                    <p className="font-bold text-red-700">
                      {mockPatientData.vitalSigns?.bloodPressure}
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Heart className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-xs text-gray-600">Heart Rate</span>
                    </div>
                    <p className="font-bold text-blue-700">
                      {mockPatientData.vitalSigns?.heartRate} bpm
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Thermometer className="w-4 h-4 text-orange-600 mr-2" />
                      <span className="text-xs text-gray-600">Temperature</span>
                    </div>
                    <p className="font-bold text-orange-700">
                      {mockPatientData.vitalSigns?.temperature}°F
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <Weight className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-xs text-gray-600">Weight</span>
                    </div>
                    <p className="font-bold text-green-700">
                      {mockPatientData.vitalSigns?.weight} kg
                    </p>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-100">
                  Last updated:{" "}
                  {mockPatientData.vitalSigns?.lastUpdated
                    ? formatDate(mockPatientData.vitalSigns.lastUpdated)
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Allergies & Medications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                Allergies & Medications
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Allergies
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {mockPatientData.allergies?.map((allergy, index) => (
                      <span
                        key={index}
                        className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full border border-red-200"
                      >
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Current Medications
                  </label>
                  <div className="space-y-2">
                    {mockPatientData.medications?.map((medication, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 bg-blue-50 rounded-lg"
                      >
                        <Pill className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-sm text-blue-900">
                          {medication}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Medical History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <History className="w-5 h-5 mr-2 text-purple-600" />
                Medical History
              </h2>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {mockPatientData.medicalHistory}
                </p>
              </div>
            </div>
          </div>

          {/* Diagnostic Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2 text-indigo-600" />
              Diagnostic Timeline ({
                mockPatientData.diagnosticRecords.length
              }{" "}
              records)
            </h2>

            {mockPatientData.diagnosticRecords.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Stethoscope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No diagnostic records found
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Diagnostic records will appear here once they are added to the
                  patient's file.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {mockPatientData.diagnosticRecords.map((record, index) => (
                  <div key={record.id} className="relative">
                    {/* Timeline line */}
                    {index < mockPatientData.diagnosticRecords.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200"></div>
                    )}

                    <div className="flex items-start space-x-4">
                      {/* Timeline dot */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${getSeverityColor(
                          record.severity
                        )} border-2`}
                      >
                        <span className="text-xs font-bold">
                          #{mockPatientData.diagnosticRecords.length - index}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 bg-gray-50 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900 text-lg">
                                {record.diagnosisText}
                              </h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(
                                  record.severity
                                )}`}
                              >
                                {record.severity}
                              </span>
                              {record.category && (
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                  {record.category}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mb-3">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{formatDate(record.timestamp)}</span>
                              {record.followUpRequired && (
                                <>
                                  <span className="mx-2">•</span>
                                  <TrendingUp className="w-4 h-4 mr-1 text-orange-500" />
                                  <span className="text-orange-600">
                                    Follow-up required
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => setEditingDiagnosis(record)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            title="Edit diagnosis"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Notes */}
                        {record.notes && (
                          <div className="bg-white rounded-lg p-4 mb-4">
                            <div className="flex items-center mb-2">
                              <FileText className="w-4 h-4 text-gray-500 mr-2" />
                              <span className="text-sm font-medium text-gray-700">
                                Clinical Notes
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
                              {record.notes}
                            </p>
                          </div>
                        )}

                        {/* Treatment */}
                        {record.treatment && (
                          <div className="bg-green-50 rounded-lg p-4 mb-4">
                            <div className="flex items-center mb-2">
                              <Shield className="w-4 h-4 text-green-600 mr-2" />
                              <span className="text-sm font-medium text-green-700">
                                Treatment Plan
                              </span>
                            </div>
                            <p className="text-sm text-green-600">
                              {record.treatment}
                            </p>
                          </div>
                        )}

                        {/* Examination Images */}
                        {record.examinationImages &&
                          record.examinationImages.length > 0 && (
                            <div className="bg-white rounded-lg p-4">
                              <div className="flex items-center mb-4">
                                <ImageIcon className="w-4 h-4 text-blue-600 mr-2" />
                                <span className="text-sm font-medium text-blue-700">
                                  Examination Images
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {record.examinationImages.map((image) => (
                                  <div
                                    key={image.id}
                                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                                    onClick={() => setViewingImage(image)}
                                  >
                                    <div className="aspect-square bg-gray-900 relative overflow-hidden">
                                      <img
                                        src={image.url}
                                        alt={`${image.type} scan of ${image.bodyPart}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        onLoad={() =>
                                          console.log(
                                            "Image loaded successfully:",
                                            image.url
                                          )
                                        }
                                        onError={(e) => {
                                          console.log(
                                            "Image failed to load:",
                                            image.url
                                          );
                                          // Fallback to placeholder if image fails to load
                                          const target =
                                            e.target as HTMLImageElement;
                                          target.style.display = "none";
                                          target.nextElementSibling?.classList.remove(
                                            "hidden"
                                          );
                                          target.nextElementSibling?.classList.add(
                                            "flex"
                                          );
                                        }}
                                      />
                                      {/* Fallback placeholder */}
                                      <div className="absolute inset-0 items-center justify-center text-center p-4 hidden">
                                        <div>
                                          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                          <p className="text-sm font-medium text-gray-600">
                                            {image.type} Scan
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {image.bodyPart}
                                          </p>
                                        </div>
                                      </div>
                                      {/* Image overlay with type badge */}
                                      <div className="absolute top-2 left-2">
                                        <span className="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
                                          {image.type}
                                        </span>
                                      </div>
                                      {/* Zoom indicator */}
                                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="bg-blue-600 text-white p-1.5 rounded-full">
                                          <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                            />
                                          </svg>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="p-4 bg-white">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-gray-900 text-sm">
                                          {image.bodyPart} {image.type}
                                        </h4>
                                        <span className="text-xs text-gray-500">
                                          {formatDate(image.timestamp)}
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-700 leading-relaxed mb-2">
                                        {image.description}
                                      </p>
                                      <div className="flex items-center text-xs text-gray-500">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        <span>
                                          Scan Date:{" "}
                                          {new Date(
                                            image.timestamp
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
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

      {/* Image Viewer Modal */}
      {viewingImage && (
        <ImageViewerModal
          isOpen={!!viewingImage}
          onClose={() => setViewingImage(null)}
          image={viewingImage}
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
