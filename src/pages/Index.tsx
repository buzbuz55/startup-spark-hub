import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Collaboration from "@/components/Collaboration";
import SignUpSection from "@/components/SignUpSection";
import Footer from "@/components/Footer";
import LanguageSelector from "@/components/LanguageSelector";
import PageBreadcrumbs from "@/components/navigation/PageBreadcrumbs";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSelector />
      </div>
      <Header />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4">
          <PageBreadcrumbs />
        </div>
        <Hero />
        <Features />
        <Collaboration />
        <Testimonials />
        <SignUpSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;