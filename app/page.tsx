import Link from "next/link";
import Image from "next/image";
import ImageCarousel from "./components/ImageCarousel";

export default function HomePage() {
  // Carousel image groups


  const valuesImages = [
    "/images/homebottom1.jpeg",
    "/images/couragebottom.png",
    "/images/trustbottom.png",
    "/images/perseverancebottom.png",
    "/images/humilitybottom.png",
  ];

  return (
    <div className="pt-20" suppressHydrationWarning>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/home.png"
            alt="Sandton School Group Campus"
            fill
            className="object-cover"
            priority
            loading="eager"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#003057]/85 via-[#003057]/60 to-[#003057]/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block bg-[#C41230] text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                Est. 2002
              </span>
              <span className="inline-block bg-[#F5A623]/20 text-[#F5A623] text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm">
                IEB Curriculum
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
              Excellence in
              <br />
              <span className="text-[#F5A623]">Education</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
              Sandton School Group is a family of independent schools offering IEB education from primary to college level. We nurture academic excellence, character, and a lifelong love of learning.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="bg-[#C41230] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#a00f27] transition shadow-xl text-base">
                Apply Now
              </Link>
              <Link href="/contact" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition text-base">
                Book a Tour
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-white/60">
              <span className="flex items-center gap-2">✅ IEB Curriculum</span>
              <span className="w-px h-4 bg-white/20"></span>
              <span className="flex items-center gap-2">🏫 Small Class Sizes</span>
              <span className="w-px h-4 bg-white/20"></span>
              <span className="flex items-center gap-2">🏡 Boarding Available</span>
            </div>
          </div>
        </div>

        {/* Floating Trust Badge */}
        <div className="absolute bottom-8 right-8 z-10 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
            <p className="text-3xl font-bold text-[#F5A623]">95%</p>
            <p className="text-white/70 text-sm">IEB Pass Rate</p>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-[#003057] py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#F5A623]">20+</p>
              <p className="text-sm text-white/70">Years of Excellence</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#F5A623]">800+</p>
              <p className="text-sm text-white/70">Students Enrolled</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#F5A623]">10:1</p>
              <p className="text-sm text-white/70">Student-to-Teacher Ratio</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-[#F5A623]">95%</p>
              <p className="text-sm text-white/70">IEB Pass Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SCHOOL SHOWCASE ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <span className="text-[#C41230] font-semibold text-sm tracking-widest uppercase">Our Schools</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#003057] mt-2">
              A Family of Schools
            </h2>
            <div className="w-16 h-0.5 bg-[#C41230] mx-auto mt-4 rounded-full" />
            <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-lg">
              Each of our schools offers a unique learning environment, united by a shared commitment to excellence and community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Primary School */}
            <Link href="/our-schools/primary" className="group">
              <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition">
                <div className="relative w-full aspect-4/3">
                  <Image
                    src="/images/primary.png"
                    alt="Primary School Students"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 bg-[#003057]/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Grades 1–7
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-[#003057] group-hover:text-[#C41230] transition">Sandton Primary School</h3>
                  <p className="text-gray-600 mt-2 text-sm">IEB Curriculum • Small class sizes • Nurturing environment</p>
                  <span className="inline-block mt-3 text-[#C41230] font-semibold group-hover:underline">Learn More →</span>
                </div>
              </div>
            </Link>

            {/* College */}
            <Link href="/our-schools/college" className="group">
              <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition">
                <div className="relative w-full aspect-4/3">
                  <Image
                    src="/images/secondary1.png"
                    alt="College Students"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 bg-[#003057]/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Grades 8–12
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-[#003057] group-hover:text-[#C41230] transition">Sandton College</h3>
                  <p className="text-gray-600 mt-2 text-sm">IEB Curriculum • University preparation • Leadership development</p>
                  <span className="inline-block mt-3 text-[#C41230] font-semibold group-hover:underline">Learn More →</span>
                </div>
              </div>
            </Link>

            {/* Boarding */}
            <Link href="/boarding" className="group">
              <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition">
                <div className="relative w-full aspect-4/3">
                  <Image
                    src="/images/boarding1.png"
                    alt="Boarding Facilities"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4 bg-[#003057]/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    On-Campus
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-[#003057] group-hover:text-[#C41230] transition">Boarding Facilities</h3>
                  <p className="text-gray-600 mt-2 text-sm">Modern boarding • Home away from home • 24/7 care</p>
                  <span className="inline-block mt-3 text-[#C41230] font-semibold group-hover:underline">Learn More →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY ENROL ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#C41230] font-semibold text-sm tracking-widest uppercase">Why Choose Sandton?</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#003057] mt-2 mb-6">
                An Education That Prepares for Life
              </h2>
              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-[#C41230] text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-[#003057]">IEB Curriculum</h4>
                    <p className="text-sm">Internationally recognised qualification with university entrance.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C41230] text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-[#003057]">Small Class Sizes</h4>
                    <p className="text-sm">Individual attention with a 10:1 student-to-teacher ratio.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C41230] text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-[#003057]">Character Development</h4>
                    <p className="text-sm">Leadership, integrity, and resilience built into every day.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#C41230] text-xl">✓</span>
                  <div>
                    <h4 className="font-semibold text-[#003057]">Modern Boarding</h4>
                    <p className="text-sm">Safe, nurturing home-away-from-home for students from afar.</p>
                  </div>
                </li>
              </ul>
              <Link href="/apply" className="inline-block mt-6 bg-[#003057] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#002244] transition">
                Enrol Today
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl relative">
                <Image
                  src="/images/why-enrol-with-sandton-school-group-3.png"
                  alt="Sandton Students"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <span className="text-[#C41230] font-semibold text-sm tracking-widest uppercase">Testimonials</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#003057] mt-2">
              What Our Parents Say
            </h2>
            <div className="w-16 h-0.5 bg-[#C41230] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
              <p className="text-gray-600 italic">
                “Sandton Primary has been a wonderful home for our children. The teachers are dedicated, the community is warm, and the academic standards are exceptional.”
              </p>
              <p className="mt-4 font-semibold text-[#003057]">— Mrs. T. Mokoena</p>
              <p className="text-xs text-gray-400">Parent of two children</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
              <p className="text-gray-600 italic">
                “The college prepared our son exceptionally well for university. The IEB results speak for themselves, but the character development was equally impressive.”
              </p>
              <p className="mt-4 font-semibold text-[#003057]">— Mr. D. Naidoo</p>
              <p className="text-xs text-gray-400">Parent of a graduate</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-lg transition">
              <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
              <p className="text-gray-600 italic">
                “Boarding at Sandton College gave our daughter independence and a sense of belonging. The staff treat the students like family.”
              </p>
              <p className="mt-4 font-semibold text-[#003057]">— Mr. &amp; Mrs. van der Merwe</p>
              <p className="text-xs text-gray-400">Boarding parents</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES CAROUSEL ===== */}
      <section className="py-20 bg-[#003057]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Our Core Values
          </h2>
          <div className="rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
            <ImageCarousel
              images={valuesImages}
              interval={5}
              height="h-[40vh] md:h-[50vh]"
              sizes="(max-width: 768px) 100vw, 50vw"
              showOverlay={false}
            />
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="bg-[#003057] rounded-3xl p-12 md:p-16 text-center text-white">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
              Ready to Join the Sandton Family?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mt-4 mb-8 text-lg">
              Enrol your child in a school where they will thrive academically, socially, and personally. Contact us to book a tour or apply online.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/apply"
                className="bg-[#C41230] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#a00f27] transition shadow-xl"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white/10 transition"
              >
                Book a Tour
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}