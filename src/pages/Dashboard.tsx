import { Link } from "react-router-dom";
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
  Search
} from "lucide-react";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const stats = [
    { label: "Total Scans", value: "47", icon: Target, change: "+12 this week" },
    { label: "Vulnerabilities Found", value: "156", icon: AlertTriangle, change: "+23 this month" },
    { label: "Bounties Earned", value: "$12,450", icon: TrendingUp, change: "+$2,100 this month" },
    { label: "Reports Submitted", value: "34", icon: CheckCircle, change: "89% acceptance rate" },
  ];

  const recentScans = [
    { id: 1, target: "app.example.com", type: "Deep Scan", status: "completed", vulns: 12, date: "2 hours ago" },
    { id: 2, target: "api.startup.io", type: "Quick Scan", status: "completed", vulns: 3, date: "5 hours ago" },
    { id: 3, target: "dashboard.corp.net", type: "Deep Scan", status: "running", vulns: 0, date: "Running..." },
    { id: 4, target: "mobile.banking.com", type: "Quick Scan", status: "completed", vulns: 7, date: "1 day ago" },
  ];

  const criticalFindings = [
    { id: 1, title: "SQL Injection in login endpoint", severity: "critical", target: "app.example.com", bounty: "$5,000" },
    { id: 2, title: "IDOR in user profile API", severity: "high", target: "api.startup.io", bounty: "$2,500" },
    { id: 3, title: "XSS in search functionality", severity: "medium", target: "dashboard.corp.net", bounty: "$750" },
  ];

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
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">3</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {/* Welcome & Quick Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Welcome back, Researcher</h1>
              <p className="text-muted-foreground mt-1">Here's an overview of your security activities</p>
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
            {stats.map((stat) => (
              <Card key={stat.label} className="border-border">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-primary mt-1">{stat.change}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
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
                        <Badge variant={scan.status === 'running' ? 'secondary' : scan.vulns > 0 ? 'destructive' : 'default'}>
                          {scan.status === 'running' ? 'Running' : `${scan.vulns} vulns`}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{scan.date}</p>
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