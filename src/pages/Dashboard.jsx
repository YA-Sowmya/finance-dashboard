import { useApp } from "../context/AppContext";
import {
  getGreeting,
  formatCurrency,
  formatPercent,
  getShortMonth,
} from "../utils/formatters";
import {
  getTransactionsByPeriod,
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getSavingsRate,
  getPercentChange,
  getSpendingByCategory,
  getMonthlyData,
} from "../utils/calculations";
import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceChart from "../components/dashboard/BalanceChart";
import SpendingDonut from "../components/dashboard/SpendingDonut";

const Dashboard = () => {
  const { state } = useApp();
  const { transactions } = state;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  const thisMonthTx = getTransactionsByPeriod(
    transactions,
    currentYear,
    currentMonth,
  );
  const lastMonthTx = getTransactionsByPeriod(
    transactions,
    lastMonthYear,
    lastMonth,
  );

  const currentIncome = getTotalIncome(thisMonthTx);
  const currentExpenses = getTotalExpenses(thisMonthTx);
  const currentBalance = getBalance(transactions);
  const currentSavings = getSavingsRate(thisMonthTx);

  const prevIncome = getTotalIncome(lastMonthTx);
  const prevExpenses = getTotalExpenses(lastMonthTx);
  const prevBalance = getBalance(
    transactions.filter(
      (t) => new Date(t.date) < new Date(currentYear, currentMonth - 1, 1),
    ),
  );
  const prevSavings = getSavingsRate(lastMonthTx);

  const thisMonthCount = thisMonthTx.length;
  const monthlyData = getMonthlyData(transactions);
  const spendingData = getSpendingByCategory(thisMonthTx);

  const summaryData = [
    {
      title: "Total Balance",
      value: formatCurrency(currentBalance),
      sub: "All time",
      change: getPercentChange(currentBalance, prevBalance),
      color: "var(--color-balance)",
    },
    {
      title: "Monthly Income",
      value: formatCurrency(currentIncome),
      sub: `vs ${formatCurrency(prevIncome)} last month`,
      change: getPercentChange(currentIncome, prevIncome),
      color: "var(--color-income)",
    },
    {
      title: "Monthly Expenses",
      value: formatCurrency(currentExpenses),
      sub: `vs ${formatCurrency(prevExpenses)} last month`,
      change: getPercentChange(currentExpenses, prevExpenses),
      color: "var(--color-expense)",

      inverseChange: true,
    },
    {
      title: "Savings Rate",
      value: formatPercent(currentSavings),
      sub: `vs ${formatPercent(prevSavings)} last month`,
      change: getPercentChange(currentSavings, prevSavings),
      color: "var(--color-savings)",
    },
  ];

  return (
    <div className="flex flex-col gap-6 mt-8">
      {/* Summary Cards */}
      <SummaryCards data={summaryData} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Chart*/}
        <div className="col-span-1 lg:col-span-3">
          <BalanceChart data={monthlyData} />
        </div>

        {/* Donut */}
        <div className="col-span-1 lg:col-span-2">
          <SpendingDonut data={spendingData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
