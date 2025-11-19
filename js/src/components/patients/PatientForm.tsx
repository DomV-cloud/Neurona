"use client";

import { useState, FormEvent } from "react";
import { CreatePatientInput, UpdatePatientInput } from "../../types/patient";

interface PatientFormProps {
  initialData?: CreatePatientInput & { id?: string };
  onSubmit: (data: CreatePatientInput | UpdatePatientInput) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export default function PatientForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: PatientFormProps) {
  const [formData, setFormData] = useState<CreatePatientInput>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    gender: initialData?.gender || "Male",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    medicalHistory: initialData?.medicalHistory || "",
    allergies: initialData?.allergies || "",
    medications: initialData?.medications || "",
    emergencyContact: initialData?.emergencyContact || {
      name: "",
      relationship: "",
      phone: "",
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (initialData?.id) {
        await onSubmit({
          ...formData,
          id: initialData.id,
        } as UpdatePatientInput);
      } else {
        await onSubmit(formData);
      }
      // The redirect is handled by the onCompleted callback in the parent component
    } catch (error) {
      // Error handling is done in the parent component
      console.error("Form submission error:", error);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateEmergencyContact = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact!,
        [field]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth *
          </label>
          <input
            type="date"
            required
            value={formData.dateOfBirth}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender *
          </label>
          <select
            required
            value={formData.gender}
            onChange={(e) => updateField("gender", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => updateField("address", e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medical History
        </label>
        <textarea
          value={formData.medicalHistory}
          onChange={(e) => updateField("medicalHistory", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Previous conditions, surgeries, etc."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Allergies
          </label>
          <textarea
            value={formData.allergies}
            onChange={(e) => updateField("allergies", e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="List any known allergies"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Medications
          </label>
          <textarea
            value={formData.medications}
            onChange={(e) => updateField("medications", e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="List current medications"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={formData.emergencyContact?.name || ""}
              onChange={(e) => updateEmergencyContact("name", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship
            </label>
            <input
              type="text"
              value={formData.emergencyContact?.relationship || ""}
              onChange={(e) =>
                updateEmergencyContact("relationship", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Spouse, Parent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={formData.emergencyContact?.phone || ""}
              onChange={(e) => updateEmergencyContact("phone", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Saving..."
            : initialData?.id
            ? "Update Patient"
            : "Create Patient"}
        </button>
      </div>
    </form>
  );
}
