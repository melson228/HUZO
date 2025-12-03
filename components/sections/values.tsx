import { Users, Heart, Sparkles, Target } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Target,
    title: "Для подростков",
    description:
      "Специально разработано для возраста 9+ лет, когда детская косметика уже не подходит, а взрослая еще рано",
  },
  {
    icon: Users,
    title: "Универсальность",
    description:
      "Подходит для всей семьи - детям, подросткам и взрослым. Один продукт для всех возрастов",
  },
  {
    icon: Sparkles,
    title: "Качество",
    description:
      "Премиальные компоненты без сульфатов и опасных ПАВов. Только безопасные и эффективные формулы",
  },
  {
    icon: Heart,
    title: "Любовь к себе",
    description:
      "Помогаем с юных лет прививать привычку ухаживать за собой и использовать качественные продукты",
  },
];

export default function Values() {
  return (
    <section id="values" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-5xl font-light text-huzo-green mb-8">
            Почему выбирают HUZO
          </h2>
          <p className="text-xl text-huzo-green/70 leading-relaxed">
            Наши продукты созданы с пониманием особенных потребностей
            подрастающего поколения и заботой о качестве для всей семьи
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-start">
          {/* Левая колонка с карточками values */}
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-huzo-mint rounded-full flex items-center justify-center group-hover:bg-huzo-mint/80 transition-colors relative">
                  <value.icon className="w-10 h-10 text-huzo-green" />
                  <div className="absolute inset-0 bg-huzo-green/5 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </div>
                <h3 className="text-2xl font-light text-huzo-green mb-4">
                  {value.title}
                </h3>
                <p className="text-huzo-green/60 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Правая колонка с изображением */}
          <div className="relative h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/beautiful-hair.jpg"
              alt="Красивые здоровые волосы с уходом HUZO"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />

            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 max-w-sm w-full mx-auto border border-white/40 shadow-2xl">
                <p className="text-huzo-green font-medium md:text-2xl text-center leading-tight">
                  Уход, который любят
                  <br />
                  ваши волосы в любом возрасте
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-linear-to-r from-huzo-cream to-huzo-mint rounded-2xl p-8 text-center ">
            <h3 className="text-2xl font-light text-huzo-green mb-4">
              Идеальное решение для переходного возраста
            </h3>
            <p className="text-huzo-green/70 leading-relaxed">
              В возрасте 9-16 лет формируются привычки ухода за собой. HUZO
              предлагает золотую середину - не детскую, но и не взрослую
              косметику, которая помогает подросткам чувствовать себя уверенно и
              при этом безопасно ухаживать за волосами.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
