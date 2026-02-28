import { Header } from '@/components/Header';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import UserManagement from '@/components/admin/UserManagement';
import TransactionManagement from '@/components/admin/TransactionManagement';
import GameManagement from '@/components/admin/GameManagement';
import ReportingModule from '@/components/admin/ReportingModule';
import AdminSettings from '@/components/admin/AdminSettings';
import AdminAlerts from '@/components/admin/AdminAlerts';
import AuditLog from '@/components/admin/AuditLog';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [unreadAlerts, setUnreadAlerts] = useState(3);

  // Simulate API data fetching
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // In production, these would be real API calls:
        // const analytics = await fetch('/api/admin/analytics');
        // const users = await fetch('/api/admin/users');
        // const transactions = await fetch('/api/admin/transactions');
        // const games = await fetch('/api/games/stats');
        // const alerts = await fetch('/api/admin/alerts');
        
        console.log('Admin dashboard data loaded');
      } catch (error) {
        console.error('Failed to load admin data:', error);
      }
    };

    fetchAdminData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const tabs = [
    { id: 'analytics', label: 'Analytics' },
    { id: 'users', label: 'Users' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'games', label: 'Games' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' },
    { id: 'audit', label: 'Audit Log' },
    { id: 'alerts', label: 'Alerts', badge: unreadAlerts },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 md:py-12">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-foreground/60">Complete platform management, analytics, and control center</p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            variants={itemVariants}
            className="flex gap-2 border-b border-border overflow-x-auto pb-4"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium whitespace-nowrap transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                <span className="flex items-center gap-2">
                  {tab.label}
                  {tab.badge && (
                    <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold bg-destructive text-destructive-foreground">
                      {tab.badge}
                    </span>
                  )}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Analytics Tab */}
          {activeTab === 'analytics' && <AnalyticsDashboard />}

          {/* Users Tab */}
          {activeTab === 'users' && <UserManagement />}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && <TransactionManagement />}

          {/* Games Tab */}
          {activeTab === 'games' && <GameManagement />}

          {/* Reports Tab */}
          {activeTab === 'reports' && <ReportingModule />}

          {/* Settings Tab */}
          {activeTab === 'settings' && <AdminSettings />}

          {/* Audit Log Tab */}
          {activeTab === 'audit' && <AuditLog />}

          {/* Alerts Tab */}
          {activeTab === 'alerts' && <AdminAlerts />}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
