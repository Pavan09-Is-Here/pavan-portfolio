import About from "@/components/About";
import Background from "@/components/Background";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Expertise from "@/components/Expertise";
import Experience from "@/components/Experience";
import FeaturedProject from "@/components/FeaturedProject";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden text-white">
      <Background />
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <FeaturedProject />
      <Skills />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </main>
  );
}