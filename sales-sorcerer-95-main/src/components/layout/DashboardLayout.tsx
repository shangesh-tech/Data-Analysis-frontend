
import { useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  LineChart,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, active, onClick }: SidebarItemProps) => (
  <button
    className={`flex items-center w-full p-3 rounded-lg text-left ${
      active
        ? "bg-primary text-primary-foreground"
        : "hover:bg-secondary text-foreground"
    }`}
    onClick={onClick}
  >
    <div className="mr-3">{icon}</div>
    <span>{label}</span>
  </button>
);

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

const DashboardLayout = ({ children, title = "Dashboard" }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname);

  // Store sidebar state in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarState');
    if (savedState) {
      setSidebarOpen(savedState === 'open');
    }
  }, []);
  
  // Set active path for sidebar highlighting
  useEffect(() => {
    setActivePath(window.location.pathname);
  }, [window.location.pathname]);

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    localStorage.setItem('sidebarState', newState ? 'open' : 'closed');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarItems = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Dashboard",
      path: "/dashboard",
      onClick: () => navigate("/projects"),
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      label: "AI Insights",
      path: "/insights",
      onClick: () => navigate("/insights"),
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      path: "/settings",
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar for desktop */}
      <aside
        className={`bg-card fixed left-0 top-0 z-20 h-screen ${
          sidebarOpen ? "w-64" : "w-20"
        } border-r transition-all duration-300 ease-in-out hidden lg:block`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className={`flex items-center ${!sidebarOpen && "justify-center w-full"}`}>
            {sidebarOpen ? (
              <div className="text-xl font-bold">Sales Sorcerer</div>
            ) : (
              <div className="text-xl font-bold">SS</div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className={`p-1 rounded-md hover:bg-gray-100 ${!sidebarOpen && "hidden"}`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {sidebarOpen ? (
                <SidebarItem
                  icon={item.icon}
                  label={item.label}
                  active={activePath === item.path}
                  onClick={item.onClick}
                />
              ) : (
                <button
                  className={`p-3 rounded-lg w-full flex justify-center ${
                    activePath === item.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary text-foreground"
                  }`}
                  onClick={item.onClick}
                  title={item.label}
                >
                  {item.icon}
                </button>
              )}
            </div>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t">
          {sidebarOpen ? (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">
                    {user?.role}
                  </div>
                </div>
              </div>
              <button onClick={handleLogout} className="p-1 rounded-md hover:bg-gray-100">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md hover:bg-gray-100 w-full flex justify-center"
                title="Expand Sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-md hover:bg-gray-100 w-full flex justify-center"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={toggleMobileMenu} />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`bg-card fixed left-0 top-0 z-40 h-screen w-64 border-r lg:hidden transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="text-xl font-bold">Sales Sorcerer</div>
          <button onClick={toggleMobileMenu} className="p-1 rounded-md hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              active={activePath === item.path}
              onClick={() => {
                item.onClick();
                toggleMobileMenu();
              }}
            />
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">{user?.name}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {user?.role}
                </div>
              </div>
            </div>
            <button onClick={handleLogout} className="p-1 rounded-md hover:bg-gray-100">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* Header */}
        <header className="h-16 border-b bg-background flex items-center justify-between px-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-gray-100 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold ml-2">{title}</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search bar removed */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-dashboard-rose text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <DropdownMenuItem key={i} className="p-3 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {i === 0 ? "AI" : i === 1 ? "S" : "C"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {i === 0
                              ? "AI analysis complete"
                              : i === 1
                              ? "Sales target reached"
                              : "New customer signup"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {i === 0
                              ? "Your data analysis is ready to view"
                              : i === 1
                              ? "Q3 sales target has been reached"
                              : "A new enterprise customer has signed up"}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {i === 0 ? "5 min ago" : i === 1 ? "1 hour ago" : "3 hours ago"}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-2 cursor-pointer flex justify-center">
                  <span className="text-primary text-sm">View all notifications</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block text-sm font-medium">
                    {user?.name}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Page content */}
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
