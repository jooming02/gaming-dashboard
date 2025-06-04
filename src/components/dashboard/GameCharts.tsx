
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
    <div className="grid gap-6 xl:grid-cols-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Active Players (24h)</CardTitle>
          <CardDescription>Real-time player activity</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="time" 
                fontSize={12}
                tickMargin={8}
                interval="preserveStartEnd"
              />
              <YAxis 
                fontSize={12}
                tickMargin={8}
                width={60}
              />
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

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Matches Per Hour</CardTitle>
          <CardDescription>Game matches started in the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="time" 
                fontSize={12}
                tickMargin={8}
                interval="preserveStartEnd"
              />
              <YAxis 
                fontSize={12}
                tickMargin={8}
                width={60}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="matches" fill="var(--color-matches)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
