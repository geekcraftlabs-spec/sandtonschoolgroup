import { sportswearProducts } from "@/app/lib/products";
import ProductCard from "@/app/components/ProductCard";

export default function SportswearPage() {
  return (
    <div className="pt-20" suppressHydrationWarning>
      <section className="bg-[#003057] text-white py-16 text-center">
        <h1 className="font-serif text-4xl font-bold">Sportswear</h1>
        <p className="text-white/80 text-lg mt-2">High-performance gear for all sports.</p>
      </section>
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sportswearProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}