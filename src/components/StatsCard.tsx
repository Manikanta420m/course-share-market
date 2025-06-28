
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";

interface StatsCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend: string;
}

const StatsCard = ({ icon, value, label, trend }: StatsCardProps) => {
  const isPositive = trend.startsWith('+');

  return (
    <Card className="border-slate-200 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-3 text-blue-600">
          {icon}
        </div>
        <div className="text-2xl font-bold text-slate-900 mb-1">
          {value}
        </div>
        <div className="text-sm text-slate-600 mb-2">
          {label}
        </div>
        <div className={`text-xs flex items-center justify-center gap-1 ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          <ArrowUp className={`w-3 h-3 ${isPositive ? '' : 'rotate-180'}`} />
          {trend}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
