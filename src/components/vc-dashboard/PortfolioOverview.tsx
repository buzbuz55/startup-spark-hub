import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
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
            <CardTitle>Portfolio Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioCompanies?.map((company) => (
                <div key={company.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{company.company_name}</p>
                    <p className="text-sm text-gray-400">{company.sector}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${company.investment_amount?.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">{company.equity_percentage}% equity</p>
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