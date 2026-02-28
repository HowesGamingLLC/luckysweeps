import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import UserManagement from '@/components/admin/UserManagement';
import TransactionManagement from '@/components/admin/TransactionManagement';
import GameManagement from '@/components/admin/GameManagement';
import ReportingModule from '@/components/admin/ReportingModule';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminAlerts from '@/components/admin/AdminAlerts';
import AuditLog from '@/components/admin/AuditLog';
import { Bell, BarChart3, Users, CreditCard, Gamepad2, FileText, Settings, ShieldAlert, HelpCircle, LogOut, Menu, X } from 'lucide-react';

const AdminDashboardEnhanced = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [unreadAlerts, setUnreadAlerts] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveTab(hash);
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const navItems = [
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'transactions', icon: CreditCard, label: 'Transactions' },
    { id: 'games', icon: Gamepad2, label: 'Games' },
    { id: 'reports', icon: FileText, label: 'Reports' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'audit', icon: ShieldAlert, label: 'Audit Log' },
    { id: 'alerts', icon: Bell, label: 'Alerts', badge: unreadAlerts },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Desktop */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`hidden lg:flex flex-col w-64 border-r border-border bg-card/50 sticky top-0 h-screen transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-bold text-lg">McLuck</h2>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  window.location.hash = item.id;
                  setActiveTab(item.id);
                }}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-destructive text-destructive-foreground">
                    {item.badge}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 space-y-2 border-t border-border">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium text-sm">Help & Docs</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          className="border-b border-border bg-card/50 sticky top-0 z-20 backdrop-blur-sm"
        >
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-background rounded-lg transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Admin Control Panel</h1>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <button className="relative p-2 hover:bg-background rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                {unreadAlerts > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive"></span>
                )}
              </button>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center flex-shrink-0">
                <span className="text-xs md:text-sm font-bold text-primary-foreground">A</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto"
        >
          <div className="p-4 md:p-6 max-w-7xl mx-auto">
            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-4">
                  <div className="inline-block">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              </div>
            )}

            {/* Tab Content */}
            {!isLoading && (
              <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {activeTab === 'analytics' && <AnalyticsDashboard />}
                {activeTab === 'users' && <UserManagement />}
                {activeTab === 'transactions' && <TransactionManagement />}
                {activeTab === 'games' && <GameManagement />}
                {activeTab === 'reports' && <ReportingModule />}
                {activeTab === 'settings' && <AdminSettings />}
                {activeTab === 'audit' && <AuditLog />}
                {activeTab === 'alerts' && <AdminAlerts />}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardEnhanced;
