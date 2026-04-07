import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../ui/Card";
import { CATEGORIES } from "../../data/categories";
import { formatCurrency } from "../../utils/formatters";
import { useApp } from "../../context/AppContext";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div
      className="rounded-xl p-3 text-sm shadow-lg"
      style={{
        background: "var(--card-bg)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--border-color)",
        color: "var(--text-primary)",
      }}>
      <p className="font-medium">{d.name}</p>
      <p style={{ color: d.payload.color }}>{formatCurrency(d.value)}</p>
    </div>
  );
};

const SpendingDonut = ({ data }) => {
  const { state } = useApp();
  const { theme } = state;

  const total = data.reduce((sum, d) => sum + d.value, 0);

  const chartData = data.map((d) => ({
    ...d,
    color: CATEGORIES[d.name]?.color || "#888",
  }));

  return (
    <Card className="p-5">
      <h3
        className="text-xl font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}>
        Spending Breakdown
      </h3>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={170}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            stroke="none">
            {chartData.map((entry, i) => (
              <Cell key={i} fill={`${entry.color}`} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-col gap-2 mt-3">
        {chartData.slice(0, 5).map((d, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 "
                style={{ background: d.color }}
              />
              <span
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}>
                {d.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="text-xs font-medium"
                style={{ color: "var(--text-primary)" }}>
                {((d.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SpendingDonut;
