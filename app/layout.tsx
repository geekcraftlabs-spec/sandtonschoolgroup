import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { PlatformProvider } from "./context/PlatformContext";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Sandton School Group – Excellence in Education",
  description:
    "A family of independent schools in Johannesburg offering IEB education from primary to college level, with boarding facilities and a strong community ethos.",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23003057'/><text x='50' y='72' font-family='Georgia,serif' font-size='55' font-weight='700' text-anchor='middle' fill='white'>SS</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} bg-[#F8F9FA] text-[#1A2A3A] antialiased font-sans`}
        suppressHydrationWarning
      >
        <PlatformProvider>
          <CartProvider>
            <AuthProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </AuthProvider>
          </CartProvider>
        </PlatformProvider>
      </body>
    </html>
  );
}