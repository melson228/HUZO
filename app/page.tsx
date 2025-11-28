import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Products from "@/components/sections/products";
import Values from "@/components/sections/values";
import Contact from "@/components/sections/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <About />
        <Products />
        <Values />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
