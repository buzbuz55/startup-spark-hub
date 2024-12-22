import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { PortfolioStatsProps } from "../types";

const PortfolioStats = ({ totalInvestment, companiesCount, averageInvestment }: PortfolioStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 text-purple-400 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-400">Total Investment</p>
              <p className="text-2xl font-bold">${totalInvestment.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
        <CardContent className="pt-6">
          <div>
            <p className="text-sm font-medium text-gray-400">Portfolio Companies</p>
            <p className="text-2xl font-bold">{companiesCount}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
        <CardContent className="pt-6">
          <div>
            <p className="text-sm font-medium text-gray-400">Avg Investment</p>
            <p className="text-2xl font-bold">${averageInvestment.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioStats;