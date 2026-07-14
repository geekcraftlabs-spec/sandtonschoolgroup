import Link from "next/link";

const newsItems = [
  {
    title: "Sandton Primary Wins Inter-Schools Debate Championship",
    slug: "sandton-primary-wins-debate",
    date: "July 10, 2026",
    excerpt:
      "Our Grade 7 team took first place in the annual inter-schools debate competition, showcasing exceptional critical thinking and public speaking skills.",
  },
  {
    title: "New Boarding House Opens at Sandton College",
    slug: "new-boarding-house-opens",
    date: "July 1, 2026",
    excerpt:
      "Sandton College has opened a new state-of-the-art boarding house, offering modern facilities, 24/7 care, and a nurturing home-away-from-home for students.",
  },
  {
    title: "Sandton College IEB Results 2025 – 95% Pass Rate",
    slug: "ieb-results-2025",
    date: "January 15, 2026",
    excerpt:
      "Sandton College achieved a 95% pass rate in the 2025 IEB examinations, with 42 distinctions across the cohort. We are immensely proud of our students.",
  },
];

export default function NewsPage() {
  return (
    <div className="pt-20" suppressHydrationWarning>
      <section className="bg-[#003057] text-white py-16 text-center">
        <h1 className="font-serif text-4xl font-bold">News &amp; Events</h1>
        <p className="text-white/80 text-lg mt-2">Stay updated with the latest happenings at Sandton School Group.</p>
      </section>
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="space-y-8">
          {newsItems.map((item) => (
            <div key={item.slug} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition">
              <h2 className="font-serif text-2xl font-bold text-[#003057]">{item.title}</h2>
              <p className="text-sm text-gray-400 mt-1">{item.date}</p>
              <p className="text-gray-600 mt-3">{item.excerpt}</p>
              <Link href={`/news/${item.slug}`} className="text-[#C41230] font-semibold hover:underline inline-block mt-3">
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}