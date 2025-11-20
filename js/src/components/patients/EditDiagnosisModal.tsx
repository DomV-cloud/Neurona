"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  UPDATE_PATIENT_DIAGNOSIS,
  GET_PATIENT,
} from "../../lib/graphql/queries";
import {
  UpdatePatientDiagnoseRequestInput,
  UpdatePatientDiagnosisResult,
  Diagnosis,
} from "../../types/patient";
import { X, Save, Loader2, Edit3 } from "lucide-react";

interface EditDiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  diagnosis: Diagnosis;
}

export default function EditDiagnosisModal({
  isOpen,
  onClose,
  patientId,
  diagnosis,
}: EditDiagnosisModalProps) {
  const [diagnosisText, setDiagnosisText] = useState(diagnosis.diagnosisText);
  const [notes, setNotes] = useState(diagnosis.notes || "");

  const [updateDiagnosis, { loading }] =
    useMutation<UpdatePatientDiagnosisResult>(UPDATE_PATIENT_DIAGNOSIS, {
      refetchQueries: [
        {
          query: GET_PATIENT,
          variables: { patientId },
        },
      ],
      onCompleted: () => {
        onClose();
      },
      onError: (error) => {
        console.error("Error updating diagnosis:", error);
        alert("Failed to update diagnosis. Please try again.");
      },
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!diagnosisText.trim()) {
      alert("Diagnosis text is required");
      return;
    }

    const input: UpdatePatientDiagnoseRequestInput = {
      patientID: patientId,
      diagnoseID: diagnosis.id,
      diagnosisText: diagnosisText.trim(),
      notes: notes.trim(),
    };

    try {
      await updateDiagnosis({ variables: { input } });
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/20 transform transition-all duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-100 bg-blue-50 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Edit3 className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Diagnosis
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={loading}
            className="p-2 hover:bg-white/70 rounded-full transition-all duration-200 disabled:opacity-50 hover:shadow-sm"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 bg-gray-50/30">
          <div className="space-y-6">
            {/* Diagnosis ID (Read-only) */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Diagnosis ID
              </label>
              <input
                type="text"
                value={diagnosis.id}
                disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed font-mono text-sm"
              />
            </div>

            {/* Diagnosis Text */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Diagnosis Text *
              </label>
              <textarea
                value={diagnosisText}
                onChange={(e) => setDiagnosisText(e.target.value)}
                disabled={loading}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 transition-all duration-200"
                placeholder="Enter diagnosis text..."
                required
              />
            </div>

            {/* Notes */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                disabled={loading}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 transition-all duration-200"
                placeholder="Additional notes about the diagnosis..."
              />
            </div>

            {/* Created At (Read-only) */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Created At
              </label>
              <input
                type="text"
                value={new Date(diagnosis.createdAt).toLocaleString()}
                disabled
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-purple-50 text-gray-700 cursor-not-allowed font-medium"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 bg-white rounded-b-2xl -m-6 mt-8 p-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !diagnosisText.trim()}
              className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Diagnosis
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
