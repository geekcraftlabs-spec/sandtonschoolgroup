import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-20" suppressHydrationWarning>
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/home.png"
            alt="School building"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#003057]/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">About Us</h1>
          <p className="text-white/80 text-xl mt-4 max-w-3xl mx-auto">
            Discover the story, values, and vision behind the Sandton School Group.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#003057] mb-4">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Founded in 1968, Sandton School Group has grown from a single primary school into a family of independent schools that serve the Johannesburg community. We are proud of our heritage and committed to providing an education that prepares students for a changing world.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              We believe in small class sizes, personalized attention, and a curriculum that balances academic rigour with character development.
            </p>
            <div className="flex gap-4 mt-6">
              <div className="border-l-4 border-[#C41230] pl-4">
                <p className="font-bold text-2xl text-[#003057]">20+</p>
                <p className="text-sm text-gray-500">Years of Excellence</p>
              </div>
              <div className="border-l-4 border-[#C41230] pl-4">
                <p className="font-bold text-2xl text-[#003057]">800+</p>
                <p className="text-sm text-gray-500">Students</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/home.png"
                alt="School history"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 bg-gray-50 rounded-3xl p-12">
          <h2 className="font-serif text-3xl font-bold text-[#003057] text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="font-semibold text-xl text-[#003057]">Academic Excellence</h3>
              <p className="text-gray-500 mt-2">We challenge students to achieve their full potential through a rigorous IEB curriculum.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="font-semibold text-xl text-[#003057]">Community &amp; Family</h3>
              <p className="text-gray-500 mt-2">We create a warm, inclusive environment where every student and parent feels valued.</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="font-semibold text-xl text-[#003057]">Character Development</h3>
              <p className="text-gray-500 mt-2">We nurture integrity, resilience, and leadership in every student.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}