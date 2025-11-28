import { Users, Heart, Sparkles } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Users,
    title: "Для всей семьи",
    description:
      "Универсальная косметика, которая подходит как подросткам, так и взрослым, и детям",
  },
  {
    icon: Heart,
    title: "Особенный подход",
    description:
      "Идеальное решение для подростков, которые выросли из детской косметики, но еще не готовы к взрослой",
  },
  {
    icon: Sparkles,
    title: "Качество и любовь",
    description:
      "Стремимся к тому, чтобы люди начали себя любить и пользовались качественными продуктами",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-5xl font-light text-huzo-green mb-8">
            Философия HUZO
          </h2>
          <p className="text-xl text-huzo-green/70 leading-relaxed mb-8">
            Молодая компания по производству уходовой косметики для волос
            предлагает особенный продукт для подрастающего поколения.
          </p>
          <p className="text-lg text-huzo-green/60 leading-relaxed">
            Концепция нашей косметики в том, что она оптимально подходит для
            подростков и детей старше 9 лет. Это тот самый возрастной период,
            когда пользоваться детской косметикой уже нет желания, а взрослая
            может еще не подойти.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-huzo-mint rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-huzo-green" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-huzo-green mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-huzo-green/60 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="relative h-96 lg:h-[500px] max-sm:h-[350px] rounded-2xl overflow-hidden bg-linear-to-r from-huzo-cream to-huzo-mint/30">
              <div className="absolute right-0 top-0 bottom-0 w-2/3 max-lg:w-4/6 max-sm:w-full">
                <Image
                  src="/about-family-image.jpg"
                  alt="Семья использует продукцию HUZO"
                  fill
                  className="object-cover object-left"
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div className="absolute bottom-8 max-sm:bottom-4 left-4 right-4 max-w-2xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl border border-huzo-mint/20">
                  <h3 className="text-2xl max-sm:text-4 font-light text-huzo-green mb-2">
                    Для всей семьи
                  </h3>
                  <p className="text-huzo-green/70">
                    От подростков до взрослых — одна косметика для всех
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
