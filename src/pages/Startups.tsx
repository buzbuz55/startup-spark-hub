import Header from "@/components/Header";
import StartupGrid from "@/components/startups/StartupGrid";

const Startups = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold">
              <span className="text-blue-600">Join a startup.</span>
              <span className="text-gray-900 ml-2">Find a job at one of these startups.</span>
            </h1>
          </div>
          <StartupGrid />
        </div>
      </main>
    </div>
  );
};

export default Startups;