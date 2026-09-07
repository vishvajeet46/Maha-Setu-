import { useState } from "react";
import NavBar from "./Navbar";
import Dashboard from "./Dashboard";
import MyApplications from "./MyApplications";
import Payment from "./Payment";
import Status from "./Status";
import Support from "./Support";
import Documents from "./Documents";
import Settings from "./Setting";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "My Applications":
        return <MyApplications />;
      case "Payment":
        return <Payment />;
      case "Status":
        return <Status />;
      case "Support":
        return <Support />;
      case "Documents":
        return <Documents />;
      case "Settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 overflow-x-hidden">
      <NavBar activeItem={activeTab} setActiveItem={setActiveTab} />
      <main className="flex-1 min-w-0">{renderContent()}</main>
    </div>
  );
};

export default Homepage;