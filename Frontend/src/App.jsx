import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AboutSetu from "./components/AboutSetu";
import Body from "./components/Body";
import Footer from "./components/Footer";
import HelpSupport from "./components/HelpSupport";
import NavBar from "./components/NavBar";
import Homepage from "./components/mainpages/Homepage";
import AdminPortal from "./components/mainpages/AdminPortal";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("mahasetu_token");
  const user = JSON.parse(localStorage.getItem("mahasetu_user") || "{}");

  if (!token) return <Navigate to="/" replace />;
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === "admin" ? "/admin-dashboard" : "/dashboard"} replace />;
  }
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <div className="pt-16">
                <Body />
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/about/setu"
          element={
            <>
              <NavBar />
              <div className="pt-16">
                <AboutSetu />
              </div>
              <Footer />
            </>
          }
        />
        <Route
          path="/help-support"
          element={
            <>
              <NavBar />
              <div className="pt-16">
                <HelpSupport />
              </div>
              <Footer />
            </>
          }
        />

        {/* Citizen Portal */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute allowedRole="user">
              <Homepage />
            </ProtectedRoute>
          }
        />

        {/* Department Admin Portal */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminPortal />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;