"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PatientList from "../components/patients/PatientList";
import RegisterPatientForm from "../components/patients/RegisterPatientForm";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showForm, setShowForm] = useState(false);

  // Handle URL parameters for navigation
  useEffect(() => {
    const action = searchParams.get("action");

    if (action === "add") {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [searchParams]);

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
            <RegisterPatientForm
              onSuccess={() => {
                router.push("/");
              }}
              onCancel={handleCancel}
            />
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
