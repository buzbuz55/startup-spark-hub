import { Building2, Wallet, Trophy, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const QuickStats = () => {
  const stats = [
    { title: "Portfolio Companies", value: "12", icon: <Building2 />, color: "bg-purple-500" },
    { title: "Total Investments", value: "$8.5M", icon: <Wallet />, color: "bg-blue-500" },
    { title: "Success Exits", value: "3", icon: <Trophy />, color: "bg-green-500" },
    { title: "Active Deals", value: "5", icon: <Target />, color: "bg-orange-500" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/10 border-white/20 backdrop-blur-sm text-white hover:bg-white/20 transition-all">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-purple-200">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.color}`}>
              {stat.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;