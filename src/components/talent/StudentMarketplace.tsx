import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { DollarSign, Upload, ShoppingCart, List } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  studentName: string;
}

const StudentMarketplace = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: "Web Development Tutoring",
      description: "One-on-one tutoring sessions for web development fundamentals",
      price: 25,
      category: "Programming",
      studentName: "Alex Johnson"
    },
    {
      id: 2,
      title: "UI/UX Design Consultation",
      description: "Professional UI/UX design feedback and consultation",
      price: 35,
      category: "Design",
      studentName: "Sarah Chen"
    }
  ]);

  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(newService.price);
    
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    const service: Service = {
      id: services.length + 1,
      ...newService,
      price,
      studentName: "Current Student" // In a real app, this would come from auth
    };

    setServices([...services, service]);
    setNewService({ title: "", description: "", price: "", category: "" });
    toast.success("Service listed successfully!");
  };

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Student Services Marketplace
        </h2>
        <p className="text-gray-600">Offer your skills and services to earn while you learn</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Upload className="w-5 h-5" />
            List Your Service
          </h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Service Title</label>
              <Input
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                placeholder="e.g., Programming Tutoring"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Describe your service..."
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Price ($/hour)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                    placeholder="25"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Input
                  value={newService.category}
                  onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                  placeholder="e.g., Programming"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">List Service</Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <List className="w-5 h-5" />
          Available Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <h4 className="text-lg font-semibold">{service.title}</h4>
                <Badge variant="secondary">{service.category}</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">${service.price}/hr</span>
                  <span className="text-sm text-gray-500">by {service.studentName}</span>
                </div>
                <Button className="w-full" variant="outline">
                  Contact Provider
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentMarketplace;