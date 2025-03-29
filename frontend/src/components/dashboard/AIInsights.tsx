
import { useState } from "react";
import { Sparkle, ArrowRight, AlertCircle, TrendingUp, BarChartHorizontal, Users, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface Insight {
  id: number;
  title: string;
  insight: string;
  impact: "low" | "medium" | "high";
  category: string;
}

interface AIInsightsProps {
  insights?: Insight[];
}

const AIInsights = ({ insights }: AIInsightsProps) => {
  const [loading, setLoading] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [currentInsights, setCurrentInsights] = useState<Insight[]>(insights || []);

  const handleGenerateInsights = () => {
    setLoading(true);
    setShowInsights(false);
    
    // Simulate AI analysis
    setTimeout(() => {
      setLoading(false);
      setShowInsights(true);
      
      if (!insights) {
        // If no insights were provided, generate mock ones
        const mockInsights = [
          {
            id: 1,
            title: "Revenue Growth Opportunity",
            insight: "Product category 'Electronics' shows 27% higher conversion rates on weekends. Consider adjusting your marketing budget to increase weekend promotions.",
            impact: "high" as const,
            category: "revenue"
          },
          {
            id: 2,
            title: "Customer Retention Risk",
            insight: "Customers in the 'Enterprise' segment show a 12% decline in repeat purchases over the last 30 days.",
            impact: "medium" as const,
            category: "customers"
          },
          {
            id: 3,
            title: "Product Performance Alert",
            insight: "The 'Beauty' category has experienced a 31% increase in return rates, significantly higher than the average 8% for this category historically.",
            impact: "high" as const,
            category: "products"
          }
        ];
        setCurrentInsights(mockInsights);
      }
      
      toast.success("AI analysis completed successfully!");
    }, 2500);
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'revenue':
        return <TrendingUp className="h-5 w-5" />;
      case 'customers':
        return <Users className="h-5 w-5" />;
      case 'products':
        return <ShoppingBag className="h-5 w-5" />;
      case 'operations':
        return <BarChartHorizontal className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };
  
  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'text-dashboard-rose';
      case 'medium':
        return 'text-dashboard-amber';
      case 'low':
        return 'text-dashboard-emerald';
      default:
        return 'text-dashboard-blue';
    }
  };

  return (
    <Card className="shadow-md border-t-4 border-t-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Sparkle className="h-5 w-5 mr-2 text-dashboard-amber" />
              AI-Powered Insights
            </CardTitle>
            <CardDescription>
              Analyze current data and get actionable recommendations
            </CardDescription>
          </div>
          <Button 
            onClick={handleGenerateInsights} 
            disabled={loading}
            className="bg-gradient-to-r from-dashboard-blue to-dashboard-purple hover:from-dashboard-purple hover:to-dashboard-blue"
          >
            {loading ? (
              <>Analyzing Data...</>
            ) : (
              <>
                <Sparkle className="mr-2 h-4 w-4" />
                Run Analysis
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        )}
        
        {!loading && showInsights && (
          <div className="space-y-4">
            {currentInsights.map((insight) => (
              <div 
                key={insight.id} 
                className="p-4 bg-card rounded-lg border animate-fade-in"
                style={{ animationDelay: `${insight.id * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    {getCategoryIcon(insight.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{insight.title}</h4>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getImpactColor(insight.impact)} bg-opacity-10`}>
                        {insight.impact.toUpperCase()} IMPACT
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{insight.insight}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && !showInsights && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Sparkle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Get Smart Recommendations</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Click "Run Analysis" to have our AI analyze your current sales data and provide actionable insights.
            </p>
          </div>
        )}
      </CardContent>
      {!loading && showInsights && (
        <CardFooter className="border-t pt-4">
          <Button variant="outline" className="w-full" onClick={() => setShowInsights(false)}>
            <span>View Detailed Report</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AIInsights;
