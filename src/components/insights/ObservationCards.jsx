import Card from "../ui/Card";
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import { formatCurrency, formatPercent } from "../../utils/formatters";

const ObservationCard = ({ icon: Icon, color, bg, title, description }) => (
  <Card className="p-3 flex gap-4">
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ background: bg }}>
      <Icon size={18} style={{ color }} />
    </div>
    <div>
      <p
        className="text-sm font-semibold mb-1"
        style={{ color: "var(--text-primary)" }}>
        {title}
      </p>
      <p
        className="text-xs leading-relaxed"
        style={{ color: "var(--text-secondary)" }}>
        {description}
      </p>
    </div>
  </Card>
);

const ObservationCards = ({
  transactions,
  monthlyData,
  savingsRate,
  topCategory,
}) => {
  const observations = [];

  // Savings rate observation
  if (savingsRate >= 20) {
    observations.push({
      icon: CheckCircle,
      color: "#71d5a8",
      bg: "#ede7f62e",
      title: "Healthy savings rate",
      description: `You are saving ${formatPercent(savingsRate)} of your income this month. That is above the recommended 20% benchmark.`,
    });
  } else {
    observations.push({
      icon: AlertCircle,
      color: "#E07070",
      bg: "#ede7f62e",
      title: "Low savings rate",
      description: `Your savings rate is ${formatPercent(savingsRate)} this month. Try to aim for at least 20% of your income.`,
    });
  }

  // Income vs expense trend
  const last3 = monthlyData.slice(-3);
  const avgIncome = last3.reduce((s, d) => s + d.income, 0) / last3.length;
  const avgExpense = last3.reduce((s, d) => s + d.expenses, 0) / last3.length;

  if (avgExpense > avgIncome) {
    observations.push({
      icon: TrendingDown,
      color: "#E07070",
      bg: "#ede7f62e",
      title: "Expenses exceed income",
      description: `Over the last 3 months your average expenses (${formatCurrency(avgExpense)}) have exceeded your average income (${formatCurrency(avgIncome)}). Review your spending.`,
    });
  } else {
    observations.push({
      icon: TrendingUp,
      color: "#62c99b",
      bg: "#ede7f62e",
      title: "Income exceeds expenses",
      description: `Over the last 3 months your average income (${formatCurrency(avgIncome)}) comfortably exceeds your average expenses (${formatCurrency(avgExpense)}). Keep it up.`,
    });
  }

  // Top category observation
  if (topCategory) {
    observations.push({
      icon: Info,
      color: "#b290ee",
      bg: "#ede7f62e",
      title: `High spend on ${topCategory.name}`,
      description: `${topCategory.name} is your biggest expense this month at ${formatCurrency(topCategory.value)}. Consider reviewing if this aligns with your financial goals.`,
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {observations.map((obs, i) => (
        <ObservationCard key={i} {...obs} />
      ))}
    </div>
  );
};

export default ObservationCards;
