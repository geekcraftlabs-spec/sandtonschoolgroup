"use client";
import { useState } from "react";
import Image from "next/image";

export default function ApplyPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In production, this would send an email with the PDF attachment
    console.log("Sending PDF to:", email);
    console.log("Application details:", { name, email, phone, grade, message });

    // WhatsApp fallback
    const waNumber = "27684858415";
    const text = `New Application Request%0aName: ${name}%0aEmail: ${email}%0aPhone: ${phone}%0aGrade: ${grade}%0aMessage: ${message}`;
    window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");

    setIsSubmitting(false);
  };

  return (
    <div className="pt-20" suppressHydrationWarning>
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/home.png"
            alt="Apply"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#003057]/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-16 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Enrol at Sandton</h1>
          <p className="text-white/70 text-lg mt-2 max-w-2xl mx-auto">
            Join our family of excellence
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 md:px-8 py-12">
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
          <h2 className="font-serif text-2xl font-bold text-[#003057] mb-4 text-center">Enrolment Form</h2>
          <p className="text-gray-500 text-center text-sm mb-4">
            Fill in your details and we&apos;ll email you the application form (PDF) along with further information.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-sm text-blue-700">
            <p className="flex items-start gap-2">
              <span className="font-bold text-blue-600">📄</span>
              <span>
                <strong>PDF Application Form</strong> – We&apos;ll send the official Sandton School Group application form to your email address. 
                You can fill it out digitally and return it to us.
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" suppressHydrationWarning>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
                >
                  <option value="">Select Grade</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
                    <option key={g} value={g}>Grade {g}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
                placeholder="Any special requirements or questions..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#003057] text-white py-3.5 rounded-xl font-semibold hover:bg-[#002244] transition shadow-lg text-base disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Submit Enrolment Request"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-4">
            By submitting, you agree to our privacy policy. We&apos;ll send the PDF application form to your email.
          </p>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 mb-2">Prefer to fill out the form immediately?</p>
            <a
              href="/SSG-Application-Form-2026-2027.pdf"
              download
              className="inline-block text-[#003057] text-sm font-semibold hover:underline"
            >
              📄 Download PDF Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}