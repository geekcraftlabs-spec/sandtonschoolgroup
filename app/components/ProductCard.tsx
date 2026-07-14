"use client";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [, setShowSizeModal] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.sizes.length > 1 && !selectedSize) {
      setShowSizeModal(true);
      return;
    }
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize: selectedSize || "One Size",
      category: product.category,
    });
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group border border-gray-100">
      <div className="relative aspect-square bg-gray-100 flex items-center justify-center p-4">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="object-contain group-hover:scale-105 transition duration-500"
          sizes="(max-width: 768px) 50vw, 33vw"
          quality={85}
        />
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-[#003057] text-lg line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2 h-10">{product.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[#C41230] font-bold text-xl">R{product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-[#003057] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#002244] transition"
          >
            Add to Cart
          </button>
        </div>
        {product.sizes.length > 1 && (
          <div className="mt-2">
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  Size: {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}