import { useState, useEffect } from "react";
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
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("mahasetu_token");

  const fetchApplications = async () => {
    if (!token) return;
    try {
      const res = await fetch("https://maha-setu-backend.onrender.com/api/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <Dashboard
            applications={applications}
            onRefresh={fetchApplications}
            setActiveTab={setActiveTab}
          />
        );
      case "My Applications":
        return (
          <MyApplications
            applications={applications}
            onRefresh={fetchApplications}
            setActiveTab={setActiveTab}
          />
        );
      case "Payment":
        return <Payment onRefresh={fetchApplications} />;
      case "Status":
        return <Status applications={applications} />;
      case "Support":
        return <Support />;
      case "Documents":
        return <Documents />;
      case "Settings":
        return <Settings />;
      default:
        return (
          <Dashboard
            applications={applications}
            onRefresh={fetchApplications}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-slate-50 overflow-x-hidden font-sans">
      <NavBar activeItem={activeTab} setActiveItem={setActiveTab} />
      <main className="flex-1 min-w-0">{renderContent()}</main>
    </div>
  );
};

export default Homepage;