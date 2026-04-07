import { Pencil, Trash2 } from "lucide-react";
import Badge from "../ui/Badge";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { useApp } from "../../context/AppContext";

const StatusPill = ({ status, theme }) => {
  const styles = {
    completed: { color: "#4caf82bd" },
    pending: { color: "#FFA726" },
    failed: { color: "#E07070" },
  };
  const s = styles[status] || styles.completed;

  return (
    <span
      className="text-xs font-medium px-2 py-1 rounded-lg"
      style={{
        background: "var(--card-bg)",
        color: `${s.color}`,
      }}>
      {status}
    </span>
  );
};

const TransactionRow = ({ transaction, onEdit }) => {
  const { state, dispatch } = useApp();
  const { role, theme } = state;
  const { id, date, amount, category, type, status } = transaction;

  const handleDelete = () => {
    if (window.confirm("Delete this transaction?")) {
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    }
  };

  return (
    <tr
      className="transition-all duration-200"
      style={{
        borderBottom: "1px solid var(--border-color)",
      }}>
      {/* Date */}
      <td
        className="py-1 px-4 text-xs md:text-sm"
        style={{ color: "var(--text-secondary)" }}>
        {formatDate(date)}
      </td>

      {/* Category */}
      <td className="py-1 px-4">
        <Badge category={category} theme={theme} />
      </td>

      {/* Type */}
      <td className="py-1 px-4">
        <span
          className="text-xs font-medium px-2 py-1 rounded-lg capitalize"
          style={{
            color: type === "income" ? "var(--color-up)" : "var(--color-down)",
          }}>
          {type}
        </span>
      </td>

      {/* Status */}
      <td className="py-1 px-4">
        <StatusPill status={status} theme={theme} />
      </td>

      {/* Amount */}
      <td
        className="py-1 px-4 text-xs font-medium text-right"
        style={{
          color:
            type === "income"
              ? "rgba(76,175,130,0.8)"
              : "rgba(224,112,112,0.8)",
        }}>
        {type === "income" ? "+" : "-"}
        {formatCurrency(amount)}
      </td>

      {/* Actions — Admin */}
      {role === "admin" && (
        <td className="py-1 px-4">
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => onEdit(transaction)}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-violet-100"
              style={{ color: "var(--text-primary)" }}>
              <Pencil size={13} />
            </button>
            <button
              onClick={handleDelete}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-red-100"
              style={{ color: "rgba(224,112,112,0.7)" }}>
              <Trash2 size={13} />
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default TransactionRow;
