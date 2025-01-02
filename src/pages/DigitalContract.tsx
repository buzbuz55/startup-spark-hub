import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignaturePad from 'react-signature-canvas';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DigitalContract = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const signaturePadRef = useRef<any>();
  const navigate = useNavigate();

  const clearSignature = () => {
    signaturePadRef.current?.clear();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please sign in to continue");
        navigate("/login");
        return;
      }

      if (!signaturePadRef.current?.isEmpty()) {
        const signatureDataUrl = signaturePadRef.current?.getTrimmedCanvas().toDataURL('image/png');

        const { error: contractError } = await supabase
          .from('signed_contracts')
          .insert({
            user_id: user.id,
            contract_type: 'NDA',
            signature: signatureDataUrl,
            contract_version: '1.0',
            full_name: fullName,
          });

        if (contractError) throw contractError;

        // Send email with signature
        const { error: emailError } = await supabase.functions.invoke('send-contract-email', {
          body: {
            to: [email],
            subject: "Your Signed NDA Contract",
            html: `
              <h1>Your NDA Contract has been signed</h1>
              <p>Dear ${fullName},</p>
              <p>Thank you for signing the NDA contract. Please find your signature below:</p>
              <img src="${signatureDataUrl}" alt="Your signature" style="max-width: 300px;" />
              <p>Best regards,<br/>Startup Spark Team</p>
            `,
          },
        });

        if (emailError) throw emailError;

        toast.success("Contract signed successfully and email sent!");
        navigate("/");
      } else {
        toast.error("Please provide your signature");
      }
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
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Digital Signature
                    </label>
                    <div className="border rounded-lg p-2 bg-white">
                      <SignaturePad
                        ref={signaturePadRef}
                        canvasProps={{
                          className: "signature-canvas w-full h-40 border rounded",
                        }}
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={clearSignature}
                      className="mt-2"
                    >
                      Clear Signature
                    </Button>
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