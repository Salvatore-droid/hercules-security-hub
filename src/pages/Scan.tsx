import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Search,
  Zap,
  Target,
  Globe,
  Lock,
  FileCode,
  Server,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Play,
  Settings,
  Bell,
  User,
  Clock,
  Info
} from "lucide-react";
import { Helmet } from "react-helmet";

const Scan = () => {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsScanning(true);
    setScanProgress(0);
    setScanComplete(false);

    // Simulate scan progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);
  };

  const quickScanChecks = [
    { name: "SSL Certificate", icon: Lock, status: scanProgress > 10 ? "complete" : scanProgress > 0 ? "checking" : "pending" },
    { name: "Security Headers", icon: Shield, status: scanProgress > 25 ? "complete" : scanProgress > 15 ? "checking" : "pending" },
    { name: "Common Vulnerabilities", icon: AlertTriangle, status: scanProgress > 50 ? "complete" : scanProgress > 30 ? "checking" : "pending" },
    { name: "Open Ports", icon: Server, status: scanProgress > 70 ? "complete" : scanProgress > 55 ? "checking" : "pending" },
    { name: "Technology Stack", icon: FileCode, status: scanProgress > 85 ? "complete" : scanProgress > 75 ? "checking" : "pending" },
    { name: "DNS Configuration", icon: Globe, status: scanProgress > 95 ? "complete" : scanProgress > 90 ? "checking" : "pending" },
  ];

  const mockResults = {
    score: 72,
    vulnerabilities: [
      { severity: "high", title: "Missing Content-Security-Policy header", description: "The site doesn't implement CSP, making it vulnerable to XSS attacks." },
      { severity: "medium", title: "X-Frame-Options not set", description: "Page can be embedded in iframes, potential clickjacking risk." },
      { severity: "low", title: "Server version exposed", description: "Server headers reveal version information." },
    ],
    technologies: ["React", "Node.js", "Nginx", "Cloudflare"],
  };

  return (
    <>
      <Helmet>
        <title>Security Scan - Hercules Security</title>
        <meta name="description" content="Run quick or deep security scans on any target URL. Discover vulnerabilities and protect your assets." />
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
                  <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
                  <Link to="/scan" className="text-sm font-medium text-foreground">Scans</Link>
                  <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Reports</a>
                  <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Programs</a>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Dashboard</span>
              </Link>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Security Scanner</h1>
              <p className="text-muted-foreground mt-1">Enter a URL to start analyzing for vulnerabilities</p>
            </div>

            {/* Scan Input */}
            <Card className="mb-8 border-border">
              <CardContent className="p-6">
                <form onSubmit={handleStartScan}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="url" className="sr-only">Target URL</Label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="url"
                          type="url"
                          placeholder="https://example.com"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          className="pl-11 h-12 text-lg"
                          disabled={isScanning}
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      size="lg"
                      className="gradient-primary hover:opacity-90 transition-opacity h-12 px-8"
                      disabled={isScanning || !url}
                    >
                      {isScanning ? (
                        <>
                          <Zap className="w-5 h-5 mr-2 animate-pulse" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5 mr-2" />
                          Start Scan
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Scan Type Tabs */}
            <Tabs defaultValue="quick" className="mb-8">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="quick" className="gap-2">
                  <Zap className="w-4 h-4" />
                  Quick Scan
                </TabsTrigger>
                <TabsTrigger value="deep" className="gap-2">
                  <Target className="w-4 h-4" />
                  Deep Scan
                </TabsTrigger>
              </TabsList>

              <TabsContent value="quick">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Quick Scan
                    </CardTitle>
                    <CardDescription>
                      Fast security assessment covering common vulnerabilities, SSL, headers, and more. Takes about 30 seconds.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Progress */}
                    {(isScanning || scanComplete) && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">
                            {scanComplete ? "Scan Complete" : "Scanning..."}
                          </span>
                          <span className="text-sm text-muted-foreground">{Math.min(100, Math.round(scanProgress))}%</span>
                        </div>
                        <Progress value={Math.min(100, scanProgress)} className="h-2" />
                      </div>
                    )}

                    {/* Check Items */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {quickScanChecks.map((check) => (
                        <div
                          key={check.name}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                            check.status === "complete"
                              ? "border-success/50 bg-success/5"
                              : check.status === "checking"
                              ? "border-primary/50 bg-primary/5"
                              : "border-border"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            check.status === "complete"
                              ? "bg-success/10"
                              : check.status === "checking"
                              ? "bg-primary/10"
                              : "bg-muted"
                          }`}>
                            {check.status === "complete" ? (
                              <CheckCircle className="w-4 h-4 text-success" />
                            ) : check.status === "checking" ? (
                              <check.icon className="w-4 h-4 text-primary animate-pulse" />
                            ) : (
                              <check.icon className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <span className={`text-sm font-medium ${
                            check.status === "complete" ? "text-foreground" : "text-muted-foreground"
                          }`}>
                            {check.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="deep">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="font-heading flex items-center gap-2">
                      <Target className="w-5 h-5 text-accent" />
                      Deep Scan
                    </CardTitle>
                    <CardDescription>
                      Comprehensive security analysis using browser extension recordings. Requires the Hercules browser extension.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Browser Extension Required</p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Deep scans use recorded browser sessions to test for business logic flaws, authentication bypasses, and complex vulnerabilities.
                        </p>
                        <Button variant="outline" size="sm">
                          Install Extension
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Results */}
            {scanComplete && (
              <Card className="border-border animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-heading">Scan Results</CardTitle>
                      <CardDescription>{url}</CardDescription>
                    </div>
                    <div className="text-center">
                      <div className={`text-4xl font-heading font-bold ${
                        mockResults.score >= 80 ? "text-success" : mockResults.score >= 60 ? "text-warning" : "text-destructive"
                      }`}>
                        {mockResults.score}
                      </div>
                      <p className="text-xs text-muted-foreground">Security Score</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Vulnerabilities */}
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3">Vulnerabilities Found</h3>
                    <div className="space-y-3">
                      {mockResults.vulnerabilities.map((vuln, index) => (
                        <div key={index} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant={vuln.severity === "high" ? "destructive" : vuln.severity === "medium" ? "default" : "secondary"}>
                              {vuln.severity}
                            </Badge>
                          </div>
                          <p className="font-medium text-foreground mb-1">{vuln.title}</p>
                          <p className="text-sm text-muted-foreground">{vuln.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="font-heading font-semibold text-foreground mb-3">Detected Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockResults.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button className="gradient-primary hover:opacity-90 transition-opacity">
                      Generate Report
                    </Button>
                    <Button variant="outline">
                      Schedule Monitoring
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Scan;