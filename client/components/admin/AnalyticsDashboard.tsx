import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

const AnalyticsDashboard = () => {
  // Revenue trend data (last 30 days)
  const revenueData = [
    { date: 'Day 1', revenue: 8400, cost: 2400, profit: 6000 },
    { date: 'Day 5', revenue: 9200, cost: 2210, profit: 6990 },
    { date: 'Day 10', revenue: 9800, cost: 2290, profit: 7510 },
    { date: 'Day 15', revenue: 12100, cost: 2000, profit: 10100 },
    { date: 'Day 20', revenue: 13200, cost: 2181, profit: 11019 },
    { date: 'Day 25', revenue: 15800, cost: 2500, profit: 13300 },
    { date: 'Day 30', revenue: 18200, cost: 2100, profit: 16100 },
  ];

  // Player growth data
  const playerGrowthData = [
    { week: 'Week 1', newPlayers: 450, activeUsers: 1200, totalUsers: 1200 },
    { week: 'Week 2', newPlayers: 620, activeUsers: 1800, totalUsers: 1820 },
    { week: 'Week 3', newPlayers: 890, activeUsers: 2400, totalUsers: 2710 },
    { week: 'Week 4', newPlayers: 1200, activeUsers: 3200, totalUsers: 3910 },
  ];

  // Game performance data
  const gamePerformanceData = [
    { name: 'Spin Wheel', value: 45, plays: 45230 },
    { name: 'Lottery', value: 25, plays: 32100 },
    { name: 'Scratch Cards', value: 30, plays: 28900 },
  ];

  // Win rate by game
  const winRateData = [
    { game: 'Spin Wheel', winRate: 45, players: 2500 },
    { game: 'Lottery', winRate: 5, players: 1800 },
    { game: 'Scratch', winRate: 35, players: 2100 },
    { game: 'Daily Bonus', winRate: 100, players: 3500 },
  ];

  const COLORS = ['#d4af37', '#9333ea', '#3b82f6', '#ec4899'];

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
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Key Metrics */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border bg-gradient-to-br from-primary/10 to-primary/5"
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-primary" />
            <span className="text-sm font-bold text-green-500">+24.5%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
          <p className="text-3xl font-bold">$245,890</p>
          <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border bg-gradient-to-br from-blue-500/10 to-blue-500/5"
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-500" />
            <span className="text-sm font-bold text-green-500">+18.2%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Active Players</p>
          <p className="text-3xl font-bold">12,450</p>
          <p className="text-xs text-muted-foreground mt-2">Today: 3,240</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border bg-gradient-to-br from-green-500/10 to-green-500/5"
        >
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-green-500" />
            <span className="text-sm font-bold text-green-500">+12.8%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Payouts</p>
          <p className="text-3xl font-bold">$156,340</p>
          <p className="text-xs text-muted-foreground mt-2">Pending: $24,500</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border bg-gradient-to-br from-purple-500/10 to-purple-500/5"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <span className="text-sm font-bold text-green-500">+8.4%</span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Total Plays</p>
          <p className="text-3xl font-bold">106,230</p>
          <p className="text-xs text-muted-foreground mt-2">Daily avg: 3,541</p>
        </motion.div>
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Revenue Trend */}
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border bg-card/50"
        >
          <h3 className="font-bold text-lg mb-4">Revenue Trend (30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d4af37" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#d4af37" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#d4af37"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorProfit)"
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Player Growth */}
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border bg-card/50"
        >
          <h3 className="font-bold text-lg mb-4">Player Growth (4 Weeks)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={playerGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="week" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="newPlayers" fill="#9333ea" name="New Players" />
              <Bar dataKey="activeUsers" fill="#3b82f6" name="Active Users" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Game Distribution */}
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border bg-card/50"
        >
          <h3 className="font-bold text-lg mb-4">Game Play Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gamePerformanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {gamePerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Win Rate by Game */}
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border bg-card/50"
        >
          <h3 className="font-bold text-lg mb-4">Win Rate & Player Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={winRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="game" stroke="#666" />
              <YAxis yAxisId="left" stroke="#666" />
              <YAxis yAxisId="right" orientation="right" stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="winRate" fill="#d4af37" name="Win Rate %" />
              <Bar yAxisId="right" dataKey="players" fill="#3b82f6" name="Players" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Statistics Summary */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="p-6 rounded-xl border border-border bg-card/50">
          <h3 className="font-bold text-sm text-muted-foreground mb-3">Average Session</h3>
          <p className="text-2xl font-bold">24m 32s</p>
          <p className="text-xs text-muted-foreground mt-2">↑ 3.2% from last week</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card/50">
          <h3 className="font-bold text-sm text-muted-foreground mb-3">Player Retention</h3>
          <p className="text-2xl font-bold">68.4%</p>
          <p className="text-xs text-muted-foreground mt-2">↑ 5.1% from last week</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card/50">
          <h3 className="font-bold text-sm text-muted-foreground mb-3">Avg Bet Size</h3>
          <p className="text-2xl font-bold">$23.45</p>
          <p className="text-xs text-muted-foreground mt-2">↓ 1.2% from last week</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnalyticsDashboard;
