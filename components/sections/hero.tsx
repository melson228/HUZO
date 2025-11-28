"use client";

import { Sparkles, Users } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center relative pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container mx-auto relative z-20 p-4">
        <div className="max-w-100 p-8 bg-huzo-cream/15 backdrop-blur-sm rounded-3xl mx-auto flex flex-wrap justify-center">
          <h1 className="text-7xl md:text-8xl font-light text-huzo-cream mb-4">
            HUZO
          </h1>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2 text-huzo-mint">
              <Sparkles className="w-5 h-5" />
              <span>Для подростков</span>
            </div>
            <div className="flex items-center gap-2 text-huzo-mint">
              <Users className="w-5 h-5" />
              <span>Для взрослых</span>
            </div>
          </div>

          <p className="text-2xl text-huzo-cream font-light mb-8 leading-relaxed text-center">
            Первая косметика, которая
            <span className="text-huzo-mint"> действительно подходит</span>
          </p>

          <div className="space-y-4">
            <Link
              href={"/catalog"}
              className="w-full max-w-xs bg-huzo-cream text-huzo-green px-8 py-4 hover:bg-huzo-cream/90 transition-all duration-300 flex items-center justify-center gap-3 active:bg-huzo-cream/70"
            >
              <Sparkles className="w-5 h-5" />
              Открыть коллекцию
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
