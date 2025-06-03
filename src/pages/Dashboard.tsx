
import { Users, GamepadIcon, Trophy, Clock } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { GameCharts } from "@/components/dashboard/GameCharts";
import { Leaderboard } from "@/components/leaderboard/Leaderboard";
import { mockGameStats, mockChartData, mockPlayers } from "@/services/gameData";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Game Dashboard</h1>
          <p className="text-xl text-gray-600">Real-time statistics and player leaderboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Players"
            value={mockGameStats.totalPlayers}
            description="Registered users"
            icon={Users}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatsCard
            title="Active Players"
            value={mockGameStats.activePlayers}
            description="Currently online"
            icon={GamepadIcon}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatsCard
            title="Matches Today"
            value={mockGameStats.matchesLast24h}
            description="Last 24 hours"
            icon={Trophy}
            trend={{ value: 3.1, isPositive: false }}
          />
          <StatsCard
            title="Avg Match Duration"
            value={`${mockGameStats.averageMatchDuration}m`}
            description="Minutes per match"
            icon={Clock}
            trend={{ value: 5.4, isPositive: false }}
          />
        </div>

        {/* Charts */}
        <GameCharts data={mockChartData} />

        {/* Leaderboard */}
        <Leaderboard players={mockPlayers} />
      </div>
    </div>
  );
};

export default Dashboard;
