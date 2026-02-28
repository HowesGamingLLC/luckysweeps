import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, MoreVertical, Eye, Edit, Ban, CheckCircle, AlertCircle, Clock, Shield, Send } from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [kycFilter, setKycFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  const allUsers = [
    {
      id: 1,
      email: 'user1@example.com',
      name: 'John Anderson',
      balance: 2450,
      totalWinnings: 5890,
      totalLosses: 2100,
      status: 'verified',
      kyc: 'approved',
      joinedDate: '2024-01-15',
      lastLogin: '2 hours ago',
      playtime: '125h 30m',
      avgBetSize: 25.50,
      totalPlays: 1245,
      riskScore: 'low',
    },
    {
      id: 2,
      email: 'user2@example.com',
      name: 'Sarah Miller',
      balance: 850,
      totalWinnings: 1200,
      totalLosses: 450,
      status: 'active',
      kyc: 'pending',
      joinedDate: '2024-02-03',
      lastLogin: '1 day ago',
      playtime: '24h 15m',
      avgBetSize: 15.00,
      totalPlays: 320,
      riskScore: 'medium',
    },
    {
      id: 3,
      email: 'user3@example.com',
      name: 'Michael Johnson',
      balance: 5230,
      totalWinnings: 8450,
      totalLosses: 1200,
      status: 'verified',
      kyc: 'approved',
      joinedDate: '2023-12-20',
      lastLogin: '30 mins ago',
      playtime: '280h 45m',
      avgBetSize: 45.75,
      totalPlays: 3450,
      riskScore: 'high',
    },
    {
      id: 4,
      email: 'user4@example.com',
      name: 'Emma Davis',
      balance: 1560,
      totalWinnings: 3200,
      totalLosses: 800,
      status: 'suspended',
      kyc: 'rejected',
      joinedDate: '2024-01-01',
      lastLogin: '1 month ago',
      playtime: '45h 20m',
      avgBetSize: 32.00,
      totalPlays: 580,
      riskScore: 'critical',
    },
    {
      id: 5,
      email: 'user5@example.com',
      name: 'Robert Wilson',
      balance: 3420,
      totalWinnings: 6700,
      totalLosses: 2100,
      status: 'verified',
      kyc: 'approved',
      joinedDate: '2024-01-25',
      lastLogin: 'Just now',
      playtime: '92h 10m',
      avgBetSize: 28.50,
      totalPlays: 982,
      riskScore: 'medium',
    },
  ];

  // Filter and search users
  const filteredUsers = useMemo(() => {
    let result = allUsers;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((user) => user.status === statusFilter);
    }

    // KYC filter
    if (kycFilter !== 'all') {
      result = result.filter((user) => user.kyc === kycFilter);
    }

    // Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime());
    } else if (sortBy === 'balance') {
      result.sort((a, b) => b.balance - a.balance);
    } else if (sortBy === 'activity') {
      result.sort((a, b) => b.totalPlays - a.totalPlays);
    }

    return result;
  }, [searchTerm, statusFilter, kycFilter, sortBy]);

  const handleSelectUser = (id: number) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      verified: 'bg-green-500/10 text-green-500',
      active: 'bg-blue-500/10 text-blue-500',
      pending: 'bg-yellow-500/10 text-yellow-500',
      suspended: 'bg-red-500/10 text-red-500',
    };
    return styles[status] || 'bg-gray-500/10 text-gray-500';
  };

  const getKycBadge = (kyc: string) => {
    const styles: Record<string, string> = {
      approved: 'bg-green-500/10 text-green-500',
      pending: 'bg-yellow-500/10 text-yellow-500',
      rejected: 'bg-red-500/10 text-red-500',
    };
    return styles[kyc] || 'bg-gray-500/10 text-gray-500';
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
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage users, verify KYC, and monitor account status
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Export Users
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm font-medium">
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary transition-colors text-sm"
        >
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>

        {/* KYC Filter */}
        <select
          value={kycFilter}
          onChange={(e) => setKycFilter(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary transition-colors text-sm"
        >
          <option value="all">All KYC</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-background/50 focus:outline-none focus:border-primary transition-colors text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="balance">Highest Balance</option>
          <option value="activity">Most Active</option>
        </select>
      </div>

      {/* User Table */}
      <div className="p-6 rounded-xl border border-border bg-card/50 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold">User</th>
              <th className="px-4 py-3 text-left font-semibold">Balance</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">KYC</th>
              <th className="px-4 py-3 text-left font-semibold">Playtime</th>
              <th className="px-4 py-3 text-left font-semibold">Risk</th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-background/50 transition-colors">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-semibold">${user.balance.toFixed(2)}</p>
                    <p className="text-xs text-green-500">↑${user.totalWinnings}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getKycBadge(user.kyc)}`}>
                    {user.kyc}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm">{user.playtime}</p>
                  <p className="text-xs text-muted-foreground">{user.totalPlays} plays</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-semibold capitalize ${getRiskColor(user.riskScore)}`}>
                    {user.riskScore}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-card rounded transition-colors">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 hover:bg-card rounded transition-colors">
                      <Edit className="w-4 h-4 text-primary" />
                    </button>
                    <button className="p-1.5 hover:bg-card rounded transition-colors">
                      <Ban className="w-4 h-4 text-destructive" />
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
        <p>
          Showing {filteredUsers.length} of {allUsers.length} users
          {selectedUsers.length > 0 && ` • ${selectedUsers.length} selected`}
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-border rounded hover:bg-card transition-colors">
            ← Previous
          </button>
          <button className="px-3 py-1 border border-border rounded hover:bg-card transition-colors">
            Next →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserManagement;
