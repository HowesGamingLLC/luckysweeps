import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/Header';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Demo credentials
      if (email === 'demo@mcluck.com' && password === 'demo123') {
        await login(email, password);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Try demo@mcluck.com / demo123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-xl border border-border bg-card/50 p-8 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-foreground/60">Sign in to your McLuck account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Demo credentials hint */}
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 text-sm text-primary">
                Demo: demo@mcluck.com / demo123
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-2 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Links */}
            <div className="space-y-2 text-sm text-center">
              <p className="text-foreground/60">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </p>
              <a href="#" className="text-primary hover:underline font-medium block">
                Forgot password?
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
