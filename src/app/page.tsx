import { Intro } from "@/components/Intro";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { KnkyCase } from "@/components/KnkyCase";
import { MoreWork } from "@/components/MoreWork";
import { ProjectDetails } from "@/components/ProjectDetails";
import { Path } from "@/components/Path";
import { Skills } from "@/components/Skills";
import { Thinking } from "@/components/Thinking";
import { Outside } from "@/components/Outside";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Intro />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Story />
        <KnkyCase />
        <MoreWork />
        <ProjectDetails />
        <Path />
        <Skills />
        <Thinking />
        <Outside />
      </main>
      <Contact />
    </>
  );
}
