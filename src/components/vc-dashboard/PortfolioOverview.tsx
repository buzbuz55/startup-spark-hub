import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import InvestmentTimeline from "./charts/InvestmentTimeline";
import SectorDistribution from "./charts/SectorDistribution";
import PortfolioStats from "./portfolio/PortfolioStats";
import PortfolioList from "./portfolio/PortfolioList";
import { PortfolioCompany } from "./types";

const PortfolioOverview = () => {
  const [timeframe, setTimeframe] = useState("1Y");

  const { data: portfolioCompanies, isLoading } = useQuery({
    queryKey: ['portfolio-companies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_companies')
        .select('*')
        .order('investment_date', { ascending: true });
      
      if (error) throw error;
      
      // Transform the data to match our PortfolioCompany type
      return (data || []).map(company => ({
        ...company,
        status: Math.random() > 0.5 ? 'up' : 'down' // Randomly assign status for demo
      })) as PortfolioCompany[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  const totalInvestment = portfolioCompanies?.reduce((sum, company) => 
    sum + (company.investment_amount || 0), 0
  ) || 0;

  const sectorDistribution = portfolioCompanies?.reduce((acc, company) => {
    acc[company.sector] = (acc[company.sector] || 0) + (company.investment_amount || 0);
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(sectorDistribution || {}).map(([name, value]) => ({
    name,
    value
  }));

  const averageInvestment = Math.round(totalInvestment / (portfolioCompanies?.length || 1));

  return (
    <div className="space-y-6">
      <PortfolioStats 
        totalInvestment={totalInvestment}
        companiesCount={portfolioCompanies?.length || 0}
        averageInvestment={averageInvestment}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Investment Timeline</CardTitle>
              <div className="flex gap-2">
                {["1M", "3M", "6M", "1Y", "ALL"].map((period) => (
                  <Button
                    key={period}
                    variant={timeframe === period ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setTimeframe(period)}
                    className="text-xs"
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <InvestmentTimeline data={portfolioCompanies || []} />
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>Sector Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <SectorDistribution data={pieData} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>Portfolio Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <PortfolioList companies={portfolioCompanies || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioOverview;