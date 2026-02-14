import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/Header';
import { Mail, Lock, Eye, EyeOff, User, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agree) {
      setError('You must agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      // Demo registration
      if (email && password.length >= 6) {
        await register(email, password);
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError('Invalid email or password (min 6 characters)');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container flex items-center justify-center min-h-[calc(100vh-64px)] py-12">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h2 className="text-3xl font-bold">Account Created!</h2>
            <p className="text-foreground/60">Welcome to McLuck. Redirecting to your dashboard...</p>
          </motion.div>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold">Create Account</h1>
              <p className="text-foreground/60">Join McLuck and start winning today</p>
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1 cursor-pointer"
                  required
                />
                <label htmlFor="agree" className="text-sm text-foreground/70 cursor-pointer">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                </label>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-2 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Links */}
            <div className="text-sm text-center text-foreground/60">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
