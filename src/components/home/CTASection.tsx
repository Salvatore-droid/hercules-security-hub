import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Trophy } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 md:p-16">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Find Your Next Big Bounty?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10">
              Join thousands of security researchers who trust Hercules to discover 
              vulnerabilities and earn rewards. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-primary-foreground hover:bg-white/10 w-full sm:w-auto"
              >
                Schedule a Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { icon: Shield, label: "SOC 2 Compliant" },
                { icon: Users, label: "10,000+ Researchers" },
                { icon: Trophy, label: "$50M+ Paid Out" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-2">
                  <item.icon className="w-6 h-6 text-primary-foreground/80" />
                  <span className="text-sm text-primary-foreground/80">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
