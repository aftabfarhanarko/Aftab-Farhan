// import Services from "@/components/Home/Services/Services";
import Hero from "@/components/Home/Hero/Hero";
import About from "@/components/Home/About/About";
import Skills from "@/components/Home/Skills/Skills";
import AIStack from "@/components/Home/AIStack/AIStack";
import Achievements from "@/components/Home/Achievements/Achievements";
import Contact from "@/components/Home/Contact/Contact";
import Projects from "@/components/Home/Projects/Projects";
import Experience from "@/components/Home/Experience/Experience";
import SoftSkills from "@/components/Home/SoftSkills/Soft-Skills";
import Education from "@/components/Home/Education/Education";
import Services from "@/components/Home/Services/Services";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-1 sm:pt-2 pb-8">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Services />
      <SoftSkills />
      <Achievements />
      <Education />
      <AIStack />
      <Contact />
    </div>
  );
}
