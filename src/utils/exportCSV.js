import { formatDate } from "./formatters";

export const exportToCSV = (transactions, filename = "montly_transactions") => {
  if (transactions.length === 0) return;

  const headers = ["ID", "Date", "Category", "Type", "Amount", "Status"];

  const rows = transactions.map((t) => [
    t.id,
    formatDate(t.date),
    t.category,
    t.type,
    t.amount,
    t.status,
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
