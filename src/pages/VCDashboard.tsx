import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Star, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const VCDashboard = () => {
  const [messageModal, setMessageModal] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<string | null>(null);

  const handleMessage = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setMessageModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">VC Dashboard</h1>
          <p className="text-xl text-gray-200">Discover and connect with promising startups</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex gap-4 mb-8">
            <Input placeholder="Search startups..." className="flex-1" />
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="space-y-6">
            {/* Example Startup Card */}
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">TechStart Solutions</h2>
                  <p className="text-gray-600 mb-4">
                    AI-powered project management platform for remote teams
                  </p>
                  <div className="flex gap-2 mb-4">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      Seeking VC
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      SaaS
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="icon">
                  <Star className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Seeking: $500k - $1M</span>
                <Dialog open={messageModal} onOpenChange={setMessageModal}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => setSelectedStartup("TechStart Solutions")}
                      className="gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Contact
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Message to {selectedStartup}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleMessage} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Proposed Investment Details
                        </label>
                        <Input 
                          placeholder="Investment amount"
                          type="text"
                          className="mb-2"
                        />
                        <Input 
                          placeholder="Proposed valuation"
                          type="text"
                          className="mb-2"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Message
                        </label>
                        <Textarea 
                          placeholder="Enter your message..."
                          className="min-h-[100px]"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCDashboard;