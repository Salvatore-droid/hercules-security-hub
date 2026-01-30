import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Zap, 
  Target, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Plus,
  Settings,
  Bell,
  User,
  ExternalLink,
  Search,
  LogOut
} from "lucide-react";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:8000";

interface UserData {
  id: number;
  email: string;
  name: string;
}

interface ScanData {
  id: number;
  target: string;
  type: string;
  status: 'running' | 'completed' | 'failed';
  vulnerabilities: number;
  created_at: string;
}

interface StatData {
  total_scans: number;
  vulnerabilities_found: number;
  bounties_earned: number;
  reports_submitted: number;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<StatData>({
    total_scans: 0,
    vulnerabilities_found: 0,
    bounties_earned: 0,
    reports_submitted: 0
  });
  const [recentScans, setRecentScans] = useState<ScanData[]>([]);
  const navigate = useNavigate();

  // Check authentication and fetch user data
  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      const token = localStorage.getItem("auth_token");
      
      if (!token) {
        // No token, redirect to auth
        navigate("/auth");
        return;
      }

      try {
        // Check auth status with backend
        const authResponse = await fetch(`${API_BASE_URL}/api/check-auth/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (authResponse.ok) {
          const authData = await authResponse.json();
          
          if (authData.authenticated && authData.user) {
            setUser(authData.user);
            setIsAuthenticated(true);
            
            // Fetch user stats
            await fetchUserStats(token);
            
            // Fetch recent scans
            await fetchRecentScans(token);
          } else {
            // Not authenticated, clear token and redirect
            localStorage.removeItem("auth_token");
            navigate("/auth");
          }
        } else {
          // Auth check failed, clear token and redirect
          localStorage.removeItem("auth_token");
          navigate("/auth");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("auth_token");
        navigate("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndFetchData();
  }, [navigate]);

  const fetchUserStats = async (token: string) => {
    try {
      // In a real app, you'd have an endpoint for user stats
      // For now, we'll simulate with mock data or use backend if available
      const response = await fetch(`${API_BASE_URL}/api/user-stats/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        // Use mock data if endpoint doesn't exist yet
        setStats({
          total_scans: 47,
          vulnerabilities_found: 156,
          bounties_earned: 12450,
          reports_submitted: 34
        });
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
      // Use mock data as fallback
      setStats({
        total_scans: 47,
        vulnerabilities_found: 156,
        bounties_earned: 12450,
        reports_submitted: 34
      });
    }
  };

