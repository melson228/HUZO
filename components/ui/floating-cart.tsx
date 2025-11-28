"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

export default function FloatingCart() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  if (totalItems === 0) return null;

  return (
    <Link href="/cart" className="fixed bottom-6 right-6 z-40 group">
      <div className="relative">
        <div className="w-16 h-16 bg-huzo-green rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:scale-110 group-hover:bg-huzo-green/90">
          <ShoppingCart className="w-7 h-7 text-huzo-cream" />
        </div>

        <div className="absolute -top-2 -right-2 bg-huzo-mint text-huzo-green text-sm font-medium rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-white">
          {totalItems > 99 ? "99+" : totalItems}
        </div>

        <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div className="bg-huzo-green text-huzo-cream px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg">
            Перейти в корзину
            <div className="absolute left-full top-1/2 transform -translate-y-1/2">
              <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-huzo-green"></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
