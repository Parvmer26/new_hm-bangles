import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from ?? "/";

  // Redirect once user is set
  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);

  const update =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) { toast.error(error); return; }
        toast.success("Welcome back!");
      } else {
        if (!formData.name.trim()) {
          toast.error("Please enter your full name.");
          return;
        }
        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters.");
          return;
        }
        const { error } = await signUp(
          formData.email,
          formData.password,
          formData.name.trim()
        );
        if (error) { toast.error(error); return; }
        toast.success("Account created! Welcome to HM Bangles 🎉");
      }
    } finally {
      setFormLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin((v) => !v);
    setFormData({ name: "", email: "", password: "" });
    setShowPassword(false);
  };

  if (!loading && user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-20 pb-16 px-4">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-medium text-foreground mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isLogin
                ? "Sign in to continue shopping"
                : "Join the HM Bangles family"}
            </p>
          </div>

          <div className="glass-card rounded-lg p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">

              {!isLogin && (
                <div>
                  <label className="block text-xs font-medium text-foreground uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={update("name")}
                    placeholder="Priya Sharma"
                    autoComplete="name"
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-foreground uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={update("email")}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={update("password")}
                    placeholder={isLogin ? "Your password" : "Min. 6 characters"}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 pr-10 bg-background border border-border rounded-sm text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-shadow"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={formLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-foreground text-background text-sm uppercase tracking-[0.15em] font-medium rounded-sm hover:bg-foreground/90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Please wait...
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={switchMode}
                  className="text-primary font-medium hover:underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;