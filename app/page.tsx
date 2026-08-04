import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { About } from "@/components/sections/about";
import { Products } from "@/components/sections/products";
import { Technology } from "@/components/sections/technology";
import { TrackRecord } from "@/components/sections/track-record";
import { Clients } from "@/components/sections/clients";
import { Faq } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

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
        <TrackRecord />
        <Clients />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}