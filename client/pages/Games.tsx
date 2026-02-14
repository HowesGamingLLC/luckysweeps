import { useState } from 'react';
import { Header } from '@/components/Header';
import { useAuth } from '@/hooks/use-auth';
import { motion } from 'framer-motion';
import { 
  Zap, 
  RotateCw,
  Volume2,
  VolumeX,
  Loader,
  Trophy,
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';

const Games = () => {
  const { user, updateBalance } = useAuth();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [bet, setBet] = useState(10);
  const [soundOn, setSoundOn] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [rotation, setRotation] = useState(0);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Spin wheel game
  const wheelSegments = [
    { label: '2x', color: '#FF6B6B', multiplier: 2 },
    { label: '5x', color: '#4ECDC4', multiplier: 5 },
    { label: '0.5x', color: '#FFE66D', multiplier: 0.5 },
    { label: '10x', color: '#95E1D3', multiplier: 10 },
    { label: '1x', color: '#A8E6CF', multiplier: 1 },
    { label: '3x', color: '#FF8B94', multiplier: 3 },
  ];

  const playSpinWheel = async () => {
    if (spinning || user.balance < bet) return;
    
    setSpinning(true);
    setResult(null);

    // Random rotation between 0 and 360
    const randomRotation = Math.random() * 360 + 360 * 5; // Multiple spins
    setRotation(rotation + randomRotation);

    // Play sound
    if (soundOn) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioContext.createOscillator();
      osc.frequency.value = 400;
      osc.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + 0.1);
    }

    // Simulate server delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Calculate result based on rotation
    const normalizedRotation = randomRotation % 360;
    const segmentIndex = Math.floor(normalizedRotation / (360 / wheelSegments.length));
    const selectedSegment = wheelSegments[Math.min(segmentIndex, wheelSegments.length - 1)];

    const winAmount = Math.floor(bet * selectedSegment.multiplier);
    const isWin = selectedSegment.multiplier > 1;

    setResult({
      ...selectedSegment,
      amount: winAmount,
      isWin,
    });

    if (isWin) {
      updateBalance(user.balance - bet + winAmount);
    } else {
      updateBalance(user.balance - bet);
    }

    setSpinning(false);
  };

  const playLottery = async () => {
    if (user.balance < bet) return;

    setResult(null);
    const numbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1);
    const winChance = Math.random();
    const isWin = winChance > 0.95;
    const winAmount = isWin ? bet * 100 : 0;

    setResult({
      type: 'lottery',
      numbers,
      isWin,
      amount: winAmount,
    });

    if (isWin) {
      updateBalance(user.balance - bet + winAmount);
    } else {
      updateBalance(user.balance - bet);
    }
  };

  const playScratchCard = async () => {
    if (user.balance < bet) return;

    const cards = Array.from({ length: 9 }, () => Math.random() > 0.7 ? '🎁' : '❌');
    const hasWin = cards.some(card => card === '🎁');
    const winAmount = hasWin ? bet * 5 : 0;

    setResult({
      type: 'scratch',
      cards,
      isWin: hasWin,
      amount: winAmount,
    });

    if (hasWin) {
      updateBalance(user.balance - bet + winAmount);
    } else {
      updateBalance(user.balance - bet);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Games</h1>
          <p className="text-foreground/60">Choose your game and win big!</p>
        </div>

        {/* Game Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { id: 'wheel', name: 'Spin Wheel', emoji: '🎡', desc: 'Instant wins up to 10x' },
            { id: 'lottery', name: 'Lucky Lottery', emoji: '🎰', desc: 'Match numbers to win 100x' },
            { id: 'scratch', name: 'Scratch Cards', emoji: '🎫', desc: 'Reveal prizes instantly' },
          ].map((game) => (
            <motion.button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              className={`p-6 rounded-xl border-2 transition-all text-center ${
                activeGame === game.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-6xl mb-3">{game.emoji}</div>
              <h3 className="font-bold text-lg mb-1">{game.name}</h3>
              <p className="text-sm text-muted-foreground">{game.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* Game Area */}
        {activeGame && (
          <motion.div
            className="rounded-xl border border-border bg-card/50 p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="max-w-2xl mx-auto space-y-8">
              {/* Balance & Bet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-background border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Your Balance</p>
                  <p className="text-3xl font-bold">${user.balance.toFixed(2)}</p>
                </div>
                <div className="p-4 rounded-lg bg-background border border-border">
                  <label className="text-sm text-muted-foreground mb-2 block">Bet Amount</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={bet}
                      onChange={(e) => setBet(Math.max(1, parseInt(e.target.value) || 1))}
                      disabled={spinning}
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                    />
                    <button
                      onClick={() => setBet(Math.min(user.balance, bet * 2))}
                      className="px-3 py-2 rounded-lg border border-border hover:bg-card transition-colors"
                      disabled={spinning}
                    >
                      2x
                    </button>
                  </div>
                </div>
              </div>

              {/* Spin Wheel */}
              {activeGame === 'wheel' && (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ rotate: rotation }}
                      transition={{ duration: 3, ease: 'easeOut' }}
                      className="relative w-64 h-64"
                    >
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        {wheelSegments.map((segment, index) => {
                          const angle = (360 / wheelSegments.length) * index;
                          return (
                            <g key={index} transform={`rotate(${angle} 100 100)`}>
                              <path
                                d="M 100 100 L 100 20 A 80 80 0 0 1 156.57 43.43 Z"
                                fill={segment.color}
                                stroke="white"
                                strokeWidth="2"
                              />
                              <text
                                x="120"
                                y="55"
                                fontSize="16"
                                fontWeight="bold"
                                fill="white"
                                textAnchor="middle"
                              >
                                {segment.label}
                              </text>
                            </g>
                          );
                        })}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                          SPIN
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={playSpinWheel}
                      disabled={spinning || user.balance < bet}
                      className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {spinning ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Spinning...
                        </>
                      ) : (
                        <>
                          <RotateCw className="w-5 h-5" />
                          Play Now (${bet})
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setSoundOn(!soundOn)}
                      className="px-4 py-3 border border-border rounded-lg hover:bg-card transition-colors"
                    >
                      {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Lottery */}
              {activeGame === 'lottery' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-6 gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-primary-foreground"
                      >
                        {Math.floor(Math.random() * 49) + 1}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={playLottery}
                    disabled={user.balance < bet}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Play Lottery (${bet})
                  </button>
                </div>
              )}

              {/* Scratch Card */}
              {activeGame === 'scratch' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        🎫
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={playScratchCard}
                    disabled={user.balance < bet}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Scratch Card (${bet})
                  </button>
                </div>
              )}

              {/* Result */}
              {result && (
                <motion.div
                  className={`p-6 rounded-xl border-2 text-center ${
                    result.isWin
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-destructive bg-destructive/10'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="text-5xl mb-2">{result.isWin ? '🎉' : '😔'}</div>
                  <p className="text-2xl font-bold mb-2">
                    {result.isWin ? 'You Won!' : 'Try Again'}
                  </p>
                  <p className="text-lg mb-4">
                    {result.isWin ? `+$${result.amount}` : `-$${bet}`}
                  </p>
                  <button
                    onClick={() => {
                      setResult(null);
                      setActiveGame(null);
                    }}
                    className="px-6 py-2 rounded-lg border border-foreground hover:bg-card transition-colors"
                  >
                    Next Game
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Info */}
        {!activeGame && (
          <motion.div
            className="rounded-xl border border-border bg-card/50 p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Select a Game</h2>
            <p className="text-foreground/60">Choose from our selection of games above to start playing and winning!</p>
          </motion.div>
        )}

        {/* Leaderboard */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Trophy className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Top Winners Today</h2>
          </div>
          <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-border font-bold">
              <div>Rank</div>
              <div>Player</div>
              <div className="text-right">Winnings</div>
            </div>
            {[
              { rank: 1, player: 'Alex_K', wins: '$5,240' },
              { rank: 2, player: 'Sarah_M', wins: '$3,850' },
              { rank: 3, player: 'James_W', wins: '$2,690' },
              { rank: 4, player: 'Emma_R', wins: '$1,950' },
              { rank: 5, player: 'You', wins: '$' + user.balance.toFixed(2) },
            ].map((entry) => (
              <div key={entry.rank} className="grid grid-cols-3 gap-4 p-6 border-t border-border hover:bg-background/50 transition-colors">
                <div className="font-bold">#{entry.rank}</div>
                <div>{entry.player}</div>
                <div className="text-right">{entry.wins}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
