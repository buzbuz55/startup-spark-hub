import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContractHeader } from "@/components/contract/ContractHeader";
import { ContractContent } from "@/components/contract/ContractContent";
import { SignatureSection } from "@/components/contract/SignatureSection";

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
            <ContractHeader
              handlePrint={handlePrint}
              handleShare={handleShare}
              handleZoomIn={handleZoomIn}
              handleZoomOut={handleZoomOut}
            />
            
            <ContractContent zoomLevel={zoomLevel} />
            
            <SignatureSection
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              signaturePadRef={signaturePadRef}
              clearSignature={clearSignature}
              handleSubmit={handleSubmit}
              navigate={navigate}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DigitalContract;