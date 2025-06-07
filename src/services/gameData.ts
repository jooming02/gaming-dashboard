
export interface Player {
  id: string;
  username: string;
  rank: number;
  score: number;
  wins: number;
  losses: number;
  winRate: number;
  averageScore: number;
  gamesPlayed: number;
  lastActive: string;
  country: string;
  level: number;
}

export interface GameStats {
  totalPlayers: number;
  activePlayers: number;
  totalMatches: number;
  matchesLast24h: number;
  averageMatchDuration: number;
  peakConcurrentPlayers: number;
}

export interface ChartData {
  time: string;
  activePlayers: number;
  matches: number;
}

// Generate mock players data
export const generateMockPlayers = (count: number): Player[] => {
  const countries = ['US', 'UK', 'DE', 'FR', 'JP', 'KR', 'CN', 'BR', 'CA', 'AU'];
  const usernames = ['Shadow', 'Phoenix', 'Dragon', 'Storm', 'Blade', 'Nova', 'Frost', 'Viper', 'Titan', 'Raven'];
  const suffixes = ['Hunter', 'Master', 'Lord', 'King', 'Pro', 'Elite', 'Legend', 'Hero', 'Champion', 'Warrior'];
  
  return Array.from({ length: count }, (_, i) => {
    const wins = Math.floor(Math.random() * 500) + 50;
    const losses = Math.floor(Math.random() * 300) + 20;
    const gamesPlayed = wins + losses;
    const winRate = Math.round((wins / gamesPlayed) * 100);
    const averageScore = Math.floor(Math.random() * 5000) + 1000;
    
    return {
      id: `player-${i + 1}`,
      username: `${usernames[Math.floor(Math.random() * usernames.length)]}${suffixes[Math.floor(Math.random() * suffixes.length)]}${Math.floor(Math.random() * 999)}`,
      rank: i + 1,
      score: Math.floor(Math.random() * 10000) + 5000 - (i * 10),
      wins,
      losses,
      winRate,
      averageScore,
      gamesPlayed,
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      country: countries[Math.floor(Math.random() * countries.length)],
      level: Math.floor(Math.random() * 100) + 1,
    };
  }).sort((a, b) => b.score - a.score).map((player, index) => ({ ...player, rank: index + 1 }));
};

// Generate mock chart data
export const generateChartData = (): ChartData[] => {
  const data: ChartData[] = [];
  const now = new Date();
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.toISOString().slice(11, 16),
      activePlayers: Math.floor(Math.random() * 5000) + 2000,
      matches: Math.floor(Math.random() * 200) + 50,
    });
  }
  
  return data;
};

export const mockGameStats: GameStats = {
  totalPlayers: 125847,
  activePlayers: 8542,
  totalMatches: 2847502,
  matchesLast24h: 15847,
  averageMatchDuration: 12.5,
  peakConcurrentPlayers: 12847,
};

export const mockPlayers = generateMockPlayers(10000);
export const mockChartData = generateChartData();
