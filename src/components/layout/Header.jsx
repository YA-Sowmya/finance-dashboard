import { Download, Search } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { exportToCSV } from "../../utils/exportCSV";
import { applyFilters, applySort } from "../../utils/calculations";
import { getGreeting } from "../../utils/formatters";

const pageTitles = {
  dashboard: `${getGreeting()}, May!`,
  transactions: "Transactions",
  insights: "Insights",
};

const pageSubtitles = {
  dashboard: (count) => `You have made ${count} transactions this month`,
  transactions: () => "Manage and explore your financial activity",
  insights: () => "Understand your spending patterns and financial health",
};

const Header = ({ activePage, sidebarOpen, setSidebarOpen }) => {
  const { state, dispatch } = useApp();
  const { transactions, filters, sort } = state;

  const handleSearch = (e) => {
    dispatch({ type: "SET_FILTER", payload: { search: e.target.value } });
  };

  const handleExport = () => {
    const filtered = applyFilters(transactions, filters);
    const sorted = applySort(filtered, sort);
    exportToCSV(sorted);
  };

  const thisMonthCount = transactions.length;

  return (
    <div className="absolute md:fixed top-0 left-0 right-0 z-10   px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-start justify-between ">
      <div className="flex items-center justify-between md:justify-start gap-2 md:gap-4 w-full md:w-auto pl-0 md:pl-[272px]">
        <div className="flex items-center gap-2">
          {/* Hamburger*/}
          <button
            className="md:hidden px-2 rounded-lg  transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg
              className="w-6 h-6 text-[var(--text-primary)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex flex-col">
            <h1 className="text-xl pt-2 md:pt-1 md:text-3xl font-medium leading-tight text-[var(--text-primary)]">
              {pageTitles[activePage]}
            </h1>
            <p className="text-xs md:text-sm mt-0.5 md:mb-2 text-[var(--text-secondary)]">
              {pageSubtitles[activePage](thisMonthCount)}
            </p>
          </div>
        </div>

        {/* CSV  mobile */}
        <button
          onClick={handleExport}
          className="md:hidden flex items-center gap-1 px-3 py-2 rounded-3xl text-xs font-medium bg-[var(--card-bg)] text-[var(--text-primary)] shrink-0 border border-[var(--border-color)]">
          <Download size={14} />
          <span>CSV</span>
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-0 w-full md:w-auto">
        {/* Search */}
        {activePage === "transactions" && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-[var(--card-bg)] border border-[var(--border-color)] flex-1 md:w-auto">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search..."
              value={filters.search}
              onChange={handleSearch}
              className="bg-transparent outline-none text-sm w-full sm:w-32 md:w-40 text-[var(--text-primary)]"
            />
          </div>
        )}

        {/* CSV Desktop  */}
        <button
          onClick={handleExport}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-3xl text-sm font-medium transition-all duration-200 cursor-pointer bg-[var(--highlight)] text-[var(--text-primary)] hover:scale-105 border border-[var(--border-color)]">
          <Download size={14} />
          <span>CSV</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
