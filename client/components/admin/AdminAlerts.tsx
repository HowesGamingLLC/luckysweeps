import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertCircle, CheckCircle, Info, TrendingUp, Users, CreditCard, Shield, X, Settings } from 'lucide-react';

const AdminAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      icon: AlertCircle,
      title: 'Large Withdrawal Detected',
      message: 'User john_anderson attempted to withdraw $2,000. Requires verification.',
      timestamp: '2 mins ago',
      read: false,
      action: 'Review',
    },
    {
      id: 2,
      type: 'warning',
      icon: TrendingUp,
      title: 'Unusual Trading Pattern',
      message: 'User profile_123 has made 45 bets in the last hour with 92% win rate.',
      timestamp: '5 mins ago',
      read: false,
      action: 'Investigate',
    },
    {
      id: 3,
      type: 'info',
      icon: Users,
      title: 'New User Registered',
      message: '5,432 new users registered today. Total active users: 12,450',
      timestamp: '10 mins ago',
      read: false,
      action: 'View',
    },
    {
      id: 4,
      type: 'success',
      icon: CheckCircle,
      title: 'KYC Batch Processed',
      message: '127 KYC documents reviewed and verified automatically.',
      timestamp: '15 mins ago',
      read: true,
      action: null,
    },
    {
      id: 5,
      type: 'critical',
      icon: CreditCard,
      title: 'Payment Gateway Error',
      message: 'Stripe connection failed. 23 pending transactions cannot be processed.',
      timestamp: '18 mins ago',
      read: true,
      action: 'Fix',
    },
    {
      id: 6,
      type: 'warning',
      icon: Shield,
      title: 'Suspicious Login Attempt',
      message: 'Multiple failed login attempts detected from IP 192.168.1.1',
      timestamp: '25 mins ago',
      read: true,
      action: 'Block IP',
    },
  ]);

  const [filterType, setFilterType] = useState('all');
  const [alertSettings, setAlertSettings] = useState({
    enabled: true,
    sound: true,
    desktop: true,
    email: true,
  });

  const unreadCount = alerts.filter((a) => !a.read).length;

  const markAsRead = (id: number) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
  };

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const filteredAlerts =
    filterType === 'all'
      ? alerts
      : alerts.filter((a) => {
          if (filterType === 'unread') return !a.read;
          if (filterType === 'critical') return a.type === 'critical';
          return a.type === filterType;
        });

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      critical: 'bg-red-500/10 border-red-500/20 text-red-500',
      warning: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500',
      info: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
      success: 'bg-green-500/10 border-green-500/20 text-green-500',
    };
    return colors[type] || colors.info;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Notifications & Alerts
          </h2>
          {unreadCount > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              You have <span className="font-bold text-primary">{unreadCount}</span> unread alerts
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm font-medium"
            >
              Mark All Read
            </button>
          )}
          <button className="px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm font-medium flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <p className="text-xs text-muted-foreground mb-1">Total Alerts</p>
          <p className="text-2xl font-bold">{alerts.length}</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <p className="text-xs text-muted-foreground mb-1">Unread</p>
          <p className="text-2xl font-bold text-primary">{unreadCount}</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <p className="text-xs text-muted-foreground mb-1">Critical</p>
          <p className="text-2xl font-bold text-red-500">{alerts.filter((a) => a.type === 'critical').length}</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <p className="text-xs text-muted-foreground mb-1">Warnings</p>
          <p className="text-2xl font-bold text-yellow-500">{alerts.filter((a) => a.type === 'warning').length}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All' },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'critical', label: 'Critical' },
          { id: 'warning', label: 'Warnings' },
          { id: 'success', label: 'Success' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setFilterType(filter.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filterType === filter.id
                ? 'bg-primary text-primary-foreground'
                : 'border border-border hover:bg-card'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => {
              const Icon = alert.icon;
              return (
                <motion.div
                  key={alert.id}
                  variants={itemVariants}
                  layout
                  className={`p-4 rounded-lg border-2 transition-all ${getTypeColor(alert.type)} ${
                    !alert.read ? 'border-l-4 shadow-md' : 'opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold">{alert.title}</h4>
                          <p className="text-sm opacity-90 mt-1">{alert.message}</p>
                        </div>
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="p-1 hover:bg-black/10 rounded transition-colors flex-shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3 text-xs">
                        <span className="opacity-75">{alert.timestamp}</span>
                        <div className="flex items-center gap-2">
                          {!alert.read && (
                            <button
                              onClick={() => markAsRead(alert.id)}
                              className="px-2 py-1 rounded bg-black/20 hover:bg-black/30 transition-colors"
                            >
                              Mark Read
                            </button>
                          )}
                          {alert.action && (
                            <button className="px-2 py-1 rounded bg-black/20 hover:bg-black/30 transition-colors font-semibold">
                              {alert.action}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              variants={itemVariants}
              className="p-8 rounded-lg border-2 border-border text-center text-muted-foreground"
            >
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No {filterType === 'all' ? 'alerts' : `${filterType} alerts`}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Settings Panel */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-xl border border-border bg-card/50"
      >
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Alert Preferences
        </h3>
        <div className="space-y-3">
          {[
            {
              key: 'enabled',
              label: 'Enable All Alerts',
              description: 'Turn on/off all notifications',
            },
            {
              key: 'sound',
              label: 'Sound Notifications',
              description: 'Play sound for critical alerts',
            },
            {
              key: 'desktop',
              label: 'Desktop Notifications',
              description: 'Show browser notifications',
            },
            {
              key: 'email',
              label: 'Email Notifications',
              description: 'Send critical alerts via email',
            },
          ].map((pref) => (
            <label
              key={pref.key}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-background/50 transition-colors cursor-pointer"
            >
              <div>
                <p className="font-medium text-sm">{pref.label}</p>
                <p className="text-xs text-muted-foreground">{pref.description}</p>
              </div>
              <input
                type="checkbox"
                checked={alertSettings[pref.key as keyof typeof alertSettings]}
                onChange={(e) =>
                  setAlertSettings({
                    ...alertSettings,
                    [pref.key]: e.target.checked,
                  })
                }
                className="rounded border-border w-5 h-5 cursor-pointer"
              />
            </label>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminAlerts;
