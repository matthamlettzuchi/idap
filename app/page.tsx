import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { About } from "@/components/sections/about";
import { Products } from "@/components/sections/products";
import { Technology } from "@/components/sections/technology";
import { Testimonials } from "@/components/sections/testimonials";
import { Services } from "@/components/sections/services";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { FloatingActions } from "@/components/floating-actions";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <About />
        <Products />
        <Technology />
        <Testimonials />
        <Services />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}