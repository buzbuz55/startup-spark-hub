import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const COLORS = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981', '#F59E0B'];

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
      return data;
    }
  });

  const totalInvestment = portfolioCompanies?.reduce((sum, company) => 
    sum + (company.investment_amount || 0), 0
  ) || 0;

  const sectorDistribution = portfolioCompanies?.reduce((acc, company) => {
    acc[company.sector] = (acc[company.sector] || 0) + (company.investment_amount || 0);
    return acc;
  }, {});

  const pieData = Object.entries(sectorDistribution || {}).map(([name, value]) => ({
    name,
    value
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-2xl font-bold">${totalInvestment.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Portfolio Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portfolioCompanies?.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Avg Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${Math.round(totalInvestment / (portfolioCompanies?.length || 1)).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

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
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioCompanies}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="investment_date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="investment_amount" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>Sector Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {pieData.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-400">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>Portfolio Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioCompanies?.map((company) => (
                <div key={company.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div>
                    <p className="font-medium">{company.company_name}</p>
                    <p className="text-sm text-gray-400">{company.sector}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${company.investment_amount?.toLocaleString()}</p>
                    <div className="flex items-center gap-1 text-sm">
                      {company.equity_percentage}% equity
                      {company.status === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioOverview;