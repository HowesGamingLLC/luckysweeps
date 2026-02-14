import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Settings as SettingsIcon,
  Bell,
  Lock,
  Globe,
  Moon,
  Sun,
  LogOut,
  Eye,
  EyeOff,
} from 'lucide-react';

const Settings = () => {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });
  const [language, setLanguage] = useState('en');
  const [showPassword, setShowPassword] = useState(false);

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
          className="space-y-8 max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-4xl font-bold">Settings</h1>
              <p className="text-foreground/60">Manage your account preferences</p>
            </div>
          </motion.div>

          {/* Account Section */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl border border-border bg-card/50 space-y-6"
          >
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Lock className="w-6 h-6 text-primary" />
              Account
            </h2>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
                />
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm font-medium">
                  Change
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    readOnly
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm font-medium">
                  Change
                </button>
              </div>
            </div>

            {/* 2FA */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm font-medium">
                Enable
              </button>
            </div>
          </motion.div>

          {/* Preferences Section */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl border border-border bg-card/50 space-y-6"
          >
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" />
              Preferences
            </h2>

            {/* Theme */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Easier on the eyes at night</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-primary' : 'bg-border'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="pt">Português</option>
              </select>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-medium mb-2">Display Currency</label>
              <select className="w-full px-4 py-2 rounded-lg border border-border bg-background">
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="gbp">GBP (£)</option>
                <option value="btc">BTC</option>
                <option value="eth">ETH</option>
              </select>
            </div>
          </motion.div>

          {/* Notifications Section */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl border border-border bg-card/50 space-y-6"
          >
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Bell className="w-6 h-6 text-primary" />
              Notifications
            </h2>

            {[
              { key: 'email', label: 'Email Notifications', desc: 'Get updates via email' },
              { key: 'push', label: 'Push Notifications', desc: 'Browser notifications' },
              { key: 'sms', label: 'SMS Alerts', desc: 'Important alerts via SMS' },
            ].map((notif) => (
              <div key={notif.key} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                <div>
                  <p className="font-medium">{notif.label}</p>
                  <p className="text-sm text-muted-foreground">{notif.desc}</p>
                </div>
                <button
                  onClick={() => setNotifications({
                    ...notifications,
                    [notif.key]: !notifications[notif.key as keyof typeof notifications],
                  })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notifications[notif.key as keyof typeof notifications] ? 'bg-primary' : 'bg-border'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notifications[notif.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </motion.div>

          {/* Privacy Section */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl border border-border bg-card/50 space-y-4"
          >
            <h2 className="text-2xl font-bold">Privacy & Security</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-card transition-colors">
                Download Your Data
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-card transition-colors">
                Privacy Policy
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-card transition-colors">
                Terms of Service
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-card transition-colors">
                Responsible Gaming
              </button>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl border border-destructive/30 bg-destructive/5 space-y-4"
          >
            <h2 className="text-2xl font-bold">Danger Zone</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors">
                Temporarily Disable Account
              </button>
              <button
                onClick={logout}
                className="w-full px-4 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
              <button className="w-full px-4 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors">
                Delete Account Permanently
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
