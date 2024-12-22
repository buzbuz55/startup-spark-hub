import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Collaboration from "@/components/Collaboration";
import SignUpSection from "@/components/SignUpSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Collaboration />
      <Testimonials />
      <SignUpSection />
    </div>
  );
};

export default Index;