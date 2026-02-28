import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Play, Pause, BarChart3, Target, Zap, Eye, Copy, Trash2, Plus } from 'lucide-react';

const GameManagement = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('odds');
  const [games, setGames] = useState([
    {
      id: 'spin_wheel',
      name: 'Spin Wheel',
      status: 'active',
      plays: 45230,
      winRate: 45,
      avgPayout: 125,
      totalPayouts: 5643750,
      houseEdge: 3.5,
      rtp: 96.5,
      segments: [
        { multiplier: 0.5, probability: 15 },
        { multiplier: 1, probability: 20 },
        { multiplier: 2, probability: 20 },
        { multiplier: 5, probability: 25 },
        { multiplier: 8, probability: 15 },
        { multiplier: 10, probability: 5 },
      ],
      abTests: [
        { id: 'test_001', name: 'Higher RTP', segment: 'Group A', rtp: 97.2, status: 'active', startDate: '2024-02-01', conversion: 12.5 },
        { id: 'test_002', name: 'Dynamic Odds', segment: 'Group B', rtp: 96.5, status: 'active', startDate: '2024-02-05', conversion: 10.2 },
      ],
    },
    {
      id: 'lottery',
      name: 'Lottery',
      status: 'active',
      plays: 32100,
      winRate: 5,
      avgPayout: 500,
      totalPayouts: 1602500,
      houseEdge: 15.0,
      rtp: 85.0,
      segments: [
        { matchCount: '6/6', probability: 0.001 },
        { matchCount: '5/6', probability: 0.01 },
        { matchCount: '4/6', probability: 0.1 },
        { matchCount: '3/6', probability: 1.5 },
        { matchCount: 'None', probability: 97.39 },
      ],
      abTests: [
        { id: 'test_003', name: 'Increased Jackpot', segment: 'Group A', rtp: 85.5, status: 'inactive', startDate: '2024-01-15', conversion: 8.3 },
      ],
    },
    {
      id: 'scratch_cards',
      name: 'Scratch Cards',
      status: 'paused',
      plays: 28900,
      winRate: 35,
      avgPayout: 45,
      totalPayouts: 1300500,
      houseEdge: 8.0,
      rtp: 92.0,
      segments: [
        { matchCount: '2+', probability: 35 },
        { matchCount: '1', probability: 40 },
        { matchCount: '0', probability: 25 },
      ],
      abTests: [],
    },
  ]);

  const handleStatusChange = (gameId: string) => {
    setGames(
      games.map((game) =>
        game.id === gameId
          ? {
              ...game,
              status: game.status === 'active' ? 'paused' : 'active',
            }
          : game
      )
    );
  };

  const currentGame = games.find((g) => g.id === selectedGame);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div className="space-y-6" variants={itemVariants}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Game Management</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Configure odds, manage A/B tests, and monitor game performance
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors text-sm font-medium w-fit bg-primary text-primary-foreground">
          <Plus className="w-4 h-4" />
          Create New Game
        </button>
      </div>

      {/* Games List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <motion.div
            key={game.id}
            variants={itemVariants}
            onClick={() => {
              setSelectedGame(game.id);
              setActiveTab('odds');
            }}
            className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${
              selectedGame === game.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">{game.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange(game.id);
                }}
                className={`p-2 rounded transition-colors ${
                  game.status === 'active'
                    ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                    : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                }`}
              >
                {game.status === 'active' ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Plays</span>
                <span className="font-semibold">{game.plays.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-semibold text-primary">{game.winRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">RTP</span>
                <span className="font-semibold">{game.rtp}%</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="text-muted-foreground">House Edge</span>
                <span className="font-semibold text-orange-500">{game.houseEdge}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Game Configuration Panel */}
      {currentGame && (
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl border border-border bg-card/50"
        >
          {/* Tabs */}
          <div className="flex gap-4 border-b border-border mb-6">
            {['odds', 'segments', 'ab-tests', 'performance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === tab
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {tab === 'ab-tests' ? 'A/B Tests' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Odds Configuration Tab */}
          {activeTab === 'odds' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">RTP (Return to Player)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="80"
                      max="98"
                      value={currentGame.rtp}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-primary w-16 text-right">{currentGame.rtp}%</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">House Edge</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="2"
                      max="20"
                      value={currentGame.houseEdge}
                      className="flex-1"
                    />
                    <span className="text-2xl font-bold text-orange-500 w-16 text-right">{currentGame.houseEdge}%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Win Probability Distribution</h3>
                <div className="space-y-3">
                  {currentGame.segments.map((segment, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-background/50 rounded-lg">
                      <span className="w-24 text-sm font-medium">
                        {(segment as any).multiplier
                          ? `${(segment as any).multiplier}x`
                          : (segment as any).matchCount || `${i}`}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className="flex-1 h-6 bg-gradient-to-r from-primary to-primary/50 rounded"
                            style={{ width: `${(segment as any).probability}%` }}
                          ></div>
                        </div>
                      </div>
                      <input
                        type="number"
                        value={(segment as any).probability}
                        className="w-16 px-2 py-1 border border-border rounded bg-background text-right text-sm"
                      />
                      <span className="w-12 text-right text-sm font-semibold">{(segment as any).probability}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                  Save Changes
                </button>
                <button className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-card transition-colors font-medium">
                  Reset to Defaults
                </button>
              </div>
            </div>
          )}

          {/* A/B Tests Tab */}
          {activeTab === 'ab-tests' && (
            <div className="space-y-6">
              {currentGame.abTests.length > 0 ? (
                <div className="space-y-4">
                  {currentGame.abTests.map((test) => (
                    <div key={test.id} className="p-4 rounded-lg border border-border bg-background/50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-bold">{test.name}</p>
                          <p className="text-xs text-muted-foreground">ID: {test.id}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              test.status === 'active'
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-gray-500/10 text-gray-500'
                            }`}
                          >
                            {test.status}
                          </span>
                          <button className="p-1 hover:bg-card rounded">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Segment</p>
                          <p className="font-semibold">{test.segment}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">RTP</p>
                          <p className="font-semibold">{test.rtp}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Conversion</p>
                          <p className="font-semibold text-green-500">{test.conversion}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs mb-1">Started</p>
                          <p className="font-semibold text-xs">{test.startDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="mb-3">No A/B tests running for this game</p>
                </div>
              )}

              <button className="w-full px-4 py-2 border border-primary rounded-lg text-primary hover:bg-primary/5 transition-colors font-medium flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Create New A/B Test
              </button>
            </div>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Total Plays</p>
                  <p className="text-2xl font-bold">{currentGame.plays.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Avg Payout</p>
                  <p className="text-2xl font-bold">${currentGame.avgPayout}</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Total Paid Out</p>
                  <p className="text-2xl font-bold">${(currentGame.totalPayouts / 1000).toFixed(0)}K</p>
                </div>
                <div className="p-4 rounded-lg bg-background/50 border border-border">
                  <p className="text-xs text-muted-foreground mb-2">Win Rate</p>
                  <p className="text-2xl font-bold text-primary">{currentGame.winRate}%</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                <p className="text-sm font-medium text-yellow-500 mb-2">Performance Insight</p>
                <p className="text-sm text-muted-foreground">
                  This game is performing within expected parameters. RTP is at {currentGame.rtp}% and house edge is
                  maintained at {currentGame.houseEdge}%.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {!selectedGame && (
        <div className="text-center py-12 text-muted-foreground">
          <p>Select a game to configure odds and manage A/B tests</p>
        </div>
      )}
    </motion.div>
  );
};

export default GameManagement;
