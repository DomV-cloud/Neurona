export interface Diagnosis {
  id: string;
  diagnosisText: string;
  createdAt: string;
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
  createdAt: string;
  bodyPart?: string;
}

export interface Patient {
  patientID: string;
  firstName: string;
  lastName: string;
  age: number;
  lastDiagnosis?: Diagnosis;
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
export interface PaginatedType<T> {
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}

// GraphQL Query Types
export interface GetPatientsType {
  all: PaginatedType<Patient>;
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
  diagnoses: Diagnosis[];
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

export interface GetPatientType {
  patientDetails: PatientDetails;
}

export interface CreatePatientType {
  createPatient: Patient;
}

export interface UpdatePatientType {
  updatePatient: Patient;
}

export interface DeletePatientType {
  deletePatient: boolean;
}

// Create Diagnosis Types
export interface CreateDiagnosisInput {
  patientID: string;
  diagnosisText: string;
  notes: string;
}

export interface CreateDiagnosisInput {
  patientID: string;
  notes: string;
}

export interface CreateDiagnosisResult {
  createDiagnosis: CreateDiagnosisInput;
}

// Update Diagnosis Types
export interface UpdatePatientDiagnosisInput {
  patientID: string;
  diagnosisID: string;
  diagnosisText?: string;
  notes?: string;
}

export interface UpdatePatientDiagnosisResponse {
  patientID: string;
  diagnosisID: string;
  diagnosisText: string;
  notes: string;
  updatedAt: string;
}

export interface UpdatePatientDiagnosisResult {
  updatedPatientDiagnose: UpdatePatientDiagnosisResponse;
}

// Registration Types
export interface RegisterPatientInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
}

export interface RegisterPatientResponse {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
}

export interface RegisterPatientResult {
  register: RegisterPatientResponse;
}
