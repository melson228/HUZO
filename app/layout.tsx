import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import CustomScrollbar from "@/components/custom-scrollbar";
import { CartProvider } from "@/context/cart-context";
import FloatingCart from "@/components/ui/floating-cart";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500"],
  subsets: ["cyrillic", "latin"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "HUZO",
  description: "Уходовая косметика для волос",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${cormorant.variable} antialiased font-sans`}>
        <CustomScrollbar>
          <CartProvider>
            <div className="min-w-[320px]">{children}</div>
            <Analytics />
            <FloatingCart />
          </CartProvider>
        </CustomScrollbar>
      </body>
    </html>
  );
}
