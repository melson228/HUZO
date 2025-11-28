"use client";

import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Product } from "@/lib/products-data";

interface CartCounterProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  variant?: "icon" | "text" | "both";
}

export default function CartCounter({
  product,
  size = "md",
  variant = "icon",
}: CartCounterProps) {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity === 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const sizeClasses = {
    sm: {
      button: "px-2 py-1 text-xs",
      icon: "w-3 h-3",
      text: "text-xs",
      quantity: "text-xs",
      counterButton: "w-6 h-6",
    },
    md: {
      button: "px-3 py-2 text-sm",
      icon: "w-4 h-4",
      text: "text-sm",
      quantity: "text-sm",
      counterButton: "w-8 h-8",
    },
    lg: {
      button: "px-4 py-3 text-base",
      icon: "w-5 h-5",
      text: "text-base",
      quantity: "text-base",
      counterButton: "w-10 h-10",
    },
  };

  const currentSize = sizeClasses[size];

  if (quantity === 0) {
    if (variant === "icon") {
      return (
        <button
          onClick={handleAddToCart}
          className={`bg-huzo-green text-huzo-cream ${currentSize.counterButton} hover:bg-huzo-green/90 transition-colors rounded flex items-center justify-center`}
          title="Добавить в корзину"
        >
          <ShoppingCart className={currentSize.icon} />
        </button>
      );
    } else {
      return (
        <button
          onClick={handleAddToCart}
          className={`bg-huzo-green text-huzo-cream ${currentSize.button} hover:bg-huzo-green/90 transition-colors rounded flex items-center justify-center gap-2`}
        >
          <ShoppingCart className={currentSize.icon} />
          {variant === "both" && "В корзину"}
        </button>
      );
    }
  }

  if (variant === "icon") {
    return (
      <div className="flex items-center gap-1 bg-huzo-green text-huzo-cream rounded overflow-hidden">
        <button
          onClick={handleDecrement}
          className={`${currentSize.counterButton} hover:bg-huzo-green/90 transition-colors flex items-center justify-center`}
          title="Уменьшить количество"
        >
          <Minus className={currentSize.icon} />
        </button>

        <span
          className={`${currentSize.quantity} font-medium min-w-6 text-center`}
        >
          {quantity}
        </span>

        <button
          onClick={handleIncrement}
          className={`${currentSize.counterButton} hover:bg-huzo-green/90 transition-colors flex items-center justify-center`}
          title="Увеличить количество"
        >
          <Plus className={currentSize.icon} />
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-2 bg-huzo-green text-huzo-cream rounded-lg overflow-hidden">
        <button
          onClick={handleDecrement}
          className={`${currentSize.counterButton} hover:bg-huzo-green/90 transition-colors flex items-center justify-center`}
          title="Уменьшить количество"
        >
          <Minus className={currentSize.icon} />
        </button>

        <div className="flex items-center gap-2 px-2">
          <span className={`${currentSize.quantity} font-medium`}>
            {quantity}
          </span>
          <span className={currentSize.text}>в корзине</span>
        </div>

        <button
          onClick={handleIncrement}
          className={`${currentSize.counterButton} hover:bg-huzo-green/90 transition-colors flex items-center justify-center`}
          title="Увеличить количество"
        >
          <Plus className={currentSize.icon} />
        </button>
      </div>
    );
  }
}
