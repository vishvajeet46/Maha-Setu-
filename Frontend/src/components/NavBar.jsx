import { Link, useNavigate } from "react-router-dom";
import { IoIosLock } from "react-icons/io";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import Login from "./Login";

const NavBar = () => {
  const [userLogin, setUserLogin] = useState(false);
  const [lang, setLang] = useState("EN");
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
      <header className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-xs select-none">
        {/* Top Government Utility Ribbon */}
        <div className="w-full bg-[#0a142f] text-slate-300 text-[11px] px-4 md:px-10 py-1.5 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-amber-400 tracking-wide">महाराष्ट्र शासन</span>
            <span className="text-slate-600">|</span>
            <span className="font-medium text-slate-200">Government of Maharashtra</span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-slate-400 font-normal">RTS 2015 Gateway</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Accessibility Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-800/90 border border-slate-700/60 px-2 py-0.5 rounded-md text-[10px] text-slate-300">
              <button onClick={() => (document.documentElement.style.fontSize = "14px")} className="hover:text-white px-1 font-bold transition">A-</button>
              <button onClick={() => (document.documentElement.style.fontSize = "16px")} className="hover:text-white px-1 font-bold transition">A</button>
              <button onClick={() => (document.documentElement.style.fontSize = "18px")} className="hover:text-white px-1 font-bold transition">A+</button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800/90 border border-slate-700/60 p-0.5 rounded-md text-[11px]">
              <button
                onClick={() => setLang("EN")}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition ${lang === "EN" ? "bg-amber-500 text-slate-950 font-bold shadow-xs" : "text-slate-300 hover:text-white"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("MR")}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition ${lang === "MR" ? "bg-amber-500 text-slate-950 font-bold shadow-xs" : "text-slate-300 hover:text-white"}`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLang("HI")}
                className={`px-2 py-0.5 rounded text-xs font-semibold transition ${lang === "HI" ? "bg-amber-500 text-slate-950 font-bold shadow-xs" : "text-slate-300 hover:text-white"}`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* Primary Navbar */}
        <nav className="h-16 flex items-center justify-between px-4 md:px-10 border-b border-slate-200">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#102a6b] to-[#0a1840] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md border border-blue-900/40">
              M
            </div>
            <div>
              <h1 className="font-black text-xl text-[#0b1c48] tracking-tight leading-tight group-hover:text-blue-900 transition">
                MAHA-SETU
              </h1>
              <p className="text-[10px] text-slate-500 font-semibold tracking-wide">
                Unified Public Service & Interoperability Gateway
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-6 md:gap-8">
            <Link to="/about/setu" className="text-sm font-semibold text-slate-700 hover:text-[#0b1c48] transition">
              About Setu
            </Link>
            <Link to="/help-support" className="text-sm font-semibold text-slate-700 hover:text-[#0b1c48] transition">
              Help & Support
            </Link>

            {token ? (
              <button
                onClick={handlePortalRedirect}
                className="bg-[#0f2868] hover:bg-[#0b1c48] text-white rounded-xl inline-flex items-center gap-2 px-4 py-2 text-sm font-bold transition shadow-sm cursor-pointer border border-blue-900/30"
              >
                Go to {user.role === "admin" ? "Admin Desk" : "Dashboard"} &rarr;
              </button>
            ) : (
              <button
                type="button"
                className="bg-gradient-to-r from-[#102a6b] to-[#0c1f50] hover:from-[#0d2258] hover:to-[#09173c] text-white rounded-xl inline-flex items-center gap-2 px-5 py-2.5 cursor-pointer text-sm font-bold transition shadow-sm border border-blue-950/20 active:scale-98"
                onClick={() => setUserLogin(true)}
              >
                <IoIosLock className="text-base shrink-0 text-amber-300" />
                <span>Login | Register</span>
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Auth Modal */}
      {userLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-slate-950/50 p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-2 shadow-2xl border border-slate-200">
            <button
              className="text-slate-400 hover:text-slate-700 text-2xl absolute top-3 right-3 z-10 cursor-pointer"
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