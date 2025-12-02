"use client";

import { ShoppingCart, Filter, Search } from "lucide-react";
import Link from "next/link";
import { allProducts, Product } from "@/lib/products-data";
import { useCart } from "@/context/cart-context";
import { useState, useMemo } from "react";
import ProductModal from "@/components/ui/product-modal";
import CartCounter from "@/components/ui/cart-counter";
import { ProductImage } from "@/components/ui/product-image";

export default function CatalogPage() {
  const categories = [
    "Все товары",
    ...new Set(allProducts.map((product) => product.category)),
  ];

  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("Все товары");
  const [searchQuery, setSearchQuery] = useState("");
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const categoryMatch =
        selectedCategory === "Все товары" ||
        product.category === selectedCategory;

      const searchMatch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some((feature) =>
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="min-h-screen bg-huzo-cream pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-light text-huzo-green mb-6">
              Каталог HUZO
            </h1>
            <p className="text-xl text-huzo-green/70 max-w-2xl mx-auto">
              Полная коллекция профессиональной косметики для ухода за волосами
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Filter className="w-5 h-5 text-huzo-green shrink-0" />
                <span className="text-huzo-green font-medium shrink-0 max-md:hidden">
                  Категории:
                </span>
                <div className="flex gap-2 overflow-x-auto transparent-scrollbar w-full md:max-w-xl">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap shrink-0 ${
                        selectedCategory === category
                          ? "bg-huzo-green text-huzo-cream"
                          : "bg-huzo-cream text-huzo-green hover:bg-huzo-mint"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative shrink-0 w-full lg:w-auto ">
                <Search className="w-5 h-5 text-huzo-green absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 border border-huzo-mint rounded-lg focus:outline-none focus:ring-2 focus:ring-huzo-green w-full md:w-64"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-huzo-green/70">
              Найдено товаров: {filteredProducts.length}
              {selectedCategory !== "Все товары" &&
                ` в категории "${selectedCategory}"`}
              {searchQuery && ` по запросу "${searchQuery}"`}
            </p>
          </div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-huzo-green/30 mx-auto mb-4" />
              <h3 className="text-2xl font-light text-huzo-green mb-2">
                Товары не найдены
              </h3>
              <p className="text-huzo-green/70">
                Попробуйте изменить параметры фильтрации или поиска
              </p>
            </div>
          ) : (
            <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col h-full min-w-0"
                  onClick={() => handleQuickView(product)}
                >
                  <div className="h-48 bg-linear-to-br from-huzo-mint to-huzo-cream relative">
                    <ProductImage
                      images={product.images}
                      alt={product.name}
                      objectFit="cover" //
                      enableSwipe={false}
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
                      <div className="flex gap-2">
                        <CartCounter product={product} size="md" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-huzo-green hover:text-huzo-green/70 transition-colors"
            >
              ← Вернуться на главную
            </Link>
          </div>
        </div>
      </div>

      <ProductModal
        product={modalProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCartFromModal}
      />
    </>
  );
}
