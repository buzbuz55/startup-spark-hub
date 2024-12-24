import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Interviews = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Startup Interviews</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Learn from successful founders and get insights into building successful startups.
        </p>
        {/* Content will be added in future iterations */}
      </main>
      <Footer />
    </div>
  );
};

export default Interviews;