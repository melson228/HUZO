"use client";

import { CartItem } from "@/lib/types";

interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  comment?: string;
}

const generateOrderId = () => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useTelegram = () => {
  const sendOrderToTelegram = async (
    cartItems: CartItem[],
    total: number,
    customerInfo: CustomerInfo
  ) => {
    const orderId = generateOrderId();
    const orderMessage = formatOrderMessage(
      cartItems,
      total,
      customerInfo,
      orderId
    );

    const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;
    const yourTelegramUsername = process.env.TELEGRAM_USERNAME_COMPANY;

    if (!botToken || !chatId) {
      console.error("Telegram credentials not found");
      return { success: false, orderId: null };
    }

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: orderMessage,
            parse_mode: "HTML",
          }),
        }
      );

      return { success: response.ok, orderId };
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
      return { success: false, orderId: null };
    }
  };

  const getTelegramUrl = (orderId: string, yourTelegramUsername: string) => {
    const message = `Здравствуйте! Мой код заказа: ${orderId}`;

    return `https://t.me/${yourTelegramUsername}?text=${encodeURIComponent(
      message
    )}`;
  };

  return { sendOrderToTelegram, getTelegramUrl };
};

const formatOrderMessage = (
  cartItems: CartItem[],
  total: number,
  customerInfo: CustomerInfo,
  orderId: string
) => {
  const itemsText = cartItems
    .map(
      (item) =>
        `🛒 ${item.name}\n   📝 ${item.description}\n   ${item.quantity} × ${
          item.price
        } = ${
          parseInt(item.price.replace(/\s/g, "").replace("₽", "")) *
          item.quantity
        }₽`
    )
    .join("\n\n");

  return `
🎉 <b>Новый заказ! #${orderId}</b>

👤 <b>Клиент:</b> ${customerInfo.name}
📞 <b>Телефон:</b> ${customerInfo.phone}
${customerInfo.email ? `📧 <b>Email:</b> ${customerInfo.email}\n` : ""}
${customerInfo.address ? `🏠 <b>Адрес:</b> ${customerInfo.address}\n` : ""}
${
  customerInfo.comment ? `💬 <b>Комментарий:</b> ${customerInfo.comment}\n` : ""
}

📦 <b>Заказ:</b>
${itemsText}

💰 <b>Итого:</b> ${total.toLocaleString("ru-RU")}₽

⏰ <b>Время заказа:</b> ${new Date().toLocaleString("ru-RU")}

🔐 <b>ID заказа:</b> <code>${orderId}</code>

💡 <b>Клиент напишет вам с этим ID для идентификации</b>
  `.trim();
};
