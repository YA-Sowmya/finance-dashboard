import Sidebar from "./Sidebar";
import Header from "./Header";
import { useState } from "react";

const Layout = ({ activePage, setActivePage, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[var(--highlight)] z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main content */}
      <div className="flex-1  overflow-y-auto relative">
        <Header
          activePage={activePage}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="pt-20 py-6 px-3 md:px-6 transition-all duration-300 ">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
