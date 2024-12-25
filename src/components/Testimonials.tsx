import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  return (
    <div className="py-28 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center mb-16">
          Backed by Top VCs and Founders
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <div className="font-semibold text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">{testimonial.quote}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const testimonials = [
  {
    name: "Alex Chen",
    role: "Founder @ TechVentures",
    quote: "This platform helped us build and launch our MVP in just 2 weeks. The feedback from VCs was invaluable!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop",
  },
  {
    name: "Sarah Johnson",
    role: "Partner @ Seed Fund",
    quote: "As an investor, I love how easy it is to connect with promising young founders and provide mentorship.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop",
  },
  {
    name: "Mike Thompson",
    role: "CEO @ StartupX",
    quote: "The collaboration tools are next level. It's like Discord meets Figma, but better for startup teams.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop",
  },
];

export default Testimonials;