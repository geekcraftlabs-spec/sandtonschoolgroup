"use client";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();

  const [token] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken") || "";
    }
    return "";
  });

  return (
    <ProtectedRoute>
      <div className="pt-24 min-h-[70vh] px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-3xl font-bold text-[#003057] mb-2">
            Welcome, {user?.studentName || "Student"}!
          </h1>
          <p className="text-gray-500 mb-8">Your portal resources are unlocked:</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/platform"
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-100 group"
            >
              <div className="flex items-center justify-between">
                <div className="text-4xl mb-3">🏫</div>
                <span className="text-sm text-green-600">🔓 Unlocked</span>
              </div>
              <h3 className="font-bold text-[#003057]">School Platform</h3>
              <p className="text-sm text-gray-500">Grades, reports, learning materials</p>
            </Link>

            {/* ✅ Quiz App – external link with token */}
            <a
              href={token ? `https://ssgstudyplatform.vercel.app/?token=${token}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-100 group"
            >
              <div className="flex items-center justify-between">
                <div className="text-4xl mb-3">📝</div>
                <span className="text-sm text-green-600">🔓 Unlocked</span>
              </div>
              <h3 className="font-bold text-[#003057]">Quiz App</h3>
              <p className="text-sm text-gray-500">Interactive learning & assessments</p>
            </a>

            <a
              href={token ? `https://tuckshopsystem.vercel.app/?token=${token}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-gray-100 group"
            >
              <div className="flex items-center justify-between">
                <div className="text-4xl mb-3">🍔</div>
                <span className="text-sm text-green-600">🔓 Unlocked</span>
              </div>
              <h3 className="font-bold text-[#003057]">Tuckshop</h3>
              <p className="text-sm text-gray-500">Online ordering for students</p>
            </a>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            All portals are unlocked. You can access them anytime.
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}