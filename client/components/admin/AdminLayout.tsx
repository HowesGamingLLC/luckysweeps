import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, CreditCard, Gamepad2, FileText, Settings, Bell, ShieldAlert, HelpCircle, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: BarChart3, label: 'Analytics', path: '/admin#analytics' },
    { icon: Users, label: 'Users', path: '/admin#users' },
    { icon: CreditCard, label: 'Transactions', path: '/admin#transactions' },
    { icon: Gamepad2, label: 'Games', path: '/admin#games' },
    { icon: FileText, label: 'Reports', path: '/admin#reports' },
    { icon: Settings, label: 'Settings', path: '/admin#settings' },
    { icon: ShieldAlert, label: 'Audit Log', path: '/admin#audit' },
    { icon: Bell, label: 'Alerts', path: '/admin#alerts' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar Navigation */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex flex-col w-64 border-r border-border bg-card/50 backdrop-blur-sm sticky top-0 h-screen"
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <Link to="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Admin</h2>
              <p className="text-xs text-muted-foreground">Control Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.path.includes(currentPath);
            return (
              <motion.a
                key={item.label}
                href={item.path}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {item.label === 'Alerts' && (
                  <span className="ml-auto px-2 py-0.5 rounded-full text-xs font-bold bg-destructive text-destructive-foreground">
                    3
                  </span>
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 space-y-2 border-t border-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Help & Docs</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10"
        >
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Control Panel</h1>
              <p className="text-sm text-muted-foreground">Manage platform, users, and operations</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-background rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">A</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex-1 overflow-y-auto"
        >
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLayout;
