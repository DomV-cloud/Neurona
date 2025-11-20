"use client";

import { useState, FormEvent } from "react";
import { useMutation } from "@apollo/client/react";
import { REGISTER_PATIENT, GET_PATIENTS } from "../../lib/graphql/queries";
import {
  CreatePatientRequestInput,
  RegisterPatientResult,
} from "../../types/patient";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import {
  UserPlus,
  Lock,
  Mail,
  User,
  Calendar,
  FileText,
  Stethoscope,
} from "lucide-react";

interface RegisterPatientFormProps {
  onSuccess?: (data: any) => void;
  onCancel?: () => void;
}

export default function RegisterPatientForm({
  onSuccess,
  onCancel,
}: RegisterPatientFormProps) {
  const [formData, setFormData] = useState<CreatePatientRequestInput>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: 18,
    diagnostic: {
      diagnosisText: "",
      notes: "",
    },
  });

  const [registerPatient, { loading, error }] =
    useMutation<RegisterPatientResult>(REGISTER_PATIENT, {
      refetchQueries: [
        {
          query: GET_PATIENTS,
          variables: { pageSize: 10, page: 1 },
        },
      ],
      onCompleted: (data) => {
        console.log("Patient registered successfully:", data);
        if (onSuccess) {
          onSuccess(data);
        }
      },
      onError: (error) => {
        console.error("Registration error:", error);
      },
    });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      alert("First name and last name are required");
      return;
    }

    if (!formData.email.trim() || !formData.email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    if (!formData.password.trim() || formData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (formData.age < 1 || formData.age > 120) {
      alert("Please enter a valid age");
      return;
    }

    if (!formData.diagnostic.diagnosisText.trim()) {
      alert("Diagnosis text is required");
      return;
    }

    try {
      await registerPatient({
        variables: {
          input: {
            ...formData,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim().toLowerCase(),
            diagnostic: {
              diagnosisText: formData.diagnostic.diagnosisText.trim(),
              notes: formData.diagnostic.notes.trim(),
            },
          },
        },
      });
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  const updateField = (field: keyof CreatePatientRequestInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateDiagnosis = (
    field: keyof CreatePatientRequestInput["diagnostic"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      diagnostic: {
        ...prev.diagnostic,
        [field]: value,
      },
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <UserPlus className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white">
            Register New Patient
          </h2>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">Error: {error.message}</p>
          </div>
        )}

        {/* Personal Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              placeholder="Enter first name"
            />
            <Input
              label="Last Name"
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              placeholder="Enter last name"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="patient@example.com"
            />
            <Input
              label="Age"
              type="number"
              required
              min="1"
              max="120"
              value={formData.age}
              onChange={(e) =>
                updateField("age", parseInt(e.target.value) || 18)
              }
              placeholder="Enter age"
            />
          </div>
        </div>

        {/* Security */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-green-600" />
            Security
          </h3>
          <Input
            label="Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            placeholder="Enter secure password (min 6 characters)"
            helperText="Password must be at least 6 characters long"
          />
        </div>

        {/* Initial Diagnosis */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-purple-600" />
            Initial Diagnosis
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diagnosis Text *
              </label>
              <input
                type="text"
                required
                value={formData.diagnostic.diagnosisText}
                onChange={(e) =>
                  updateDiagnosis("diagnosisText", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 text-gray-900 placeholder-gray-500"
                placeholder="e.g., Migraine, Hypertension, etc."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinical Notes
              </label>
              <textarea
                value={formData.diagnostic.notes}
                onChange={(e) => updateDiagnosis("notes", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-300 text-gray-900 placeholder-gray-500"
                placeholder="Additional notes about the patient's condition..."
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="min-w-[140px]"
          >
            {loading ? "Registering..." : "Register Patient"}
          </Button>
        </div>
      </form>
    </div>
  );
}
