import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  LineChart,
  Users,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Globe,
  Shield,
  Star,
  Menu,
  X,
  ChevronDown,
  Mail,
  PhoneCall,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Instagram
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Animation hooks for sections
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [testimonialRef, testimonialInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    // If already authenticated, redirect to the dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    }

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAuthenticated, navigate]);

  // Navbar items
  const navItems = [
    { title: "Home", href: "/" },
    { title: "Features", href: "#features" },
    { title: "Pricing", href: "#pricing" },
    { title: "Testimonials", href: "#testimonials" },
    { title: "Contact", href: "#contact" },
  ];

  // Feature cards
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

  // Statistics
  const statistics = [
    { value: "35%", label: "Average Revenue Increase" },
    { value: "12M+", label: "Data Points Analyzed" },
    { value: "24/7", label: "Real-time Monitoring" },
    { value: "5,000+", label: "Satisfied Customers" }
  ];

  // Pricing plans
  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      period: "per month",
      description: "Perfect for small businesses just getting started",
      features: [
        "Real-time analytics dashboard",
        "Basic reporting tools",
        "Up to 5 team members",
        "30-day data history",
        "Email support"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "For growing businesses that need more power",
      features: [
        "Everything in Starter",
        "AI-powered insights",
        "Up to 15 team members",
        "90-day data history",
        "Priority support",
        "Custom reporting"
      ],
      cta: "Get Started",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "$299",
      period: "per month",
      description: "For large organizations with complex needs",
      features: [
        "Everything in Professional",
        "Unlimited team members",
        "1-year data history",
        "24/7 phone support",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced security"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Sales Sorcerer has transformed how we track and optimize our sales. We've seen a 40% increase in conversion rates within the first three months.",
      author: "Sarah Johnson",
      title: "VP of Sales, TechCorp Inc.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      quote: "The AI-powered insights have been a game changer for our strategy. We're making data-driven decisions faster than ever before.",
      author: "Michael Chen",
      title: "Director of Marketing, Global Retail",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg"
    },
    {
      quote: "Implementing Sales Sorcerer was seamless. The support team is exceptional, and the product has exceeded our expectations in every way.",
      author: "Jessica Williams",
      title: "CEO, Startup Innovators",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  // Trusted by companies logos
  const trustedCompanies = [
    "Acme Corp", "TechGiant", "Innovate Inc", "Global Solutions", "NextWave", "FutureTech"
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-dashboard-blue" />
                <span className="font-bold text-xl">Sales Sorcerer</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-dashboard-blue font-medium transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-dashboard-blue text-dashboard-blue hover:bg-dashboard-blue"
              >
                Sign In
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-dashboard-blue hover:bg-dashboard-blue/90 text-white"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-gray-700 hover:text-dashboard-blue font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </a>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="w-full border-dashboard-blue text-dashboard-blue hover:bg-dashboard-blue/10"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/signup");
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-dashboard-blue hover:bg-dashboard-blue/90 text-white"
                  >
                    Get Started
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden" ref={heroRef}>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 -z-10"></div>
          <div className="absolute inset-0 opacity-10 -z-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <motion.div 
            className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="px-4 py-1.5 bg-dashboard-blue text-white text-sm font-medium rounded-full mb-6">
              The Ultimate Sales Analytics Platform
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-dashboard-blue">
              Transform Your <span className="text-dashboard-blue">Sales Data</span> <br />Into Growth Opportunities
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl opacity-90 text-slate-600">
              Powerful analytics, AI-driven insights, and real-time monitoring to supercharge your sales performance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                onClick={() => navigate("/signup")}
                className="bg-dashboard-blue hover:bg-dashboard-blue/90 text-white shadow-lg"
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate("/demo")}
                className="bg-dashboard-blue border-white text-white hover:scale-105"
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="mt-12 relative w-full max-w-5xl">
              <div className="relative z-10 shadow-2xl rounded-lg overflow-hidden border border-gray-700">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Dashboard Preview" 
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 -z-10"></div>
            </div>
            
            {/* Trusted By Section */}
            <div className="mt-20 text-center">
              <p className="text-dashboard-blue text-sm font-medium uppercase tracking-wider mb-6 ">
                Trusted by industry leaders
              </p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                {trustedCompanies.map((company, index) => (
                  <div key={index} className="text-dashboard-blue font-bold text-xl">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* Statistics Section */}
        <section className="py-16 bg-white border-b border-gray-100" ref={statsRef}>
          <motion.div 
            className="container mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-dashboard-blue mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 md:text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-24 bg-gray-50" ref={featuresRef}>
          <motion.div 
            className="container mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-dashboard-blue/10 text-dashboard-blue text-sm font-medium rounded-full mb-4">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our comprehensive dashboard provides powerful tools to analyze and optimize your sales performance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featureCards.map((card, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white p-8 rounded-lg border shadow-sm hover:shadow-md transition-all hover:translate-y-[-5px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="mb-4">{card.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                </motion.div>
              ))}
            </div>
            
            {/* Detailed Feature Section */}
            <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <span className="inline-block px-4 py-1.5 bg-dashboard-teal/10 text-dashboard-teal text-sm font-medium rounded-full">
                  Data Visualization
                </span>
                <h3 className="text-3xl font-bold">Interactive Charts and Reports</h3>
                <p className="text-lg text-gray-600">
                  Transform complex data into clear, actionable insights with our powerful visualization tools.
                  Customize reports, share findings, and make informed decisions faster.
                </p>
                <ul className="space-y-3">
                  {[
                    "Interactive drag-and-drop report builder",
                    "15+ chart types for different data visualization needs",
                    "Automated report scheduling and sharing",
                    "Custom dashboards for different teams and roles"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-dashboard-teal mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-dashboard-teal hover:bg-dashboard-teal/90 text-white mt-4">
                  Learn More
                </Button>
              </motion.div>
              
              <motion.div 
                className="rounded-lg overflow-hidden shadow-xl border border-gray-200"
                initial={{ opacity: 0, x: 20 }}
                animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Data Visualization Features" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Second Detailed Feature */}
              <motion.div 
                className="rounded-lg overflow-hidden shadow-xl border border-gray-200 order-4 lg:order-3"
                initial={{ opacity: 0, x: -20 }}
                animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="AI-Powered Insights" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <motion.div 
                className="space-y-6 order-3 lg:order-4"
                initial={{ opacity: 0, x: 20 }}
                animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <span className="inline-block px-4 py-1.5 bg-dashboard-purple/10 text-dashboard-purple text-sm font-medium rounded-full">
                  AI Technology
                </span>
                <h3 className="text-3xl font-bold">Predictive Analytics</h3>
                <p className="text-lg text-gray-600">
                  Leverage advanced machine learning algorithms to predict future trends, identify opportunities,
                  and get personalized recommendations for your business.
                </p>
                <ul className="space-y-3">
                  {[
                    "Sales forecasting with up to 95% accuracy",
                    "Automatic anomaly detection and alerts",
                    "Customer segmentation and targeting recommendations",
                    "Product bundling and pricing optimization"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-6 w-6 text-dashboard-purple mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-dashboard-purple hover:bg-dashboard-purple/90 text-white mt-4">
                  Learn More
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-dashboard-blue/10 text-dashboard-blue text-sm font-medium rounded-full mb-4">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Simple Setup, Powerful Results
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get started in minutes and see results immediately with our intuitive platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Connect Your Data",
                  description: "Integrate with your existing tools and platforms or upload your data directly.",
                  icon: <Globe className="h-10 w-10 text-dashboard-blue" />
                },
                {
                  step: "2",
                  title: "Customize Your Dashboard",
                  description: "Set up the metrics and insights that matter most to your business.",
                  icon: <BarChart3 className="h-10 w-10 text-dashboard-blue" />
                },
                {
                  step: "3",
                  title: "Take Action",
                  description: "Implement the insights and recommendations to drive growth.",
                  icon: <ArrowRight className="h-10 w-10 text-dashboard-blue" />
                }
              ].map((item, index) => (
                <div key={index} className="text-center p-6 relative">
                  <div className="w-16 h-16 rounded-full bg-dashboard-blue/10 flex items-center justify-center mx-auto mb-6">
                    {item.icon}
                  </div>
                  <div className="absolute top-0 -right-4 w-8 h-8 rounded-full bg-dashboard-blue text-white flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-gray-50" ref={pricingRef}>
          <motion.div 
            className="container mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-dashboard-blue/10 text-dashboard-blue text-sm font-medium rounded-full mb-4">
                Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose the Right Plan for Your Business
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Flexible options to meet your needs, with no hidden fees
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <motion.div 
                  key={index} 
                  className={`bg-white rounded-lg shadow-lg overflow-hidden border ${
                    plan.highlighted ? 'border-dashboard-blue' : 'border-gray-200'
                  } ${plan.highlighted ? 'ring-2 ring-dashboard-blue' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  {plan.highlighted && (
                    <div className="bg-dashboard-blue text-white py-2 text-center text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600"> {plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-dashboard-blue mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${
                        plan.highlighted 
                          ? 'bg-dashboard-blue hover:bg-dashboard-blue/90 text-white'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300'
                      }`}
                      onClick={() => navigate("/signup")}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-600">
                Need a custom solution? <a href="#contact" className="text-dashboard-blue font-medium hover:underline">Contact our sales team</a>
              </p>
            </div>
          </motion.div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-white" ref={testimonialRef}>
          <motion.div 
            className="container mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-dashboard-blue/10 text-dashboard-blue text-sm font-medium rounded-full mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it — hear from our satisfied customers
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.author} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{testimonial.author}</h4>
                          <p className="text-gray-600">{testimonial.title}</p>
                        </div>
                      </div>
                      <p className="text-lg italic">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="mt-6 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 fill-current text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full mx-2 ${
                      activeTestimonial === index ? 'bg-dashboard-blue' : 'bg-gray-300'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-dashboard-blue/10 text-dashboard-blue text-sm font-medium rounded-full mb-4">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about Sales Sorcerer
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How long does it take to set up Sales Sorcerer?",
                  answer: "Most customers are up and running within 24 hours. Our onboarding team will guide you through the process and help you connect your data sources."
                },
                {
                  question: "Can I integrate with my existing tools?",
                  answer: "Yes! Sales Sorcerer integrates with all major CRM, e-commerce, and marketing platforms including Salesforce, HubSpot, Shopify, WooCommerce, and many more."
                },
                {
                  question: "Is my data secure?",
                  answer: "Absolutely. We use industry-leading encryption and security protocols to protect your data. We're SOC 2 compliant and GDPR ready."
                },
                {
                  question: "Do I need technical skills to use Sales Sorcerer?",
                  answer: "No technical skills required! Our platform is designed to be user-friendly and intuitive. Our customer success team is always available to help if you need assistance."
                },
                {
                  question: "Can I try Sales Sorcerer before committing?",
                  answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start your trial."
                },
                {
                  question: "How often is the data updated?",
                  answer: "Sales Sorcerer provides real-time updates for most integrations. Data is processed and visualized as soon as it's received from your connected platforms."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <button 
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => {
                      const details = document.getElementById(`faq-${index}`);
                      if (details) {
                        details.style.display = 
                          details.style.display === "block" ? "none" : "block";
                      }
                    }}
                  >
                    <h3 className="font-bold text-lg">{faq.question}</h3>
                    <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  </button>
                  <div id={`faq-${index}`} className="mt-4 text-gray-600 hidden">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-dashboard-blue to-dashboard-purple text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Sales Data?</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
              Join thousands of businesses that use Sales Sorcerer to drive growth and increase revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/signup")}
                className="bg-white text-dashboard-blue hover:bg-gray-100"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                
                onClick={() => navigate("/demo")}
                className="border-white text-white bg-dashboard-blue"
              >
                Request Demo
              </Button>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 bg-dashboard-blue/10 text-dashboard-blue text-sm font-medium rounded-full mb-4">
                Contact Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions or need assistance? Our team is here to help
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="How can we help?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      placeholder="Enter your message..."
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-dashboard-blue hover:bg-dashboard-blue/90 text-white">
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-dashboard-blue mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Email</h4>
                      <p className="text-gray-600">info@salessorcerer.com</p>
                      <p className="text-gray-600">support@salessorcerer.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <PhoneCall className="h-6 w-6 text-dashboard-blue mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">Mon-Fri, 9AM-6PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-dashboard-blue mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold">Office</h4>
                      <p className="text-gray-600">123 Tech Square</p>
                      <p className="text-gray-600">San Francisco, CA 94103</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: <Twitter className="h-6 w-6" />, label: "Twitter" },
                      { icon: <Linkedin className="h-6 w-6" />, label: "LinkedIn" },
                      { icon: <Github className="h-6 w-6" />, label: "GitHub" },
                      { icon: <Instagram className="h-6 w-6" />, label: "Instagram" }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href="#"
                        className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-dashboard-blue hover:text-white transition-colors"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="h-8 w-8 text-dashboard-blue" />
                <span className="font-bold text-xl">Sales Sorcerer</span>
              </div>
              <p className="text-gray-400 mb-6">
                Transforming sales data into growth opportunities with powerful analytics and AI-driven insights.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                  { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn" },
                  { icon: <Github className="h-5 w-5" />, label: "GitHub" },
                  { icon: <Instagram className="h-5 w-5" />, label: "Instagram" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-dashboard-blue hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6">Product</h3>
              <ul className="space-y-4">
                {[
                  "Features", "Pricing", "Integrations", "Documentation", "Release Notes", "Roadmap"
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6">Company</h3>
              <ul className="space-y-4">
                {[
                  "About Us", "Careers", "Blog", "Press", "Partners", "Contact"
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-6">Resources</h3>
              <ul className="space-y-4">
                {[
                  "Help Center", "Community", "Academy", "Webinars", "Guides", "Status"
                ].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Sales Sorcerer. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  "Terms of Service", "Privacy Policy", "Cookie Policy", "Security"
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;