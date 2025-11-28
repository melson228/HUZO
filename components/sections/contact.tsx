import {
  ShoppingBag,
  MessageCircle,
  Users,
  Truck,
  Shield,
  Gift,
  HeadphonesIcon,
} from "lucide-react";

const platforms = [
  {
    icon: ShoppingBag,
    name: "Ozon",
    description: "Официальный магазин HUZO",
    url: "https://www.ozon.ru/seller/huzo-1839352",
  },
  {
    icon: MessageCircle,
    name: "Telegram",
    description: "Новости и обновления",
    url: "https://t.me/huzo_kosmetik/251",
  },
  {
    icon: Users,
    name: "ВКонтакте",
    description: "Сообщество HUZO",
    url: "https://vk.com/club225193935",
  },
];

const features = [
  {
    icon: Truck,
    text: "Быстрая доставка по всей России",
  },
  {
    icon: Shield,
    text: "Официальный продавец на Ozon",
  },
  {
    icon: HeadphonesIcon,
    text: "Оперативная поддержка",
  },
  {
    icon: Gift,
    text: "Скидки и специальные предложения",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-huzo-green text-huzo-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-8">Где приобрести</h2>
            <p className="text-xl text-huzo-cream/80 max-w-2xl mx-auto">
              Приобретайте продукцию HUZO через официальные каналы продаж
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {platforms.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-huzo-cream/5 rounded-2xl p-8 border border-huzo-cream/20 hover:bg-huzo-cream/10 transition-all duration-300 group cursor-pointer block active:bg-huzo-cream/30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-huzo-cream/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <platform.icon className="w-6 h-6 text-huzo-cream" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-light text-huzo-cream">
                      {platform.name}
                    </h3>
                    <p className="text-huzo-cream/70 text-sm">
                      {platform.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="bg-huzo-cream/5 rounded-2xl p-8 border border-huzo-cream/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-light mb-6">
                  Преимущества покупки
                </h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-huzo-cream/90"
                    >
                      <div className="w-8 h-8 bg-huzo-mint/20 rounded-full flex items-center justify-center shrink-0">
                        <feature.icon className="w-4 h-4 text-huzo-mint" />
                      </div>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="bg-huzo-cream/10 rounded-2xl p-8 border border-huzo-cream/20">
                  <ShoppingBag className="w-16 h-16 text-huzo-cream mx-auto mb-4" />
                  <h4 className="text-2xl font-light mb-4">
                    Официальный продавец
                  </h4>
                  <p className="text-huzo-cream/80 mb-6">
                    Все продукты HUZO проходят строгий контроль качества и
                    поставляются напрямую от производителя
                  </p>
                  <div className="flex items-center justify-center gap-2 text-huzo-cream/60">
                    <div className="w-2 h-2 bg-huzo-mint rounded-full"></div>
                    <span>Гарантия подлинности</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <p className="text-huzo-cream/80 text-lg">
                Есть вопросы о продукции?
              </p>
              <a
                href="https://t.me/huzo_kosmetik/251"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-huzo-mint text-huzo-green px-8 py-3 rounded-lg hover:bg-huzo-mint/90 transition-colors duration-200 flex items-center gap-2 active:bg-huzo-mint/70"
              >
                <MessageCircle className="w-5 h-5" />
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
