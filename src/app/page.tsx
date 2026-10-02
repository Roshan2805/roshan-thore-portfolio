import { Intro } from "@/components/Intro";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { KnkyCase } from "@/components/KnkyCase";
import { MoreWork } from "@/components/MoreWork";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Intro />
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Story />
        <KnkyCase />
        <MoreWork />
        <Experience />
        <Skills />
        <About />
      </main>
      <Contact />
    </>
  );
}
