
import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Lightbulb, TrendingUp, ChevronRight, Check, FileText, Download, Sparkles } from "lucide-react";
import { formatCurrency, formatNumber } from "@/utils/dataUtils";

interface AIAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardData: any;
}

const AIAnalysisModal = ({ isOpen, onClose, dashboardData }: AIAnalysisModalProps) => {
  const [analysisStage, setAnalysisStage] = useState<number>(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  // Mock thought process stages
  const thoughtStages = [
    "Connecting to data sources...",
    "Loading sales data...",
    "Analyzing revenue patterns...",
    "Identifying key performance indicators...",
    "Examining customer behavior...",
    "Detecting market trends...",
    "Evaluating product performance...",
    "Comparing regional metrics...",
    "Formulating recommendations...",
    "Generating comprehensive report..."
  ];
  
  // Simulate the analysis process
  useEffect(() => {
    if (!isOpen) return;
    
    let stage = 0;
    const intervalId = setInterval(() => {
      if (stage < thoughtStages.length - 1) {
        stage += 1;
        setAnalysisStage(stage);
      } else {
        setAnalysisComplete(true);
        clearInterval(intervalId);
      }
    }, 800);
    
    return () => clearInterval(intervalId);
  }, [isOpen]);
  
  // Generate improvement opportunities
  const opportunities = [
    {
      title: "Inventory Optimization",
      description: "Current inventory levels for 'Electronics' category are 32% higher than optimal. Consider reducing stock levels to free up capital.",
      impact: "high",
      metrics: "Estimated cost savings: $24,500 per quarter",
      action: "Reduce inventory by 20% for Electronics category over the next 60 days"
    },
    {
      title: "Regional Expansion",
      description: "Latin America shows 26% growth potential with minimal current market penetration. Your products match regional demand patterns.",
      impact: "medium",
      metrics: "Projected revenue increase: $125,000 in first year",
      action: "Develop market entry strategy for Mexico and Brazil"
    },
    {
      title: "Customer Retention",
      description: "Enterprise segment customer renewal rates have dropped by 12%. Data suggests pricing concerns are the primary factor.",
      impact: "high",
      metrics: "Customer lifetime value impact: -$85,000 annually",
      action: "Review enterprise pricing structure and consider loyalty incentives"
    },
    {
      title: "Marketing Reallocation",
      description: "Current marketing spend shows 3.4x higher ROI on digital channels vs. traditional marketing for your target demographics.",
      impact: "medium",
      metrics: "Potential efficiency gain: 42% more leads with same budget",
      action: "Shift 35% of traditional marketing budget to digital channels"
    }
  ];
  
  // Analysis insights broken down by category
  const insights = {
    revenue: [
      "Monthly revenue growth is accelerating at 14%, with Technology (+21%) and Healthcare (+18%) as top performing sectors",
      "Weekend sales have increased by 27% in the last quarter, suggesting opportunity for targeted weekend promotions",
      "Average order value has increased by 8.3% while order frequency has remained stable"
    ],
    customers: [
      "Customer acquisition cost has decreased by 8.5% while customer lifetime value has increased by 12%",
      "First-time buyer conversion rate is 23% higher from social media channels compared to search engines",
      "Enterprise segment shows 18% higher profit margins but 12% lower renewal rates than SMB segment"
    ],
    products: [
      "Product return rate (2.3%) is significantly below industry average (7.8%)",
      "Cross-selling success rate has increased 15% but only in specific product categories",
      "'Home Goods' category shows seasonal variance of 42%, indicating opportunity for inventory planning"
    ],
    regions: [
      "Western region shows 23% higher profit margins despite only 7% higher sales volume",
      "APAC customer acquisition costs are 35% lower with 18% higher average order value",
      "European market penetration remains 22% below projections despite targeted campaigns"
    ]
  };
  
  // Generate action plan steps
  const actionPlan = [
    {
      title: "Immediate Actions (Next 30 Days)",
      steps: [
        "Reduce inventory levels for Electronics category by 10%",
        "Implement weekend flash sale program for Technology products",
        "Review and adjust Enterprise segment pricing structure",
        "Shift 20% of traditional marketing budget to digital channels"
      ]
    },
    {
      title: "Short-Term Strategy (60-90 Days)",
      steps: [
        "Develop Latin America market entry plan focusing on Mexico and Brazil",
        "Create cross-selling bundles for highest performing product combinations",
        "Launch enterprise customer retention program with loyalty incentives",
        "Optimize inventory levels for seasonal 'Home Goods' category"
      ]
    },
    {
      title: "Long-Term Initiatives (6-12 Months)",
      steps: [
        "Expand Western region sales team by 25% to capitalize on higher margins",
        "Develop specialized product offerings for high-growth sectors",
        "Implement advanced customer segmentation based on lifetime value metrics",
        "Establish partnerships with regional distributors in APAC markets"
      ]
    }
  ];
  
  const handleDownloadReport = () => {
    // In a real app, this would generate and download a PDF report
    console.log("Downloading AI analysis report...");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            AI Sales Performance Analysis
          </DialogTitle>
          <DialogDescription>
            Deep analysis of your sales data with actionable insights and recommendations
          </DialogDescription>
        </DialogHeader>
        
        {!analysisComplete ? (
          <div className="py-8">
            <div className="flex justify-center mb-6">
              <div className="relative h-2 w-full max-w-md bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${(analysisStage / (thoughtStages.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <RefreshCw className="h-8 w-8 text-primary animate-spin" />
              </div>
              <h3 className="text-lg font-medium">Analyzing Your Sales Data</h3>
              <p className="text-muted-foreground mt-1">Please wait while our AI analyzes your data</p>
            </div>
            
            <div className="border rounded-lg p-4 max-h-60 overflow-y-auto font-mono text-sm">
              {thoughtStages.slice(0, analysisStage + 1).map((thought, index) => (
                <div key={index} className="py-1 flex items-start">
                  <span className="text-primary mr-2">&gt;</span>
                  <span className={index === analysisStage ? "animate-pulse" : ""}>
                    {thought}
                    {index < analysisStage && (
                      <span className="text-green-500 ml-2">Done</span>
                    )}
                    {index === analysisStage && (
                      <span className="animate-pulse">...</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <Tabs defaultValue="analysis" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="action-plan">Action Plan</TabsTrigger>
              </TabsList>
              
              {/* Analysis Overview Tab */}
              <TabsContent value="analysis" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-medium flex items-center mb-3">
                      <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                      Performance Summary
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-0.5">
                          <Check className="h-4 w-4" />
                        </span>
                        <span>
                          <strong>Revenue:</strong> {formatCurrency(dashboardData?.kpi?.currentPeriod?.revenue || 0)} 
                          <span className="text-green-600"> (+{dashboardData?.kpi?.currentPeriod?.profitMargin || 8}%)</span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-0.5">
                          <Check className="h-4 w-4" />
                        </span>
                        <span>
                          <strong>Orders:</strong> {formatNumber(dashboardData?.kpi?.currentPeriod?.orders || 0)} 
                          <span className="text-green-600"> (+12%)</span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-0.5">
                          <Check className="h-4 w-4" />
                        </span>
                        <span>
                          <strong>Customer Growth:</strong> {formatNumber(dashboardData?.kpi?.currentPeriod?.customers || 0)}
                          <span className="text-green-600"> (+9%)</span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-amber-500 mt-0.5">
                          <Check className="h-4 w-4" />
                        </span>
                        <span>
                          <strong>Top Category:</strong> Technology
                          <span className="text-green-600"> (+21%)</span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <span className="text-red-500 mt-0.5">
                          <Check className="h-4 w-4" />
                        </span>
                        <span>
                          <strong>Concerning:</strong> Enterprise renewal rates
                          <span className="text-red-600"> (-12%)</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <h3 className="font-medium flex items-center mb-3">
                      <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                      Key Recommendations
                    </h3>
                    <ul className="space-y-2">
                      {opportunities.slice(0, 3).map((opp, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{opp.title}: {opp.description.split('.')[0]}.</span>
                        </li>
                      ))}
                      <li className="text-sm text-muted-foreground italic">
                        See "Opportunities" tab for more details...
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium mb-3">AI Analysis Summary</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on comprehensive analysis of your sales data, we've identified several patterns and opportunities
                    to optimize your business performance. Your overall growth trend is positive at 14% month-over-month,
                    with notable strengths in Technology and Healthcare sectors. However, there are specific areas requiring
                    attention, particularly in inventory management, enterprise customer retention, and regional expansion opportunities.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-between">
                    <Button 
                      variant="default"
                      className="flex items-center gap-2"
                      onClick={() => setActiveTab("action-plan")}
                    >
                      <Check className="h-4 w-4" />
                      View Action Plan
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={handleDownloadReport}
                    >
                      <FileText className="h-4 w-4" />
                      <Download className="h-4 w-4" />
                      Download Full Report
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              {/* Opportunities Tab */}
              <TabsContent value="opportunities" className="space-y-4 pt-4">
                <div className="space-y-4">
                  {opportunities.map((opp, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          <Lightbulb className={`h-4 w-4 mr-2 ${
                            opp.impact === 'high' ? 'text-rose-500' : 
                            opp.impact === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                          }`} />
                          {opp.title}
                        </h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          opp.impact === 'high' ? 'bg-rose-100 text-rose-700' : 
                          opp.impact === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {opp.impact.toUpperCase()} IMPACT
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{opp.description}</p>
                      <div className="text-sm bg-muted/50 p-2 rounded mb-2">
                        <strong>Metrics:</strong> {opp.metrics}
                      </div>
                      <div className="text-sm font-medium">
                        <strong>Recommended Action:</strong> {opp.action}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Detailed Insights Tab */}
              <TabsContent value="insights" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-medium mb-3">Revenue & Sales Insights</h3>
                    <ul className="space-y-2">
                      {insights.revenue.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-blue-500 mt-0.5">
                            <Check className="h-4 w-4" />
                          </span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-medium mb-3">Customer Insights</h3>
                    <ul className="space-y-2">
                      {insights.customers.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-purple-500 mt-0.5">
                            <Check className="h-4 w-4" />
                          </span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-medium mb-3">Product Insights</h3>
                    <ul className="space-y-2">
                      {insights.products.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-emerald-500 mt-0.5">
                            <Check className="h-4 w-4" />
                          </span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg border">
                    <h3 className="font-medium mb-3">Regional Insights</h3>
                    <ul className="space-y-2">
                      {insights.regions.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-amber-500 mt-0.5">
                            <Check className="h-4 w-4" />
                          </span>
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Action Plan Tab */}
              <TabsContent value="action-plan" className="space-y-4 pt-4">
                <div className="p-4 rounded-lg border mb-4">
                  <h3 className="font-medium mb-2">AI-Generated Action Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    Based on our analysis of your sales data, we've created a comprehensive action plan to
                    help you improve performance and capitalize on the opportunities identified. The plan is
                    organized into immediate, short-term, and long-term initiatives.
                  </p>
                </div>
                
                {actionPlan.map((phase, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <h3 className="font-medium mb-3">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-2 text-sm">
                          <span className="bg-primary/10 p-1 rounded-full flex-shrink-0">
                            <span className="h-4 w-4 flex items-center justify-center text-xs font-medium">
                              {stepIndex + 1}
                            </span>
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                <div className="flex justify-end">
                  <Button 
                    variant="default"
                    className="flex items-center gap-2"
                    onClick={handleDownloadReport}
                  >
                    <FileText className="h-4 w-4" />
                    <Download className="h-4 w-4" />
                    Download Full Report with Action Plan
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AIAnalysisModal;
