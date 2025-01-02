import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SignaturePad from "react-signature-canvas";

interface SignatureSectionProps {
  fullName: string;
  setFullName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  signaturePadRef: React.RefObject<any>;
  clearSignature: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  navigate: (path: string) => void;
}

export const SignatureSection = ({
  fullName,
  setFullName,
  email,
  setEmail,
  signaturePadRef,
  clearSignature,
  handleSubmit,
  navigate,
}: SignatureSectionProps) => {
  return (
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
  );
};