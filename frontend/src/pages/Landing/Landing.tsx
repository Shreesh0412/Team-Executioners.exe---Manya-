import GradientBackground from "@/components/common/GradientBackground";
import PageTransition from "@/components/common/PageTransition";

import Hero from "./sections/Hero";
import Features from "./sections/Features";
import HowItWorks from "./sections/HowItWorks";
import Testimonials from "./sections/Testimonials";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";

const Landing = () => {
  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-x-hidden bg-white text-slate-900">
        <GradientBackground />

        <main className="relative z-10">
          <Hero />
          <Features />
          <HowItWorks />
          <Testimonials />
          <CTA />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Landing;