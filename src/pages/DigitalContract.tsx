import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DigitalContract = () => {
  const [fullName, setFullName] = useState("");
  const [signature, setSignature] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to continue");
        navigate("/login");
        return;
      }

      const { error } = await supabase
        .from('signed_contracts')
        .insert({
          user_id: user.id,
          contract_type: 'NDA',
          signature: signature,
          contract_version: '1.0',
          full_name: fullName,
        });

      if (error) throw error;

      toast.success("Contract signed successfully!");
      navigate("/");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to sign contract");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Non-Disclosure Agreement</h1>
            
            <div className="prose max-w-none mb-8">
              <p className="mb-4">This Non-Disclosure Agreement (the "Agreement") is entered into as of {new Date().toLocaleDateString()}, by and between:</p>
              
              <p className="mb-4">Startup Spark, Inc. (the "Company"), and the undersigned individual ("Intern").</p>

              <h2 className="text-xl font-semibold mt-6 mb-3">1. Purpose</h2>
              <p>The Company intends to provide the Intern with access to certain confidential and proprietary information in connection with the Intern's engagement as an intern with the Company.</p>

              <h2 className="text-xl font-semibold mt-6 mb-3">2. Confidential Information</h2>
              <p>Includes but is not limited to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Business strategies, plans, and forecasts</li>
                <li>Financial information, pricing, and budgets</li>
                <li>Client lists and contact information</li>
                <li>Product designs, prototypes, and technical data</li>
                <li>Marketing strategies and customer data</li>
              </ul>

              {/* ... Additional sections of the agreement can be added here */}
              
              <div className="mt-8 border-t pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Legal Name
                    </label>
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="mt-1"
                      placeholder="Enter your full legal name"
                    />
                  </div>

                  <div>
                    <label htmlFor="signature" className="block text-sm font-medium text-gray-700">
                      Digital Signature
                    </label>
                    <Input
                      id="signature"
                      type="text"
                      value={signature}
                      onChange={(e) => setSignature(e.target.value)}
                      required
                      className="mt-1"
                      placeholder="Type your full name as signature"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Button type="button" variant="outline" onClick={() => navigate("/")}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Sign Agreement
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DigitalContract;