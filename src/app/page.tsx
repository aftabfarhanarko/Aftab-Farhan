import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import SoftSkills from "@/components/Soft-Skills";
import Education from "@/components/Education";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Services />
      <SoftSkills />
      <Education />
      <Contact />
    </div>
  );
}
