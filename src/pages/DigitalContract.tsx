import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignaturePad from 'react-signature-canvas';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Printer, Share2, ZoomIn, ZoomOut } from "lucide-react";

const DigitalContract = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [zoomLevel, setZoomLevel] = useState(100);
  const signaturePadRef = useRef<any>();
  const navigate = useNavigate();

  const clearSignature = () => {
    signaturePadRef.current?.clear();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'NDA Contract',
        text: 'Please review and sign the NDA contract',
        url: window.location.href,
      });
    } catch (error) {
      toast.error("Sharing failed. Your browser might not support this feature.");
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Non-Disclosure Agreement</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handlePrint}>
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[500px] rounded-md border p-4">
              <div style={{ zoom: `${zoomLevel}%` }}>
                <div className="prose max-w-none">
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

                  <h2 className="text-xl font-semibold mt-6 mb-3">3. Non-Disclosure</h2>
                  <p>The Intern agrees to:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Maintain the confidentiality of all Confidential Information</li>
                    <li>Not disclose any Confidential Information to any third party</li>
                    <li>Use Confidential Information solely for the purpose of the internship</li>
                    <li>Return all Confidential Information upon completion of the internship</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-3">4. Term</h2>
                  <p>This Agreement shall remain in effect for a period of two (2) years from the date of signing.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-3">5. Governing Law</h2>
                  <p>This Agreement shall be governed by and construed in accordance with the laws of the State of California.</p>
                </div>
              </div>
            </ScrollArea>
              
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
      </main>
      <Footer />
    </div>
  );
};

export default DigitalContract;