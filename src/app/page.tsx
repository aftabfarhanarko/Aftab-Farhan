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
import HowIEngineer from "@/components/Home/HowIEngineer/HowIEngineer";

export default function Home() {
  return (
    <div className="pt-0 pb-8 w-full space-y-0">
      {/* Top 7xl Constrained Sections */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Hero />
        <About />
        <Services />
        <Skills />
      </div>

      {/* Full-Width Projects Section */}
      <div className="w-full my-2 sm:my-4">
        <Projects />
      </div>

      {/* Bottom 7xl Constrained Sections */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Experience />
        <AIStack />
        <SoftSkills />
        <Achievements />
        <Education />
        <Contact />
      </div>
    </div>
  );
}

