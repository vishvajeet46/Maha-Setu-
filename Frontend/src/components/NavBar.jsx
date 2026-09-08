import { Link, useNavigate } from "react-router-dom";
import { IoIosLock } from "react-icons/io";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import Login from "./Login";

const NavBar = () => {
  const [userLogin, setUserLogin] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("mahasetu_token");
  const user = JSON.parse(localStorage.getItem("mahasetu_user") || "{}");

  const handlePortalRedirect = () => {
    if (user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <nav className="bg-white border-b-2 border-gray-200 w-full z-40 fixed top-0 h-16 flex items-center px-4 md:px-8">
        <div className="flex justify-between items-center w-full">
          <div>
            <Link to="/">
              <h1 className="font-bold text-xl md:text-2xl text-blue-900 tracking-tight">MAHA-SETU</h1>
              <p className="text-[11px] text-slate-500">Unified Citizen & Business Portal</p>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about/setu" className="text-sm font-medium text-slate-700 hover:text-blue-900">
              About Setu
            </Link>
            <Link to="/help-support" className="text-sm font-medium text-slate-700 hover:text-blue-900">
              Help & Support
            </Link>

            {token ? (
              <button
                onClick={handlePortalRedirect}
                className="bg-blue-900 text-white rounded-xl inline-flex items-center gap-2 px-4 py-2 hover:bg-blue-800 text-sm font-semibold cursor-pointer"
              >
                Go to {user.role === "admin" ? "Admin Desk" : "Dashboard"} &rarr;
              </button>
            ) : (
              <button
                type="button"
                className="bg-blue-900 text-white rounded-xl inline-flex items-center gap-2 px-4 py-2 hover:bg-blue-800 cursor-pointer text-sm font-semibold"
                onClick={() => setUserLogin(true)}
              >
                <IoIosLock className="text-base shrink-0" />
                <span>Login | Register</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {userLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-2">
            <button
              className="text-red-600 text-3xl absolute top-2 right-2 z-10 cursor-pointer"
              onClick={() => setUserLogin(false)}
            >
              <MdCancel />
            </button>
            <Login
              onClose={() => setUserLogin(false)}
              onLoginSuccess={(loggedInUser) => {
                setUserLogin(false);
                if (loggedInUser.role === "admin") {
                  navigate("/admin-dashboard");
                } else {
                  navigate("/dashboard");
                }
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;