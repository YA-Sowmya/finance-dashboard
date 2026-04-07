import {
  LayoutDashboard,
  ArrowLeftRight,
  Lightbulb,
  Sun,
  Moon,
} from "lucide-react";
import { useApp } from "../../context/AppContext";
import Card from "../ui/Card";
import logo from "../../assets/logo.png";
import pf from "../../assets/pf.png";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

const Sidebar = ({ activePage, setActivePage, isOpen }) => {
  const { state, dispatch } = useApp();
  const { theme, role } = state;

  const toggleTheme = () =>
    dispatch({
      type: "SET_THEME",
      payload: theme === "light" ? "dark" : "light",
    });

  const toggleRole = () =>
    dispatch({
      type: "SET_ROLE",
      payload: role === "admin" ? "viewer" : "admin",
    });

  return (
    <Card
      className={`fixed top-0 left-0 z-30 flex flex-col justify-between 
        w-65 h-full p-4 transform transition-transform duration-300
        md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
      <div className="flex flex-col gap-6">
        {/* Logo */}
        <div className="px-2">
          <img
            src={logo}
            alt="Montly"
            className="w-full object-contain max-h-12"
          />
        </div>

        {/* User */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2.5">
            <img
              src={pf}
              alt="profile"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-2xl sm:text-3xl font-medium leading-tight text-[var(--text-primary)]">
                May JJ
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className="text-sm"
                  style={{
                    color:
                      role === "admin"
                        ? "var(--text-primary)"
                        : "var(--text-secondary)",
                  }}>
                  {role === "admin" ? "Admin" : "Viewer"}
                </span>
                <button
                  onClick={toggleRole}
                  className="relative w-6 h-2.5 rounded-full transition-all duration-200"
                  style={{
                    background:
                      role === "admin"
                        ? "var(--highlight)"
                        : "rgba(178,176,176,0.5)",
                  }}>
                  <span
                    className="absolute top-[1px] left-[1px] w-2 h-2 rounded-full transition-all duration-200"
                    style={{
                      background: "var(--text-primary)",
                      transform:
                        role === "admin"
                          ? "translateX(14px)"
                          : "translateX(0px)",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-3 px-2 w-full">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              className={`flex items-center gap-2.5 w-full px-4 py-2.5 rounded-3xl text-base sm:text-lg font-medium transition-all duration-200 text-left
                ${
                  activePage === id
                    ? "bg-[var(--highlight)] text-[var(--text-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:scale-105"
                }`}>
              <Icon size={18} className="shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Theme toggle */}
      <div className="flex flex-col items-center mt-auto mb-4 pt-3 ">
        <div className="flex items-center bg-[var(--card-bg)] rounded-full p-1">
          <button
            onClick={() => dispatch({ type: "SET_THEME", payload: "light" })}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-all duration-200
              ${theme === "light" ? "bg-[var(--highlight)] text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
            <Sun size={14} />
            Light
          </button>

          <button
            onClick={() => dispatch({ type: "SET_THEME", payload: "dark" })}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm transition-all duration-200
              ${theme === "dark" ? "bg-black/20 text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
            <Moon size={14} />
            Dark
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
