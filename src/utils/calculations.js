export const getTransactionsByPeriod = (transactions, year, month) => {
  return transactions.filter((t) => {
    const d = new Date(t.date);
    const matchYear = year ? d.getFullYear() === year : true;
    const matchMonth = month ? d.getMonth() + 1 === month : true;
    return matchYear && matchMonth;
  });
};

export const getTotalIncome = (transactions) =>
  transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

export const getTotalExpenses = (transactions) =>
  transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

export const getBalance = (transactions) =>
  getTotalIncome(transactions) - getTotalExpenses(transactions);

export const getSavingsRate = (transactions) => {
  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);
  if (income === 0) return 0;
  return ((income - expenses) / income) * 100;
};

export const getSpendingByCategory = (transactions) => {
  const expenses = transactions.filter((t) => t.type === "expense");
  const map = {};
  expenses.forEach((t) => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const getTopCategory = (transactions) => {
  const breakdown = getSpendingByCategory(transactions);
  return breakdown[0] || null;
};

export const getMonthlyData = (transactions) => {
  const map = {};
  transactions.forEach((t) => {
    const d = new Date(t.date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const key = `${year}-${month}`;
    if (!map[key]) map[key] = { year, month, income: 0, expenses: 0 };
    if (t.type === "income") map[key].income += t.amount;
    else map[key].expenses += t.amount;
  });
  return Object.values(map)
    .sort((a, b) => (a.year !== b.year ? a.year - b.year : a.month - b.month))
    .map((d) => ({ ...d, balance: d.income - d.expenses }));
};

export const getPercentChange = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};

export const applyFilters = (transactions, filters) => {
  return transactions.filter((t) => {
    const d = new Date(t.date);
    const matchSearch = filters.search
      ? t.category.toLowerCase().includes(filters.search.toLowerCase())
      : true;
    const matchCategory =
      filters.category !== "all" ? t.category === filters.category : true;
    const matchType = filters.type !== "all" ? t.type === filters.type : true;
    const matchMonth =
      filters.month !== "all"
        ? d.getMonth() + 1 === Number(filters.month)
        : true;
    const matchYear =
      filters.year !== "all" ? d.getFullYear() === Number(filters.year) : true;
    const matchStatus =
      filters.status !== "all" ? t.status === filters.status : true;
    return (
      matchSearch &&
      matchCategory &&
      matchType &&
      matchMonth &&
      matchYear &&
      matchStatus
    );
  });
};

export const applySort = (transactions, sort) => {
  return [...transactions].sort((a, b) => {
    if (sort.field === "date") {
      const diff = new Date(a.date) - new Date(b.date);
      return sort.direction === "asc" ? diff : -diff;
    }
    if (sort.field === "amount") {
      const diff = a.amount - b.amount;
      return sort.direction === "asc" ? diff : -diff;
    }
    return 0;
  });
};
