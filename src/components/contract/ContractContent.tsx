import { ScrollArea } from "@/components/ui/scroll-area";

interface ContractContentProps {
  zoomLevel: number;
}

export const ContractContent = ({ zoomLevel }: ContractContentProps) => {
  return (
    <ScrollArea className="h-[500px] rounded-md border p-4">
      <div style={{ zoom: `${zoomLevel}%` }}>
        <div className="prose max-w-none">
          <h1 className="text-2xl font-bold mb-6">NON-DISCLOSURE AGREEMENT</h1>
          
          <p className="mb-4">
            This Non-Disclosure Agreement (the "Agreement") is entered into as of {new Date().toLocaleDateString()}, by and between:
            Startup Spark, Inc. (the "Company"), a California corporation, with its principal office located at 123 Innovation Drive, San Francisco, CA 94105, and
            the undersigned individual ("Intern").
          </p>

          <p className="mb-4">Collectively referred to as the "Parties."</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">1. Purpose</h2>
          <p>
            The Company intends to provide the Intern with access to certain confidential and proprietary information in connection with the Intern's engagement as an intern with the Company (the "Purpose"). This Agreement is intended to prevent the unauthorized disclosure of such information.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">2. Confidential Information</h2>
          <p>
            For the purposes of this Agreement, "Confidential Information" refers to any and all information disclosed by the Company to the Intern, whether oral, written, or in any other form, which is designated as confidential or proprietary or which, under the circumstances surrounding the disclosure, ought to be treated as confidential. This includes, but is not limited to:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Business strategies, plans, and forecasts;</li>
            <li>Financial information, pricing, and budgets;</li>
            <li>Client lists and contact information;</li>
            <li>Product designs, prototypes, and technical data;</li>
            <li>Marketing strategies and customer data;</li>
            <li>Any other information related to the Company's products, services, or business operations.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">3. Obligations of the Intern</h2>
          <p>The Intern agrees to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Keep all Confidential Information strictly confidential;</li>
            <li>Use Confidential Information only for the Purpose;</li>
            <li>Take all reasonable precautions to protect confidentiality;</li>
            <li>Not copy or reproduce Confidential Information except as necessary.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">4. Duration</h2>
          <p>This Agreement shall remain in effect for a period of two (2) years from the date of signing.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">5. Governing Law</h2>
          <p>This Agreement shall be governed by and construed in accordance with the laws of the State of California.</p>
        </div>
      </div>
    </ScrollArea>
  );
};