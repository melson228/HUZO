import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-huzo-green border-t border-huzo-cream/20 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link
            href={"/"}
            className="text-2xl font-light text-huzo-cream mb-4 md:mb-0"
          >
            <Image
              src="/logo.svg"
              alt="HUZO"
              width={0}
              height={0}
              className="h-auto w-20 md:w-24 lg:w-28 invert"
              priority
            />
          </Link>
          <div className="text-huzo-cream/60 text-center md:text-right">
            <p>© 2024 HUZO. Уходовая косметика для волос</p>
            <p className="text-sm mt-2">Уход, который объединяет семью</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
