import { gql } from "@apollo/client";

export const GET_PATIENTS = gql`
  query GetPatients($pageSize: Int = 10, $page: Int = 1) {
    all(pageSize: $pageSize, page: $page) {
      page
      pageSize
      totalCount
      items {
        patientID
        firstName
        lastName
        age
        lastDiagnosticRecord {
          id
          diagnosisText
          createdAt
          notes
        }
      }
    }
  }
`;

export const GET_PATIENT = gql`
  query GetPatient($patientId: UUID!) {
    patientDetails(patientId: $patientId) {
      firstName
      lastName
      email
      age
      diagnosticRecords {
        id
        diagnosisText
        createdAt
        notes
      }
    }
  }
`;

export const CREATE_PATIENT = gql`
  mutation CreatePatient($input: CreatePatientInput!) {
    createPatient(input: $input) {
      patientID
      firstName
      lastName
      age
      lastDiagnosticRecord {
        id
        diagnosisText
        createdAt
        notes
      }
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($input: UpdatePatientInput!) {
    updatePatient(input: $input) {
      patientID
      firstName
      lastName
      age
      lastDiagnosticRecord {
        id
        diagnosisText
        createdAt
        notes
      }
    }
  }
`;

export const DELETE_PATIENT = gql`
  mutation DeletePatient($id: ID!) {
    deletePatient(id: $id)
  }
`;

export const UPDATE_PATIENT_DIAGNOSIS = gql`
  mutation UpdatePatientDiagnosis($input: UpdatePatientDiagnoseRequestInput!) {
    updatedPatientDiagnose(input: $input) {
      patientID
      diagnosticID
      diagnosisText
      notes
      updatedAt
    }
  }
`;

export const REGISTER_PATIENT = gql`
  mutation RegisterPatient($input: CreatePatientRequestInput!) {
    register(input: $input) {
      firstName
      lastName
      email
      token
    }
  }
`;
