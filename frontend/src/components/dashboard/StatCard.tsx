
import { ArrowDown, ArrowUp } from "lucide-react";
import { calculatePercentageChange } from "@/utils/dataUtils";

interface StatCardProps {
  title: string;
  value: string | number;
  previousValue?: number;
  currentValue?: number;
  icon?: React.ReactNode;
  loading?: boolean;
}

const StatCard = ({
  title,
  value,
  previousValue,
  currentValue,
  icon,
  loading = false,
}: StatCardProps) => {
  const percentChange = previousValue !== undefined && currentValue !== undefined 
    ? calculatePercentageChange(currentValue, previousValue)
    : undefined;

  return (
    <div className="bg-card p-5 rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
        <div className="absolute right-0 top-0 w-32 h-32 -mr-8 -mt-8 bg-gradient-to-br from-primary/20 to-transparent rounded-full"></div>
      </div>
      
      {loading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-muted rounded w-1/4"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {icon && (
              <div className="text-muted-foreground bg-muted/50 p-2 rounded-full">
                {icon}
              </div>
            )}
          </div>
          <div className="text-2xl font-bold mb-2">{value}</div>
          {percentChange !== undefined && (
            <div className={`flex items-center text-xs font-medium ${
              percentChange >= 0 ? "text-green-600" : "text-red-600"
            } bg-opacity-10 rounded-full py-1 px-2 w-fit ${
              percentChange >= 0 ? "bg-green-50" : "bg-red-50"
            }`}>
              {percentChange >= 0 ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              <span>{Math.abs(percentChange).toFixed(1)}% vs previous period</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StatCard;
