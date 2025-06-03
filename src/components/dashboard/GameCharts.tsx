
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartData } from "@/services/gameData";

interface GameChartsProps {
  data: ChartData[];
}

const chartConfig = {
  activePlayers: {
    label: "Active Players",
    color: "hsl(var(--primary))",
  },
  matches: {
    label: "Matches",
    color: "hsl(var(--secondary))",
  },
};

export const GameCharts = ({ data }: GameChartsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Active Players (24h)</CardTitle>
          <CardDescription>Real-time player activity</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <AreaChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="activePlayers"
                stroke="var(--color-activePlayers)"
                fill="var(--color-activePlayers)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Matches Per Hour</CardTitle>
          <CardDescription>Game matches started in the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="matches" fill="var(--color-matches)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
