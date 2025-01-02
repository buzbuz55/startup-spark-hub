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
          <p className="mb-4">
            The Company intends to provide the Intern with access to certain confidential and proprietary information in connection with the Intern's engagement as an intern with the Company (the "Purpose"). This Agreement is intended to prevent the unauthorized disclosure of such information.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">2. Confidential Information</h2>
          <p className="mb-4">
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
          <p className="mb-2">The Intern agrees to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Keep all Confidential Information strictly confidential and not disclose it to any third party without the prior written consent of the Company;</li>
            <li>Use the Confidential Information only for the Purpose of the internship, and not for any personal or other business purposes;</li>
            <li>Take all reasonable precautions to protect the confidentiality of the Confidential Information, using at least the same degree of care as the Intern would use to protect their own confidential information;</li>
            <li>Not copy, reproduce, or otherwise use the Confidential Information except as necessary for the performance of their duties during the internship.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">4. Exclusions from Confidential Information</h2>
          <p className="mb-2">The obligations set forth in Section 3 shall not apply to any information that:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Is or becomes publicly available through no fault of the Intern;</li>
            <li>Was already in the possession of the Intern without obligation of confidentiality before receiving it from the Company;</li>
            <li>Is independently developed by the Intern without reference to the Company's Confidential Information;</li>
            <li>Is disclosed with the prior written consent of the Company.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">5. Duration of Confidentiality Obligations</h2>
          <p className="mb-4">
            The obligations of confidentiality shall remain in effect for a period of two (2) years after the termination of the Intern's engagement with the Company, or until such time as the Confidential Information becomes publicly available through no fault of the Intern, whichever occurs first.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">6. Return of Confidential Information</h2>
          <p className="mb-4">
            Upon termination of the internship, or upon the Company's request at any time, the Intern agrees to immediately return or destroy all Confidential Information in their possession, including any copies or materials that contain such information.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">7. No License or Ownership Rights</h2>
          <p className="mb-4">
            Nothing in this Agreement grants the Intern any rights or licenses to the Company's Confidential Information, patents, trademarks, copyrights, or any other intellectual property rights of the Company. All Confidential Information remains the sole and exclusive property of the Company.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">8. No Obligation to Employ</h2>
          <p className="mb-4">
            This Agreement does not obligate the Company to retain the Intern as an employee, and the Company may terminate the internship relationship at any time, with or without cause, and without liability to the Intern.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">9. Governing Law</h2>
          <p className="mb-4">
            This Agreement shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-3">10. Miscellaneous</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>This Agreement constitutes the entire agreement between the Parties concerning confidentiality and supersedes all prior or contemporaneous understandings, agreements, or representations related to the subject matter of this Agreement.</li>
            <li>Any amendments or modifications to this Agreement must be made in writing and signed by both Parties.</li>
            <li>If any provision of this Agreement is deemed invalid or unenforceable, the remainder of the Agreement shall remain in full force and effect.</li>
          </ul>

          <p className="mt-8 mb-4">IN WITNESS WHEREOF, the Parties have executed this Non-Disclosure Agreement as of the date first written above.</p>

          <div className="mt-8">
            <p className="font-semibold">Startup Spark, Inc.</p>
            <p className="mt-4">By: ___________________________</p>
            <p className="mt-2">Name: _________________________</p>
            <p className="mt-2">Title: __________________________</p>
            <p className="mt-2">Date: __________________________</p>
          </div>

          <div className="mt-8">
            <p className="font-semibold">Intern</p>
            <p className="mt-4">By: ___________________________</p>
            <p className="mt-2">Name: _________________________</p>
            <p className="mt-2">Date: __________________________</p>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};