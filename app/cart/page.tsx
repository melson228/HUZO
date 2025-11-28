"use client";

import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import OrderModal from "@/components/ui/order-modal";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsOrderModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-huzo-cream pt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-light text-huzo-green mb-6">
              Корзина
            </h1>
            <p className="text-xl text-huzo-green/70">
              Товары, которые вы выбрали
            </p>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center max-w-2xl mx-auto">
              <ShoppingCart className="w-24 h-24 text-huzo-green/30 mx-auto mb-6" />
              <h2 className="text-3xl font-light text-huzo-green mb-4">
                Корзина пуста
              </h2>
              <p className="text-huzo-green/70 mb-8 max-w-md mx-auto">
                Добавьте товары из каталога, чтобы сделать заказ
              </p>
              <Link
                href="/catalog"
                className="bg-huzo-green text-huzo-cream px-8 py-4 rounded-lg hover:bg-huzo-green/90 transition-colors inline-flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-light text-huzo-green">
                      Товары в корзине ({getTotalItems()})
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-huzo-green/60 hover:text-huzo-green transition-colors text-sm"
                    >
                      Очистить корзину
                    </button>
                  </div>

                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 border border-huzo-cream rounded-xl max-md:flex-wrap"
                      >
                        <div className="w-20 h-20 bg-linear-to-br from-huzo-mint to-huzo-cream rounded-lg flex items-center justify-center shrink-0">
                          <ShoppingCart className="w-8 h-8 text-huzo-green" />
                        </div>

                        <div className="grow min-w-0">
                          <h3 className="font-medium text-huzo-green mb-1">
                            {item.name}
                          </h3>
                          <p className="text-huzo-green/70 text-sm mb-2 line-clamp-2">
                            {item.description}
                          </p>
                          <p className="text-huzo-green font-medium">
                            {item.price}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 bg-huzo-cream text-huzo-green rounded flex items-center justify-center hover:bg-huzo-mint transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium text-huzo-green">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 bg-huzo-cream text-huzo-green rounded flex items-center justify-center hover:bg-huzo-mint transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-huzo-green/60 hover:text-huzo-green hover:bg-huzo-cream rounded transition-colors shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 sticky top-6">
                  <h2 className="text-2xl font-light text-huzo-green mb-6">
                    Итого
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-huzo-green/70">
                      <span>Товары ({getTotalItems()})</span>
                      <span>{getTotalPrice().toLocaleString("ru-RU")} ₽</span>
                    </div>
                    <div className="flex justify-between text-huzo-green/70">
                      <span>Доставка</span>
                      <span>Рассчитывается отдельно</span>
                    </div>
                    <div className="border-t border-huzo-cream pt-3">
                      <div className="flex justify-between text-huzo-green font-medium text-lg">
                        <span>Общая сумма</span>
                        <span>{getTotalPrice().toLocaleString("ru-RU")} ₽</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-huzo-green text-huzo-cream py-4 rounded-lg hover:bg-huzo-green/90 transition-colors flex items-center justify-center gap-2 mb-4"
                  >
                    <ArrowRight className="w-5 h-5" />
                    Перейти к оформлению
                  </button>

                  <Link
                    href="/catalog"
                    className="w-full border border-huzo-green text-huzo-green py-4 rounded-lg hover:bg-huzo-cream transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Продолжить покупки
                  </Link>
                </div>
              </div>
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

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </>
  );
}
