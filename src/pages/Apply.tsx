import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Apply = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Apply to Startup Nation</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Join our community of ambitious founders and get the support you need to succeed.
        </p>
        {/* Content will be added in future iterations */}
      </main>
      <Footer />
    </div>
  );
};

export default Apply;