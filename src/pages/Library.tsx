import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const Library = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Startup Nation Library</h1>
            <p className="text-xl text-muted-foreground">
              Essential resources and guides for building successful startups
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Starting a Company</h3>
              <p className="text-muted-foreground">
                Comprehensive guides on company formation, legal requirements, and initial steps
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Fundraising</h3>
              <p className="text-muted-foreground">
                Learn about different funding options, pitch deck creation, and investor relations
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Product Development</h3>
              <p className="text-muted-foreground">
                Best practices for building products, user research, and product-market fit
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">Growth & Marketing</h3>
              <p className="text-muted-foreground">
                Strategies for user acquisition, marketing on a budget, and sustainable growth
              </p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Library;