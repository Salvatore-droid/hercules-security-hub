import { 
  Globe, 
  Scan, 
  FileText, 
  CreditCard, 
  Building2, 
  Puzzle, 
  Brain,
  Lock
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Automated Reconnaissance",
    description: "Discover subdomains, endpoints, cloud assets, and technologies across 15+ sources automatically.",
    items: ["Subdomain enumeration", "Technology fingerprinting", "Cloud asset detection", "Historical data mining"],
  },
  {
    icon: Scan,
    title: "Intelligent Scanning",
    description: "From quick security checks to deep business logic testing with browser-based activity recording.",
    items: ["Quick & deep scans", "Auth bypass testing", "API security testing", "Race condition detection"],
  },
  {
    icon: Lock,
    title: "Vulnerability Discovery",
    description: "Context-aware payload generation with WAF bypass and advanced exploitation techniques.",
    items: ["XSS, SQLi, SSRF, RCE", "IDOR detection", "JWT/OAuth testing", "2FA bypass methods"],
  },
  {
    icon: FileText,
    title: "Bug Bounty Management",
    description: "Manage programs across all major platforms with automated reporting and duplicate checking.",
    items: ["Multi-platform support", "Auto report generation", "Duplicate checking", "Payout tracking"],
  },
  {
    icon: CreditCard,
    title: "Payments & Billing",
    description: "Seamless payment processing with escrow services and automated tax documentation.",
    items: ["Stripe & PayPal", "Escrow services", "Tax automation", "Usage-based billing"],
  },
  {
    icon: Building2,
    title: "Enterprise Features",
    description: "Continuous monitoring, compliance scanning, and team collaboration for organizations.",
    items: ["24/7 monitoring", "Compliance scanning", "SIEM integration", "Role-based access"],
  },
  {
    icon: Puzzle,
    title: "Tool Integrations",
    description: "Connect with your existing workflow through extensions, APIs, and CI/CD pipelines.",
    items: ["Burp Suite extension", "CI/CD scanning", "Ticketing systems", "CLI for power users"],
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Smart prioritization, remediation suggestions, and false positive reduction using AI.",
    items: ["Impact prioritization", "Auto remediation", "False positive filter", "Threat intelligence"],
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for{" "}
            <span className="text-primary">Security Success</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From reconnaissance to reporting, Hercules provides a complete toolkit 
            for security researchers and enterprise teams.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:shadow-soft-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
