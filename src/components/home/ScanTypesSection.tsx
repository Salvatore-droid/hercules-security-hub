import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Search, Download, ArrowRight } from "lucide-react";

export function ScanTypesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <Badge variant="secondary" className="mb-4">
              Scanning Engine
            </Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Two Powerful Ways to{" "}
              <span className="text-primary">Find Vulnerabilities</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you need a quick security check or deep business logic testing, 
              Hercules has you covered with intelligent scanning options.
            </p>

            {/* Scan Types */}
            <div className="space-y-6">
              {/* Quick Scan */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Quick Scan
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Fast security assessment using just a URL. Perfect for initial reconnaissance 
                      and identifying common vulnerabilities.
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {["SSL/TLS Check", "Security Headers", "Common Files", "Tech Stack"].map((item) => (
                        <li key={item} className="px-2 py-1 rounded-md bg-secondary text-xs text-secondary-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Deep Scan */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Search className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      Deep Scan
                      <Badge variant="outline" className="ml-2 text-xs">Extension Required</Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Advanced testing using browser extension recordings. Captures real user 
                      interactions to find business logic flaws.
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {["Auth Testing", "Business Logic", "Race Conditions", "API Fuzzing"].map((item) => (
                        <li key={item} className="px-2 py-1 rounded-md bg-secondary text-xs text-secondary-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="primary-primary hover:opacity-90">
                Try Quick Scan Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Get Browser Extension
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-primary-to-br from-primary/5 to-accent/5 border border-border p-8 flex items-center justify-center">
              <div className="w-full max-w-sm space-y-4">
                {/* Mock Scan UI */}
                <div className="p-4 rounded-xl bg-card border border-border shadow-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg primary-primary flex items-center justify-center">
                      <Search className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 primary-primary rounded-full animate-pulse" />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-primary">75%</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Subdomains", count: 47, status: "done" },
                      { label: "Endpoints", count: 234, status: "done" },
                      { label: "Vulnerabilities", count: 12, status: "scanning" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{item.count}</span>
                          {item.status === "done" ? (
                            <div className="w-2 h-2 rounded-full bg-success" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="flex gap-3">
                  <div className="flex-1 p-3 rounded-xl bg-success/10 border border-success/20">
                    <div className="text-2xl font-bold text-success mb-1">8</div>
                    <div className="text-xs text-muted-foreground">Low Risk</div>
                  </div>
                  <div className="flex-1 p-3 rounded-xl bg-warning/10 border border-warning/20">
                    <div className="text-2xl font-bold text-warning mb-1">3</div>
                    <div className="text-xs text-muted-foreground">Medium</div>
                  </div>
                  <div className="flex-1 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                    <div className="text-2xl font-bold text-destructive mb-1">1</div>
                    <div className="text-xs text-muted-foreground">Critical</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
