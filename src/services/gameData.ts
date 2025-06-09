export interface Player {
  id: string;
  rank: number;
  username: string;
  score: number;
  level: number;
  winRate: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  averageScore: number;
  country: string;
  lastActive: string;
  // New properties for additional columns
  totalPlayTime: number; // in hours
  highestStreak: number;
  currentStreak: number;
  favoriteGameMode: string;
  achievements: number;
  joinDate: string;
  clan: string;
  prestigeLevel: number;
}

export interface GameStats {
  totalPlayers: number;
  activePlayers: number;
  matchesLast24h: number;
  averageMatchDuration: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label?: string;
    data: number[];
  }[];
}

export const mockGameStats: GameStats = {
  totalPlayers: 12457,
  activePlayers: 2345,
  matchesLast24h: 567,
  averageMatchDuration: 7.5,
};

export const mockChartData: ChartData = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  datasets: [
    {
      // label: 'Matches Played',
      data: [50, 60, 75, 90, 110, 100, 120]
    },
    {
      // label: 'Active Players',
      data: [200, 220, 250, 230, 280, 300, 270]
    },
  ],
};

export const mockPlayers: Player[] = Array.from({ length: 10247 }, (_, i) => ({
  id: `player-${i + 1}`,
  rank: i + 1,
  username: `Player${i + 1}`,
  score: Math.floor(Math.random() * 100000) + 50000, // 50,000-149,999
  level: Math.floor(Math.random() * 100) + 1, //1-100
  winRate: Math.floor(Math.random() * 100), // 0-99
  gamesPlayed: Math.floor(Math.random() * 1000) + 100, // 100-1099
  wins: 0,
  losses: 0,
  averageScore: Math.floor(Math.random() * 5000) + 1000, // 1,000-5,999
  country: ["US", "UK", "DE", "FR", "JP", "KR", "CN", "BR", "AU", "CA"][Math.floor(Math.random() * 10)],
  lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days // Example: 👉 "2025-06-07T17:23:13.000Z"
  totalPlayTime: Math.floor(Math.random() * 500) + 50, // in hours (50-549)
  highestStreak: Math.floor(Math.random() * 50) + 1, // 1-50
  currentStreak: Math.floor(Math.random() * 20), // 0-19
  favoriteGameMode: ["Classic", "Ranked", "Arena", "Tournament", "Casual"][Math.floor(Math.random() * 5)],
  achievements: Math.floor(Math.random() * 100) + 10, // 10-109
  joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 3).toISOString(), // Joined within the last 3 years
  clan: [`Clan${Math.floor(Math.random() * 20) + 1}`, "Independent"][Math.floor(Math.random() * 2)], // Random clan (1-20) or independent
  prestigeLevel: Math.floor(Math.random() * 10), // 0-9
})).map(player => ({ // mapping to calculate wins and losses
  ...player,
  wins: Math.floor(player.gamesPlayed * (player.winRate / 100)),
  losses: player.gamesPlayed - Math.floor(player.gamesPlayed * (player.winRate / 100)),
}));
