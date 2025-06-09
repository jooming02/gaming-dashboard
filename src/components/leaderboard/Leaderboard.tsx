import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Player } from "@/services/gameData";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

interface LeaderboardProps {
  players: Player[];
}

// keyof defines a union type of all keys in Player interface
type SortField = keyof Player; // "id" | "rank" | "username" | "score" | "level, ...";
type SortDirection = "asc" | "desc";

export const Leaderboard = ({ players }: LeaderboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage, setPlayersPerPage] = useState(50);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const handlePlayersPerPageChange = (value: string) => {
    setPlayersPerPage(Number(value));
    setCurrentPage(1);
  };

  const filteredAndSortedPlayers = useMemo(() => {
    const filtered = players.filter((player) =>
      player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.score.toString().includes(searchTerm)
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      
      const bValue = b[sortField];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        // localeCompare is used for string comparison
        const comparison = aValue.localeCompare(bValue); 
        return sortDirection === "asc" ? comparison : -comparison;
      }
      
      if (typeof aValue === "number" && typeof bValue === "number") {
        const comparison = aValue - bValue;
        return sortDirection === "asc" ? comparison : -comparison;
      }
      
      return 0;
    });

    return filtered;
  }, [players, searchTerm, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedPlayers.length / playersPerPage); // Math.ceil rounds up to the nearest whole number
  const startIndex = (currentPage - 1) * playersPerPage;
  const endIndex = startIndex + playersPerPage;
  // slice: extracts a portion of an array without changing the original array
  const currentPlayers = filteredAndSortedPlayers.slice(startIndex, endIndex);

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      className="h-auto p-0 font-medium hover:bg-transparent text-xs sm:text-sm"
      onClick={() => handleSort(field)}
    >
      {children}
      {sortField === field && (
        sortDirection === "asc" ? <ChevronUp className="ml-1 h-3 w-3 sm:h-4 sm:w-4" /> : <ChevronDown className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
      )}
    </Button>
  );

  const formatLastActive = (date: string) => {
    // handle dituation within 1 hour, 24 hours, and more than 24 hours
    const now = new Date();
    const lastActive = new Date(date);
    // getTime give timestamp in milliseconds, so we need to divide by 1000 * 60 * 60 to get hours
    const diffInHours = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60));
    // Math.Round can be another option
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const formatJoinDate = (date: string) => {
    const joinDate = new Date(date);
    return joinDate.toLocaleDateString(); // human-readable format "8/6/2025"
  };

  const formatPlayTime = (hours: number) => {
    // handle hours and days
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  };

  return (
    <Card>        
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Top Players Leaderboard</CardTitle>
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players by name, country, or score"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 text-sm"
            />
          </div>
          {/* Pagination */}
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              Rows per page:
            </span>
            <Select value={playersPerPage.toString()} onValueChange={handlePlayersPerPageChange}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {/* sticky */}
                <TableHead className="sticky left-0 bg-background z-10 w-[50px] sm:w-[80px] border-r">
                  <SortButton field="rank">Rank</SortButton>
                </TableHead>
                {/* sticky */}
                <TableHead className="sticky left-[50px] sm:left-[80px] bg-background z-10 min-w-[100px] border-r">
                  <SortButton field="username">Player</SortButton>
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <SortButton field="score">Score</SortButton>
                </TableHead>
                <TableHead className="hidden sm:table-cell min-w-[80px]">
                  <SortButton field="level">Level</SortButton>
                </TableHead>
                <TableHead className="min-w-[80px]">
                  <SortButton field="winRate">Win%</SortButton>
                </TableHead>
                <TableHead className="hidden md:table-cell min-w-[100px]">
                  <SortButton field="gamesPlayed">Games</SortButton>
                </TableHead>
                <TableHead className="hidden lg:table-cell min-w-[100px]">
                  <SortButton field="averageScore">Avg Score</SortButton>
                </TableHead>
                <TableHead className="hidden sm:table-cell min-w-[80px]">
                  <SortButton field="country">Country</SortButton>
                </TableHead>
                <TableHead className="hidden lg:table-cell min-w-[100px]">
                  <SortButton field="lastActive">Last Active</SortButton>
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <SortButton field="totalPlayTime">Play Time</SortButton>
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <SortButton field="highestStreak">Best Streak</SortButton>
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <SortButton field="currentStreak">Current Streak</SortButton>
                </TableHead>
                <TableHead className="min-w-[120px]">
                  <SortButton field="favoriteGameMode">Game Mode</SortButton>
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <SortButton field="achievements">Achievements</SortButton>
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <SortButton field="joinDate">Join Date</SortButton>
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <SortButton field="clan">Clan</SortButton>
                </TableHead>
                <TableHead className="min-w-[100px]">
                  <SortButton field="prestigeLevel">Prestige</SortButton>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* mapping of each player */}
              {currentPlayers.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="sticky left-0 bg-background z-10 font-medium border-r">
                    <div className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs font-bold ${
                      player.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 
                      player.rank <= 10 ? 'bg-gray-100 text-gray-800' : 
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {player.rank}
                    </div>
                  </TableCell>
                  <TableCell className="sticky left-[50px] sm:left-[80px] bg-background z-10 font-medium text-xs sm:text-sm border-r">
                    <div className="truncate max-w-[80px] sm:max-w-[100px]">
                      {player.username}
                    </div>
                  </TableCell>
                  {/* toLocaleString makes the numbers contains , which easier for users to view */}
                  <TableCell className="text-xs sm:text-sm">{player.score.toLocaleString()}</TableCell>
                  <TableCell className="hidden sm:table-cell text-xs sm:text-sm">{player.level}</TableCell>
                  <TableCell>
                    <div className={`font-medium text-xs sm:text-sm ${
                      player.winRate >= 70 ? 'text-green-600' : 
                      player.winRate >= 50 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {player.winRate}%
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="text-xs sm:text-sm">
                      <div>{player.gamesPlayed}</div>
                      <div className="text-muted-foreground text-xs">
                        {player.wins}W {player.losses}L
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-xs sm:text-sm">{player.averageScore.toLocaleString()}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="inline-flex items-center px-1 sm:px-2 py-1 rounded-md bg-gray-100 text-xs font-medium">
                      {player.country}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                    {formatLastActive(player.lastActive)}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    {formatPlayTime(player.totalPlayTime)}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm font-medium text-green-600">
                    {player.highestStreak}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    <span className={`font-medium ${player.currentStreak > 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                      {player.currentStreak}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs">
                      {player.favoriteGameMode}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm font-medium text-purple-600">
                    {player.achievements}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatJoinDate(player.joinDate)}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                      player.clan === 'Independent' 
                        ? 'bg-gray-100 text-gray-600' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {player.clan}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    <div className="flex items-center">
                      <span className="font-bold text-yellow-600">{player.prestigeLevel}</span>
                      <span className="ml-1 text-yellow-500">★</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs sm:text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredAndSortedPlayers.length)} of {filteredAndSortedPlayers.length} entries
            </div>
            <Pagination>
              <PaginationContent>
                {/* Previous pagination */}
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {/* 1 to 5 (max 5) */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="cursor-pointer text-xs sm:text-sm"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                {/* Next Pagination */}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
