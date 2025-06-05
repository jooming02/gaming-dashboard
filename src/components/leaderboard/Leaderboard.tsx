
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

type SortField = keyof Player;
type SortDirection = "asc" | "desc";

export const Leaderboard = ({ players }: LeaderboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>("rank");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 50;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const filteredAndSortedPlayers = useMemo(() => {
    let filtered = players.filter((player) =>
      player.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      
      const bValue = b[sortField];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
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

  const totalPages = Math.ceil(filteredAndSortedPlayers.length / playersPerPage);
  const startIndex = (currentPage - 1) * playersPerPage;
  const endIndex = startIndex + playersPerPage;
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
    const now = new Date();
    const lastActive = new Date(date);
    const diffInHours = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Top Players Leaderboard</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 text-sm"
            />
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            {filteredAndSortedPlayers.length} players
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] sm:w-[80px]">
                  <SortButton field="rank">Rank</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="username">Player</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="score">Score</SortButton>
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  <SortButton field="level">Level</SortButton>
                </TableHead>
                <TableHead>
                  <SortButton field="winRate">Win%</SortButton>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <SortButton field="gamesPlayed">Games</SortButton>
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  <SortButton field="averageScore">Avg Score</SortButton>
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  <SortButton field="country">Country</SortButton>
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  <SortButton field="lastActive">Last Active</SortButton>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPlayers.map((player) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">
                    <div className={`inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full text-xs font-bold ${
                      player.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 
                      player.rank <= 10 ? 'bg-gray-100 text-gray-800' : 
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {player.rank}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-xs sm:text-sm">
                    <div className="truncate max-w-[80px] sm:max-w-none">
                      {player.username}
                    </div>
                  </TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
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
