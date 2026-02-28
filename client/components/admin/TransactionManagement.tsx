import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  Eye,
  Shield,
  MessageSquare,
} from 'lucide-react';

const TransactionManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null);

  const allTransactions = [
    {
      id: 'TXN001',
      user: 'John Anderson',
      email: 'user1@example.com',
      type: 'deposit',
      amount: 500,
      method: 'Stripe',
      status: 'completed',
      date: '2024-02-15 14:30',
      fee: 12.50,
      description: 'Deposit via Stripe',
      riskScore: 'low',
    },
    {
      id: 'TXN002',
      user: 'Sarah Miller',
      email: 'user2@example.com',
      type: 'withdrawal',
      amount: 250,
      method: 'Bank Transfer',
      status: 'pending',
      date: '2024-02-15 13:15',
      fee: 5.00,
      description: 'Withdrawal to bank account',
      riskScore: 'medium',
    },
    {
      id: 'TXN003',
      user: 'Michael Johnson',
      email: 'user3@example.com',
      type: 'game_payout',
      amount: 1250,
      method: 'Game Win',
      status: 'completed',
      date: '2024-02-15 12:00',
      fee: 0,
      description: 'Spin Wheel - 25x Multiplier Win',
      riskScore: 'low',
    },
    {
      id: 'TXN004',
      user: 'Emma Davis',
      email: 'user4@example.com',
      type: 'deposit',
      amount: 1000,
      method: 'Crypto (Bitcoin)',
      status: 'failed',
      date: '2024-02-15 10:45',
      fee: 0,
      description: 'Bitcoin deposit - Transaction not confirmed',
      riskScore: 'critical',
    },
    {
      id: 'TXN005',
      user: 'Robert Wilson',
      email: 'user5@example.com',
      type: 'refund',
      amount: 100,
      method: 'Stripe',
      status: 'completed',
      date: '2024-02-14 16:20',
      fee: 0,
      description: 'Dispute refund - Unauthorized access',
      riskScore: 'high',
    },
    {
      id: 'TXN006',
      user: 'John Anderson',
      email: 'user1@example.com',
      type: 'withdrawal',
      amount: 2000,
      method: 'PayPal',
      status: 'disputed',
      date: '2024-02-14 11:30',
      fee: 10.00,
      description: 'Withdrawal dispute - Claiming wrong amount received',
      riskScore: 'high',
    },
    {
      id: 'TXN007',
      user: 'Sarah Miller',
      email: 'user2@example.com',
      type: 'bonus',
      amount: 50,
      method: 'Referral Bonus',
      status: 'completed',
      date: '2024-02-13 09:15',
      fee: 0,
      description: 'Referral bonus - 3 new users',
      riskScore: 'low',
    },
  ];

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    let result = allTransactions;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (tx) =>
          tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      result = result.filter((tx) => tx.type === typeFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((tx) => tx.status === statusFilter);
    }

    return result;
  }, [searchTerm, typeFilter, statusFilter]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case 'game_payout':
        return <ArrowUpRight className="w-4 h-4 text-primary" />;
      case 'refund':
        return <ArrowDownLeft className="w-4 h-4 text-blue-500" />;
      case 'bonus':
        return <ArrowDownLeft className="w-4 h-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'disputed':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: 'bg-green-500/10 text-green-500',
      pending: 'bg-yellow-500/10 text-yellow-500',
      failed: 'bg-red-500/10 text-red-500',
      disputed: 'bg-orange-500/10 text-orange-500',
    };
    return colors[status] || 'bg-gray-500/10 text-gray-500';
  };

  const getRiskColor = (risk: string) => {
    const colors: Record<string, string> = {
      low: 'text-green-500',
      medium: 'text-yellow-500',
      high: 'text-orange-500',
      critical: 'text-red-500',
    };
    return colors[risk] || 'text-gray-500';
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
          <h2 className="text-2xl font-bold">Transaction Management</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor deposits, withdrawals, payouts, and disputes
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm font-medium w-fit">
          <Download className="w-4 h-4" />
          Export Transactions
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <p className="text-xs text-muted-foreground mb-1">Total Volume</p>
          <p className="text-xl font-bold">$125,450</p>
          <p className="text-xs text-green-500 mt-1">↑ 8.2%</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <p className="text-xs text-muted-foreground mb-1">Pending</p>
          <p className="text-xl font-bold">$8,320</p>
          <p className="text-xs text-yellow-500 mt-1">3 transactions</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <p className="text-xs text-muted-foreground mb-1">Failed</p>
          <p className="text-xl font-bold">$1,500</p>
          <p className="text-xs text-red-500 mt-1">1 transaction</p>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <p className="text-xs text-muted-foreground mb-1">Disputed</p>
          <p className="text-xl font-bold">$2,000</p>
          <p className="text-xs text-orange-500 mt-1">1 transaction</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by TXN ID, user, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary transition-colors text-sm"
        >
          <option value="all">All Types</option>
          <option value="deposit">Deposits</option>
          <option value="withdrawal">Withdrawals</option>
          <option value="game_payout">Game Payouts</option>
          <option value="refund">Refunds</option>
          <option value="bonus">Bonuses</option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary transition-colors text-sm"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="disputed">Disputed</option>
        </select>
      </div>

      {/* Transactions Table */}
      <div className="p-6 rounded-xl border border-border bg-card/50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-semibold">TXN ID</th>
              <th className="px-4 py-3 text-left font-semibold">User</th>
              <th className="px-4 py-3 text-left font-semibold">Type</th>
              <th className="px-4 py-3 text-left font-semibold">Amount</th>
              <th className="px-4 py-3 text-left font-semibold">Method</th>
              <th className="px-4 py-3 text-left font-semibold">Date</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Risk</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr
                key={tx.id}
                className={`border-b border-border hover:bg-background/50 transition-colors cursor-pointer ${
                  selectedTransaction === parseInt(tx.id.slice(-3)) ? 'bg-background/50' : ''
                }`}
                onClick={() => setSelectedTransaction(parseInt(tx.id.slice(-3)))}
              >
                <td className="px-4 py-3">
                  <p className="font-mono text-xs font-semibold text-primary">{tx.id}</p>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{tx.user}</p>
                    <p className="text-xs text-muted-foreground">{tx.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(tx.type)}
                    <span className="capitalize">{tx.type.replace('_', ' ')}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <p className="font-bold">${tx.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Fee: ${tx.fee.toFixed(2)}</p>
                </td>
                <td className="px-4 py-3 text-sm">{tx.method}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{tx.date}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(tx.status)}
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-semibold capitalize ${getRiskColor(tx.riskScore)}`}>
                    {tx.riskScore}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-card rounded transition-colors" title="View Details">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    {(tx.status === 'disputed' || tx.status === 'failed') && (
                      <button className="p-1.5 hover:bg-card rounded transition-colors" title="Resolve Dispute">
                        <Shield className="w-4 h-4 text-orange-500" />
                      </button>
                    )}
                    <button className="p-1.5 hover:bg-card rounded transition-colors" title="Add Note">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>Showing {filteredTransactions.length} of {allTransactions.length} transactions</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-border rounded hover:bg-card transition-colors">
            ← Previous
          </button>
          <button className="px-3 py-1 border border-border rounded hover:bg-card transition-colors">
            Next →
          </button>
        </div>
      </div>

      {/* Dispute Resolution Panel */}
      {selectedTransaction && (
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border bg-card/50"
        >
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            Dispute Resolution Panel
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Resolution Action</label>
              <select className="w-full px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary">
                <option>Select action...</option>
                <option>Approve Withdrawal</option>
                <option>Issue Refund</option>
                <option>Investigate Further</option>
                <option>Reject Claim</option>
                <option>Escalate to Legal</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <select className="w-full px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Internal Notes</label>
              <textarea
                rows={3}
                placeholder="Add notes about this dispute resolution..."
                className="w-full px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary"
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                Resolve Dispute
              </button>
              <button className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors font-medium">
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TransactionManagement;
