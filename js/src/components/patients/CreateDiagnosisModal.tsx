"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_DIAGNOSIS, GET_PATIENT } from "../../lib/graphql/queries";
import {
  CreateDiagnosisInput,
  CreateDiagnosisResult,
} from "../../types/patient";
import {
  X,
  Save,
  Loader2,
  Plus,
  Stethoscope,
  AlertTriangle,
} from "lucide-react";

interface CreateDiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  onSuccess?: () => void;
}

export default function CreateDiagnosisModal({
  isOpen,
  onClose,
  patientId,
  onSuccess,
}: CreateDiagnosisModalProps) {
  const [formData, setFormData] = useState({
    diagnosisText: "",
    notes: "",
  });

  const [createDiagnosis, { loading, error }] =
    useMutation<CreateDiagnosisResult>(CREATE_DIAGNOSIS, {
      refetchQueries: [
        {
          query: GET_PATIENT,
          variables: { patientId },
        },
      ],
      awaitRefetchQueries: true,
      update: (cache, { data }) => {
        if (data?.createDiagnosis) {
          console.log("Clearing Apollo cache after diagnosis creation");
          // Clear all patient-related cache entries
          cache.evict({ fieldName: "patientDetails" });
          cache.evict({
            id: cache.identify({
              __typename: "Query",
            }),
            fieldName: "patientDetails",
            args: { patientId },
          });
          // Force garbage collection
          cache.gc();
          console.log("Cache cleared, should trigger refetch");
        }
      },
      onCompleted: async (data) => {
        console.log("Diagnosis created successfully:", data);

        // Call the success callback to trigger manual refetch
        if (onSuccess) {
          console.log("Calling onSuccess callback");
          await onSuccess();
        }

        // Small delay to ensure cache operations complete
        setTimeout(() => {
          onClose();
          setFormData({
            diagnosisText: "",
            notes: "",
          });
        }, 500);
      },
      onError: (error) => {
        console.error("Error creating diagnosis:", error);
      },
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.diagnosisText.trim()) {
      return;
    }

    try {
      await createDiagnosis({
        variables: {
          input: {
            patientID: patientId,
            ...formData,
          },
        },
      });
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Beautiful backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

      {/* Modal container */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Inner shadow for depth */}
        <div className="absolute inset-0 rounded-2xl shadow-inner pointer-events-none"></div>
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 px-6 py-5 rounded-t-2xl">
          {/* Header pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-t-2xl"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white drop-shadow-sm">
                  Add New Diagnosis
                </h2>
                <p className="text-white/80 text-sm font-medium">
                  Create a comprehensive medical diagnosis
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-lg"
              disabled={loading}
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="relative bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-sm overflow-y-auto max-h-[calc(90vh-100px)]">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Error Display */}
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border-2 border-red-200/60 rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                  </div>
                  <p className="text-red-800 font-medium">
                    Error: {error.message}
                  </p>
                </div>
              </div>
            )}

            {/* Diagnosis Text */}
            <div className="space-y-3">
              <label className="block text-base font-semibold text-gray-900">
                <Stethoscope className="w-5 h-5 inline mr-2 text-green-600" />
                Diagnosis *
              </label>
              <textarea
                value={formData.diagnosisText}
                onChange={(e) => updateField("diagnosisText", e.target.value)}
                className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:bg-white/90 resize-none text-gray-900 text-base shadow-lg transition-all duration-200 placeholder:text-gray-500"
                rows={3}
                placeholder="Enter the diagnosis..."
                required
              />
            </div>

            {/* Notes */}
            <div className="space-y-3">
              <label className="block text-base font-semibold text-gray-900">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                className="w-full px-5 py-4 bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:bg-white/90 resize-none text-gray-900 text-base shadow-lg transition-all duration-200 placeholder:text-gray-500"
                rows={4}
                placeholder="Add any additional notes or observations..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 mt-8 border-t border-white/30">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 text-gray-700 bg-white/60 backdrop-blur-sm hover:bg-white/80 rounded-xl border-2 border-white/50 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.diagnosisText.trim()}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105 font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Create Diagnosis</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
