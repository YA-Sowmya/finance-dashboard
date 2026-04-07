import { createContext, useContext, useReducer, useEffect } from "react";
import { rawTransactions } from "../data/transactions";

const initialState = {
  transactions: rawTransactions,
  role: "admin",
  theme: "light",
  filters: {
    search: "",
    category: "all",
    type: "all",
    month: "all",
    year: "all",
    status: "all",
  },
  sort: {
    field: "date",
    direction: "desc",
  },
  currentPage: 1,
  itemsPerPage: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        currentPage: 1,
      };
    case "RESET_FILTERS":
      return { ...state, filters: initialState.filters, currentPage: 1 };
    case "SET_SORT":
      return { ...state, sort: action.payload };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const saved = localStorage.getItem("montly_state");
  const parsed = saved ? JSON.parse(saved) : null;

  const mergedInitial = parsed
    ? {
        ...parsed,
        transactions:
          parsed.transactions?.length > 0
            ? parsed.transactions
            : rawTransactions,
      }
    : initialState;

  const [state, dispatch] = useReducer(reducer, mergedInitial);
  useEffect(() => {
    localStorage.setItem("montly_state", JSON.stringify(state));
  }, [state]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
