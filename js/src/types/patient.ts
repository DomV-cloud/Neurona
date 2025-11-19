export interface DiagnosticRecord {
  id: string;
  diagnosisText: string;
  timestamp: string;
  notes: string;
  severity?: "Low" | "Medium" | "High" | "Critical";
  category?: string;
  treatment?: string;
  followUpRequired?: boolean;
  examinationImages?: ExaminationImage[];
}

export interface ExaminationImage {
  id: string;
  type: "MRI" | "CT" | "X-Ray" | "Ultrasound" | "Other";
  url: string;
  description: string;
  timestamp: string;
  bodyPart?: string;
}

export interface Patient {
  patientID: string;
  firstName: string;
  lastName: string;
  age: number;
  lastDiagnosticRecord?: DiagnosticRecord;
}

// Legacy interface for form compatibility - will be updated later
export interface LegacyPatient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  email?: string;
  phone?: string;
  address?: string;
  medicalHistory?: string;
  allergies?: string;
  medications?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  email?: string;
  phone?: string;
  address?: string;
  medicalHistory?: string;
  allergies?: string;
  medications?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface UpdatePatientInput {
  id: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: "Male" | "Female" | "Other";
  email?: string;
  phone?: string;
  address?: string;
  medicalHistory?: string;
  allergies?: string;
  medications?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

// Pagination types
export interface PaginatedResponse<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}

// GraphQL Query Response Types
export interface GetPatientsResponse {
  all: PaginatedResponse<Patient>;
}

export interface PatientDetails {
  firstName: string;
  lastName: string;
  email?: string;
  age: number;
  dateOfBirth?: string;
  gender?: "Male" | "Female" | "Other";
  phone?: string;
  address?: string;
  bloodType?: string;
  allergies?: string[];
  medications?: string[];
  medicalHistory?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  diagnosticRecords: DiagnosticRecord[];
  vitalSigns?: VitalSigns;
}

export interface VitalSigns {
  bloodPressure?: string;
  heartRate?: number;
  temperature?: number;
  weight?: number;
  height?: number;
  lastUpdated?: string;
}

export interface GetPatientResponse {
  patientDetails: PatientDetails;
}

export interface CreatePatientResponse {
  createPatient: Patient;
}

export interface UpdatePatientResponse {
  updatePatient: Patient;
}

export interface DeletePatientResponse {
  deletePatient: boolean;
}

// Update Diagnosis Types
export interface UpdatePatientDiagnoseRequestInput {
  patientID: string;
  diagnoseID: string;
  diagnosisText: string;
  notes: string;
}

export interface UpdatePatientDiagnosisResponse {
  patientID: string;
  diagnosticID: string;
  diagnosisText: string;
  notes: string;
}

export interface UpdatePatientDiagnosisResult {
  updatedPatientDiagnose: UpdatePatientDiagnosisResponse;
}

// Registration Types
export interface CreatePatientRequestInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  diagnostic: {
    diagnosisText: string;
    notes: string;
  };
}

// Keep the old interface for backward compatibility
export interface RegisterPatientInput extends CreatePatientRequestInput {}

export interface RegisterPatientResponse {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface RegisterPatientResult {
  register: RegisterPatientResponse;
}
