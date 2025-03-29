
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FileSpreadsheet, 
  Upload, 
  PlusCircle, 
  ChevronRight, 
  Clock, 
  Calendar, 
  BarChart3, 
  AlertCircle 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import FileUploader from "@/components/dashboard/FileUploader";

interface ProjectCardProps {
  name: string;
  date: string;
  metrics: {
    revenue: string;
    products: number;
    period: string;
  };
  onClick: () => void;
}

const ProjectCard = ({ name, date, metrics, onClick }: ProjectCardProps) => (
  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <Clock className="h-4 w-4 mr-1" />
            <span>Last opened: {date}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      <Separator className="my-3" />
      <div className="grid grid-cols-3 gap-2 mt-3">
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground">Revenue</div>
          <div className="font-semibold">{metrics.revenue}</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground">Products</div>
          <div className="font-semibold">{metrics.products}</div>
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-muted-foreground">Period</div>
          <div className="font-semibold">{metrics.period}</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProjectSelection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recent");
  const [projectName, setProjectName] = useState("");
  
  // Demo project data
  const recentProjects = [
    {
      id: "1",
      name: "Q3 Sales Analysis",
      date: "Yesterday",
      metrics: {
        revenue: "$245,769",
        products: 48,
        period: "Q3 2023"
      }
    },
    {
      id: "2",
      name: "Annual Review 2023",
      date: "3 days ago",
      metrics: {
        revenue: "$1.2M",
        products: 124,
        period: "Full Year"
      }
    },
    {
      id: "3",
      name: "Regional Performance",
      date: "1 week ago",
      metrics: {
        revenue: "$567,890",
        products: 75,
        period: "H1 2023"
      }
    }
  ];
  
  const handleProjectSelect = (projectId: string) => {
    // In a real app, you'd load the project data here
    toast.success(`Loading project data...`);
    
    // Navigate to dashboard with the selected project
    navigate(`/dashboard?project=${projectId}`);
  };
  
  const handleCreateProject = () => {
    if (!projectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }
    
    // In a real app, you'd create the project here
    toast.success(`Project "${projectName}" created successfully`);
    
    // Navigate to dashboard with the new project
    navigate(`/dashboard?project=new&name=${encodeURIComponent(projectName)}`);
  };
  
  const handleUploadComplete = (data: any) => {
    toast.success(`Successfully processed ${data.rowCount} rows from ${data.fileName}`);
    
    // Navigate to dashboard with the uploaded data
    navigate(`/dashboard?project=new&name=Imported Data&filename=${encodeURIComponent(data.fileName)}`);
  };
  
  return (
    <DashboardLayout title="Projects">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Sales Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and analyze your sales data with powerful insights
          </p>
        </div>
        
        <Tabs defaultValue="recent" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="recent">Recent Projects</TabsTrigger>
            <TabsTrigger value="new">Create New Project</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="space-y-6">
            {recentProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    name={project.name}
                    date={project.date}
                    metrics={project.metrics}
                    onClick={() => handleProjectSelect(project.id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No recent projects</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    You haven't created any projects yet. Create your first project to get started.
                  </p>
                  <Button onClick={() => setActiveTab("new")}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Project
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="new" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Project</CardTitle>
                  <CardDescription>
                    Start a new sales analysis project from scratch
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="project-name" className="text-sm font-medium block mb-1">
                        Project Name
                      </label>
                      <Input
                        id="project-name"
                        placeholder="Q4 Sales Analysis"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                      />
                    </div>
                    
                    <Button onClick={handleCreateProject} className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Import Data</CardTitle>
                  <CardDescription>
                    Upload data from Excel or Google Sheets
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploader onUploadComplete={handleUploadComplete} />
                  
                  <div className="mt-6 space-y-3">
                    <h4 className="font-medium text-sm">Required Data Fields</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 text-primary flex-shrink-0 mt-0.5">
                          <FileSpreadsheet className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-medium">Product Information:</span> Product ID, Name, Category
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 text-primary flex-shrink-0 mt-0.5">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-medium">Sales Data:</span> Date (month/year), Quantity Sold
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 text-primary flex-shrink-0 mt-0.5">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-medium">Financial Data:</span> Buying Price, Selling Price
                        </div>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ProjectSelection;
