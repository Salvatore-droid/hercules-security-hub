import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft, Mail, Lock, User } from "lucide-react";
import { Helmet } from "react-helmet";

// Define types
interface AuthResponse {
  access_token?: string;
  token?: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  detail?: string;
  message?: string;
}

const API_BASE_URL = "http://localhost:8000";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Helper functions for localStorage
  const getAuthToken = (): string | null => localStorage.getItem("auth_token");
  const setAuthToken = (token: string): void => localStorage.setItem("auth_token", token);
  const removeAuthToken = (): void => localStorage.removeItem("auth_token");

  // Check auth status
  const checkAuthStatus = async (): Promise<boolean> => {
    const token = getAuthToken();
    if (!token) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/api/check-auth/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data.authenticated;
      }
      return false;
    } catch (error) {
      console.error("Auth check failed:", error);
      return false;
    }
  };

  // Show toast notification
  const showToast = (title: string, message: string, type: 'success' | 'error' = 'success') => {
    // Using alert for simplicity - replace with toast library if needed
    if (type === 'success') {
      alert(`${title}: ${message}`);
    } else {
      alert(`Error: ${message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // FIX 1: Updated endpoints to match typical FastAPI structure
      const endpoint = isLogin ? "auth/login" : "auth/signup";
      
      // FIX 2: Proper payload structure
      const payload = isLogin 
        ? { email, password }
        : { email, password, name };

      console.log("Sending request to:", `${API_BASE_URL}/${endpoint}`);
      console.log("Payload:", payload);

      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      
      // Handle non-JSON responses
      if (!response.ok) {
        let errorMessage = "Authentication failed";
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData);
        } catch (jsonError) {
          // If response is not JSON, try to get text
          const text = await response.text();
          errorMessage = text || `HTTP ${response.status}`;
        }
        
        throw new Error(errorMessage);
      }

      const data: AuthResponse = await response.json();
      console.log("Response data:", data);

      // FIX 3: Handle both possible token field names
      const token = data.access_token || data.token;
      
      if (token) {
        // Store token in localStorage
        setAuthToken(token);
        
        showToast("Success", isLogin ? "Login successful!" : "Account created successfully!", 'success');

        // Redirect immediately without checking auth status
        navigate("/dashboard");
      } else {
        showToast("Error", "No authentication token received", 'error');
      }
    } catch (error: any) {
      console.error("Auth error details:", error);
      showToast("Error", error.message || "Network error. Please check your connection.", 'error');
      
      // Check if it's a CORS error
      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        console.error("This might be a CORS issue. Check that:");
        console.error("1. Backend server is running on port 8000");
        console.error("2. Backend has CORS enabled for localhost:8080");
        console.error("3. The endpoint exists (try accessing http://localhost:8000/auth/login in browser or Postman)");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      showToast("Error", "Please enter your email address first", 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        showToast("Password Reset", "If an account exists, you will receive reset instructions.", 'success');
      } else {
        showToast("Error", "Failed to send reset email", 'error');
      }
    } catch (error) {
      showToast("Error", "Network error. Please try again.", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick test function to check backend connectivity
  const testBackendConnection = async () => {
    try {
      console.log("Testing backend connection...");
      const response = await fetch(`${API_BASE_URL}/`);
      console.log("Backend response:", await response.text());
      return true;
    } catch (error) {
      console.error("Backend connection test failed:", error);
      return false;
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Sign In" : "Sign Up"} - Hercules Security</title>
        <meta name="description" content="Access your Hercules Security account to manage scans and track vulnerabilities." />
      </Helmet>

      <div className="min-h-screen bg-background flex">
        {/* Left side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 gradient-primary p-12 flex-col justify-between">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to home</span>
            </Link>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-2xl text-primary-foreground">Hercules</span>
            </div>
            <h1 className="font-heading text-4xl font-bold text-primary-foreground mb-4">
              Security at Scale
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-md">
              Join thousands of security researchers and companies protecting the digital world together.
            </p>
          </div>

          <div className="flex gap-8 text-primary-foreground/70 text-sm">
            <span>10,000+ Researchers</span>
            <span>$50M+ Paid</span>
            <span>99.9% Uptime</span>
          </div>
        </div>

        {/* Right side - Auth Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile back link */}
            <Link to="/" className="lg:hidden inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to home</span>
            </Link>

            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">Hercules</span>
            </div>

            {/* Debug button - remove in production */}
            <div className="mb-4 text-center">
              <button 
                onClick={testBackendConnection}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Test Backend Connection
              </button>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                {isLogin ? "Welcome back" : "Create your account"}
              </h2>
              <p className="text-muted-foreground">
                {isLogin 
                  ? "Enter your credentials to access your dashboard" 
                  : "Start your free trial and protect what matters"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required={!isLogin}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={8}
                    disabled={isLoading}
                  />
                </div>
                {!isLogin && (
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters
                  </p>
                )}
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    className="text-sm text-primary hover:underline"
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full gradient-primary hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-muted-foreground text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-sm text-primary font-medium hover:underline"
                disabled={isLoading}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="#" className="underline hover:text-foreground">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="underline hover:text-foreground">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;