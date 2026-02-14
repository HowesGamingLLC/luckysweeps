import { Header } from '@/components/Header';
import { motion } from 'framer-motion';
import { Trophy, Medal, Flame } from 'lucide-react';
import { useState } from 'react';

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('week');

  const leaderboardData = [
    { rank: 1, name: 'Alex_King', avatar: '👨‍💻', winnings: '$12,450', streak: '🔥🔥🔥' },
    { rank: 2, name: 'Sarah_Lucky', avatar: '👩‍💼', winnings: '$9,230', streak: '🔥🔥' },
    { rank: 3, name: 'James_Wilson', avatar: '👨‍🎓', winnings: '$8,560', streak: '🔥' },
    { rank: 4, name: 'Emma_Pro', avatar: '👩‍🎓', winnings: '$7,340', streak: '' },
    { rank: 5, name: 'Mike_Cash', avatar: '👨‍💼', winnings: '$6,890', streak: '🔥' },
    { rank: 6, name: 'Lisa_Winner', avatar: '👩‍💻', winnings: '$5,670', streak: '🔥🔥' },
    { rank: 7, name: 'David_Lucky', avatar: '👨‍🔧', winnings: '$4,320', streak: '' },
    { rank: 8, name: 'Jessica_Star', avatar: '👩‍🏫', winnings: '$3,890', streak: '🔥' },
    { rank: 9, name: 'Chris_Ace', avatar: '👨‍⚕️', winnings: '$3,210', streak: '' },
    { rank: 10, name: 'Anna_Fortune', avatar: '👩‍🎨', winnings: '$2,450', streak: '🔥' },
  ];

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

  const medals = ['🥇', '🥈', '🥉'];

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
          <motion.div variants={itemVariants} className="text-center space-y-2">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 text-primary" />
              Leaderboard
            </h1>
            <p className="text-foreground/60">See who's winning big this week</p>
          </motion.div>

          {/* Timeframe Selector */}
          <motion.div
            variants={itemVariants}
            className="flex gap-2 justify-center flex-wrap"
          >
            {['day', 'week', 'month', 'all-time'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  timeframe === tf
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:border-primary'
                }`}
              >
                {tf === 'day' ? 'Today' : tf === 'week' ? 'This Week' : tf === 'month' ? 'This Month' : 'All Time'}
              </button>
            ))}
          </motion.div>

          {/* Top 3 Spotlight */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {leaderboardData.slice(0, 3).map((player, i) => (
              <motion.div
                key={player.rank}
                variants={itemVariants}
                className={`p-6 rounded-xl border-2 text-center ${
                  i === 0
                    ? 'border-yellow-500 bg-yellow-500/10'
                    : i === 1
                    ? 'border-slate-400 bg-slate-400/10'
                    : 'border-orange-600 bg-orange-600/10'
                }`}
              >
                <div className="text-6xl mb-2">{medals[i]}</div>
                <div className="text-4xl mb-2">{player.avatar}</div>
                <h3 className="font-bold text-lg mb-2">{player.name}</h3>
                <p className="text-2xl font-bold text-primary mb-2">{player.winnings}</p>
                {player.streak && <p className="text-2xl">{player.streak}</p>}
              </motion.div>
            ))}
          </motion.div>

          {/* Full Leaderboard */}
          <motion.div
            variants={itemVariants}
            className="rounded-xl border border-border bg-card/50 overflow-hidden"
          >
            <div className="grid grid-cols-12 gap-4 p-6 border-b border-border font-bold text-sm sticky top-0 bg-card">
              <div className="col-span-1">Rank</div>
              <div className="col-span-1">Medal</div>
              <div className="col-span-4">Player</div>
              <div className="col-span-3">Winnings</div>
              <div className="col-span-3">Streak</div>
            </div>

            <motion.div
              className="divide-y divide-border"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {leaderboardData.map((player) => (
                <motion.div
                  key={player.rank}
                  variants={itemVariants}
                  className="grid grid-cols-12 gap-4 p-6 hover:bg-background/50 transition-colors items-center"
                >
                  <div className="col-span-1 font-bold text-lg">{player.rank}</div>
                  <div className="col-span-1 text-2xl">
                    {player.rank <= 3 ? medals[player.rank - 1] : ''}
                  </div>
                  <div className="col-span-4 flex items-center gap-2">
                    <span className="text-2xl">{player.avatar}</span>
                    <span className="font-medium">{player.name}</span>
                  </div>
                  <div className="col-span-3 font-bold text-primary">{player.winnings}</div>
                  <div className="col-span-3 text-lg">{player.streak}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Info */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl border border-border bg-primary/5"
          >
            <h3 className="font-bold mb-2">🔥 Streak Bonus</h3>
            <p className="text-sm text-foreground/60">Win 3 days in a row to unlock streak bonuses and climb the leaderboard!</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
