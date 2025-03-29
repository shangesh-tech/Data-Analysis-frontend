
import {
  BarChart as RechartsBarChart,
  Bar,
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

interface BarChartProps {
  data: DataPoint[];
  xKey: string;
  yKeys: {
    key: string;
    name: string;
    color: string;
  }[];
  height?: number;
  loading?: boolean;
  stacked?: boolean;
}

const BarChart = ({
  data,
  xKey,
  yKeys,
  height = 300,
  loading = false,
  stacked = false,
}: BarChartProps) => {
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
      <RechartsBarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
        {yKeys.map((yKey, index) => (
          <Bar
            key={yKey.key}
            dataKey={yKey.key}
            name={yKey.name}
            fill={yKey.color}
            stackId={stacked ? "stack" : undefined}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
