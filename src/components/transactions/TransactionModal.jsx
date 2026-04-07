import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { CATEGORY_NAMES } from "../../data/categories";
import { useApp } from "../../context/AppContext";
import Button from "../ui/Button";

const TransactionModal = ({ isOpen, onClose, editData }) => {
  const { state, dispatch } = useApp();
  const { theme } = state;

  const defaultForm = {
    date: new Date().toISOString().split("T")[0],
    amount: "",
    category: "Salary",
    type: "income",
    status: "completed",
  };

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editData) {
      setForm({
        date: editData.date,
        amount: editData.amount,
        category: editData.category,
        type: editData.type,
        status: editData.status,
      });
    } else {
      setForm(defaultForm);
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const inputStyle = {
    background:
      theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.7)",
    border: "1px solid var(--border-color)",
    color: "var(--text-primary)",
    borderRadius: "10px",
    padding: "10px 12px",
    fontSize: "13px",
    outline: "none",
    width: "100%",
  };

  const labelStyle = {
    fontSize: "12px",
    fontWeight: "500",
    color: "var(--text-secondary)",
    marginBottom: "6px",
    display: "block",
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.amount || !form.date) return;

    const incomeCategories = ["Salary", "Freelance"];
    const type = incomeCategories.includes(form.category)
      ? "income"
      : "expense";

    if (editData) {
      dispatch({
        type: "EDIT_TRANSACTION",
        payload: {
          ...editData,
          ...form,
          amount: Number(form.amount),
          type,
          month: new Date(form.date).getMonth() + 1,
        },
      });
    } else {
      dispatch({
        type: "ADD_TRANSACTION",
        payload: {
          id: Date.now(),
          ...form,
          amount: Number(form.amount),
          type,
          month: new Date(form.date).getMonth() + 1,
        },
      });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
      onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4"
        style={{
          background: theme === "dark" ? "#1E1E2E" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--border-color)",
        }}
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3
            className="text-base font-semibold"
            style={{ color: "var(--text-primary)" }}>
            {editData ? "Edit Transaction" : "Add Transaction"}
          </h3>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer hover:bg-black/10 transition-all duration-200"
            style={{ color: "var(--text-muted)" }}>
            <X size={15} />
          </button>
        </div>

        {/* Date */}
        <div>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            style={inputStyle}
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
        </div>

        {/* Amount */}
        <div>
          <label style={labelStyle}>Amount (₹)</label>
          <input
            type="number"
            style={inputStyle}
            placeholder="Enter amount"
            value={form.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <label style={labelStyle}>Category</label>
          <select
            style={inputStyle}
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}>
            {CATEGORY_NAMES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label style={labelStyle}>Status</label>
          <select
            style={inputStyle}
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-2">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="flex-1">
            {editData ? "Save Changes" : "Add Transaction"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
