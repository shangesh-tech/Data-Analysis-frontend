
import { randomInt, generateDateRange } from '@/utils/dataUtils';

// Product categories
export const productCategories = [
  'Electronics', 'Clothing', 'Home Goods', 'Beauty', 'Sports', 'Books', 'Toys'
];

// Regions
export const salesRegions = [
  'North America', 'Europe', 'Asia Pacific', 'Latin America', 'Middle East & Africa'
];

// Sales teams
export const salesTeams = [
  'Enterprise', 'SMB', 'Direct', 'Partners', 'Inside Sales'
];

// Mock product data
export const generateProducts = (count = 20) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `PROD-${(i + 1).toString().padStart(4, '0')}`,
    name: `Product ${i + 1}`,
    category: productCategories[randomInt(0, productCategories.length - 1)],
    price: randomInt(50, 1000),
    stockLevel: randomInt(0, 500),
    rating: (randomInt(30, 50) / 10),
  }));
};

// Generate daily sales data
export const generateSalesData = (days = 90) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);
  
  const dateRange = generateDateRange(startDate, endDate);
  
  return dateRange.map(date => {
    // Create a slight upward trend with random fluctuation
    const daysFactor = 1 + (date.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime()) * 0.3;
    const weekdayFactor = [0, 6].includes(date.getDay()) ? 0.8 : 1.1; // Lower on weekends
    
    return {
      date: date.toISOString().split('T')[0],
      revenue: Math.round(randomInt(80000, 120000) * daysFactor * weekdayFactor),
      orders: Math.round(randomInt(800, 1200) * daysFactor * weekdayFactor),
      customers: Math.round(randomInt(500, 800) * daysFactor * weekdayFactor),
      averageOrderValue: Math.round(randomInt(90, 150) * (daysFactor * 0.7 + 0.3)),
    };
  });
};

// Generate regional sales data
export const generateRegionalSales = () => {
  return salesRegions.map(region => ({
    region,
    revenue: randomInt(1000000, 5000000),
    orders: randomInt(10000, 50000),
    customers: randomInt(5000, 30000),
    growth: (randomInt(-10, 30) / 10),
  }));
};

// Generate product sales data
export const generateProductSales = () => {
  return productCategories.map(category => ({
    category,
    revenue: randomInt(500000, 2000000),
    orders: randomInt(5000, 20000),
    profit: randomInt(100000, 800000),
    growth: (randomInt(-20, 40) / 10),
  }));
};

// Generate team performance data
export const generateTeamPerformance = () => {
  return salesTeams.map(team => ({
    team,
    revenue: randomInt(800000, 3000000),
    deals: randomInt(200, 800),
    winRate: randomInt(40, 80),
    avgDealSize: randomInt(10000, 50000),
  }));
};

// Generate KPI data for dashboard
export const generateKPIData = () => {
  // Current period
  const currentRevenue = randomInt(8000000, 12000000);
  const currentOrders = randomInt(80000, 120000);
  const currentCustomers = randomInt(40000, 60000);
  const currentConversion = randomInt(20, 35) / 10;
  
  // Previous period (slightly lower to show growth)
  const prevRevenue = Math.round(currentRevenue * (randomInt(85, 95) / 100));
  const prevOrders = Math.round(currentOrders * (randomInt(85, 95) / 100));
  const prevCustomers = Math.round(currentCustomers * (randomInt(85, 95) / 100));
  const prevConversion = Math.round(currentConversion * 10 * (randomInt(85, 95) / 100)) / 10;
  
  return {
    currentPeriod: {
      revenue: currentRevenue,
      orders: currentOrders,
      customers: currentCustomers,
      conversionRate: currentConversion,
    },
    previousPeriod: {
      revenue: prevRevenue,
      orders: prevOrders,
      customers: prevCustomers,
      conversionRate: prevConversion,
    }
  };
};

// Mock AI analysis insights
export const generateAIInsights = () => {
  return [
    {
      id: 1,
      title: "Revenue Growth Opportunity",
      insight: "Product category 'Electronics' shows 27% higher conversion rates on weekends. Consider adjusting your marketing budget to increase weekend promotions for this category.",
      impact: "high",
      category: "revenue"
    },
    {
      id: 2,
      title: "Customer Retention Risk",
      insight: "Customers in the 'Enterprise' segment show a 12% decline in repeat purchases over the last 30 days, primarily in the 'Asia Pacific' region.",
      impact: "medium",
      category: "customers"
    },
    {
      id: 3,
      title: "Product Performance Alert",
      insight: "The 'Beauty' category has experienced a 31% increase in return rates, significantly higher than the average 8% for this category historically.",
      impact: "high", 
      category: "products"
    },
    {
      id: 4,
      title: "Sales Team Efficiency",
      insight: "The 'Partners' sales team has a 35% longer sales cycle but 22% higher average deal size compared to other channels.",
      impact: "medium",
      category: "operations"
    },
    {
      id: 5,
      title: "Market Expansion Potential",
      insight: "Based on current growth rates, the 'Latin America' region is projected to exceed targets by 18% this quarter, suggesting opportunity for increased investment.",
      impact: "high",
      category: "growth"
    }
  ];
};

// All data in one function
export const getAllDashboardData = () => {
  return {
    kpi: generateKPIData(),
    salesData: generateSalesData(),
    regionalSales: generateRegionalSales(),
    productSales: generateProductSales(),
    teamPerformance: generateTeamPerformance(),
    products: generateProducts(),
    aiInsights: generateAIInsights(),
  };
};
