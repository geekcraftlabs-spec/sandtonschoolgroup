import Link from "next/link";

const categories = [
  { name: "Boys' Uniforms", href: "/shop/boys-uniforms", icon: "👔" },
  { name: "Girls' Uniforms", href: "/shop/girls-uniforms", icon: "👗" },
  { name: "Sportswear", href: "/shop/sportswear", icon: "⚽" },
  { name: "Swimwear", href: "/shop/swimwear", icon: "🏊" },
  { name: "Bags", href: "/shop/bags", icon: "🎒" },
];

export default function UniformPage() {
  return (
    <div className="pt-20" suppressHydrationWarning>
      <section className="bg-[#003057] text-white py-16 text-center">
        <h1 className="font-serif text-4xl font-bold">Uniform Shop</h1>
        <p className="text-white/80 text-lg mt-2">Quality schoolwear designed for comfort and durability.</p>
      </section>
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.href} href={cat.href}>
              <div className="bg-white rounded-2xl p-8 text-center shadow-md border border-gray-100 hover:shadow-xl transition hover:-translate-y-1">
                <div className="text-5xl mb-4">{cat.icon}</div>
                <h3 className="font-semibold text-lg text-[#003057]">{cat.name}</h3>
                <span className="text-[#C41230] text-sm font-medium">Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}