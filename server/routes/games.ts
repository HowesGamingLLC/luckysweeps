import { RequestHandler } from 'express';
import { z } from 'zod';

// In-memory transactions storage
const transactions: any[] = [];

const gameSchema = z.object({
  email: z.string().email(),
  gameType: z.enum(['wheel', 'lottery', 'scratch']),
  bet: z.number().min(1),
});

export const playSpinWheel: RequestHandler = (req, res) => {
  try {
    const { email, bet } = gameSchema.parse(req.body);

    // Simulate game result
    const wheelSegments = [
      { label: '2x', multiplier: 2 },
      { label: '5x', multiplier: 5 },
      { label: '0.5x', multiplier: 0.5 },
      { label: '10x', multiplier: 10 },
      { label: '1x', multiplier: 1 },
      { label: '3x', multiplier: 3 },
    ];

    const randomIndex = Math.floor(Math.random() * wheelSegments.length);
    const result = wheelSegments[randomIndex];
    const winAmount = Math.floor(bet * result.multiplier);
    const isWin = result.multiplier > 1;

    // Record transaction
    transactions.push({
      id: `tx-${Date.now()}`,
      email,
      type: 'game',
      gameType: 'wheel',
      bet,
      winAmount: isWin ? winAmount : 0,
      isWin,
      result: result.label,
      timestamp: new Date().toISOString(),
    });

    res.json({
      isWin,
      multiplier: result.multiplier,
      bet,
      winAmount: isWin ? winAmount : 0,
      result: result.label,
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

export const playLottery: RequestHandler = (req, res) => {
  try {
    const { email, bet } = gameSchema.parse(req.body);

    // Generate lottery numbers
    const playerNumbers = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 49) + 1
    );
    const winningNumbers = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 49) + 1
    );

    // Check matches
    const matches = playerNumbers.filter((n) =>
      winningNumbers.includes(n)
    ).length;

    const isWin = matches >= 4; // 4+ matches to win
    const winAmount = isWin ? bet * (100 * (matches / 6)) : 0;

    // Record transaction
    transactions.push({
      id: `tx-${Date.now()}`,
      email,
      type: 'game',
      gameType: 'lottery',
      bet,
      winAmount: Math.floor(winAmount),
      isWin,
      matches,
      timestamp: new Date().toISOString(),
    });

    res.json({
      isWin,
      playerNumbers,
      winningNumbers,
      matches,
      bet,
      winAmount: Math.floor(winAmount),
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

export const playScratchCard: RequestHandler = (req, res) => {
  try {
    const { email, bet } = gameSchema.parse(req.body);

    // Generate 9 scratch positions
    const positions = Array.from({ length: 9 }, () => Math.random() > 0.7);
    const winningPositions = positions.filter((p) => p).length;

    const isWin = winningPositions >= 2;
    const winAmount = isWin ? bet * 5 : 0;

    // Record transaction
    transactions.push({
      id: `tx-${Date.now()}`,
      email,
      type: 'game',
      gameType: 'scratch',
      bet,
      winAmount: isWin ? winAmount : 0,
      isWin,
      matchCount: winningPositions,
      timestamp: new Date().toISOString(),
    });

    res.json({
      isWin,
      positions,
      winningCount: winningPositions,
      bet,
      winAmount: isWin ? winAmount : 0,
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
};

export const getGameHistory: RequestHandler = (req, res) => {
  const email = req.query.email as string;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  const userTransactions = transactions
    .filter((tx) => tx.email === email)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 50);

  res.json(userTransactions);
};

export const getLeaderboard: RequestHandler = (req, res) => {
  const timeframe = req.query.timeframe || 'week';

  // Aggregate wins by email
  const winsByEmail = new Map<string, number>();

  transactions.forEach((tx) => {
    if (tx.isWin) {
      const current = winsByEmail.get(tx.email) || 0;
      winsByEmail.set(tx.email, current + tx.winAmount);
    }
  });

  // Sort and return top 20
  const leaderboard = Array.from(winsByEmail.entries())
    .map(([email, totalWins]) => ({
      email,
      totalWins,
      rank: 0,
    }))
    .sort((a, b) => b.totalWins - a.totalWins)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

  res.json({
    timeframe,
    leaderboard: leaderboard.slice(0, 20),
  });
};

export const getDailyStats: RequestHandler = (req, res) => {
  const email = req.query.email as string;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  const userTransactions = transactions.filter((tx) => tx.email === email);

  const stats = {
    totalGames: userTransactions.length,
    totalWins: userTransactions.filter((tx) => tx.isWin).length,
    totalBet: userTransactions.reduce((sum, tx) => sum + tx.bet, 0),
    totalWinnings: userTransactions.reduce((sum, tx) => sum + (tx.isWin ? tx.winAmount : 0), 0),
    winRate: userTransactions.length > 0
      ? (userTransactions.filter((tx) => tx.isWin).length / userTransactions.length * 100).toFixed(2)
      : '0.00',
  };

  res.json(stats);
};
