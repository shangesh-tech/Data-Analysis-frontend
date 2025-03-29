
import { useState } from "react";
import { 
  User, 
  Lock, 
  Bell, 
  Globe, 
  CreditCard, 
  Save, 
  RefreshCw, 
  Check, 
  Trash, 
  FileText, 
  Upload, 
  Link,
  ShieldAlert
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const Settings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState<string | null>(user?.avatar || null);
  const [formValues, setFormValues] = useState({
    name: user?.name || "",
    email: user?.email || "",
    company: "Acme Corp",
    jobTitle: "Product Manager",
    phone: "+1 (555) 123-4567",
    timezone: "UTC-8",
    language: "en-US",
    currency: "USD"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileImageUpload = () => {
    // Simulating upload with timeout
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setProfileImage(`https://i.pravatar.cc/150?u=${Date.now()}`);
      toast.success("Profile image updated successfully");
    }, 1500);
  };

  const handleSaveChanges = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  return (
    <DashboardLayout title="Settings">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileImage || ""} alt={user?.name} />
                      <AvatarFallback className="text-2xl">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleProfileImageUpload} disabled={loading}>
                        {loading ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </>
                        )}
                      </Button>
                      <Button variant="destructive" size="sm" disabled={loading}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formValues.name} 
                          onChange={handleInputChange} 
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formValues.email} 
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input 
                          id="company" 
                          name="company" 
                          value={formValues.company} 
                          onChange={handleInputChange}
                          placeholder="Enter your company name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input 
                          id="jobTitle" 
                          name="jobTitle" 
                          value={formValues.jobTitle} 
                          onChange={handleInputChange}
                          placeholder="Enter your job title"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={formValues.phone} 
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue={formValues.timezone}>
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-12">UTC-12</SelectItem>
                          <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
                          <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
                          <SelectItem value="UTC+0">UTC+0 (London)</SelectItem>
                          <SelectItem value="UTC+1">UTC+1 (Central Europe)</SelectItem>
                          <SelectItem value="UTC+8">UTC+8 (Singapore)</SelectItem>
                          <SelectItem value="UTC+9">UTC+9 (Tokyo)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue={formValues.language}>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US">English (US)</SelectItem>
                          <SelectItem value="en-GB">English (UK)</SelectItem>
                          <SelectItem value="es-ES">Spanish</SelectItem>
                          <SelectItem value="fr-FR">French</SelectItem>
                          <SelectItem value="de-DE">German</SelectItem>
                          <SelectItem value="ja-JP">Japanese</SelectItem>
                          <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select defaultValue={formValues.currency}>
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="JPY">JPY (¥)</SelectItem>
                          <SelectItem value="CAD">CAD (C$)</SelectItem>
                          <SelectItem value="AUD">AUD (A$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t p-4">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSaveChanges} disabled={loading}>
                  {loading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Social Profiles</CardTitle>
                <CardDescription>
                  Connect your social media accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 text-white p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </div>
                    <div>
                      <div className="font-medium">Facebook</div>
                      <div className="text-sm text-muted-foreground">Not connected</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Link className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-400 text-white p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    </div>
                    <div>
                      <div className="font-medium">Twitter</div>
                      <div className="text-sm text-muted-foreground">@johndoe</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-green-600 border-green-600">
                    <Check className="h-4 w-4 mr-2" />
                    Connected
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white p-2 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </div>
                    <div>
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-sm text-muted-foreground">Not connected</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Link className="h-4 w-4 mr-2" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Manage your password and account security options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Change Password</h3>
                  
                  <div className="grid grid-cols-1 gap-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="Enter your current password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter your new password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm your new password" />
                    </div>
                  </div>
                  
                  <Button>Update Password</Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Two-Factor Authentication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Sessions</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                      <div className="space-y-0.5">
                        <div className="font-medium">Current Session</div>
                        <div className="text-xs text-muted-foreground">
                          Windows 11 • Chrome • San Francisco, CA
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-600">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                      <div className="space-y-0.5">
                        <div className="font-medium">Mobile App</div>
                        <div className="text-xs text-muted-foreground">
                          iOS 16 • Safari • Los Angeles, CA
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="h-8">
                        <Trash className="h-4 w-4 mr-2" />
                        Revoke
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="text-amber-600">
                    <ShieldAlert className="h-4 w-4 mr-2" />
                    Sign Out All Devices
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible account actions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-destructive/20 rounded-md bg-destructive/5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="font-medium">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Email Notifications</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Sales Reports</div>
                        <div className="text-sm text-muted-foreground">
                          Receive daily and weekly sales reports
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">AI Insights</div>
                        <div className="text-sm text-muted-foreground">
                          Get notified when new AI insights are available
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Product Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Receive updates about new features and improvements
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Marketing Communications</div>
                        <div className="text-sm text-muted-foreground">
                          Receive offers, promotions, and marketing materials
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-md font-medium">In-App Notifications</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Dashboard Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Important updates about your dashboard metrics
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Project Updates</div>
                        <div className="text-sm text-muted-foreground">
                          Notifications about changes to your projects
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">New Feature Announcements</div>
                        <div className="text-sm text-muted-foreground">
                          In-app announcements about new features
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Notification Schedule</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Do Not Disturb</div>
                        <div className="text-sm text-muted-foreground">
                          Pause all notifications during specified hours
                        </div>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md">
                      <div className="space-y-2">
                        <Label htmlFor="startTime">From</Label>
                        <Select disabled defaultValue="8:00 PM">
                          <SelectTrigger id="startTime">
                            <SelectValue placeholder="Start Time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                            <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                            <SelectItem value="8:00 PM">8:00 PM</SelectItem>
                            <SelectItem value="9:00 PM">9:00 PM</SelectItem>
                            <SelectItem value="10:00 PM">10:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="endTime">To</Label>
                        <Select disabled defaultValue="8:00 AM">
                          <SelectTrigger id="endTime">
                            <SelectValue placeholder="End Time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="6:00 AM">6:00 AM</SelectItem>
                            <SelectItem value="7:00 AM">7:00 AM</SelectItem>
                            <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                            <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t p-4">
                <Button variant="outline">Reset Defaults</Button>
                <Button onClick={() => toast.success("Notification preferences saved!")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Manage your subscription plan and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 border border-green-600/20 rounded-md bg-green-50/30">
                  <div className="flex items-start gap-4">
                    <CreditCard className="h-10 w-10 text-green-600" />
                    <div>
                      <h3 className="font-medium text-green-600">Pro Plan</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your subscription renews on November 15, 2023
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm">Upgrade</Button>
                        <Button variant="outline" size="sm" className="text-muted-foreground">Cancel</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Payment Methods</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-1 rounded-md">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                        </div>
                        <div>
                          <div className="font-medium">Visa ending in 4242</div>
                          <div className="text-xs text-muted-foreground">
                            Expires 12/2024
                          </div>
                        </div>
                      </div>
                      <Badge>Default</Badge>
                    </div>
                    
                    <Button variant="outline" className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-md font-medium">Billing History</h3>
                  
                  <div className="relative overflow-x-auto rounded-md border">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs bg-muted/50">
                        <tr>
                          <th scope="col" className="px-4 py-3 font-medium">Date</th>
                          <th scope="col" className="px-4 py-3 font-medium">Description</th>
                          <th scope="col" className="px-4 py-3 font-medium">Amount</th>
                          <th scope="col" className="px-4 py-3 font-medium">Status</th>
                          <th scope="col" className="px-4 py-3 font-medium sr-only">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { date: "Nov 1, 2023", desc: "Pro Plan Subscription", amount: "$49.00", status: "Paid" },
                          { date: "Oct 1, 2023", desc: "Pro Plan Subscription", amount: "$49.00", status: "Paid" },
                          { date: "Sep 1, 2023", desc: "Pro Plan Subscription", amount: "$49.00", status: "Paid" }
                        ].map((item, i) => (
                          <tr key={i} className="border-b">
                            <td className="px-4 py-3">{item.date}</td>
                            <td className="px-4 py-3 font-medium">{item.desc}</td>
                            <td className="px-4 py-3">{item.amount}</td>
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="bg-green-50 text-green-600">
                                {item.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>
                  Manage your billing details and address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-md font-medium">Billing Contact</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingName">Full Name</Label>
                        <Input id="billingName" defaultValue="John Doe" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billingEmail">Email</Label>
                        <Input id="billingEmail" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billingPhone">Phone</Label>
                        <Input id="billingPhone" defaultValue="+1 (555) 123-4567" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-md font-medium">Billing Address</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingAddress">Address</Label>
                        <Input id="billingAddress" defaultValue="123 Main Street" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="billingCity">City</Label>
                          <Input id="billingCity" defaultValue="San Francisco" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="billingState">State</Label>
                          <Input id="billingState" defaultValue="CA" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="billingZip">ZIP Code</Label>
                          <Input id="billingZip" defaultValue="94105" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="billingCountry">Country</Label>
                          <Select defaultValue="US">
                            <SelectTrigger id="billingCountry">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                              <SelectItem value="AU">Australia</SelectItem>
                              <SelectItem value="DE">Germany</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t p-4">
                <Button variant="outline">Cancel</Button>
                <Button onClick={() => toast.success("Billing information updated!")}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
