import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Bell, 
  Mail,
  Smartphone,
  Trash2,
  Archive,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';

const Notifications = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'win',
      title: '🎉 Congratulations!',
      message: 'You won $150 on Spin Wheel!',
      timestamp: '5 minutes ago',
      read: false,
      icon: '🎁',
    },
    {
      id: 2,
      type: 'bonus',
      title: '💰 Daily Bonus Available',
      message: 'Claim your $10 daily bonus now!',
      timestamp: '2 hours ago',
      read: false,
      icon: '💎',
    },
    {
      id: 3,
      type: 'referral',
      title: '👥 Referral Reward',
      message: 'Your friend Alex won $50, you earned $5',
      timestamp: '1 day ago',
      read: true,
      icon: '🤝',
    },
    {
      id: 4,
      type: 'payout',
      title: '✓ Withdrawal Completed',
      message: 'Your $500 withdrawal has been processed',
      timestamp: '2 days ago',
      read: true,
      icon: '💳',
    },
    {
      id: 5,
      type: 'security',
      title: '⚠️ Security Alert',
      message: 'New login from Chrome on Windows',
      timestamp: '3 days ago',
      read: true,
      icon: '🔒',
    },
    {
      id: 6,
      type: 'promotion',
      title: '🚀 New Game Available',
      message: 'Try our new Daily Drops game now!',
      timestamp: '1 week ago',
      read: true,
      icon: '🎮',
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
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
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
                <Bell className="w-8 h-8 text-primary" />
                Notifications
              </h1>
              <p className="text-foreground/60">Stay updated with wins, bonuses, and rewards</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">{notifications.filter(n => !n.read).length}</p>
              <p className="text-sm text-muted-foreground">Unread</p>
            </div>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl border border-border bg-card/50"
          >
            <h2 className="text-lg font-bold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { label: 'In-App Notifications', icon: Bell, enabled: true },
                { label: 'Email Notifications', icon: Mail, enabled: true },
                { label: 'Push Notifications', icon: Smartphone, enabled: false },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border">
                  <div className="flex items-center gap-3">
                    <pref.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{pref.label}</span>
                  </div>
                  <button
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      pref.enabled ? 'bg-primary' : 'bg-border'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        pref.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            variants={itemVariants}
            className="flex gap-2 border-b border-border pb-4"
          >
            {['all', 'unread', 'archived'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab as any)}
                className={`px-4 py-2 font-medium capitalize transition-colors ${
                  filter === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* Notifications List */}
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredNotifications.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-12"
              >
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">No Notifications</h3>
                <p className="text-muted-foreground">You're all caught up!</p>
              </motion.div>
            ) : (
              filteredNotifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  variants={itemVariants}
                  className={`p-4 rounded-lg border transition-all ${
                    notif.read
                      ? 'border-border bg-background/30'
                      : 'border-primary/50 bg-primary/5'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{notif.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className={`font-bold ${!notif.read ? 'text-primary' : ''}`}>
                            {notif.title}
                          </h3>
                          <p className="text-foreground/70 text-sm mt-1">{notif.message}</p>
                          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {notif.timestamp}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                          )}
                          <button
                            onClick={() => markAsRead(notif.id)}
                            className="p-2 hover:bg-card rounded transition-colors"
                            title="Mark as read"
                          >
                            <CheckCircle className="w-4 h-4 text-muted-foreground hover:text-primary" />
                          </button>
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            className="p-2 hover:bg-card rounded transition-colors"
                            title="Delete notification"
                          >
                            <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Activity Summary */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl border border-border bg-card/50"
          >
            <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Total notifications this week</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between py-2 border-t border-border pt-2">
                <span className="text-muted-foreground">Wins announced</span>
                <span className="font-bold text-green-500">4</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Rewards claimed</span>
                <span className="font-bold text-primary">$85</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;
