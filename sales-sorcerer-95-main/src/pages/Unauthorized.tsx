
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 bg-destructive/10 rounded-full flex items-center justify-center">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-xl text-muted-foreground mb-6">
          You don't have permission to access this page.
        </p>
        <p className="text-muted-foreground mb-8">
          Your current role ({user?.role}) doesn't have the required permissions. Please contact an administrator if you believe this is an error.
        </p>
        <div className="flex flex-col space-y-4">
          <Button
            className="flex items-center justify-center"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center"
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
