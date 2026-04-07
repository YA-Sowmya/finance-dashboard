import { TrendingUp, TrendingDown } from "lucide-react";
import Card from "../ui/Card";

const SummaryCard = ({ title, value, sub, change, color, inverseChange }) => {
  const isPositive = inverseChange ? change < 0 : change > 0;
  const isNeutral = change === 0;

  return (
    <Card className="p-4 flex flex-col gap-3 h-full">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span
          className="text-[11px] md:text-xs font-medium uppercase tracking-wide truncate"
          style={{ color: "var(--text-muted)" }}>
          {title}
        </span>
        <div className="flex items-center justify-center shrink-0">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: color,
            }}
          />
        </div>
      </div>

      {/* Value */}
      <div className="min-w-0">
        <p
          className="text-lg sm:text-xl md:text-2xl font-semibold truncate"
          style={{ color: "var(--text-primary)" }}>
          {value}
        </p>
        <p
          className="text-[11px] sm:text-xs mt-1 truncate"
          style={{ color: "var(--text-muted)" }}>
          {sub}
        </p>
      </div>

      {/* Change indicator */}
      {!isNeutral && (
        <div className="flex items-center gap-1  mt-auto">
          {isPositive ? (
            <TrendingUp size={12} className="text-[var(--color-up)]" />
          ) : (
            <TrendingDown size={12} className="text-[var(--color-down)]" />
          )}
          <span
            className="text-[11px] sm:text-xs font-medium whitespace-nowrap"
            style={{
              color: isPositive ? "var(--color-up)" : "var(--color-down)",
            }}>
            {Math.abs(change).toFixed(1)}% vs last month
          </span>
        </div>
      )}
    </Card>
  );
};

const SummaryCards = ({ data }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {data.map((card, i) => (
        <SummaryCard key={i} {...card} />
      ))}
    </div>
  );
};

export default SummaryCards;
