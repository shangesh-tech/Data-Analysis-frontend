
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, Users, ShoppingBag, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If already authenticated, redirect to the dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const featureCards = [
    {
      title: "Real-time Analytics",
      description: "Monitor sales performance with interactive charts and real-time data visualization.",
      icon: <BarChart3 className="h-10 w-10 text-dashboard-blue" />,
    },
    {
      title: "AI-Powered Insights",
      description: "Get actionable insights and recommendations from our advanced AI analysis.",
      icon: <LineChart className="h-10 w-10 text-dashboard-purple" />,
    },
    {
      title: "Customer Management",
      description: "Track customer behavior, preferences, and engagement across your sales channels.",
      icon: <Users className="h-10 w-10 text-dashboard-teal" />,
    },
    {
      title: "Product Performance",
      description: "Analyze product performance and identify top-selling items and opportunities.",
      icon: <ShoppingBag className="h-10 w-10 text-dashboard-rose" />,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Sales Sorcerer Dashboard</h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl opacity-90">
            Transform your sales data into actionable insights with our powerful analytics platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/login")}
              className="bg-dashboard-blue hover:bg-dashboard-blue/90 text-white"
            >
              Sign In
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/signup")}
              className="border-white text-white hover:bg-white/10"
            >
              Create Account
            </Button>
          </div>
          
          <div className="mt-20 relative w-full max-w-5xl">
            <div className="relative z-10 shadow-2xl rounded-lg overflow-hidden border border-gray-700">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Dashboard Preview" 
                className="w-full rounded-lg"
              />
            </div>
            <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-10 -z-10"></div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our dashboard provides everything you need to analyze and optimize your sales performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureCards.map((card, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-dashboard-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Sales Data?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Sign up today and start turning your sales data into actionable insights and growth.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/signup")}
            className="bg-white text-dashboard-blue hover:bg-gray-100"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
