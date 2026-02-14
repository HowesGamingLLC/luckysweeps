import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { Copy, Share2, Users, TrendingUp, Award } from 'lucide-react';
import { useState } from 'react';

const Referrals = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralCode = user?.referralCode || 'MCLUCK2024';
  const referralUrl = `https://mcluck.com?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referrals = [
    { id: 1, name: 'Alex Thompson', earnings: '$125', status: 'Active', joined: '2 weeks ago' },
    { id: 2, name: 'Sarah Miller', earnings: '$340', status: 'Active', joined: '1 month ago' },
    { id: 3, name: 'James Wilson', earnings: '$89', status: 'Pending', joined: '3 days ago' },
  ];

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
            <h1 className="text-4xl font-bold mb-2">Referral Program</h1>
            <p className="text-foreground/60">Earn unlimited commissions by referring friends</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: Users, label: 'Total Referrals', value: '12' },
              { icon: TrendingUp, label: 'Active Referrals', value: '8' },
              { icon: Award, label: 'Earnings', value: '$554' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 rounded-xl border border-border bg-card/50"
              >
                <stat.icon className="w-6 h-6 text-primary mb-3" />
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Share Section */}
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-xl border border-primary/30 bg-primary/5 space-y-4"
          >
            <h2 className="text-2xl font-bold">Your Referral Link</h2>
            <div className="bg-background rounded-lg p-4 border border-border font-mono text-sm break-all">
              {referralUrl}
            </div>
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </motion.div>

          {/* Commission Structure */}
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-xl border border-border bg-card/50"
          >
            <h2 className="text-2xl font-bold mb-6">Commission Structure</h2>
            <div className="space-y-4">
              {[
                { level: 'Level 1', commission: '10%', description: 'Direct referrals' },
                { level: 'Level 2', commission: '5%', description: 'Secondary referrals' },
                { level: 'VIP Bonus', commission: '+5%', description: 'For 10+ active referrals' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                  <div>
                    <p className="font-bold">{item.level}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <p className="text-2xl font-bold text-primary">{item.commission}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Referrals List */}
          <motion.div
            variants={itemVariants}
            className="p-8 rounded-xl border border-border bg-card/50"
          >
            <h2 className="text-2xl font-bold mb-6">Your Referrals</h2>
            <div className="space-y-3">
              {referrals.map((ref) => (
                <div key={ref.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                  <div>
                    <p className="font-bold">{ref.name}</p>
                    <p className="text-sm text-muted-foreground">Joined {ref.joined}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{ref.earnings}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      ref.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {ref.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Referrals;
