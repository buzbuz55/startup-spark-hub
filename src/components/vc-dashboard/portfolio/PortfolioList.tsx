import { TrendingUp, TrendingDown } from "lucide-react";

interface PortfolioCompany {
  id: string;
  company_name: string;
  sector: string;
  investment_amount: number;
  equity_percentage: number;
  status: 'up' | 'down';
}

interface PortfolioListProps {
  companies: PortfolioCompany[];
}

const PortfolioList = ({ companies }: PortfolioListProps) => {
  return (
    <div className="space-y-4">
      {companies?.map((company) => (
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
  );
};

export default PortfolioList;