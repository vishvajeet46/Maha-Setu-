import { useState, useEffect } from "react";

const Login = ({ defaultRole = "user", onClose, onLoginSuccess }) => {
  const [role, setRole] = useState(defaultRole);
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "male",
    employeeId: "",
    department: "Revenue and Forest Department",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const endpoint =
      role === "admin"
        ? mode === "signup"
          ? "https://maha-setu-backend.onrender.com/api/auth/admin/signup"
          : "https://maha-setu-backend.onrender.com/api/auth/admin/login"
        : mode === "signup"
        ? "https://maha-setu-backend.onrender.com/api/auth/citizen/signup"
        : "https://maha-setu-backend.onrender.com/api/auth/citizen/login";

    const payload =
      role === "admin"
        ? {
            email: formData.email,
            password: formData.password,
            ...(mode === "signup" && {
              name: formData.name,
              employeeId: formData.employeeId,
              department: formData.department,
            }),
          }
        : {
            email: formData.email,
            password: formData.password,
            ...(mode === "signup" && {
              name: formData.name,
              phone: formData.phone,
              age: formData.age,
              gender: formData.gender,
            }),
          };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication error");

      localStorage.setItem("mahasetu_token", data.token);
      localStorage.setItem("mahasetu_user", JSON.stringify(data.user));

      setSuccessMessage(`Login successful! Redirecting to ${role === "admin" ? "Department Portal" : "Citizen Desk"}...`);

      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(data.user);
        if (onClose) onClose();
      }, 700);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto" onClick={onClose}>
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col font-sans border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        )}

        <div className="w-full flex shrink-0 border-b border-slate-200">
          <button
            type="button"
            onClick={() => {
              setRole("user");
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className={`w-1/2 py-3.5 text-sm font-bold transition cursor-pointer ${
              role === "user" ? "bg-[#1b327b] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Citizen / User
          </button>
          <button
            type="button"
            onClick={() => {
              setRole("admin");
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className={`w-1/2 py-3.5 text-sm font-bold transition cursor-pointer ${
              role === "admin" ? "bg-[#1b327b] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Department Officer
          </button>
        </div>

        <div className="w-full flex shrink-0 border-b border-slate-200 bg-slate-50">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setErrorMessage("");
            }}
            className={`w-1/2 py-2.5 text-xs font-semibold cursor-pointer ${
              mode === "login" ? "bg-white text-[#1b327b] border-b-2 border-[#1b327b]" : "text-slate-500"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setErrorMessage("");
            }}
            className={`w-1/2 py-2.5 text-xs font-semibold cursor-pointer ${
              mode === "signup" ? "bg-white text-[#1b327b] border-b-2 border-[#1b327b]" : "text-slate-500"
            }`}
          >
            Register Account
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {role === "admin" && mode === "signup" && (
              <>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 rounded-xl p-2.5 bg-slate-50 text-slate-800 focus:outline-none"
                  >
                    <option value="Revenue and Forest Department">Revenue and Forest Department</option>
                    <option value="Labour Department">Labour Department</option>
                    <option value="Social Justice Department">Social Justice Department</option>
                    <option value="Public Health Department">Public Health Department</option>
                    <option value="Agriculture Department">Agriculture Department</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Employee / Desk ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    required
                    value={formData.employeeId}
                    onChange={handleInputChange}
                    placeholder="e.g. MH-REV-2041"
                    className="w-full border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:outline-none"
                  />
                </div>
              </>
            )}

            {mode === "signup" && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Legal Name"
                  className="w-full border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:outline-none"
                />
              </div>
            )}

            {role === "user" && mode === "signup" && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Contact</label>
                <input
                  type="tel"
                  name="phone"
                  maxLength="10"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className="w-full border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@domain.com"
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className="w-full border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#1b327b] hover:bg-[#152763] disabled:bg-slate-400 text-white font-bold py-3 rounded-xl transition cursor-pointer text-sm"
            >
              {loading
                ? "Verifying..."
                : mode === "login"
                ? `Log in to ${role === "admin" ? "Department Portal" : "Citizen Desk"}`
                : "Complete Registration"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;