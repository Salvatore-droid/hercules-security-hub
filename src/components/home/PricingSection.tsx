import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Researcher",
    description: "Perfect for individual bug bounty hunters",
    price: "Free",
    period: "",
    features: [
      "5 Quick Scans / month",
      "Basic vulnerability detection",
      "Standard reports",
      "Community support",
      "HackerOne integration",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro Researcher",
    description: "For serious security professionals",
    price: "$49",
    period: "/month",
    features: [
      "Unlimited Quick Scans",
      "25 Deep Scans / month",
      "Advanced detection engine",
      "Priority reports",
      "All platform integrations",
      "Browser extension access",
      "Email support",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Team",
    description: "Collaborate with your security team",
    price: "$199",
    period: "/month",
    features: [
      "Everything in Pro",
      "5 team members",
      "Unlimited Deep Scans",
      "Shared workspace",
      "Team analytics",
      "API access",
      "Priority support",
    ],
    cta: "Start Team Trial",
    popular: false,
  },
  {
    name: "Enterprise",
    description: "For organizations running bounty programs",
    price: "Custom",
    period: "",
    features: [
      "Everything in Team",
      "Unlimited team members",
      "Custom integrations",
      "Compliance reporting",
      "SIEM integration",
      "Dedicated support",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple, Transparent{" "}
            <span className="text-gradient">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your security needs. 
            Start free and upgrade as you grow.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-2xl bg-card border transition-all duration-300 hover:shadow-soft-lg ${
                plan.popular 
                  ? "border-primary shadow-soft-lg scale-105 lg:scale-110" 
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gradient-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="font-heading text-4xl font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? "gradient-primary hover:opacity-90" 
                    : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
                {plan.popular && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          ))}
        </div>

        {/* Enterprise CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Need a custom solution for your organization?
          </p>
          <Button variant="link" className="text-primary">
            Talk to our enterprise team
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
