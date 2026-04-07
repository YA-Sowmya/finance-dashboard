import { useState } from "react";
import { useApp } from "./context/AppContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Card from "./components/ui/Card";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "transactions":
        return <Transactions />;
      case "insights":
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-bg w-full flex justify-center">
      <Card className="w-[98%] mx-auto my-[22px] overflow-y-auto">
        <Layout activePage={activePage} setActivePage={setActivePage}>
          {renderPage()}
        </Layout>
      </Card>
    </div>
  );
}

export default App;
