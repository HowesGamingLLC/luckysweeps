import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  Gift, 
  Users, 
  History,
  MoreVertical,
  Zap,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const transactions = [
    { id: 1, type: 'win', amount: 150, game: 'Spin Wheel', time: '2h ago' },
    { id: 2, type: 'deposit', amount: 100, method: 'Stripe', time: '1d ago' },
    { id: 3, type: 'withdrawal', amount: 200, method: 'Bank Transfer', time: '2d ago' },
    { id: 4, type: 'bonus', amount: 50, reason: 'Daily Bonus', time: '3d ago' },
  ];

  const stats = [
    { label: 'Total Balance', value: `$${user?.balance.toFixed(2) || '0.00'}`, icon: Wallet, color: 'from-primary' },
    { label: 'Total Winnings', value: '$2,450', icon: TrendingUp, color: 'from-green-500' },
    { label: 'Referral Bonus', value: '$180', icon: Users, color: 'from-blue-500' },
    { label: 'Daily Bonus', value: '+$25', icon: Gift, color: 'from-yellow-500' },
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
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Welcome back, {user?.email?.split('@')[0]}!</h1>
              <p className="text-foreground/60 mt-2">Account ID: {user?.id.slice(0, 8)}...</p>
            </div>
            <Link
              to="/settings"
              className="p-2 rounded-lg border border-border hover:bg-card transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`p-6 rounded-xl border border-border bg-gradient-to-br from-card to-card/50`}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} to-transparent bg-opacity-10`}>
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <Link
                    to="/games"
                    className="p-4 rounded-lg border border-primary text-center hover:bg-primary/10 transition-colors group"
                  >
                    <Zap className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Play Games</p>
                  </Link>
                  <Link
                    to="/referrals"
                    className="p-4 rounded-lg border border-primary text-center hover:bg-primary/10 transition-colors group"
                  >
                    <Users className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Referrals</p>
                  </Link>
                  <button className="p-4 rounded-lg border border-primary text-center hover:bg-primary/10 transition-colors group">
                    <Gift className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Claim Bonus</p>
                  </button>
                </div>
              </motion.div>

              {/* Transaction History */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Recent Activity</h2>
                  <Link to="#" className="text-primary text-sm hover:underline">
                    View all
                  </Link>
                </div>

                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          tx.type === 'win' ? 'bg-green-500/10' :
                          tx.type === 'deposit' ? 'bg-blue-500/10' :
                          tx.type === 'withdrawal' ? 'bg-yellow-500/10' :
                          'bg-purple-500/10'
                        }`}>
                          {(tx.type === 'deposit' || tx.type === 'bonus') ? (
                            <ArrowDownLeft className="w-5 h-5 text-green-500" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-yellow-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium capitalize">{tx.type === 'win' ? `Won - ${tx.game}` : tx.type === 'bonus' ? tx.reason : `${tx.type} - ${(tx as any).method}`}</p>
                          <p className="text-xs text-muted-foreground">{tx.time}</p>
                        </div>
                      </div>
                      <p className="font-bold">{tx.type === 'withdrawal' ? '-' : '+'}${tx.amount}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Status */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <h2 className="text-lg font-bold mb-4">Account Status</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Email Verified</p>
                    <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-500 font-medium">✓ Yes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Account Level</p>
                    <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium">Silver</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Withdrawal Limit</p>
                    <span className="text-xs font-medium">$10,000/day</span>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Verification Progress</p>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Referral Code */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl border border-primary/30 bg-primary/5"
              >
                <h2 className="text-lg font-bold mb-4">Referral Code</h2>
                <div className="bg-background rounded-lg p-3 font-mono text-center text-sm mb-4 border border-border">
                  {user?.referralCode || 'MCLUCK2024'}
                </div>
                <button className="w-full py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-sm font-medium">
                  Copy & Share
                </button>
              </motion.div>

              {/* Support */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <h2 className="text-lg font-bold mb-4">Need Help?</h2>
                <button className="w-full py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-medium mb-2">
                  Contact Support
                </button>
                <button className="w-full py-2 rounded-lg border border-border hover:bg-card transition-colors text-sm font-medium">
                  View FAQ
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
