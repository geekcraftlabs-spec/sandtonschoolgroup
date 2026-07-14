import Link from "next/link";
import ImageCarousel from "@/app/components/ImageCarousel";

export default function CollegePage() {
  const images = [
    "/images/secondary1.png",
    "/images/secondary2.png",
    "/images/secondary3.png",
    "/images/secondary4.png",
  ];

  return (
    <div className="pt-20" suppressHydrationWarning>
      <section className="relative overflow-hidden">
        <ImageCarousel images={images} interval={5} height="min-h-[50vh]" />
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center text-white">
            <h1 className="font-serif text-4xl md:text-5xl font-bold drop-shadow-lg">
              Sandton College
            </h1>
            <p className="text-white/90 text-xl mt-4 max-w-3xl mx-auto drop-shadow-md">
              Preparing students for university and beyond through academic rigour and character development.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#003057] mb-4">Excellence in Senior Education</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Sandton College offers a stimulating and supportive environment for students in Grades 8–12. We pride ourselves on our IEB results and our commitment to developing well-rounded individuals.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-[#C41230] text-xl">✓</span>
                <span>IEB curriculum with a wide range of subject choices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C41230] text-xl">✓</span>
                <span>95% IEB pass rate with multiple distinctions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C41230] text-xl">✓</span>
                <span>Leadership and community service programmes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C41230] text-xl">✓</span>
                <span>Boarding facilities for students from outside Johannesburg</span>
              </li>
            </ul>
            <Link href="/apply" className="inline-block mt-6 bg-[#C41230] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#a00f27] transition shadow-lg">
              Apply for College
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
              <ImageCarousel images={images} interval={6} height="h-full aspect-4/3" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}