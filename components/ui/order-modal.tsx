"use client";

import { useState } from "react";
import { X, ShoppingCart, Send } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useTelegram } from "@/hooks/use-telegram";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { sendOrderToTelegram, getTelegramUrl } = useTelegram();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    comment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { success, orderId } = await sendOrderToTelegram(
        cartItems,
        getTotalPrice(),
        formData
      );

      if (success && orderId) {
        clearCart();

        // Получаем username из переменных окружения
        const telegramUsername =
          process.env.NEXT_PUBLIC_TELEGRAM_USERNAME_COMPANY || "HuzoDecor";
        const telegramUrl = getTelegramUrl(orderId, telegramUsername);
        window.open(telegramUrl, "_blank");

        onClose();

        setFormData({
          name: "",
          phone: "",
          email: "",
          address: "",
          comment: "",
        });
      } else {
        alert(
          "Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз."
        );
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert("Произошла ошибка при отправке заказа.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-huzo-cream">
          <h2 className="text-2xl font-light text-huzo-green">
            Оформление заказа
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-huzo-cream rounded-full transition-colors"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6 text-huzo-green" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-huzo-cream/30 rounded-2xl p-4 mb-6">
            <h3 className="text-lg font-medium text-huzo-green mb-3 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Ваш заказ ({cartItems.length} товаров)
            </h3>
            <div className="space-y-3 mb-3 max-h-60 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="text-sm">
                  <div className="flex justify-between text-huzo-green font-medium">
                    <span>{item.name}</span>
                    <span>
                      {parseInt(
                        item.price.replace(/\s/g, "").replace("₽", "")
                      ) * item.quantity}
                      ₽
                    </span>
                  </div>
                  <div className="text-huzo-green/70 text-xs mt-1">
                    {item.description} × {item.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-huzo-cream pt-2">
              <div className="flex justify-between font-medium text-huzo-green">
                <span>Итого:</span>
                <span>{getTotalPrice().toLocaleString("ru-RU")}₽</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-huzo-green mb-2"
              >
                Имя *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-huzo-mint rounded-lg focus:outline-none focus:ring-2 focus:ring-huzo-green"
                placeholder="Ваше имя"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-huzo-green mb-2"
              >
                Телефон *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-huzo-mint rounded-lg focus:outline-none focus:ring-2 focus:ring-huzo-green"
                placeholder="+7 (XXX) XXX-XX-XX"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-huzo-green mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-huzo-mint rounded-lg focus:outline-none focus:ring-2 focus:ring-huzo-green"
                placeholder="your@email.com"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-huzo-green mb-2"
              >
                Адрес доставки
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-huzo-mint rounded-lg focus:outline-none focus:ring-2 focus:ring-huzo-green"
                placeholder="Город, улица, дом, квартира"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-huzo-green mb-2"
              >
                Комментарий к заказу
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                value={formData.comment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-huzo-mint rounded-lg focus:outline-none focus:ring-2 focus:ring-huzo-green"
                placeholder="Дополнительные пожелания..."
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-huzo-green text-huzo-cream py-3 rounded-lg hover:bg-huzo-green/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-huzo-cream border-t-transparent rounded-full animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Отправить заказ в Telegram
                </>
              )}
            </button>

            <p className="text-xs text-huzo-green/60 text-center">
              После отправки вы будете перенаправлены в Telegram для
              подтверждения заказа
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
