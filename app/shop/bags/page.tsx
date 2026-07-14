import { bagProducts } from "@/app/lib/products";
import ProductCard from "@/app/components/ProductCard";

export default function BagsPage() {
  return (
    <div className="pt-20" suppressHydrationWarning>
      <section className="bg-[#003057] text-white py-16 text-center">
        <h1 className="font-serif text-4xl font-bold">Bags</h1>
        <p className="text-white/80 text-lg mt-2">Durable bags for school and sports.</p>
      </section>
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bagProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}