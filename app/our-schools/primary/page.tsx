import Link from "next/link";
import Image from "next/image";

export default function PrimarySchoolPage() {
  return (
    <div className="pt-20" suppressHydrationWarning>
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/primary.png"
            alt="Primary school students"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#003057]/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">Sandton Primary School</h1>
          <p className="text-white/80 text-xl mt-4 max-w-3xl mx-auto">
            Nurturing young minds in a warm, supportive environment.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#003057] mb-4">A Foundation for Life</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              At Sandton Primary, we believe that the early years are the most important. Our dedicated teachers provide a nurturing environment where each child feels seen, heard, and valued.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-[#C41230] text-xl">✓</span>
                <span>Grades 1–7 with small class sizes (max 20 students)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C41230] text-xl">✓</span>
                <span>IEB-aligned curriculum with a focus on literacy and numeracy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C41230] text-xl">✓</span>
                <span>Extensive sports, arts, and cultural programmes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#C41230] text-xl">✓</span>
                <span>Aftercare and holiday programmes available</span>
              </li>
            </ul>
            <Link href="/apply" className="inline-block mt-6 bg-[#C41230] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#a00f27] transition shadow-lg">
              Apply for Primary School
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl relative">
              <Image
                src="/images/primary.png"
                alt="Primary classroom"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}