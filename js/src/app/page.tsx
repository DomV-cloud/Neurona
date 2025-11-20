"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@apollo/client/react";
import { CREATE_PATIENT, UPDATE_PATIENT } from "../lib/graphql/queries";
import {
  CreatePatientInput,
  UpdatePatientInput,
  CreatePatientType,
  UpdatePatientType,
} from "../types/patient";
import PatientList from "../components/patients/PatientList";
import PatientForm from "../components/patients/PatientForm";
import RegisterPatientForm from "../components/patients/RegisterPatientForm";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<"register" | "comprehensive">(
    "register"
  );

  // Handle URL parameters for navigation
  useEffect(() => {
    const action = searchParams.get("action");
    const type = searchParams.get("type") as "register" | "comprehensive";

    if (action === "add") {
      setShowForm(true);
      setFormType(type || "register");
    } else {
      setShowForm(false);
    }
  }, [searchParams]);

  const [createPatient, { loading: creating }] = useMutation<CreatePatientType>(
    CREATE_PATIENT,
    {
      refetchQueries: ["GetPatients"],
      onCompleted: () => {
        router.push("/");
      },
    }
  );
  const [updatePatient, { loading: updating }] = useMutation<UpdatePatientType>(
    UPDATE_PATIENT,
    {
      refetchQueries: ["GetPatients"],
      onCompleted: () => {
        router.push("/");
      },
    }
  );

  const handleCreate = async (input: CreatePatientInput) => {
    try {
      await createPatient({ variables: { input } });
    } catch (error) {
      console.error("Error creating patient:", error);
      alert("Failed to create patient");
    }
  };

  const handleUpdate = async (input: UpdatePatientInput) => {
    try {
      await updatePatient({ variables: { input } });
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient");
    }
  };

  const handleSubmit = async (
    data: CreatePatientInput | UpdatePatientInput
  ) => {
    try {
      if ("id" in data) {
        await handleUpdate(data);
      } else {
        await handleCreate(data);
      }
      // The redirect is handled by the onCompleted callbacks in the mutations
    } catch (error) {
      // Error handling is already done in individual handlers
      console.error("Submit error:", error);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Patient Data Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and view patient medical records
              </p>
            </div>
            {!showForm ? (
              <div className="flex space-x-3">
                <button
                  onClick={() => router.push("/?action=add&type=register")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm font-medium"
                >
                  Register Patient
                </button>
                <button
                  onClick={() => router.push("/?action=add&type=comprehensive")}
                  className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm font-medium"
                >
                  Comprehensive Form
                </button>
              </div>
            ) : (
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-sm font-medium"
              >
                Back to Patients
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm ? (
          <div>
            {formType === "register" ? (
              <RegisterPatientForm
                onSuccess={() => {
                  router.push("/");
                }}
                onCancel={handleCancel}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Comprehensive Patient Form
                </h2>
                <PatientForm
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  isLoading={creating || updating}
                />
              </div>
            )}
          </div>
        ) : (
          <PatientList />
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
