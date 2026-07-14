import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const newsArticles: Record<string, { title: string; date: string; image: string; content: string }> = {
  "sandton-primary-wins-debate": {
    title: "Sandton Primary Wins Inter-Schools Debate Championship",
    date: "July 10, 2026",
    image: "/images/home.png",
    content: `
      <p>Our Grade 7 team took first place in the annual inter-schools debate competition, showcasing exceptional critical thinking and public speaking skills.</p>
      <p>The competition, held at the Johannesburg Civic Centre, saw teams from 12 schools across Gauteng compete over two days. Our team, consisting of Thabo Mokoena, Sarah Naidoo, and Michael van der Merwe, presented compelling arguments on the topic "Technology: A Blessing or a Curse for Modern Education."</p>
      <p>The judges praised our students for their well-researched arguments, confident delivery, and ability to think on their feet during the rebuttal rounds.</p>
      <p>"We are incredibly proud of our debate team," said Mrs. Beana Sokolowski, Head of Academics. "This achievement reflects the strong critical thinking and communication skills we nurture at Sandton Primary."</p>
      <p>The team was coached by Mr. Rory Wellman, who has been running the debate programme for the past three years.</p>
    `,
  },
  "new-boarding-house-opens": {
    title: "New Boarding House Opens at Sandton College",
    date: "July 1, 2026",
    image: "/images/boarding1.png",
    content: `
      <p>Sandton College has opened a new state-of-the-art boarding house, offering modern facilities, 24/7 care, and a nurturing home-away-from-home for students.</p>
      <p>The new boarding house, named "Katz House" in honour of CEO Mrs. Nadya Katz, accommodates 60 students in modern, comfortable rooms. Facilities include a common room, study areas, a games room, and a dining hall.</p>
      <p>"We wanted to create a space where students feel safe, supported, and inspired," said Mrs. Irma Day, Head of Boarding Facilities. "This is not just a place to sleep – it's a community where lifelong friendships are formed."</p>
      <p>The boarding house features 24/7 security, qualified house parents, and evening study supervision. Weekend activities and excursions will also be organised for boarders.</p>
    `,
  },
  "ieb-results-2025": {
    title: "Sandton College IEB Results 2025 – 95% Pass Rate",
    date: "January 15, 2026",
    image: "/images/home.png",
    content: `
      <p>Sandton College achieved a 95% pass rate in the 2025 IEB examinations, with 42 distinctions across the cohort. We are immensely proud of our students and staff.</p>
      <p>Among the standout performers was Thandiwe Nkosi, who achieved 8 distinctions and was awarded the Dux Award. Other top achievers included James Wilson (7 distinctions) and Priya Reddy (7 distinctions).</p>
      <p>"These results are a testament to the hard work of our students and the dedication of our teaching staff," said Mr. Tieho Matsoso, Head Coach and Sports Administrator.</p>
      <p>Sandton College consistently ranks among the top IEB schools in Gauteng, with our results reflecting our commitment to academic excellence.</p>
    `,
  },
};

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsArticles[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="pt-20" suppressHydrationWarning>
      <article className="max-w-4xl mx-auto px-6 md:px-8 py-12">
        <Link href="/news" className="text-[#003057] hover:underline mb-6 inline-block">
          ← Back to News
        </Link>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          <div className="relative w-full aspect-16/9">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="p-8 md:p-12">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#003057] mb-3">
              {article.title}
            </h1>
            <p className="text-gray-400 text-sm mb-6">{article.date}</p>

            <div
              className="prose prose-lg prose-[#003057] max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm text-gray-400">Sandton School Group</span>
              <Link href="/news" className="text-[#003057] hover:underline text-sm">
                More News →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}