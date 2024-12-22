import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, HelpCircle, Smile, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-24 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="w-16 h-16 mx-auto text-purple-600 mb-6" />
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600">
              Everything you need to know about building your dream startup with us! 🚀
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="what-is">
              <AccordionTrigger className="flex items-center gap-3 text-lg">
                <HelpCircle className="w-5 h-5 text-purple-500" />
                What is Startup Nation?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                We're your one-stop platform for turning brilliant ideas into successful startups! 
                Think of us as your startup's best friend - we connect you with talented team members, 
                provide access to mentors, and help you get in front of investors. 
                No more going it alone! 🤝
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-it-works">
              <AccordionTrigger className="flex items-center gap-3 text-lg">
                <Info className="w-5 h-5 text-purple-500" />
                How does it work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                1. Submit your startup idea 💡
                2. Build your dream team from our talent pool 👥
                3. Connect with mentors and investors 🤝
                4. Get funding and launch your startup 🚀
                It's that simple! We handle the complicated stuff so you can focus on building something amazing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="why-choose">
              <AccordionTrigger className="flex items-center gap-3 text-lg">
                <CheckCircle className="w-5 h-5 text-purple-500" />
                Why choose us?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                • We've helped launch 500+ successful startups 🎯
                • Our startups have raised millions in funding 💰
                • Access to a pool of verified, talented professionals 👥
                • Direct connection with interested investors 🤝
                • Supportive community of fellow founders 🌟
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="who-can-join">
              <AccordionTrigger className="flex items-center gap-3 text-lg">
                <Smile className="w-5 h-5 text-purple-500" />
                Who can join?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pl-8">
                Everyone with a dream and drive! Whether you're:
                • A visionary with a great idea 💭
                • A talented professional looking to join exciting startups 💪
                • An investor seeking the next big thing 🎯
                • A mentor wanting to give back 🌱
                We welcome all passionate individuals ready to make an impact!
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Ready to start your entrepreneurial journey? Join thousands of successful founders who've made their dreams reality with us! 
            </p>
            <a 
              href="/submit-idea" 
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Start Your Journey
              <HelpCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;