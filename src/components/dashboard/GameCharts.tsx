
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartData } from "@/services/gameData";

interface GameChartsProps {
  data: ChartData;
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
  // Convert the chart data format to match what recharts expects
  const chartData = data.labels.map((label, index) => ({
    time: label, // Days
    activePlayers: data.datasets[1]?.data[index] || 0,
    matches: data.datasets[0]?.data[index] || 0,
  }));

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Active Players (24h)</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Real-time player activity</CardDescription>
        </CardHeader>
        <CardContent>
          {/* w-full making it responsive  */}
          <ChartContainer config={chartConfig} className="h-[120px] sm:h-[180px] lg:h-[220px] w-full">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 5, bottom: 5 }}>
              <XAxis 
                dataKey="time" 
                fontSize={10}
                tickMargin={4}
                interval="preserveStartEnd"
                // hide={true}
              />
              <YAxis 
                fontSize={10}
                tickMargin={4}
                width={30}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              {/* legend */}
              {/* <ChartLegend content={<ChartLegendContent />} /> */}
              <Area
                type="monotone"// this making the line smooth
                dataKey="activePlayers" // * important: this should match the key in chartData
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
          <CardTitle className="text-sm sm:text-base">Matches Per Hour</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Game matches started in the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[120px] sm:h-[180px] lg:h-[220px] w-full">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: 5, bottom: 5 }}>
              <XAxis 
                dataKey="time" 
                fontSize={10}
                tickMargin={4}
                interval="preserveStartEnd"
                // hide={true}
              />
              <YAxis 
                fontSize={10}
                tickMargin={4}
                width={30}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="matches" // * important: this should match the key in chartData
                radius={[6, 6, 0, 0]}
                // barSize={20}
                fill="var(--color-matches)" 
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};
