import { Header } from '@/components/Header';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Users,
  TrendingUp,
  CreditCard,
  Settings,
  Eye,
  Ban,
  Edit,
  Trash2,
  Lock,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

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

  const stats = [
    { icon: Users, label: 'Active Users', value: '12,450', change: '+8.2%' },
    { icon: TrendingUp, label: 'Revenue', value: '$48,920', change: '+12.5%' },
    { icon: CreditCard, label: 'Pending Payouts', value: '$14,230', change: '-2.3%' },
    { icon: Settings, label: 'System Health', value: '99.8%', change: 'Optimal' },
  ];

  const users = [
    { id: 1, email: 'user1@example.com', balance: 2450, status: 'verified', joined: '2 weeks ago', totalWinnings: 5890 },
    { id: 2, email: 'user2@example.com', balance: 850, status: 'pending', joined: '3 days ago', totalWinnings: 1200 },
    { id: 3, email: 'user3@example.com', balance: 5230, status: 'verified', joined: '1 month ago', totalWinnings: 8450 },
    { id: 4, email: 'user4@example.com', balance: 1560, status: 'suspended', joined: '2 months ago', totalWinnings: 3200 },
  ];

  const recentTransactions = [
    { id: 1, user: 'user1@example.com', type: 'Withdrawal', amount: '$500', status: 'completed' },
    { id: 2, user: 'user2@example.com', type: 'Deposit', amount: '$100', status: 'pending' },
    { id: 3, user: 'user3@example.com', type: 'Bonus', amount: '+$50', status: 'completed' },
    { id: 4, user: 'user4@example.com', type: 'Withdrawal', amount: '$1000', status: 'failed' },
  ];

  const gameStats = [
    { name: 'Spin Wheel', plays: 45230, winRate: '45%', avgPayout: '$125' },
    { name: 'Lottery', plays: 32100, winRate: '5%', avgPayout: '$500' },
    { name: 'Scratch Cards', plays: 28900, winRate: '35%', avgPayout: '$45' },
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
            <p className="text-foreground/60">Platform management, analytics, and control</p>
          </motion.div>

          {/* Tabs */}
          <motion.div
            variants={itemVariants}
            className="flex gap-2 border-b border-border overflow-x-auto pb-4"
          >
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'users', label: 'Users' },
              { id: 'transactions', label: 'Transactions' },
              { id: 'games', label: 'Games' },
              { id: 'settings', label: 'Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
              {/* Stats */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="p-6 rounded-xl border border-border bg-card/50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className="w-6 h-6 text-primary" />
                      <span className="text-sm font-medium text-muted-foreground">{stat.change}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="p-6 rounded-xl border border-border bg-card/50">
                  <h3 className="font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-left text-sm font-medium">
                      Generate Payout Report
                    </button>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-left text-sm font-medium">
                      Send Platform Announcement
                    </button>
                    <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-left text-sm font-medium">
                      Review Pending Withdrawals
                    </button>
                  </div>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card/50">
                  <h3 className="font-bold mb-4">System Status</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>API Status</span>
                      <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Operational</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Database</span>
                      <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Healthy</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment Gateway</span>
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-yellow-500" /> Degraded</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div variants={itemVariants} className="p-6 rounded-xl border border-border bg-card/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Users Management</h2>
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border hover:bg-background transition-colors">
                    <div>
                      <p className="font-medium">{user.email}</p>
                      <p className="text-sm text-muted-foreground">Balance: ${user.balance} • Winnings: ${user.totalWinnings} • {user.joined}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        user.status === 'verified'
                          ? 'bg-green-500/10 text-green-500'
                          : user.status === 'pending'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {user.status}
                      </span>
                      <button className="p-2 hover:bg-card rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-card rounded transition-colors">
                        <Edit className="w-4 h-4 text-primary" />
                      </button>
                      <button className="p-2 hover:bg-card rounded transition-colors">
                        <Ban className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <motion.div variants={itemVariants} className="p-6 rounded-xl border border-border bg-card/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Transaction History</h2>
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm">
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
              <div className="space-y-3">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                    <div>
                      <p className="font-medium">{tx.user}</p>
                      <p className="text-sm text-muted-foreground">{tx.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{tx.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded inline-block ${
                        tx.status === 'completed'
                          ? 'bg-green-500/10 text-green-500'
                          : tx.status === 'pending'
                          ? 'bg-yellow-500/10 text-yellow-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Games Tab */}
          {activeTab === 'games' && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="p-6 rounded-xl border border-border bg-card/50">
                <h2 className="text-2xl font-bold mb-6">Game Statistics</h2>
                <div className="space-y-4">
                  {gameStats.map((game, i) => (
                    <div key={i} className="p-4 rounded-lg bg-background/50 border border-border">
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-bold">{game.name}</p>
                        <button className="px-3 py-1 border border-border rounded text-sm hover:bg-card transition-colors">
                          Edit Odds
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Plays</p>
                          <p className="font-bold text-lg">{game.plays.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Win Rate</p>
                          <p className="font-bold text-lg text-primary">{game.winRate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg Payout</p>
                          <p className="font-bold text-lg">{game.avgPayout}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div variants={itemVariants} className="p-6 rounded-xl border border-border bg-card/50">
              <h2 className="text-2xl font-bold mb-6">Platform Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Maintenance Mode', desc: 'Temporarily disable all games' },
                  { label: 'Bonus Configuration', desc: 'Manage daily/referral bonuses' },
                  { label: 'Payout Limits', desc: 'Set withdrawal limits per user' },
                  { label: 'Game Odds', desc: 'Adjust game probabilities' },
                  { label: 'Email Templates', desc: 'Customize user emails' },
                  { label: 'Security Policy', desc: 'Manage authentication requirements' },
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border hover:bg-background transition-colors">
                    <div>
                      <p className="font-medium">{setting.label}</p>
                      <p className="text-sm text-muted-foreground">{setting.desc}</p>
                    </div>
                    <button className="px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm font-medium">
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
