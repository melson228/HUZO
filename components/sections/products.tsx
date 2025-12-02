"use client";

import { ShoppingCart, Sparkles } from "lucide-react";
import { useState } from "react";
import { allProducts, Product } from "@/lib/products-data";
import { useCart } from "@/context/cart-context";
import ProductModal from "@/components/ui/product-modal";
import Link from "next/link";
import CartCounter from "../ui/cart-counter";
import { ProductImage } from "../ui/product-image";

export default function Products() {
  const [, setSelectedProduct] = useState<number | null>(null);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  // Выбираем 4 конкретных товара
  const featuredProducts = allProducts.filter(
    (product) =>
      product.id === 1 ||
      product.id === 4 ||
      product.id === 8 ||
      product.id === 9
  );

  const handleQuickView = (product: Product) => {
    setModalProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalProduct(null);
  };

  const handleAddToCartFromModal = (product: Product) => {
    addToCart(product);
    console.log("Добавлено в корзину из модалки:", product);
  };

  return (
    <>
      <section id="products" className="py-24 bg-huzo-cream">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light text-huzo-green mb-6">
              Популярные товары
            </h2>
            <p className="text-xl text-huzo-green/70 max-w-2xl mx-auto mb-8">
              Самые востребованные продукты из нашей коллекции
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full"
                onMouseEnter={() => setSelectedProduct(product.id)}
                onMouseLeave={() => setSelectedProduct(null)}
                onClick={() => handleQuickView(product)}
              >
                <div className="h-48 bg-gradient-to-br from-huzo-mint to-huzo-cream relative">
                  <ProductImage
                    images={product.images}
                    alt={product.name}
                    className="object-cover"
                  />

                  <div className="absolute top-3 left-3 bg-huzo-green text-huzo-cream px-2 py-1 rounded text-xs">
                    {product.category}
                  </div>
                </div>

                <div className="p-4 flex flex-col grow">
                  <h3 className="text-lg font-light text-huzo-green mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-huzo-green/70 text-sm mb-3 grow line-clamp-2">
                    {product.description}
                  </p>

                  <div className="space-y-1 mb-3">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-xs text-huzo-green/60"
                      >
                        <div className="w-1.5 h-1.5 bg-huzo-mint rounded-full mr-2 shrink-0"></div>
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-huzo-cream">
                    <div className="text-huzo-green font-medium text-lg">
                      {product.price}
                    </div>
                    <CartCounter product={product} size="md" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-3xl font-light text-huzo-green mb-4">
                Полная коллекция HUZO
              </h3>
              <p className="text-huzo-green/70 mb-6 max-w-2xl mx-auto">
                Откройте для себя все наши продукты: шампуни для женщин и
                мужчин, бальзамы, флюиды и термо-маски для комплексного ухода за
                волосами
              </p>
              <Link
                href={"/catalog"}
                className="bg-huzo-green w-56 text-huzo-cream px-8 py-4 hover:bg-huzo-green/90 transition-colors rounded flex items-center justify-center gap-2 mx-auto active:bg-huzo-green/70"
              >
                <Sparkles className="w-5 h-5" />
                Перейти в каталог
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductModal
        product={modalProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCartFromModal}
      />
    </>
  );
}
