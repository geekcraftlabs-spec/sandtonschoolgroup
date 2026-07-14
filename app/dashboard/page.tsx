"use client";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="pt-20 min-h-[70vh] px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-3xl font-bold text-[#003057] mb-2">
            Welcome, {user?.studentName || "Student"}!
          </h1>
          <p className="text-gray-500 mb-8">Access your portal resources below:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/platform"
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-100"
            >
              <div className="text-4xl mb-3">🏫</div>
              <h3 className="font-bold text-[#003057]">School Platform</h3>
              <p className="text-sm text-gray-500">Grades, reports, learning materials</p>
            </Link>

            <Link
              href="/quiz"
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-100"
            >
              <div className="text-4xl mb-3">📝</div>
              <h3 className="font-bold text-[#003057]">Quiz App</h3>
              <p className="text-sm text-gray-500">Interactive learning & assessments</p>
            </Link>

            <Link
              href="/tuckshop"
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-100"
            >
              <div className="text-4xl mb-3">🍔</div>
              <h3 className="font-bold text-[#003057]">Tuckshop</h3>
              <p className="text-sm text-gray-500">Online ordering for students</p>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}