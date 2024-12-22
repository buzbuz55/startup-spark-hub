export interface PortfolioCompany {
  id: string;
  company_name: string;
  sector: string;
  investment_amount: number;
  equity_percentage: number;
  investment_date: string;
  status: 'up' | 'down';
  created_at: string;
  updated_at: string;
  vc_firm_id: string;
  stage: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface PortfolioStatsProps {
  totalInvestment: number;
  companiesCount: number;
  averageInvestment: number;
}