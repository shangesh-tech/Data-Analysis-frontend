
import { useMemo } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  [key: string]: any;
}

interface LineChartProps {
  data: DataPoint[];
  xKey: string;
  yKeys: {
    key: string;
    name: string;
    color: string;
  }[];
  height?: number;
  loading?: boolean;
}

const LineChart = ({
  data,
  xKey,
  yKeys,
  height = 300,
  loading = false,
}: LineChartProps) => {
  const formattedData = useMemo(() => {
    // If we have more than 30 data points, reduce to improve performance
    if (data.length > 30) {
      const step = Math.floor(data.length / 30);
      return data.filter((_, index) => index % step === 0);
    }
    return data;
  }, [data]);

  if (loading) {
    return (
      <div className="animate-pulse bg-muted rounded-md" style={{ height }}>
        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
          Loading chart data...
        </div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey={xKey}
          tick={{ fontSize: 12 }}
          tickMargin={10}
          stroke="#94a3b8"
        />
        <YAxis tick={{ fontSize: 12 }} tickMargin={10} stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e2e8f0",
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          iconSize={10}
          wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
        />
        {yKeys.map((yKey) => (
          <Line
            key={yKey.key}
            type="monotone"
            dataKey={yKey.key}
            name={yKey.name}
            stroke={yKey.color}
            strokeWidth={2}
            dot={{ strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
