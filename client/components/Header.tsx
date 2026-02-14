import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Settings, User, Zap, Bell } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/games', label: 'Games' },
    { href: '/referrals', label: 'Referrals' },
    { href: '/leaderboard', label: 'Leaderboard' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-2">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            McLuck
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'text-primary'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">{user.email}</p>
                <p className="text-xs text-muted-foreground">Balance: ${user.balance.toFixed(2)}</p>
              </div>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/notifications"
                className="text-foreground/70 hover:text-foreground transition-colors relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">3</span>
              </Link>
              <button
                onClick={logout}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="container py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <div className="pt-4 border-t border-border space-y-4">
                  <div>
                    <p className="text-sm font-medium">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Balance: ${user.balance.toFixed(2)}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left text-sm font-medium text-destructive hover:text-destructive/80 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-4 border-t border-border space-y-3">
                <Link
                  to="/login"
                  className="block text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
