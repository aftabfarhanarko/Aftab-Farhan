import Hero from "@/components/Home/Hero/Hero";
import About from "@/components/Home/About/About";
import Skills from "@/components/Home/Skills/Skills";
import Contact from "@/components/Home/Contact/Contact";
import Projects from "@/components/Home/Projects/Projects";
import Experience from "@/components/Home/Experience/Experience";
// import Services from "@/components/Home/Services/Services";
import SoftSkills from "@/components/Home/SoftSkills/Soft-Skills";
import Education from "@/components/Home/Education/Education";

export default  function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      {/* <Services /> */}
      <SoftSkills />
      <Education />
      <Contact />
    </div>
  );
}
