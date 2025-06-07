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
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
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
      label: 'Matches Played',
      data: [50, 60, 75, 90, 110, 100, 120],
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    },
    {
      label: 'Active Players',
      data: [200, 220, 250, 230, 280, 300, 270],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export const mockPlayers: Player[] = Array.from({ length: 10247 }, (_, i) => ({
  id: `player-${i + 1}`,
  rank: i + 1,
  username: `Player${i + 1}`,
  score: Math.floor(Math.random() * 100000) + 50000,
  level: Math.floor(Math.random() * 100) + 1,
  winRate: Math.floor(Math.random() * 100),
  gamesPlayed: Math.floor(Math.random() * 1000) + 100,
  wins: 0,
  losses: 0,
  averageScore: Math.floor(Math.random() * 5000) + 1000,
  country: ["US", "UK", "DE", "FR", "JP", "KR", "CN", "BR", "AU", "CA"][Math.floor(Math.random() * 10)],
  lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  // New properties
  totalPlayTime: Math.floor(Math.random() * 500) + 50,
  highestStreak: Math.floor(Math.random() * 50) + 1,
  currentStreak: Math.floor(Math.random() * 20),
  favoriteGameMode: ["Classic", "Ranked", "Arena", "Tournament", "Casual"][Math.floor(Math.random() * 5)],
  achievements: Math.floor(Math.random() * 100) + 10,
  joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 3).toISOString(),
  clan: [`Clan${Math.floor(Math.random() * 20) + 1}`, "Independent"][Math.floor(Math.random() * 2)],
  prestigeLevel: Math.floor(Math.random() * 10),
})).map(player => ({
  ...player,
  wins: Math.floor(player.gamesPlayed * (player.winRate / 100)),
  losses: player.gamesPlayed - Math.floor(player.gamesPlayed * (player.winRate / 100)),
}));
