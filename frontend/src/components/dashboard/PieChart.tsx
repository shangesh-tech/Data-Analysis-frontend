
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: DataPoint[];
  height?: number;
  loading?: boolean;
  innerRadius?: number;
}

const PieChart = ({
  data,
  height = 300,
  loading = false,
  innerRadius = 60,
}: PieChartProps) => {
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
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          innerRadius={innerRadius}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`${value}`, ""]}
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e2e8f0",
          }}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ fontSize: 12, paddingTop: 20 }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart;
