import Card from "../ui/Card";
import { CATEGORIES } from "../../data/categories";
import { formatCurrency } from "../../utils/formatters";

const TopCategory = ({ category, amount, percentage }) => {
  if (!category) return null;
  const cat = CATEGORIES[category];

  return (
    <Card className="p-5">
      <p
        className="text-s font-semibold uppercase tracking-wide mb-4"
        style={{ color: "var(--text-muted)" }}>
        Top Spending Category
      </p>
      <div className="flex items-center gap-4">
        <div>
          <p
            className="text-xl font-semibold"
            style={{ color: "var(--text-primary)" }}>
            {category}
          </p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {formatCurrency(amount)} · {percentage}% of total spending
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="mt-4 h-2 rounded-full overflow-hidden"
        style={{ background: "var(--border-color)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, background: `${cat.color}` }}
        />
      </div>
    </Card>
  );
};

export default TopCategory;
