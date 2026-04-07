import { useState } from "react";
import { ChevronUp, ChevronDown, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { applyFilters, applySort } from "../../utils/calculations";
import TransactionRow from "./TransactionRow";
import TransactionModal from "./TransactionModal";
import Filters from "./Filters";
import EmptyState from "../ui/EmptyState";
import Card from "../ui/Card";

const TransactionTable = () => {
  const { state, dispatch } = useApp();
  const { transactions, filters, sort, currentPage, itemsPerPage, role } =
    state;

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const filtered = applyFilters(transactions, filters);
  const sorted = applySort(filtered, sort);
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (field) => {
    dispatch({
      type: "SET_SORT",
      payload: {
        field,
        direction:
          sort.field === field && sort.direction === "asc" ? "desc" : "asc",
      },
    });
  };

  const handleEdit = (transaction) => {
    setEditData(transaction);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const SortIcon = ({ field }) => {
    if (sort.field !== field)
      return <ChevronUp size={18} style={{ opacity: 0.6 }} />;
    return sort.direction === "asc" ? (
      <ChevronUp size={16} style={{ color: "var(--text-primary)" }} />
    ) : (
      <ChevronDown size={16} style={{ color: "var(--text-primary)" }} />
    );
  };

  const thStyle = {
    padding: "10px 16px",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    color: "var(--text-muted)",
    textAlign: "left",
    borderBottom: "1px solid var(--border-color)",
    whiteSpace: "nowrap",
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <Filters />
        {role === "admin" && (
          <button
            onClick={handleAdd}
            className="flex items-center text-[var(--highlight)] bg-[var(--text-primary)]  gap-2 px-4 py-2.5 rounded-3xl text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105">
            <Plus size={15} />
            Add Transaction
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
        Showing {paginated.length} of {filtered.length} transactions
      </p>

      {/* Table */}
      <Card className="overflow-hidden">
        {paginated.length === 0 ? (
          <EmptyState message="No transactions match your filters" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th style={thStyle}>
                    <button
                      onClick={() => handleSort("date")}
                      className="flex items-center gap-1 cursor-pointer">
                      DATE <SortIcon field="date" />
                    </button>
                  </th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Status</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>
                    <button
                      onClick={() => handleSort("amount")}
                      className="flex items-center gap-1 cursor-pointer ml-auto">
                      AMOUNT <SortIcon field="amount" />
                    </button>
                  </th>
                  {role === "admin" && (
                    <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {paginated.map((t) => (
                  <TransactionRow
                    key={t.id}
                    transaction={t}
                    onEdit={handleEdit}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() =>
                dispatch({ type: "SET_PAGE", payload: currentPage - 1 })
              }
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer disabled:opacity-70"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}>
              Previous
            </button>
            <button
              onClick={() =>
                dispatch({ type: "SET_PAGE", payload: currentPage + 1 })
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer disabled:opacity-40"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <TransactionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        editData={editData}
      />
    </div>
  );
};

export default TransactionTable;
