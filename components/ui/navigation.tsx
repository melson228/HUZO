"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const findScrollContainer = () => {
      const simplebar = document.querySelector(
        ".simplebar-content-wrapper"
      ) as HTMLElement;
      if (simplebar) {
        scrollContainerRef.current = simplebar;
        return simplebar;
      }
      return null;
    };

    const handleScroll = () => {
      const scrollY = scrollContainerRef.current?.scrollTop || window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    const timer = setTimeout(() => {
      const container = findScrollContainer();
      if (container) {
        container.addEventListener("scroll", handleScroll);
      } else {
        window.addEventListener("scroll", handleScroll);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      scrollContainerRef.current?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-huzo-mint"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href={"/"} className="text-2xl font-light text-huzo-green">
            <Image
              src="/logo.svg"
              alt="HUZO"
              width={0}
              height={0}
              className={`h-auto w-20 md:w-24 lg:w-28 ${
                isScrolled ? "" : "filter brightness-0 invert"
              }`}
              priority
            />
          </Link>
          <div className="hidden md:flex space-x-8">
            <a
              href="#about"
              className={`transition-colors ${
                isScrolled
                  ? "text-huzo-green hover:text-huzo-green/70"
                  : "text-huzo-cream hover:text-huzo-cream/70"
              }`}
            >
              О бренде
            </a>
            <a
              href="#products"
              className={`transition-colors ${
                isScrolled
                  ? "text-huzo-green hover:text-huzo-green/70"
                  : "text-huzo-cream hover:text-huzo-cream/70"
              }`}
            >
              Продукция
            </a>
            <a
              href="#values"
              className={`transition-colors ${
                isScrolled
                  ? "text-huzo-green hover:text-huzo-green/70"
                  : "text-huzo-cream hover:text-huzo-cream/70"
              }`}
            >
              Ценности
            </a>
            <a
              href="#contact"
              className={`transition-colors ${
                isScrolled
                  ? "text-huzo-green hover:text-huzo-green/70"
                  : "text-huzo-cream hover:text-huzo-cream/70"
              }`}
            >
              Контакты
            </a>
          </div>
          <Link
            href={"/catalog"}
            className={`px-6 py-2 transition-colors flex items-center gap-2 ${
              isScrolled
                ? "bg-huzo-green hover:bg-huzo-green/90 text-huzo-cream active:bg-huzo-green/70"
                : "bg-huzo-cream hover:bg-huzo-cream/90 text-huzo-green active:bg-huzo-cream/70"
            }`}
          >
            Каталог
          </Link>
        </div>
      </nav>
    </header>
  );
}
