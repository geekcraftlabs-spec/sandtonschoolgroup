import Link from "next/link";
import Image from "next/image";
import ImageCarousel from "@/app/components/ImageCarousel";

export default function BoardingPage() {
  const carouselImages = [
    "/images/secondary1.png",
    "/images/secondary2.png",
    "/images/secondary3.png",
    "/images/secondary4.png",
  ];

  return (
    <div className="pt-20" suppressHydrationWarning>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/boarding1.png"
            alt="Boarding Facilities"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            loading="eager"
          />
          <div className="absolute inset-0 bg-[#003057]/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Boarding Facilities</h1>
          <p className="text-white/80 text-xl mt-4 max-w-3xl mx-auto">
            A home away from home – modern boarding with 24/7 care and support.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#003057] mb-4">Live, Learn, Thrive</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Our boarding facilities provide a safe, nurturing environment where students from outside Johannesburg can focus on their studies while building lifelong friendships.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-[#C41230] text-xl">✓</span>
                <span>Modern, secure dormitories with shared common areas</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C41230] text-xl">✓</span>
                <span>Nutritious meals prepared daily on-site</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C41230] text-xl">✓</span>
                <span>Evening study supervision by qualified staff</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C41230] text-xl">✓</span>
                <span>Weekend activities and excursions</span>
              </li>
            </ul>
            <Link href="/apply" className="inline-block mt-6 bg-[#C41230] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#a00f27] transition shadow-lg">
              Apply for Boarding
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
              <ImageCarousel
                images={carouselImages}
                interval={5}
                height="h-full aspect-4/3"
                sizes="(max-width: 768px) 100vw, 40vw"
                showOverlay={false}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}