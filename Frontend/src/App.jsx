import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Body from "./components/Body";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import AboutSetu from "./components/AboutSetu";
import HelpSupport from "./components/HelpSupport";
import Homepage from "./components/mainpages/Homepage";
import AdminPortal from "./components/AdminPortal";

function ProtectedUserRoute({ children }) {
  const token = localStorage.getItem("mahasetu_token");
  const user = JSON.parse(localStorage.getItem("mahasetu_user") || "{}");
  if (!token || user.role === "admin") return <Navigate to="/" replace />;
  return children;
}

function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("mahasetu_token");
  const user = JSON.parse(localStorage.getItem("mahasetu_user") || "{}");
  if (!token || user.role !== "admin") return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Citizen Portal */}
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <div className="flex-1 pt-24">
                <Body />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/about/setu"
          element={
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <div className="flex-1 pt-24">
                <AboutSetu />
              </div>
              <Footer />
            </div>
          }
        />
        <Route
          path="/help-support"
          element={
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <div className="flex-1 pt-24">
                <HelpSupport />
              </div>
              <Footer />
            </div>
          }
        />

        {/* Protected Citizen Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedUserRoute>
              <Homepage />
            </ProtectedUserRoute>
          }
        />

        {/* Protected Department Admin Portal */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminPortal />
            </ProtectedAdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}