  const fetchRecentScans = async (token: string) => {
    try {
      // In a real app, you'd have an endpoint for recent scans
      const response = await fetch(`${API_BASE_URL}/api/recent-scans/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRecentScans(data);
      } else {
        // Mock data
        setRecentScans([
          { id: 1, target: "app.example.com", type: "Deep Scan", status: "completed", vulnerabilities: 12, created_at: "2 hours ago" },
          { id: 2, target: "api.startup.io", type: "Quick Scan", status: "completed", vulnerabilities: 3, created_at: "5 hours ago" },
          { id: 3, target: "dashboard.corp.net", type: "Deep Scan", status: "running", vulnerabilities: 0, created_at: "Running..." },
          { id: 4, target: "mobile.banking.com", type: "Quick Scan", status: "completed", vulnerabilities: 7, created_at: "1 day ago" },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch scans:", error);
      // Mock data as fallback
      setRecentScans([
        { id: 1, target: "app.example.com", type: "Deep Scan", status: "completed", vulnerabilities: 12, created_at: "2 hours ago" },
        { id: 2, target: "api.startup.io", type: "Quick Scan", status: "completed", vulnerabilities: 3, created_at: "5 hours ago" },
        { id: 3, target: "dashboard.corp.net", type: "Deep Scan", status: "running", vulnerabilities: 0, created_at: "Running..." },
        { id: 4, target: "mobile.banking.com", type: "Quick Scan", status: "completed", vulnerabilities: 7, created_at: "1 day ago" },
      ]);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token");
    
    try {
      await fetch(`${API_BASE_URL}/api/logout/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("auth_token");
      navigate("/auth");
    }
  };

  const criticalFindings = [
    { id: 1, title: "SQL Injection in login endpoint", severity: "critical", target: "app.example.com", bounty: "$5,000" },
    { id: 2, title: "IDOR in user profile API", severity: "high", target: "api.startup.io", bounty: "$2,500" },
    { id: 3, title: "XSS in search functionality", severity: "medium", target: "dashboard.corp.net", bounty: "$750" },
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate change values (you can replace with real data from backend)
  const statChanges = {
    total_scans: "+12 this week",
    vulnerabilities_found: "+23 this month",
    bounties_earned: "+$2,100 this month",
    reports_submitted: "89% acceptance rate"
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized state (though redirect should happen in useEffect)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">Please log in to access the dashboard</p>
          <Button onClick={() => navigate("/auth")}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Hercules Security</title>
        <meta name="description" content="View your security scans, vulnerabilities found, and bounty earnings." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Top Navigation */}
        <header className="sticky top-0 z-50 glass border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-6">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
                    <Shield className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="font-heading font-bold text-lg text-foreground">Hercules</span>
                </Link>
                
                <nav className="hidden md:flex items-center gap-6">
                  <Link to="/dashboard" className="text-sm font-medium text-foreground">Dashboard</Link>
                  <Link to="/scan" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Scans</Link>
                  <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Reports</a>
                  <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Programs</a>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span className="text-sm text-primary font-medium">
                    {user?.name || "Researcher"}
                  </span>
                </div>
                
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">3</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/20 transition-colors">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Welcome & Quick Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Welcome back, {user?.name || "Researcher"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {user?.email ? `Logged in as ${user.email}` : "Here's an overview of your security activities"}
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/scan">
                <Button className="gradient-primary hover:opacity-90 transition-opacity">
                  <Plus className="w-4 h-4 mr-2" />
                  New Scan
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Scans", value: stats.total_scans, change: statChanges.total_scans, Icon: Target },
              { label: "Vulnerabilities Found", value: stats.vulnerabilities_found, change: statChanges.vulnerabilities_found, Icon: AlertTriangle },
              { label: "Bounties Earned", value: formatCurrency(stats.bounties_earned), change: statChanges.bounties_earned, Icon: TrendingUp },
              { label: "Reports Submitted", value: stats.reports_submitted, change: statChanges.reports_submitted, Icon: CheckCircle }
            ].map((stat, index) => (
              <Card key={stat.label} className="border-border">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-primary mt-1">{stat.change}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Scans */}
            <Card className="lg:col-span-2 border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-heading">Recent Scans</CardTitle>
                  <CardDescription>Your latest security assessments</CardDescription>
                </div>
                <Link to="/scan">
                  <Button variant="ghost" size="sm">
                    View all
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentScans.map((scan) => (
                    <div key={scan.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          scan.status === 'running' ? 'bg-accent/10' : 'bg-success/10'
                        }`}>
                          {scan.status === 'running' ? (
                            <Zap className="w-5 h-5 text-accent animate-pulse" />
                          ) : (
                            <Target className="w-5 h-5 text-success" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{scan.target}</p>
                          <p className="text-sm text-muted-foreground">{scan.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={scan.status === 'running' ? 'secondary' : scan.vulnerabilities > 0 ? 'destructive' : 'default'}>
                          {scan.status === 'running' ? 'Running' : `${scan.vulnerabilities} vulns`}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{scan.created_at}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Critical Findings */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-heading">Top Findings</CardTitle>
                <CardDescription>Highest bounty opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {criticalFindings.map((finding) => (
                    <div key={finding.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant={finding.severity === 'critical' ? 'destructive' : finding.severity === 'high' ? 'default' : 'secondary'}>
                          {finding.severity}
                        </Badge>
                        <span className="text-sm font-semibold text-success">{finding.bounty}</span>
                      </div>
                      <p className="font-medium text-foreground text-sm mb-1">{finding.title}</p>
                      <p className="text-xs text-muted-foreground">{finding.target}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6 border-border">
            <CardHeader>
              <CardTitle className="font-heading">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/scan" className="block">
                  <div className="p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer text-center">
                    <Search className="w-8 h-8 text-primary mx-auto mb-2" />
                    <p className="font-medium text-foreground">Quick Scan</p>
                    <p className="text-xs text-muted-foreground">Scan a URL instantly</p>
                  </div>
                </Link>
                <Link to="/scan" className="block">
                  <div className="p-4 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all cursor-pointer text-center">
                    <Target className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="font-medium text-foreground">Deep Scan</p>
                    <p className="text-xs text-muted-foreground">Comprehensive analysis</p>
                  </div>
                </Link>
                <div className="p-4 rounded-lg border border-border hover:border-success hover:bg-success/5 transition-all cursor-pointer text-center">
                  <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="font-medium text-foreground">Submit Report</p>
                  <p className="text-xs text-muted-foreground">Document findings</p>
                </div>
                <div className="p-4 rounded-lg border border-border hover:border-warning hover:bg-warning/5 transition-all cursor-pointer text-center">
                  <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
                  <p className="font-medium text-foreground">Schedule Scan</p>
                  <p className="text-xs text-muted-foreground">Automate monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default Dashboard;