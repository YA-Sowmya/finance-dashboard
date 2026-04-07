import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Card from "../ui/Card";
import { getShortMonth } from "../../utils/formatters";
import { useApp } from "../../context/AppContext";

const VIEWS = ["balance", "income", "expenses"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl p-3 text-sm shadow-lg"
      style={{
        background: "var(--card-bg)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--border-color)",
        color: "var(--text-primary)",
      }}>
      <p className="font-medium mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: ₹{p.value.toLocaleString("en-IN")}
        </p>
      ))}
    </div>
  );
};

const BalanceChart = ({ data }) => {
  const [activeView, setActiveView] = useState("balance");
  const { state } = useApp();
  const { theme } = state;

  const chartData = data.map((d) => ({
    name: `${getShortMonth(d.month)} ${d.year !== 2025 ? d.year : ""}`.trim(),
    balance: d.balance,
    income: d.income,
    expenses: d.expenses,
  }));

  const lines = {
    balance: { color: "var(--color-balance)", label: "Balance" },
    income: { color: "var(--color-income)", label: "Income" },
    expenses: { color: "var(--color-expense)", label: "Expenses" },
  };

  const axisColor = theme === "dark" ? "#64748B" : "#94A3B8";
  const gridColor =
    theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";

  return (
    <Card className="p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3
          className="text-xl font-semibold"
          style={{ color: "var(--text-primary)" }}>
          Financial Trend
        </h3>

        <div className="flex flex-wrap gap-1">
          {VIEWS.map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className="px-3 py-1 rounded-3xl text-sm font-medium capitalize transition-all duration-200 cursor-pointer"
              style={{
                background:
                  activeView === view ? "var(--highlight)" : "transparent",
                color:
                  activeView === view
                    ? "var(--text-primary)"
                    : "var(--text-muted)",
              }}>
              {view}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={285}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 5, bottom: 5, left: 2 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: axisColor }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey={activeView}
            stroke={`${lines[activeView].color}`}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
            name={lines[activeView].label}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BalanceChart;
