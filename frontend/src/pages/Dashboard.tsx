
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Users,
  CreditCard,
  ArrowUpRight,
  Download,
  Calendar,
  Filter,
  FileSpreadsheet,
  ChevronDown,
  RefreshCw,
  Brain,
  FileText,
  PlusCircle,
  FileUp,
  TrendingUp,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";

import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import LineChart from "@/components/dashboard/LineChart";
import BarChart from "@/components/dashboard/BarChart";
import PieChart from "@/components/dashboard/PieChart";
import AIAnalysisModal from "@/components/dashboard/AIAnalysisModal";

import {
  getAllDashboardData,
  productCategories,
  salesRegions,
  salesTeams,
} from "@/services/mockDataService";
import { formatCurrency, formatNumber } from "@/utils/dataUtils";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("30days");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>("Sales Dashboard");
  const [reportGenerationLoading, setReportGenerationLoading] = useState(false);
  const [showAIAnalysisModal, setShowAIAnalysisModal] = useState(false);

  useEffect(() => {
    // Get project information from URL parameters
    const params = new URLSearchParams(location.search);
    const project = params.get('project');
    const name = params.get('name');
    
    // If no project is specified, redirect to project selection
    if (!project && location.pathname === '/dashboard') {
      navigate('/projects');
      return;
    }
    
    setProjectId(project);
    if (name) {
      setProjectName(name);
    }
    
    // Load data based on the project
    setLoading(true);
    
    setTimeout(() => {
      const data = getAllDashboardData();
      setDashboardData(data);
      setLoading(false);
    }, 1500);
  }, [location.search, timeRange, navigate, location.pathname]);

  const handleExportData = (format: string) => {
    toast.success(`Data exported as ${format.toUpperCase()} file`);
  };
  
  const handleAIAnalysis = () => {
    // Open the AI Analysis modal
    setShowAIAnalysisModal(true);
  };
  
  const handleReportGeneration = () => {
    setReportGenerationLoading(true);
    
    // Simulate report generation
    setTimeout(() => {
      setReportGenerationLoading(false);
      toast.success("Sales report has been generated successfully!");
      
      // In a real app, this would trigger a download or open a preview
      setTimeout(() => {
        handleExportData('pdf');
      }, 500);
    }, 3000);
  };

  const handleNavigateToAIInsights = () => {
    navigate('/insights', { state: { from: 'dashboard' } });
  };

  // Prepare data for charts
  const revenueData = !loading && dashboardData
    ? dashboardData.salesData
        .slice(-30)
        .map((item: any) => ({
          date: item.date.substr(5),
          revenue: item.revenue,
          orders: item.orders,
        }))
    : [];

  const pieChartData = !loading && dashboardData
    ? productCategories.map((category, index) => {
        const colors = [
          "#0EA5E9", // blue
          "#8B5CF6", // purple
          "#F43F5E", // rose
          "#10B981", // emerald
          "#F59E0B", // amber
          "#6366F1", // indigo 
          "#EC4899", // pink
        ];
        
        return {
          name: category,
          value: dashboardData.productSales.find(
            (p: any) => p.category === category
          )?.revenue || 0,
          color: colors[index % colors.length],
        };
      })
    : [];

  const regionalData = !loading && dashboardData
    ? dashboardData.regionalSales.map((item: any) => ({
        region: item.region,
        revenue: item.revenue,
        growth: item.growth,
      }))
    : [];

  const teamData = !loading && dashboardData
    ? dashboardData.teamPerformance.map((item: any) => ({
        team: item.team,
        revenue: item.revenue,
        deals: item.deals,
      }))
    : [];

  // Revenue Analysis Data
  const revenueAnalysisData = !loading && dashboardData
    ? {
        yearlyTrend: Array.from({ length: 12 }).map((_, i) => ({
          month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
          revenue: Math.floor(Math.random() * 50000) + 30000,
          profit: Math.floor(Math.random() * 20000) + 10000,
        })),
        profitMargins: Array.from({ length: 6 }).map((_, i) => ({
          period: [`Q1 ${new Date().getFullYear()-1}`, `Q2 ${new Date().getFullYear()-1}`, 
                  `Q3 ${new Date().getFullYear()-1}`, `Q4 ${new Date().getFullYear()-1}`, 
                  `Q1 ${new Date().getFullYear()}`, `Q2 ${new Date().getFullYear()}`][i],
          margin: [18.5, 20.1, 22.3, 21.8, 23.5, 25.2][i],
        })),
        revenueStreams: [
          { name: 'Product Sales', value: 68 },
          { name: 'Services', value: 23 },
          { name: 'Subscriptions', value: 9 },
        ],
        projections: {
          currentQuarter: formatCurrency(982500),
          nextQuarter: formatCurrency(1128750),
          growth: '+15%',
          nextYear: formatCurrency(4850000),
          yearGrowth: '+22%'
        }
      }
    : null;

  // Data for Sales Analytics (from previous SalesAnalytics page)
  const salesTrendsData = !loading && dashboardData
    ? dashboardData.salesData.map((item: any) => ({
        date: item.date,
        revenue: item.revenue,
        orders: item.orders,
        customers: item.customers
      }))
    : [];

  const categoryData = !loading && dashboardData
    ? productCategories.map((category, index) => {
        const colors = [
          "#0EA5E9", "#8B5CF6", "#F43F5E", "#10B981", "#F59E0B", 
          "#6366F1", "#EC4899"
        ];
        
        return {
          name: category,
          value: dashboardData.productSales.find(
            (p: any) => p.category === category
          )?.revenue || 0,
          color: colors[index % colors.length],
        };
      })
    : [];

  const channelData = !loading && dashboardData ? [
    { name: "Direct", value: 35, color: "#0EA5E9" },
    { name: "Referral", value: 25, color: "#8B5CF6" },
    { name: "Social", value: 20, color: "#F43F5E" },
    { name: "Organic", value: 15, color: "#10B981" },
    { name: "Paid", value: 5, color: "#F59E0B" }
  ] : [];

  return (
    <DashboardLayout title={projectName}>
      <div className="flex flex-col gap-6">
        {/* Page header with filters and action buttons */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">{projectName}</h1>
              <p className="text-muted-foreground">
                Monitor your sales performance and analytics
              </p>
            </div>
            
            {/* AI Analysis and Report Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="default" 
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                onClick={handleAIAnalysis}
              >
                <Brain className="h-4 w-4" />
                <span>AI Analysis</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleReportGeneration}
                disabled={reportGenerationLoading}
              >
                {reportGenerationLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <FileText className="h-4 w-4" />
                )}
                <span>Generate Report</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => navigate('/projects')}
              >
                <PlusCircle className="h-4 w-4" />
                <span className="hidden md:inline">New Project</span>
              </Button>
            </div>
          </div>
          
          {/* Filter options */}
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
              <DropdownMenuContent align="end" className="w-56">
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
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter Data</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Regions</DropdownMenuLabel>
                  {salesRegions.map((region) => (
                    <DropdownMenuItem key={region}>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span>{region}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-xs">Product Categories</DropdownMenuLabel>
                  {productCategories.slice(0, 5).map((category) => (
                    <DropdownMenuItem key={category}>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span>{category}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                  <Button variant="ghost" size="sm">Apply Filters</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Export Data</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleExportData("csv")}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportData("xlsx")}>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Export as Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExportData("pdf")}>
                  <FileText className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" className="flex items-center gap-2" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4" />
              <span className="hidden md:inline">Refresh</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 ml-auto"
              onClick={handleNavigateToAIInsights}
            >
              <Brain className="h-4 w-4" />
              <span>AI Insights</span>
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={loading ? "Loading..." : formatCurrency(dashboardData?.kpi.currentPeriod.revenue)}
            icon={<BarChart3 className="h-5 w-5" />}
            currentValue={!loading ? dashboardData?.kpi.currentPeriod.revenue : undefined}
            previousValue={!loading ? dashboardData?.kpi.previousPeriod.revenue : undefined}
            loading={loading}
          />
          <StatCard
            title="Total Orders"
            value={loading ? "Loading..." : formatNumber(dashboardData?.kpi.currentPeriod.orders)}
            icon={<CreditCard className="h-5 w-5" />}
            currentValue={!loading ? dashboardData?.kpi.currentPeriod.orders : undefined}
            previousValue={!loading ? dashboardData?.kpi.previousPeriod.orders : undefined}
            loading={loading}
          />
          <StatCard
            title="Total Customers"
            value={loading ? "Loading..." : formatNumber(dashboardData?.kpi.currentPeriod.customers)}
            icon={<Users className="h-5 w-5" />}
            currentValue={!loading ? dashboardData?.kpi.currentPeriod.customers : undefined}
            previousValue={!loading ? dashboardData?.kpi.previousPeriod.customers : undefined}
            loading={loading}
          />
          <StatCard
            title="Profit Margin"
            value={loading ? "Loading..." : `${dashboardData?.kpi.currentPeriod.profitMargin}%`}
            icon={<ArrowUpRight className="h-5 w-5" />}
            currentValue={!loading ? dashboardData?.kpi.currentPeriod.profitMargin : undefined}
            previousValue={!loading ? dashboardData?.kpi.previousPeriod.profitMargin : undefined}
            loading={loading}
          />
        </div>

        {/* Main content with tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-muted/60 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
            <TabsTrigger value="analytics">Sales Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2 dashboard-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={revenueData}
                    xKey="date"
                    yKeys={[
                      { key: "revenue", name: "Revenue", color: "#0EA5E9" }
                    ]}
                    loading={loading}
                    height={300}
                  />
                </CardContent>
              </Card>
              
              <Card className="dashboard-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Revenue by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={pieChartData}
                    height={300}
                    loading={loading}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="dashboard-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Regional Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={regionalData}
                    xKey="region"
                    yKeys={[
                      { key: "revenue", name: "Revenue", color: "#8B5CF6" }
                    ]}
                    loading={loading}
                    height={300}
                  />
                </CardContent>
              </Card>
              
              <Card className="dashboard-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Team Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={teamData}
                    xKey="team"
                    yKeys={[
                      { key: "revenue", name: "Revenue", color: "#F43F5E" },
                      { key: "deals", name: "Deals", color: "#10B981" }
                    ]}
                    loading={loading}
                    height={300}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="dashboard-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Sales Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={revenueData}
                    xKey="date"
                    yKeys={[
                      { key: "revenue", name: "Revenue", color: "#0EA5E9" },
                      { key: "orders", name: "Orders", color: "#F43F5E" }
                    ]}
                    loading={loading}
                    height={300}
                  />
                </CardContent>
              </Card>
              
              <Card className="dashboard-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Regional Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart
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
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="dashboard-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Product Category Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={pieChartData}
                    height={300}
                    loading={loading}
                  />
                </CardContent>
              </Card>
              
              <Card className="dashboard-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Top Products</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3 animate-pulse">
                          <div className="h-8 w-8 bg-muted rounded-md"></div>
                          <div className="space-y-2 flex-1">
                            <div className="h-4 bg-muted rounded w-1/3"></div>
                            <div className="h-3 bg-muted rounded w-1/4"></div>
                          </div>
                          <div className="h-6 bg-muted rounded w-16"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {dashboardData?.products.slice(0, 5).map((product: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 h-10 w-10 rounded-md flex items-center justify-center">
                              <span className="text-xs font-medium">
                                #{index + 1}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{formatCurrency(product.price)}</p>
                            <p className="text-xs text-muted-foreground">
                              Stock: {product.stockLevel}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Revenue Analysis Tab */}
          <TabsContent value="revenue" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue & Profit Trends</CardTitle>
                  <CardDescription>Yearly revenue and profit analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-muted" />
                    </div>
                  ) : (
                    <LineChart
                      data={revenueAnalysisData?.yearlyTrend || []}
                      xKey="month"
                      yKeys={[
                        { key: "revenue", name: "Revenue", color: "#0EA5E9" },
                        { key: "profit", name: "Profit", color: "#10B981" }
                      ]}
                      loading={loading}
                      height={300}
                    />
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Streams</CardTitle>
                  <CardDescription>Breakdown by source</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-muted" />
                    </div>
                  ) : (
                    <PieChart
                      data={revenueAnalysisData?.revenueStreams.map((stream, index) => ({
                        name: stream.name,
                        value: stream.value,
                        color: ["#0EA5E9", "#F43F5E", "#F59E0B"][index]
                      })) || []}
                      height={300}
                      loading={loading}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profit Margin Analysis</CardTitle>
                  <CardDescription>Quarterly profit margin trends</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="h-[300px] w-full flex items-center justify-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-muted" />
                    </div>
                  ) : (
                    <BarChart
                      data={revenueAnalysisData?.profitMargins || []}
                      xKey="period"
                      yKeys={[
                        { key: "margin", name: "Profit Margin %", color: "#8B5CF6" }
                      ]}
                      loading={loading}
                      height={300}
                    />
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Projections</CardTitle>
                  <CardDescription>Future revenue forecast</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                          <div className="h-8 bg-muted rounded w-2/3 mb-4"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Current Quarter Projection */}
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full bg-primary mr-2"></div>
                            <h3 className="text-sm font-medium">Current Quarter</h3>
                          </div>
                          <div className="text-2xl font-bold">{revenueAnalysisData?.projections.currentQuarter}</div>
                        </div>
                        
                        {/* Next Quarter Projection */}
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
                            <h3 className="text-sm font-medium">Next Quarter Projection</h3>
                          </div>
                          <div className="flex items-center">
                            <div className="text-2xl font-bold">{revenueAnalysisData?.projections.nextQuarter}</div>
                            <div className="text-sm font-medium text-green-600 ml-2">
                              {revenueAnalysisData?.projections.growth}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="h-px bg-border w-full my-4"></div>
                      
                      {/* Next Year Projection */}
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div className="h-4 w-4 rounded-full bg-blue-600 mr-2"></div>
                          <h3 className="text-sm font-medium">Next Year Projection</h3>
                        </div>
                        <div className="flex items-center">
                          <div className="text-2xl font-bold">{revenueAnalysisData?.projections.nextYear}</div>
                          <div className="text-sm font-medium text-green-600 ml-2">
                            {revenueAnalysisData?.projections.yearGrowth}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          Based on current growth trends and market analysis
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-md mt-4">
                        <div className="flex items-start">
                          <TrendingUp className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium mb-1">Growth Opportunities</h4>
                            <p className="text-sm text-muted-foreground">
                              Expanding into the APAC market could increase revenue by an estimated 18-22% in the next fiscal year.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Optimization Recommendations</CardTitle>
                <CardDescription>AI-driven suggestions to improve revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-5 bg-muted rounded w-1/4 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-full mb-1"></div>
                        <div className="h-4 bg-muted rounded w-2/3 mb-3"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-muted/20 p-4 rounded-md">
                        <div className="flex items-start mb-3">
                          <div className="bg-purple-100 p-2 rounded-full mr-3">
                            <LineChartIcon className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Pricing Strategy</h3>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Consider dynamic pricing for high-demand products. Our analysis shows a potential 8-12% revenue increase with optimized pricing.
                        </p>
                      </div>
                      
                      <div className="bg-muted/20 p-4 rounded-md">
                        <div className="flex items-start mb-3">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Customer Segments</h3>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Enterprise customers have 3x higher LTV. Allocate 15% more marketing budget to target enterprise leads for better ROI.
                        </p>
                      </div>
                      
                      <div className="bg-muted/20 p-4 rounded-md">
                        <div className="flex items-start mb-3">
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <PieChartIcon className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Product Mix</h3>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Bundling top-performing products with accessories could increase average order value by 22% based on purchase pattern analysis.
                        </p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="gap-2" onClick={handleAIAnalysis}>
                      <Brain className="h-4 w-4" />
                      Get Detailed Revenue Analysis
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Sales Analytics Tab - Content from previous SalesAnalytics page */}
          <TabsContent value="analytics" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Revenue performance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart
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
                  <PieChart
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
                <BarChart
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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Sales by Channel</CardTitle>
                  <CardDescription>Revenue distribution across different sales channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart
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
                  <PieChart
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
                  <div className="h-[300px] w-full flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted" />
                  </div>
                ) : (
                  <div className="relative overflow-x-auto rounded-md border">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs bg-muted/50">
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
        </Tabs>
      </div>
      
      {/* AI Analysis Modal */}
      {showAIAnalysisModal && (
        <AIAnalysisModal
          isOpen={showAIAnalysisModal}
          onClose={() => setShowAIAnalysisModal(false)}
          dashboardData={dashboardData}
        />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
