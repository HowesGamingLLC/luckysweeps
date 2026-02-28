import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Bell, Shield, Users, CreditCard, AlertCircle, Eye, EyeOff, Save, X } from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('security');
  const [showPassword, setShowPassword] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<string | null>(null);

  const [settings, setSettings] = useState({
    maintenanceMode: false,
    requireTwoFactor: true,
    passwordExpiration: 90,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    ipWhitelist: false,
    enableAuditLog: true,
    requireKYC: true,
    minWithdrawalAmount: 10,
    maxWithdrawalAmount: 50000,
  });

  const emailTemplates = [
    {
      id: 'welcome',
      name: 'Welcome Email',
      subject: 'Welcome to McLuck!',
      type: 'user',
      lastModified: '2024-02-10',
      description: 'Sent when a new user registers',
    },
    {
      id: 'verification',
      name: 'Email Verification',
      subject: 'Verify Your Email Address',
      type: 'user',
      lastModified: '2024-02-10',
      description: 'Email confirmation link for new registrations',
    },
    {
      id: 'password_reset',
      name: 'Password Reset',
      subject: 'Reset Your Password',
      type: 'user',
      lastModified: '2024-02-05',
      description: 'Password recovery email with reset link',
    },
    {
      id: 'kyc_approved',
      name: 'KYC Approved',
      subject: 'Your KYC Verification is Complete',
      type: 'user',
      lastModified: '2024-02-08',
      description: 'Notification when KYC verification is approved',
    },
    {
      id: 'withdrawal_confirmation',
      name: 'Withdrawal Confirmation',
      subject: 'Your Withdrawal Request',
      type: 'transaction',
      lastModified: '2024-02-12',
      description: 'Confirmation of withdrawal request',
    },
    {
      id: 'deposit_received',
      name: 'Deposit Received',
      subject: 'Deposit Confirmed',
      type: 'transaction',
      lastModified: '2024-02-12',
      description: 'Confirmation when deposit is received',
    },
  ];

  const adminUsers = [
    { id: 1, email: 'admin@mcluck.com', role: 'Super Admin', status: 'active', lastLogin: '2 mins ago' },
    { id: 2, email: 'moderator@mcluck.com', role: 'Moderator', status: 'active', lastLogin: '1 hour ago' },
    { id: 3, email: 'support@mcluck.com', role: 'Support', status: 'active', lastLogin: '30 mins ago' },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div className="space-y-6" variants={itemVariants}>
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Admin Settings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure security policies, email templates, and platform settings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border overflow-x-auto">
        {[
          { id: 'security', label: 'Security', icon: Lock },
          { id: 'email', label: 'Email Templates', icon: Mail },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'access', label: 'Admin Access', icon: Users },
          { id: 'payments', label: 'Payment Settings', icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Security Tab */}
      {activeTab === 'security' && (
        <motion.div className="space-y-6" variants={itemVariants}>
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h3 className="font-bold mb-6">Security Settings</h3>

            <div className="space-y-4">
              {/* Maintenance Mode */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                <div>
                  <p className="font-semibold">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">Temporarily disable all platform features</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                    className="mr-3"
                  />
                  <div
                    className={`w-10 h-6 rounded-full transition-colors ${
                      settings.maintenanceMode ? 'bg-primary' : 'bg-gray-600'
                    }`}
                  ></div>
                </label>
              </div>

              {/* Two Factor Auth */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                <div>
                  <p className="font-semibold">Require Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Enforce 2FA for all admin accounts</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.requireTwoFactor}
                    onChange={(e) => setSettings({ ...settings, requireTwoFactor: e.target.checked })}
                    className="mr-3"
                  />
                  <div
                    className={`w-10 h-6 rounded-full transition-colors ${
                      settings.requireTwoFactor ? 'bg-primary' : 'bg-gray-600'
                    }`}
                  ></div>
                </label>
              </div>

              {/* Password Expiration */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                <div>
                  <p className="font-semibold">Password Expiration (Days)</p>
                  <p className="text-sm text-muted-foreground">Force password change after N days</p>
                </div>
                <input
                  type="number"
                  value={settings.passwordExpiration}
                  onChange={(e) => setSettings({ ...settings, passwordExpiration: parseInt(e.target.value) })}
                  className="w-20 px-3 py-2 border border-border rounded bg-background text-right"
                />
              </div>

              {/* Session Timeout */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                <div>
                  <p className="font-semibold">Session Timeout (Minutes)</p>
                  <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                </div>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
                  className="w-20 px-3 py-2 border border-border rounded bg-background text-right"
                />
              </div>

              {/* Login Attempts */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                <div>
                  <p className="font-semibold">Max Login Attempts</p>
                  <p className="text-sm text-muted-foreground">Lock account after failed attempts</p>
                </div>
                <input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) })}
                  className="w-20 px-3 py-2 border border-border rounded bg-background text-right"
                />
              </div>

              {/* IP Whitelist */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                <div>
                  <p className="font-semibold">IP Whitelist</p>
                  <p className="text-sm text-muted-foreground">Restrict access to whitelisted IPs</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.ipWhitelist}
                    onChange={(e) => setSettings({ ...settings, ipWhitelist: e.target.checked })}
                    className="mr-3"
                  />
                  <div
                    className={`w-10 h-6 rounded-full transition-colors ${
                      settings.ipWhitelist ? 'bg-primary' : 'bg-gray-600'
                    }`}
                  ></div>
                </label>
              </div>

              {/* Audit Logging */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                <div>
                  <p className="font-semibold">Enable Audit Logging</p>
                  <p className="text-sm text-muted-foreground">Log all admin actions for compliance</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableAuditLog}
                    onChange={(e) => setSettings({ ...settings, enableAuditLog: e.target.checked })}
                    className="mr-3"
                  />
                  <div
                    className={`w-10 h-6 rounded-full transition-colors ${
                      settings.enableAuditLog ? 'bg-primary' : 'bg-gray-600'
                    }`}
                  ></div>
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button className="px-6 py-2 border border-border rounded-lg hover:bg-card transition-colors font-medium">
                Reset to Defaults
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Email Templates Tab */}
      {activeTab === 'email' && (
        <motion.div className="space-y-4" variants={itemVariants}>
          {emailTemplates.map((template) => (
            <div key={template.id} className="p-4 rounded-lg border border-border bg-card/50 hover:bg-background/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold">{template.name}</h4>
                    <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium">
                      {template.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Subject: <span className="font-mono">{template.subject}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last modified: {template.lastModified}
                  </p>
                </div>
                <button
                  onClick={() => setEditingTemplate(template.id)}
                  className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors text-sm font-medium"
                >
                  Edit
                </button>
              </div>

              {/* Edit Panel */}
              {editingTemplate === template.id && (
                <div className="mt-4 p-4 border-t border-border pt-4 space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject Line</label>
                    <input
                      type="text"
                      defaultValue={template.subject}
                      className="w-full px-4 py-2 border border-border rounded bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Body</label>
                    <textarea
                      rows={6}
                      defaultValue={`Dear {{USER_NAME}},\n\n${template.description}\n\nBest regards,\nMcLuck Team`}
                      className="w-full px-4 py-2 border border-border rounded bg-background font-mono text-sm"
                    />
                  </div>
                  <div className="p-3 rounded bg-blue-500/10 border border-blue-500/20">
                    <p className="text-xs font-medium text-blue-500 mb-2">Available Variables:</p>
                    <div className="flex flex-wrap gap-2">
                      {['{{USER_NAME}}', '{{USER_EMAIL}}', '{{LINK}}', '{{DATE}}', '{{AMOUNT}}'].map((var_) => (
                        <code key={var_} className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-500">
                          {var_}
                        </code>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 font-medium text-sm">
                      Save Template
                    </button>
                    <button
                      onClick={() => setEditingTemplate(null)}
                      className="px-4 py-2 border border-border rounded hover:bg-card font-medium text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <motion.div className="space-y-6" variants={itemVariants}>
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h3 className="font-bold mb-4">Notification Settings</h3>
            <div className="space-y-3">
              {['Large Withdrawals (>$1000)', 'Failed Transactions', 'Suspicious Activity', 'New KYC Submissions', 'System Alerts'].map(
                (notif) => (
                  <label key={notif} className="flex items-center gap-3 p-3 rounded hover:bg-background/50">
                    <input type="checkbox" defaultChecked className="rounded border-border" />
                    <span className="text-sm">{notif}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Admin Access Tab */}
      {activeTab === 'access' && (
        <motion.div className="space-y-6" variants={itemVariants}>
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Admin Users</h3>
              <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm font-medium">
                Add Admin
              </button>
            </div>
            <div className="space-y-3">
              {adminUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                  <div>
                    <p className="font-semibold">{user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.role} • {user.lastLogin}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-500">{user.status}</span>
                    <button className="p-1 hover:bg-card rounded">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Payment Settings Tab */}
      {activeTab === 'payments' && (
        <motion.div className="space-y-6" variants={itemVariants}>
          <div className="p-6 rounded-xl border border-border bg-card/50">
            <h3 className="font-bold mb-6">Payment Configuration</h3>

            <div className="space-y-4">
              {/* Withdrawal Limits */}
              <div>
                <label className="text-sm font-medium mb-2 block">Minimum Withdrawal Amount</label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">$</span>
                  <input
                    type="number"
                    value={settings.minWithdrawalAmount}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        minWithdrawalAmount: parseFloat(e.target.value),
                      })
                    }
                    className="flex-1 px-4 py-2 border border-border rounded bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Maximum Withdrawal Amount</label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">$</span>
                  <input
                    type="number"
                    value={settings.maxWithdrawalAmount}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        maxWithdrawalAmount: parseFloat(e.target.value),
                      })
                    }
                    className="flex-1 px-4 py-2 border border-border rounded bg-background"
                  />
                </div>
              </div>

              {/* KYC Requirement */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border">
                <div>
                  <p className="font-semibold">Require KYC for Withdrawals</p>
                  <p className="text-sm text-muted-foreground">Users must complete KYC before withdrawing</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.requireKYC}
                    onChange={(e) => setSettings({ ...settings, requireKYC: e.target.checked })}
                    className="mr-3"
                  />
                  <div
                    className={`w-10 h-6 rounded-full transition-colors ${
                      settings.requireKYC ? 'bg-primary' : 'bg-gray-600'
                    }`}
                  ></div>
                </label>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminSettings;
