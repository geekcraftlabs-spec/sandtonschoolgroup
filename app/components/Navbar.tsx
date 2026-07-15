"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";

type NavLink = {
  href?: string;
  label: string;
  dropdown?: { href: string; label: string }[];
};

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const showCart = pathname?.startsWith("/shop") || false;

  // ✅ Lazy initializer – runs only once, no effect needed
  const [token] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken") || "";
    }
    return "";
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === label ? null : label);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const portalDropdown = isAuthenticated
    ? [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/platform", label: "School Platform" },
        {
          href: token ? `https://tuckshopsystem.vercel.app/?token=${token}` : "#",
          label: "Tuckshop",
        },
        { href: "#", label: "Quiz App (coming soon)" },
        { href: "#", label: "────────────" },
        { href: "/logout", label: "Logout" },
      ]
    : [
        { href: "/login", label: "Log In" },
        { href: "/subscribe", label: "Subscribe" },
      ];

  const navLinks: NavLink[] = [
    { label: "Portal", dropdown: portalDropdown },
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      label: "Schools",
      dropdown: [
        { href: "/our-schools/primary", label: "Primary School" },
        { href: "/our-schools/college", label: "College" },
        { href: "/boarding", label: "Boarding" },
      ],
    },
    {
      label: "Shop",
      dropdown: [
        { href: "/shop/boys-uniforms", label: "Boys' Uniforms" },
        { href: "/shop/girls-uniforms", label: "Girls' Uniforms" },
        { href: "/shop/sportswear", label: "Sportswear" },
        { href: "/shop/swimwear", label: "Swimwear" },
        { href: "/shop/bags", label: "Bags" },
      ],
    },
    { href: "/news", label: "News" },
    { href: "/apply", label: "Enrol" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200/50 py-1"
          : "bg-white/80 backdrop-blur-sm border-b border-gray-200/30 py-1"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/mainlogo.png"
              alt="Sandton School Group"
              width={40}
              height={40}
              className="object-contain"
              style={{ width: "auto", height: "40px" }}
              priority
            />
            <div className="flex flex-col leading-tight min-w-0">
              <span className="font-serif text-lg md:text-2xl lg:text-3xl font-bold text-[#003057] tracking-tight truncate">
                Sandton School Group
              </span>
              <span className="text-[8px] md:text-[10px] text-gray-500 font-medium tracking-[0.15em] uppercase whitespace-nowrap">
                Est. 2002 • Excellence in Education
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link, idx) => {
              if (link.dropdown) {
                const isActive = link.dropdown.some(
                  (item) => pathname === item.href || pathname?.startsWith(item.href)
                );
                return (
                  <div key={idx} className="relative group">
                    <button
                      className={`transition flex items-center gap-1 ${
                        isActive
                          ? "text-[#003057] border-b-2 border-[#C41230] pb-1"
                          : "text-gray-600 hover:text-[#003057] hover:border-b-2 hover:border-[#C41230] pb-1"
                      }`}
                    >
                      {link.label}
                      <span className="text-xs ml-1">▾</span>
                    </button>
                    <div className="absolute top-full left-0 mt-1 bg-white shadow-xl rounded-2xl border border-gray-100 py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      {link.dropdown.map((item, subIdx) => {
                        if (item.label === "Logout") {
                          return (
                            <button
                              key={subIdx}
                              onClick={handleLogout}
                              className="block w-full text-left px-6 py-2.5 text-sm hover:bg-gray-50 transition text-gray-600"
                            >
                              Logout
                            </button>
                          );
                        }
                        return (
                          <Link
                            key={subIdx}
                            href={item.href}
                            className={`block px-6 py-2.5 text-sm hover:bg-gray-50 transition ${
                              pathname === item.href
                                ? "text-[#C41230] font-semibold"
                                : "text-gray-600"
                            }`}
                          >
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={idx}
                  href={link.href || "#"}
                  className={`transition ${
                    pathname === link.href
                      ? "text-[#003057] border-b-2 border-[#C41230] pb-1"
                      : "text-gray-600 hover:text-[#003057] hover:border-b-2 hover:border-[#C41230] pb-1"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            {showCart && (
              <Link href="/cart" className="relative hover:text-[#C41230] transition">
                <span className="text-2xl">🛒</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C41230] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            )}
            <Link
              href="/apply"
              className="bg-[#C41230] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#a00f27] transition shadow-md shadow-[#C41230]/20 whitespace-nowrap"
            >
              Enrol Now
            </Link>
            <Link
              href="/contact"
              className="border border-[#003057] text-[#003057] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#003057] hover:text-white transition whitespace-nowrap"
            >
              Visit Us
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 cursor-pointer shrink-0 ml-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-5 h-0.5 bg-[#1A2A3A] transition-transform ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-[#1A2A3A] transition-opacity ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-[#1A2A3A] transition-transform ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-1">
            {navLinks.map((link, idx) => {
              if (link.dropdown) {
                const isOpenDropdown = mobileDropdownOpen === link.label;
                return (
                  <div key={idx} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => toggleMobileDropdown(link.label)}
                      className="w-full flex items-center justify-between py-3 px-2 font-semibold text-[#003057] text-left"
                    >
                      {link.label}
                      <span className={`transition-transform ${isOpenDropdown ? "rotate-180" : ""}`}>▾</span>
                    </button>
                    {isOpenDropdown && (
                      <div className="pl-4 pb-2 flex flex-col gap-1">
                        {link.dropdown.map((item, subIdx) => {
                          if (item.label === "Logout") {
                            return (
                              <button
                                key={subIdx}
                                onClick={() => {
                                  handleLogout();
                                  setIsOpen(false);
                                }}
                                className="py-2.5 px-4 rounded-lg transition w-full text-left hover:bg-gray-50 text-gray-700"
                              >
                                Logout
                              </button>
                            );
                          }
                          return (
                            <Link
                              key={subIdx}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={`py-2.5 px-4 rounded-lg transition ${
                                pathname === item.href
                                  ? "bg-[#003057] text-white"
                                  : "hover:bg-gray-50 text-gray-700"
                              }`}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={idx}
                  href={link.href || "#"}
                  onClick={() => setIsOpen(false)}
                  className={`py-3 px-2 rounded-lg transition ${
                    pathname === link.href
                      ? "bg-[#003057] text-white"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
              {showCart && (
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gray-100 text-[#003057] text-center py-3 rounded-full font-semibold"
                >
                  🛒 Cart {itemCount > 0 && (
                    <span className="bg-[#C41230] text-white text-xs rounded-full px-2 py-1">
                      {itemCount}
                    </span>
                  )}
                </Link>
              )}
              <Link
                href="/apply"
                onClick={() => setIsOpen(false)}
                className="bg-[#C41230] text-white text-center py-3 rounded-full font-semibold"
              >
                Enrol Now
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="border border-[#003057] text-[#003057] text-center py-3 rounded-full font-semibold"
              >
                Visit Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}