import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Collaboration from "@/components/Collaboration";
import SignUpSection from "@/components/SignUpSection";
import Footer from "@/components/Footer";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>
      <Header />
      <Hero />
      <Features />
      <Collaboration />
      <Testimonials />
      <SignUpSection />
      <Footer />
    </div>
  );
};

export default Index;