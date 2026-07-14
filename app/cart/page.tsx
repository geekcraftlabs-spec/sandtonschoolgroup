"use client";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");

  const handleCheckout = async () => {
    if (!customerEmail || !customerName) {
      alert("Please enter your name and email");
      return;
    }

    setIsCheckingOut(true);

    const orderData = {
      customerName,
      customerEmail,
      items: items.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.selectedSize,
      })),
      total: getTotal(),
    };

    try {
      const response = await fetch("/api/create-uniform-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("pendingUniformOrder", JSON.stringify(result.pendingOrder));
        window.location.href = result.actionUrl;
      } else {
        alert("Payment failed: " + result.error);
        setIsCheckingOut(false);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("Failed to process payment. Please try again.");
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="font-serif text-3xl font-bold text-[#003057] mb-4">Your Cart is Empty</h1>
          <p className="text-gray-500 mb-6">Browse our uniform shop to add items.</p>
          <Link href="/uniform" className="bg-[#003057] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#002244] transition">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-[60vh] px-6 md:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl font-bold text-[#003057] mb-6">Shopping Cart</h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                <Image src={item.image} alt={item.name} width={60} height={60} className="object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#003057]">{item.name}</h3>
                <p className="text-sm text-gray-500">Size: {item.selectedSize}</p>
                <p className="text-[#C41230] font-bold">R{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between text-lg mb-2">
            <span>Subtotal:</span>
            <span className="font-bold">R{getTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>Delivery Fee:</span>
            <span>R0.00 (Collect in-store)</span>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-[#C41230]">R{getTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Your Name *"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
            />
            <input
              type="email"
              placeholder="Your Email *"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#003057] focus:border-transparent outline-none"
            />
            <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-xl">
              ℹ️ You&apos;ll receive an email confirmation when your order is ready for collection.
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="flex-1 bg-[#003057] text-white py-3 rounded-xl font-semibold hover:bg-[#002244] transition disabled:opacity-50"
            >
              {isCheckingOut ? "Processing..." : "Proceed to PayFast"}
            </button>
            <button
              onClick={clearCart}
              className="px-6 py-3 border border-red-300 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <Link href="/uniform" className="inline-block mt-4 text-[#003057] hover:underline">
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}