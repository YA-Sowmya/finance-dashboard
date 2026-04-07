import { useApp } from "../context/AppContext";
import {
  getTransactionsByPeriod,
  getTotalExpenses,
  getSavingsRate,
  getSpendingByCategory,
  getTopCategory,
  getMonthlyData,
} from "../utils/calculations";
import TopCategory from "../components/insights/TopCategory";
import MonthComparison from "../components/insights/MonthComparison";
import ObservationCards from "../components/insights/ObservationCards";

const Insights = () => {
  const { state } = useApp();
  const { transactions } = state;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const thisMonthTx = getTransactionsByPeriod(
    transactions,
    currentYear,
    currentMonth,
  );
  const spendingData = getSpendingByCategory(thisMonthTx);
  const topCategory = getTopCategory(thisMonthTx);
  const totalExpenses = getTotalExpenses(thisMonthTx);
  const savingsRate = getSavingsRate(thisMonthTx);
  const monthlyData = getMonthlyData(transactions);

  const topPercentage =
    topCategory && totalExpenses > 0
      ? ((topCategory.value / totalExpenses) * 100).toFixed(1)
      : 0;

  return (
    <div className="flex flex-col gap-6 mt-8">
      {/* Top section */}

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 md:gap-6">
        <div className="col-span-1 lg:col-span-7">
          <MonthComparison data={monthlyData} />
        </div>

        <div className="col-span-1 lg:col-span-3">
          <TopCategory
            category={topCategory?.name}
            amount={topCategory?.value}
            percentage={topPercentage}
          />
        </div>
      </div>

      {/* Observations */}
      <div>
        <h3
          className="text-xl font-semibold mb-4"
          style={{ color: "var(--text-primary)" }}>
          Smart Observations
        </h3>
        <ObservationCards
          transactions={thisMonthTx}
          monthlyData={monthlyData}
          savingsRate={savingsRate}
          topCategory={topCategory}
        />
      </div>
    </div>
  );
};

export default Insights;
