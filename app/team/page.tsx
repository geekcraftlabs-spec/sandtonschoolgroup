import Image from "next/image";

const teamMembers = [
  {
    name: "Mrs Nadya Katz",
    role: "CEO and Executive Head – Sandton School Group",
    image: "/images/nadya.png",
    quote:
      "Nadya Katz is a visionary entrepreneur with a deep-rooted passion for children and education. She opened her first school, Smiley Kids Verwoerd Park, in 1999.",
  },
  {
    name: "Mrs Beana Sokolowski",
    role: "Head of Academics – Sandton School Group",
    image: "/images/beana.png",
    quote:
      "Beana believes that education is an individual and unique experience for every learner who enters a classroom or learning environment.",
  },
  {
    name: "Miss Lerato Molopyane",
    role: "Bursary / Finance – Sandton School Group",
    image: "/images/lerato.png",
    quote:
      "Born and raised in Bethanie, North West. Lerato has always wanted to work with people due to her social and caring nature.",
  },
  {
    name: "Mrs Irma Day",
    role: "Head of Boarding Facilities",
    image: "/images/irma.png",
    quote: "“In a world where you can be anything, be kind.”",
  },
  {
    name: "Mrs Ilze Allen",
    role: "HOD – Foundation Phase (Prep School)",
    image: "/images/ilze.png",
    quote: "",
  },
  {
    name: "Miss Nicky Jacobs",
    role: "HOD – InterSen Phase (Prep School)",
    image: "/images/nicky.png",
    quote: "",
  },
  {
    name: "Mr Tieho Matsoso",
    role: "Head Coach and Sports Administrator – College",
    image: "/images/tieho.png",
    quote: "“Do what you love, and you’ll never work a day in your life.”",
  },
  {
    name: "Mr Rory Wellman",
    role: "Head Coach and Sports Administrator – Prep School",
    image: "/images/rory.png",
    quote: "“Hard work and dedication outweighs talent.”",
  },
];

export default function TeamPage() {
  return (
    <div className="pt-20" suppressHydrationWarning>
      <section className="bg-[#003057] text-white py-16 text-center">
        <h1 className="font-serif text-4xl font-bold">Our Team</h1>
        <p className="text-white/80 text-lg mt-2">
          Dedicated professionals committed to excellence in education.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition border border-gray-100"
            >
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-[#003057] text-xl">{member.name}</h3>
                <p className="text-[#C41230] text-sm font-semibold mt-1">{member.role}</p>
                {member.quote && (
                  <p className="text-gray-500 text-sm italic mt-3 border-l-2 border-[#C41230] pl-3">
                    {member.quote}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}