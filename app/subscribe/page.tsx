"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import emailjs from "@emailjs/browser";

// Monthly subscription fee – R200
const MONTHLY_FEE = 200;

// Types
interface PendingSubscription {
  orderCode: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  studentName: string;
  studentEmail: string;
  studentGrade: string;
  schoolEmail: string;
  password: string;
  startDate: string;
  proRataAmount: number;
  monthlyFee: number;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  _id?: string;
}

// Helper to check URL params
function getUrlParams() {
  if (typeof window === "undefined") return { code: null, status: null };
  const params = new URLSearchParams(window.location.search);
  return {
    code: params.get("code"),
    status: params.get("status"),
  };
}

export default function SubscribePage() {
  const initialParams = useMemo(() => getUrlParams(), []);
  const isSuccess = initialParams.code && initialParams.status === "success";
  const isCancelled = initialParams.status === "cancel";

  const [parentName, setParentName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCode, setOrderCode] = useState(initialParams.code || "");
  const [subscriptionData, setSubscriptionData] = useState<PendingSubscription | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const processedRef = useRef(false);

  const today = useMemo(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }, []);

  const proRataAmount = useMemo(() => {
    const currentDate = new Date();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const remainingDays = daysInMonth - currentDate.getDate() + 1;
    const dailyRate = MONTHLY_FEE / daysInMonth;
    return Math.round(dailyRate * remainingDays * 100) / 100;
  }, []);

  // EmailJS sending function
  const sendConfirmationEmail = useCallback(async (data: PendingSubscription) => {
    setEmailSending(true);
    setEmailError(null);

    try {
      // Initialize EmailJS with your public key
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "6oVPuxhAzJ6yjPMBR");

      const templateParams = {
        customer_email: data.parentEmail,
        parent_name: data.parentName,
        parent_email: data.parentEmail,
        student_name: data.studentName,
        student_email: data.studentEmail,
        school_email: data.schoolEmail,
        password: data.password,
        order_code: data.orderCode || orderCode,
        grade: data.studentGrade,
        amount: `R${data.total?.toFixed(2) || data.proRataAmount?.toFixed(2)}`,
        login_url: `${window.location.origin}/login`,
        site_name: "Sandton School Group",
        subscription_date: new Date().toLocaleDateString(),
      };

      console.log("📧 Sending email to:", data.parentEmail);

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_n5az7zq",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_subscription",
        templateParams
      );

      console.log("✅ Email sent successfully:", response);
      setEmailSent(true);
    } catch (error: unknown) {
      console.error("❌ Failed to send email:", error);
      const errMsg = error && typeof error === 'object' && 'text' in error
        ? (error.text as string)
        : "Failed to send email";
      setEmailError(errMsg);
      // Still show success page even if email fails
      setEmailSent(true);
    } finally {
      setEmailSending(false);
    }
  }, [orderCode]);

  // Handle success – load data and send email
  useEffect(() => {
    if (isSuccess && !processedRef.current) {
      processedRef.current = true;
      const pending = localStorage.getItem("pendingSubscription");
      if (pending) {
        try {
          const data: PendingSubscription = JSON.parse(pending);
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setSubscriptionData(data);

          // Save credentials for login
          const credentials = {
            email: data.parentEmail,
            password: data.password,
            studentName: data.studentName,
            studentEmail: data.studentEmail,
            schoolEmail: data.schoolEmail,
          };
          localStorage.setItem("userCredentials", JSON.stringify(credentials));

          // Send email
          sendConfirmationEmail(data);
        } catch (e) {
          console.error("Failed to load subscription data:", e);
        }
      }
      localStorage.removeItem("pendingSubscription");
    }
  }, [isSuccess, sendConfirmationEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const schoolEmail = `${studentName.toLowerCase().replace(/\s/g, ".")}@ssg.net`;
    const password = Math.random().toString(36).slice(-8);

    const subscriptionData = {
      parent: { parentName, parentEmail, parentPhone },
      student: { studentName, studentEmail, studentGrade, schoolEmail, password },
      startDate: today,
      proRataAmount,
      monthlyFee: MONTHLY_FEE,
    };

    console.log("📦 Subscription Details:", subscriptionData);

    try {
      const response = await fetch("/api/payfast/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscriptionData),
      });

      const result = await response.json();

      if (result.success) {
        setOrderCode(result.orderCode);
        localStorage.setItem("pendingSubscription", JSON.stringify(result.pendingSubscription));

        const form = document.createElement("form");
        form.method = "POST";
        form.action = result.actionUrl;

        const pfData = result.pfData;
        for (const key in pfData) {
          if (pfData.hasOwnProperty(key)) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = pfData[key as keyof typeof pfData]?.toString() || "";
            form.appendChild(input);
          }
        }

        document.body.appendChild(form);
        form.submit();
      } else {
        alert(`Payment error: ${result.error || "Failed to create transaction"}`);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error("Subscription error:", err);
      alert("Failed to initiate payment. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Success UI
  if (isSuccess && subscriptionData) {
    return (
      <div className="pt-20 min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="font-serif text-3xl font-bold text-[#003057] mb-4">
            Subscription Successful!
          </h1>

          {emailSending && (
            <div className="text-gray-500 text-sm mb-4">
              <span className="animate-pulse">📧 Sending confirmation email to {subscriptionData.parentEmail}...</span>
            </div>
          )}

          {emailSent && !emailSending && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-xl text-sm mb-4">
              ✅ Confirmation email sent to <strong>{subscriptionData.parentEmail}</strong>
            </div>
          )}

          {emailError && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-3 rounded-xl text-sm mb-4">
              ⚠️ Email could not be sent. Please copy the credentials below.
            </div>
          )}

          <p className="text-gray-600 mb-6">
            Your school portal account has been created. Login credentials have been sent to your email.
          </p>

          <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-700 font-semibold">📲 Test Mode Note:</p>
              <p className="text-sm text-blue-600 mt-1">
                Your login credentials are displayed below and have been sent to <strong>{subscriptionData.parentEmail}</strong>.
                Please save them for future logins.
              </p>
            </div>
            <p className="text-sm text-gray-500">Student Login:</p>
            <p className="font-mono text-sm text-[#003057]">{subscriptionData.schoolEmail}</p>
            <p className="text-sm text-gray-500 mt-2">Student Password:</p>
            <p className="font-mono text-sm text-[#003057]">{subscriptionData.password}</p>
            <p className="text-sm text-gray-500 mt-2">Parent Login:</p>
            <p className="font-mono text-sm text-[#003057]">{subscriptionData.parentEmail}</p>
            <p className="text-sm text-gray-500 mt-2">Parent Password:</p>
            <p className="font-mono text-sm text-[#003057]">{subscriptionData.password}</p>
            <p className="text-sm text-gray-500 mt-2">Order Reference:</p>
            <p className="font-mono text-sm text-[#003057]">{orderCode || subscriptionData.orderCode}</p>
          </div>

          <div className="space-y-3">
            <Link
              href="/login"
              className="block bg-[#C41230] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#a00f27] transition shadow-lg"
            >
              🔐 Log In to Your Portal
            </Link>
            <Link
              href="/"
              className="block border border-[#003057] text-[#003057] px-8 py-3 rounded-full font-semibold hover:bg-[#003057] hover:text-white transition"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Cancelled UI
  if (isCancelled) {
    return (
      <div className="pt-20 min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">😕</div>
          <h1 className="font-serif text-3xl font-bold text-[#003057] mb-4">
            Payment Cancelled
          </h1>
          <p className="text-gray-600 mb-6">
            Your subscription payment was cancelled. You can try again whenever
            you&apos;re ready.
          </p>
          <div className="space-y-3">
            <Link
              href="/subscribe"
              className="block bg-[#003057] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#002244] transition"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="block border border-[#003057] text-[#003057] px-8 py-3 rounded-full font-semibold hover:bg-[#003057] hover:text-white transition"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Main form
  return (
    <div className="pt-20" suppressHydrationWarning>
      <section className="relative min-h-[30vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/home.png"
            alt="Subscribe"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#003057]/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-12 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">
            School Portal
          </h1>
          <p className="text-white/70 text-lg mt-2 max-w-2xl mx-auto">
            Access the Sandton School Group digital ecosystem – subscribe today
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
            <div className="text-4xl mb-3">🏫</div>
            <h3 className="font-bold text-[#003057]">School Platform</h3>
            <p className="text-sm text-gray-500 mt-1">
              Grades, reports, learning materials
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
            <div className="text-4xl mb-3">📝</div>
            <h3 className="font-bold text-[#003057]">Quiz App</h3>
            <p className="text-sm text-gray-500 mt-1">
              Interactive learning &amp; assessments
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 text-center">
            <div className="text-4xl mb-3">🍔</div>
            <h3 className="font-bold text-[#003057]">Tuckshop</h3>
            <p className="text-sm text-gray-500 mt-1">
              Online ordering for students
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
          <h2 className="font-serif text-2xl font-bold text-[#003057] mb-2 text-center">
            Subscribe Now
          </h2>
          <p className="text-gray-400 text-center text-sm mb-6">
            R{proRataAmount.toFixed(2)} for the remaining days of this month
            <br />
            <span className="text-xs text-gray-300">(R{MONTHLY_FEE} per month, pro-rata calculated from today)</span>
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-sm text-blue-700 text-center">
            🔒 Secure payment via PayFast
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
            {/* Parent Details */}
            <div className="border-b border-gray-200 pb-5">
              <h3 className="font-semibold text-[#003057] mb-4 flex items-center gap-2">
                <span className="text-[#C41230]">👤</span> Parent Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Student Details */}
            <div className="border-b border-gray-200 pb-5">
              <h3 className="font-semibold text-[#003057] mb-4 flex items-center gap-2">
                <span className="text-[#C41230]">🎓</span> Student Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (different from parent) *
                  </label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade *
                  </label>
                  <select
                    value={studentGrade}
                    onChange={(e) => setStudentGrade(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
                  >
                    <option value="">Select Grade</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                      <option key={g} value={g}>
                        Grade {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <div className="bg-blue-50 rounded-xl p-3 w-full border border-blue-200">
                    <p className="text-xs text-gray-600">
                      📅 <strong>Start Date:</strong> {today}
                      <br />
                      <span className="text-gray-400">(Subscription starts today)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-semibold text-[#003057] text-sm mb-2">
                Subscription Summary
              </h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Monthly Fee:</span>
                <span className="font-semibold">R{MONTHLY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Pro-rata (remaining days):</span>
                <span className="font-semibold text-[#C41230]">
                  R{proRataAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-2 pt-2 border-t border-blue-200 font-bold">
                <span>Total Due Now:</span>
                <span className="text-[#003057]">R{proRataAmount.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                * Recurring payment of R{MONTHLY_FEE.toFixed(2)} will be
                charged on the 1st of each month via PayFast.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#003057] text-white py-3.5 rounded-xl font-semibold hover:bg-[#002244] transition shadow-lg text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "Pay with PayFast"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            By subscribing, you agree to our terms and conditions.
          </p>
        </div>
      </section>
    </div>
  );
}