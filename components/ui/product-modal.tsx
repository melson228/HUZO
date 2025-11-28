"use client";

import { X, ShoppingCart, Star, Leaf } from "lucide-react";
import { Product } from "@/lib/products-data";
import { useEffect, useRef } from "react";
import CartCounter from "./cart-counter";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center p-6 border-b border-huzo-cream">
          <h2 className="text-2xl font-light text-huzo-green">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-huzo-cream rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-huzo-green" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-linear-to-br from-huzo-mint to-huzo-cream h-80 rounded-2xl flex items-center justify-center mb-4">
                <div className="text-center">
                  <ShoppingCart className="w-16 h-16 text-huzo-green mx-auto mb-4" />
                  <p className="text-huzo-green/60">Изображение продукта</p>
                </div>
              </div>

              <div className="bg-huzo-cream/30 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-light text-huzo-green">
                    {product.price}
                  </span>
                  <span className="text-huzo-green/60 bg-huzo-mint/30 px-3 py-1 rounded-full">
                    {product.volume}
                  </span>
                </div>

                <div className="flex justify-center">
                  <CartCounter product={product} size="lg" variant="both" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-huzo-green mb-3">
                  Описание
                </h3>
                <p className="text-huzo-green/70 leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-huzo-green mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Особенности
                </h3>
                <div className="space-y-2">
                  {product.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-huzo-green/70"
                    >
                      <div className="w-2 h-2 bg-huzo-mint rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-huzo-green mb-3 flex items-center gap-2">
                  <Leaf className="w-5 h-5" />
                  Активные компоненты
                </h3>
                <div className="space-y-2">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="text-huzo-green/70 text-sm">
                      • {ingredient}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-huzo-green mb-3">
                  Способ применения
                </h3>
                <div className="space-y-2">
                  {product.usage.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start text-huzo-green/70"
                    >
                      <span className="bg-huzo-mint text-huzo-green w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3 shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
