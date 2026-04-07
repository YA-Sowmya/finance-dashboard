import { useApp } from "../../context/AppContext";
import { CATEGORY_NAMES, MONTHS, YEARS } from "../../data/categories";

const Filters = () => {
  const { state, dispatch } = useApp();
  const { filters, theme } = state;

  const selectStyle = {
    background: "var(--card-bg)",
    color: "var(--text-primary)",
    borderRadius: "30px",
    padding: "8px 18px 8px 12px",
    fontSize: "13px",
    outline: "none",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
  };

  const setFilter = (key, value) => {
    dispatch({ type: "SET_FILTER", payload: { [key]: value } });
  };

  return (
    <div className="flex flex-wrap items-center mt-8 md:mt-2 gap-3">
      {/* Category */}
      <select
        style={selectStyle}
        value={filters.category}
        onChange={(e) => setFilter("category", e.target.value)}>
        <option value="all">All Categories</option>
        {CATEGORY_NAMES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Type */}
      <select
        style={selectStyle}
        value={filters.type}
        onChange={(e) => setFilter("type", e.target.value)}>
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Month */}
      <select
        style={selectStyle}
        value={filters.month}
        onChange={(e) => setFilter("month", e.target.value)}>
        <option value="all">All Months</option>
        {MONTHS.map((m, i) => (
          <option key={i} value={i + 1}>
            {m}
          </option>
        ))}
      </select>

      {/* Year */}
      <select
        style={selectStyle}
        value={filters.year}
        onChange={(e) => setFilter("year", e.target.value)}>
        <option value="all">All Years</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      {/* Status */}
      <select
        style={selectStyle}
        value={filters.status}
        onChange={(e) => setFilter("status", e.target.value)}>
        <option value="all">All Status</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="failed">Failed</option>
      </select>

      {/* Reset */}
      <button
        onClick={() => dispatch({ type: "RESET_FILTERS" })}
        className="text-xs font-medium px-3 py-2 rounded-3xl transition-all duration-200 cursor-pointer"
        style={{
          color: "var(--text-primary)",
          background: "var(--card-bg)",
          border: "1px solid var(--text-primary)",
        }}>
        Reset
      </button>
    </div>
  );
};

export default Filters;
