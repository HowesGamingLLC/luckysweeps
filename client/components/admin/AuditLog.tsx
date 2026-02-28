import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  User,
  Settings,
  Lock,
  AlertCircle,
  CheckCircle,
  Clock,
  LogOut,
} from 'lucide-react';

const AuditLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [selectedLog, setSelectedLog] = useState<number | null>(null);

  const auditLogs = [
    {
      id: 1,
      timestamp: '2024-02-15 14:32:45',
      admin: 'admin@mcluck.com',
      action: 'User Suspended',
      target: 'user_4 (Emma Davis)',
      category: 'user_management',
      details: 'Account suspended due to suspicious activity. Risk score: critical',
      status: 'completed',
      ipAddress: '192.168.1.50',
      severity: 'critical',
    },
    {
      id: 2,
      timestamp: '2024-02-15 14:15:23',
      admin: 'moderator@mcluck.com',
      action: 'Disputed Transaction Resolved',
      target: 'TXN006 ($2000)',
      category: 'transaction',
      details: 'Dispute resolved. Full refund issued to user. Reason: Unauthorized access claim',
      status: 'completed',
      ipAddress: '192.168.1.45',
      severity: 'high',
    },
    {
      id: 3,
      timestamp: '2024-02-15 13:48:12',
      admin: 'admin@mcluck.com',
      action: 'Game Odds Modified',
      target: 'Spin Wheel',
      category: 'game_management',
      details: 'RTP updated from 96.5% to 96.8%. House edge: 3.2%',
      status: 'completed',
      ipAddress: '192.168.1.50',
      severity: 'medium',
    },
    {
      id: 4,
      timestamp: '2024-02-15 13:22:00',
      admin: 'support@mcluck.com',
      action: 'Email Template Updated',
      target: 'Password Reset Email',
      category: 'settings',
      details: 'Updated password reset email template. Added new security notice.',
      status: 'completed',
      ipAddress: '192.168.1.60',
      severity: 'low',
    },
    {
      id: 5,
      timestamp: '2024-02-15 12:55:33',
      admin: 'admin@mcluck.com',
      action: 'Security Policy Changed',
      target: 'Two-Factor Authentication',
      category: 'security',
      details: '2FA requirement enforced for all admin accounts',
      status: 'completed',
      ipAddress: '192.168.1.50',
      severity: 'critical',
    },
    {
      id: 6,
      timestamp: '2024-02-15 12:10:45',
      admin: 'moderator@mcluck.com',
      action: 'KYC Document Approved',
      target: '5 users',
      category: 'compliance',
      details: 'Batch KYC verification completed. 5 documents approved.',
      status: 'completed',
      ipAddress: '192.168.1.45',
      severity: 'low',
    },
    {
      id: 7,
      timestamp: '2024-02-15 11:30:12',
      admin: 'admin@mcluck.com',
      action: 'Admin Login',
      target: 'admin@mcluck.com',
      category: 'authentication',
      details: 'Successful admin login from IP 192.168.1.50. Session: 24h',
      status: 'completed',
      ipAddress: '192.168.1.50',
      severity: 'low',
    },
    {
      id: 8,
      timestamp: '2024-02-15 10:45:00',
      admin: 'admin@mcluck.com',
      action: 'Payment Gateway Configuration Updated',
      target: 'Stripe Integration',
      category: 'settings',
      details: 'Updated Stripe webhook URLs and API keys',
      status: 'completed',
      ipAddress: '192.168.1.50',
      severity: 'critical',
    },
  ];

  const filteredLogs = useMemo(() => {
    let result = auditLogs;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (log) =>
          log.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.action.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Action filter
    if (actionFilter !== 'all') {
      result = result.filter((log) => log.category === actionFilter);
    }

    return result;
  }, [searchTerm, actionFilter]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'high':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'medium':
        return <CheckCircle className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    const colors: Record<string, string> = {
      critical: 'bg-red-500/10 text-red-500',
      high: 'bg-orange-500/10 text-orange-500',
      medium: 'bg-yellow-500/10 text-yellow-500',
      low: 'bg-green-500/10 text-green-500',
    };
    return colors[severity] || 'bg-gray-500/10 text-gray-500';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'user_management':
        return <User className="w-4 h-4" />;
      case 'settings':
        return <Settings className="w-4 h-4" />;
      case 'security':
        return <Lock className="w-4 h-4" />;
      case 'authentication':
        return <LogOut className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div className="space-y-6" variants={itemVariants}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Audit Log & Compliance</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track all admin actions for security and regulatory compliance
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm font-medium w-fit">
          <Download className="w-4 h-4" />
          Export Log
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <p className="text-xs text-muted-foreground mb-1">Total Actions</p>
          <p className="text-2xl font-bold">{auditLogs.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Today</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <p className="text-xs text-muted-foreground mb-1">Critical Events</p>
          <p className="text-2xl font-bold text-red-500">{auditLogs.filter((l) => l.severity === 'critical').length}</p>
          <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <p className="text-xs text-muted-foreground mb-1">Active Admins</p>
          <p className="text-2xl font-bold">3</p>
          <p className="text-xs text-muted-foreground mt-1">This session</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <p className="text-xs text-muted-foreground mb-1">Compliance Status</p>
          <p className="text-2xl font-bold text-green-500">100%</p>
          <p className="text-xs text-muted-foreground mt-1">All good</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by admin, action, or target..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Category Filter */}
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary transition-colors text-sm"
        >
          <option value="all">All Actions</option>
          <option value="user_management">User Management</option>
          <option value="transaction">Transactions</option>
          <option value="game_management">Games</option>
          <option value="security">Security</option>
          <option value="settings">Settings</option>
          <option value="compliance">Compliance</option>
          <option value="authentication">Authentication</option>
        </select>

        {/* Date Range */}
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary transition-colors text-sm"
        >
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Audit Log Table */}
      <div className="p-6 rounded-xl border border-border bg-card/50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-semibold">Timestamp</th>
              <th className="px-4 py-3 text-left font-semibold">Admin</th>
              <th className="px-4 py-3 text-left font-semibold">Action</th>
              <th className="px-4 py-3 text-left font-semibold">Target</th>
              <th className="px-4 py-3 text-left font-semibold">Category</th>
              <th className="px-4 py-3 text-left font-semibold">IP Address</th>
              <th className="px-4 py-3 text-left font-semibold">Severity</th>
              <th className="px-4 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr
                key={log.id}
                className={`border-b border-border hover:bg-background/50 transition-colors cursor-pointer ${
                  selectedLog === log.id ? 'bg-background/50' : ''
                }`}
                onClick={() => setSelectedLog(log.id)}
              >
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{log.timestamp}</td>
                <td className="px-4 py-3">
                  <p className="text-sm font-medium">{log.admin}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{log.action}</p>
                </td>
                <td className="px-4 py-3 text-sm">{log.target}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(log.category)}
                    <span className="text-xs capitalize">{log.category.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs font-mono text-muted-foreground">{log.ipAddress}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(log.severity)}
                    <span className={`text-xs font-medium px-2 py-1 rounded capitalize ${getSeverityColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button className="p-1 hover:bg-card rounded transition-colors">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Log Details Panel */}
      {selectedLog && (
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border bg-card/50"
        >
          {(() => {
            const log = auditLogs.find((l) => l.id === selectedLog);
            return log ? (
              <>
                <h3 className="text-xl font-bold mb-4">Action Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3">Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Timestamp</p>
                        <p className="font-mono">{log.timestamp}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Admin Account</p>
                        <p className="font-mono">{log.admin}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">IP Address</p>
                        <p className="font-mono">{log.ipAddress}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-3">Action Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Action Type</p>
                        <p className="font-medium">{log.action}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Target</p>
                        <p className="font-medium">{log.target}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Severity</p>
                        <span className={`text-xs font-medium px-2 py-1 rounded capitalize ${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Details</h4>
                    <p className="text-sm bg-background/50 p-3 rounded border border-border">{log.details}</p>
                  </div>

                  <div className="md:col-span-2">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Compliance Notes</h4>
                    <div className="p-3 rounded border border-green-500/20 bg-green-500/5">
                      <p className="text-sm text-green-500 font-medium">✓ Action complies with security policies</p>
                      <p className="text-xs text-muted-foreground mt-1">This action was authorized and properly logged for audit trail.</p>
                    </div>
                  </div>
                </div>
              </>
            ) : null;
          })()}
        </motion.div>
      )}

      {/* Compliance Summary */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-xl border border-green-500/20 bg-green-500/5"
      >
        <h3 className="font-bold text-green-500 mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Compliance Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Audit Trail</p>
            <p className="font-semibold text-green-500">Complete & Verified</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Last Review</p>
            <p className="font-semibold">2024-02-15 10:00</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Regulatory Status</p>
            <p className="font-semibold text-green-500">Compliant</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuditLog;
