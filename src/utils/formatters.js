export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const formatPercent = (value) => `${value.toFixed(1)}%`;

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export const getMonthName = (monthNumber) => {
  return new Date(2025, monthNumber - 1, 1).toLocaleString("en-IN", {
    month: "long",
  });
};

export const getShortMonth = (monthNumber) => {
  return new Date(2025, monthNumber - 1, 1).toLocaleString("en-IN", {
    month: "short",
  });
};
