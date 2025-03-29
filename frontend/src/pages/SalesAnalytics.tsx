
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  BarChart3, 
  ChevronDown, 
  Download, 
  ArrowUpRight, 
  Calendar, 
  LineChart, 
  PieChart, 
  CreditCard, 
  RefreshCw 
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import StatCard from "@/components/dashboard/StatCard";
import LineChartComponent from "@/components/dashboard/LineChart";
import BarChartComponent from "@/components/dashboard/BarChart";
import PieChartComponent from "@/components/dashboard/PieChart";
import { toast } from "sonner";
import { getAllDashboardData, productCategories, salesRegions } from "@/services/mockDataService";
import { formatCurrency, formatNumber } from "@/utils/dataUtils";

const SalesAnalytics = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30days");
  const [activeTab, setActiveTab] = useState("overview");
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [projectName, setProjectName] = useState("Sales Analytics");

  useEffect(() => {
    // Get project information from URL parameters if available
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    
    if (name) {
      setProjectName(`${name} - Analytics`);
    }
    
    // Load data
    setLoading(true);
    
    setTimeout(() => {
      const data = getAllDashboardData();
      setAnalyticsData(data);
      setLoading(false);
    }, 1200);
  }, [location.search, timeRange]);

  const handleExportData = (format: string) => {
    toast.success(`Analytics data exported as ${format.toUpperCase()} file`);
  };

  // Prepare chart data
  const salesTrendsData = !loading && analyticsData
    ? analyticsData.salesData.map((item: any) => ({
        date: item.date,
        revenue: item.revenue,
        orders: item.orders,
        customers: item.customers
      }))
    : [];

  const categoryData = !loading && analyticsData
    ? productCategories.map((category, index) => {
        const colors = [
          "#0EA5E9", "#8B5CF6", "#F43F5E", "#10B981", "#F59E0B", 
          "#6366F1", "#EC4899"
        ];
        
        return {
          name: category,
          value: analyticsData.productSales.find(
            (p: any) => p.category === category
          )?.revenue || 0,
          color: colors[index % colors.length],
        };
      })
    : [];

  const channelData = !loading && analyticsData ? [
    { name: "Direct", value: 35, color: "#0EA5E9" },
    { name: "Referral", value: 25, color: "#8B5CF6" },
    { name: "Social", value: 20, color: "#F43F5E" },
    { name: "Organic", value: 15, color: "#10B981" },
    { name: "Paid", value: 5, color: "#F59E0B" }
  ] : [];

  const regionalData = !loading && analyticsData
    ? analyticsData.regionalSales.map((item: any) => ({
        region: item.region,
        revenue: item.revenue,
        growth: item.growth,
      }))
    : [];

  return (
    <DashboardLayout title={projectName}>
      <div className="flex flex-col gap-6">
        {/* Page header with filters and action buttons */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Sales Analytics</h1>
              <p className="text-muted-foreground">
                In-depth analysis of sales performance and trends
              </p>
            </div>
            
            {/* Export Button */}
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Export Analytics</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleExportData("csv")}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportData("xlsx")}>
                    Export as Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExportData("pdf")}>
                    Export as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" className="flex items-center gap-2" onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4" />
                <span className="hidden md:inline">Refresh</span>
              </Button>
            </div>
          </div>
          
          {/* Time range selector */}
          <div className="flex flex-wrap gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {timeRange === "7days"
                      ? "Last 7 days"
                      : timeRange === "30days"
                      ? "Last 30 days"
                      : timeRange === "90days"
                      ? "Last 90 days"
                      : "Custom Range"}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Time Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTimeRange("7days")}>
                  Last 7 days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("30days")}>
                  Last 30 days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("90days")}>
                  Last 90 days
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("custom")}>
                  Custom Range
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Sales"
            value={loading ? "Loading..." : formatCurrency(analyticsData?.kpi.currentPeriod.revenue)}
            icon={<CreditCard className="h-5 w-5" />}
            currentValue={!loading ? analyticsData?.kpi.currentPeriod.revenue : undefined}
            previousValue={!loading ? analyticsData?.kpi.previousPeriod.revenue : undefined}
            loading={loading}
          />
          <StatCard
            title="Average Order Value"
            value={loading ? "Loading..." : formatCurrency(analyticsData?.kpi.currentPeriod.revenue / analyticsData?.kpi.currentPeriod.orders)}
            icon={<ArrowUpRight className="h-5 w-5" />}
            currentValue={!loading ? analyticsData?.kpi.currentPeriod.revenue / analyticsData?.kpi.currentPeriod.orders : undefined}
            previousValue={!loading ? analyticsData?.kpi.previousPeriod.revenue / analyticsData?.kpi.previousPeriod.orders : undefined}
            loading={loading}
          />
          <StatCard
            title="Conversion Rate"
            value={loading ? "Loading..." : "3.2%"}
            icon={<BarChart3 className="h-5 w-5" />}
            currentValue={!loading ? 3.2 : undefined}
            previousValue={!loading ? 2.8 : undefined}
            loading={loading}
          />
          <StatCard
            title="Revenue Growth"
            value={loading ? "Loading..." : "12.5%"}
            icon={<LineChart className="h-5 w-5" />}
            currentValue={!loading ? 12.5 : undefined}
            previousValue={!loading ? 10.2 : undefined}
            loading={loading}
          />
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Revenue performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChartComponent
                    data={salesTrendsData}
                    xKey="date"
                    yKeys={[
                      { key: "revenue", name: "Revenue", color: "#0EA5E9" }
                    ]}
                    loading={loading}
                    height={300}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>Distribution across product categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChartComponent
                    data={categoryData}
                    height={300}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Regional Performance</CardTitle>
                <CardDescription>Sales distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChartComponent
                  data={regionalData}
                  xKey="region"
                  yKeys={[
                    { key: "revenue", name: "Revenue", color: "#8B5CF6" },
                    { key: "growth", name: "Growth %", color: "#10B981" }
                  ]}
                  loading={loading}
                  height={300}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sales vs Orders Trend</CardTitle>
                  <CardDescription>Comparing revenue and order volume over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <LineChartComponent
                    data={salesTrendsData}
                    xKey="date"
                    yKeys={[
                      { key: "revenue", name: "Revenue", color: "#0EA5E9" },
                      { key: "orders", name: "Orders", color: "#F43F5E" }
                    ]}
                    loading={loading}
                    height={350}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Growth Trend</CardTitle>
                  <CardDescription>New and returning customers over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <LineChartComponent
                    data={salesTrendsData}
                    xKey="date"
                    yKeys={[
                      { key: "customers", name: "Customers", color: "#10B981" }
                    ]}
                    loading={loading}
                    height={350}
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Seasonality Analysis</CardTitle>
                <CardDescription>Identifying seasonal patterns in sales</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="w-full h-[300px]" />
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {["Q1", "Q2", "Q3", "Q4"].map((quarter) => (
                        <div key={quarter} className="bg-muted/20 p-4 rounded-lg">
                          <h3 className="font-medium mb-1">{quarter}</h3>
                          <div className="text-2xl font-bold">
                            {quarter === "Q1" ? "$245,680" : 
                             quarter === "Q2" ? "$312,450" : 
                             quarter === "Q3" ? "$458,920" : "$398,740"}
                          </div>
                          <div className={`text-sm mt-1 ${
                            quarter === "Q1" ? "text-yellow-600" : 
                            quarter === "Q2" ? "text-green-600" : 
                            quarter === "Q3" ? "text-green-600" : "text-green-600"
                          }`}>
                            {quarter === "Q1" ? "+2.4%" : 
                             quarter === "Q2" ? "+12.8%" : 
                             quarter === "Q3" ? "+24.5%" : "+16.2%"}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Monthly Performance</h3>
                      <div className="grid grid-cols-12 gap-1 h-20">
                        {Array.from({ length: 12 }).map((_, i) => {
                          const heights = [60, 45, 55, 40, 65, 75, 80, 90, 95, 70, 75, 85];
                          return (
                            <div key={i} className="flex flex-col items-center">
                              <div 
                                className="w-full bg-primary/60 rounded-t-sm" 
                                style={{ height: `${heights[i]}%` }}
                              ></div>
                              <div className="text-xs mt-1">{["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"][i]}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="channels" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Sales by Channel</CardTitle>
                  <CardDescription>Revenue distribution across different sales channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChartComponent
                    data={channelData}
                    xKey="name"
                    yKeys={[
                      { key: "value", name: "Percentage", color: "#8B5CF6" }
                    ]}
                    loading={loading}
                    height={300}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Channel Distribution</CardTitle>
                  <CardDescription>Percentage breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChartComponent
                    data={channelData}
                    height={300}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Channel Performance Metrics</CardTitle>
                <CardDescription>Detailed analysis of each sales channel</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="w-full h-[300px]" />
                ) : (
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs bg-muted/20">
                        <tr>
                          <th scope="col" className="px-4 py-3 font-medium">Channel</th>
                          <th scope="col" className="px-4 py-3 font-medium">Revenue</th>
                          <th scope="col" className="px-4 py-3 font-medium">Orders</th>
                          <th scope="col" className="px-4 py-3 font-medium">Avg. Order Value</th>
                          <th scope="col" className="px-4 py-3 font-medium">Conversion Rate</th>
                          <th scope="col" className="px-4 py-3 font-medium">Growth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {["Direct", "Referral", "Social", "Organic", "Paid"].map((channel, index) => (
                          <tr key={channel} className="border-b">
                            <td className="px-4 py-3 font-medium">{channel}</td>
                            <td className="px-4 py-3">{["$324,500", "$186,320", "$145,780", "$98,450", "$42,300"][index]}</td>
                            <td className="px-4 py-3">{["2,456", "1,532", "1,245", "876", "354"][index]}</td>
                            <td className="px-4 py-3">{["$132.13", "$121.62", "$117.09", "$112.39", "$119.49"][index]}</td>
                            <td className="px-4 py-3">{["4.2%", "3.8%", "3.1%", "2.7%", "1.9%"][index]}</td>
                            <td className={`px-4 py-3 ${index === 0 || index === 2 ? "text-green-600" : index === 4 ? "text-red-600" : "text-yellow-600"}`}>
                              {["+14.2%", "+8.5%", "+21.3%", "+5.8%", "-3.2%"][index]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="geography" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Sales Distribution</CardTitle>
                  <CardDescription>Revenue breakdown by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChartComponent
                    data={regionalData}
                    xKey="region"
                    yKeys={[
                      { key: "revenue", name: "Revenue", color: "#0EA5E9" }
                    ]}
                    loading={loading}
                    height={300}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Regional Growth Rates</CardTitle>
                  <CardDescription>Year-over-year growth by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChartComponent
                    data={regionalData}
                    xKey="region"
                    yKeys={[
                      { key: "growth", name: "Growth %", color: "#10B981" }
                    ]}
                    loading={loading}
                    height={300}
                  />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Geographic Performance Details</CardTitle>
                <CardDescription>Detailed metrics by region and country</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="w-full h-[300px]" />
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-3">Top Performing Regions</h3>
                        <div className="space-y-3">
                          {salesRegions.slice(0, 5).map((region, index) => (
                            <div key={region} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: ["#0EA5E9", "#8B5CF6", "#F43F5E", "#10B981", "#F59E0B"][index] }}></div>
                                <span>{region}</span>
                              </div>
                              <div className="font-medium">
                                {["$245,680", "$198,320", "$165,450", "$145,780", "$125,340"][index]}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Highest Growth Regions</h3>
                        <div className="space-y-3">
                          {["Asia-Pacific", "Latin America", "Middle East", "North America", "Africa"].map((region, index) => (
                            <div key={region} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: ["#10B981", "#0EA5E9", "#F59E0B", "#8B5CF6", "#F43F5E"][index] }}></div>
                                <span>{region}</span>
                              </div>
                              <div className="font-medium text-green-600">
                                {["+24.5%", "+18.2%", "+15.8%", "+12.3%", "+10.5%"][index]}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Market Penetration</h3>
                      <div className="space-y-4">
                        {["North America", "Europe", "Asia-Pacific"].map((region, index) => (
                          <div key={region}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">{region}</span>
                              <span className="text-sm font-medium">{["78%", "65%", "42%"][index]}</span>
                            </div>
                            <div className="w-full bg-muted/30 rounded-full h-2.5">
                              <div 
                                className="bg-primary h-2.5 rounded-full" 
                                style={{ width: ["78%", "65%", "42%"][index] }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SalesAnalytics;
