"use client";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="pt-20" suppressHydrationWarning>
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/home.png"
            alt="Contact"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#003057]/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-16 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Contact Us</h1>
          <p className="text-white/70 text-lg mt-2 max-w-2xl mx-auto">
            We&apos;d love to hear from you
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#003057] mb-6">Get in Touch</h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start gap-4">
                <Image
                  src="/images/map.png"
                  alt="Location"
                  width={24}
                  height={24}
                  className="object-contain shrink-0 mt-1"
                />
                <span className="text-gray-700">123 Sandton Drive, Sandton, Johannesburg, 2196</span>
              </div>
              <div className="flex items-start gap-4">
                <Image
                  src="/images/phone.png"
                  alt="Phone"
                  width={24}
                  height={24}
                  className="object-contain shrink-0 mt-1"
                />
                <div>
                  <a href="tel:+27111234567" className="text-gray-700 hover:text-[#003057] transition">
                    +27 11 123 4567
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Image
                  src="/images/email.png"
                  alt="Email"
                  width={24}
                  height={24}
                  className="object-contain shrink-0 mt-1"
                />
                <div>
                  <a href="mailto:info@sandtonschoolgroup.co.za" className="text-gray-700 hover:text-[#003057] transition">
                    info@sandtonschoolgroup.co.za
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Image
                  src="/images/clock.png"
                  alt="Hours"
                  width={24}
                  height={24}
                  className="object-contain shrink-0 mt-1"
                />
                <div>
                  <p className="text-gray-700">Mon–Fri: 07:30 – 16:00</p>
                  <p className="text-gray-500 text-sm">Sat: 08:00 – 12:00 (by appointment)</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-[#003057] mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/sandtonschoolgroup"
                  target="_blank"
                  rel="noopener"
                  className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#C41230] hover:scale-110 transition"
                  aria-label="Instagram"
                >
                  <Image
                    src="/images/instagram.png"
                    alt="Instagram"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </a>
                <a
                  href="https://www.facebook.com/sandtonschoolgroup"
                  target="_blank"
                  rel="noopener"
                  className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#C41230] hover:scale-110 transition"
                  aria-label="Facebook"
                >
                  <Image
                    src="/images/facebook.png"
                    alt="Facebook"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </a>
                <a
                  href="https://www.youtube.com/@sandtonschoolgroup"
                  target="_blank"
                  rel="noopener"
                  className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#C41230] hover:scale-110 transition"
                  aria-label="YouTube"
                >
                  <Image
                    src="/images/youtube.png"
                    alt="YouTube"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </a>
                <a
                  href="https://wa.me/27684858415"
                  target="_blank"
                  rel="noopener"
                  className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#C41230] hover:scale-110 transition"
                  aria-label="WhatsApp"
                >
                  <Image
                    src="/images/whatsapp.png"
                    alt="WhatsApp"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.0!2d28.123456!3d-26.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDA3JzI0LjQiUyAyOMKwMDcnMjYuMCJF!5e0!3m2!1sen!2sza!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="rounded-2xl"
              title="Sandton School Group Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}