import { useState } from "react";

export default function Settings() {
  const user = JSON.parse(localStorage.getItem("mahasetu_user") || "{}");
  const [notif, setNotif] = useState(user.notificationsEnabled ?? true);
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("mahasetu_token");

  const handleSave = async () => {
    try {
      const res = await fetch("https://maha-setu-backend.onrender.com/api/user/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ notificationsEnabled: notif }),
      });
      if (res.ok) {
        user.notificationsEnabled = notif;
        localStorage.setItem("mahasetu_user", JSON.stringify(user));
        setStatus("Settings saved successfully!");
        setTimeout(() => setStatus(""), 3000);
      }
    } catch (err) {
      setStatus("Error saving preferences");
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Portal Settings</h1>
        <p className="text-xs text-slate-500 mt-1">User profile and notification configuration</p>
      </div>

      <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6 text-xs text-slate-700">
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-3">Citizen Profile</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Legal Name</label>
              <input type="text" readOnly value={user.name || "Rahul Ramesh Deshmukh"} className="w-full bg-slate-100 p-2 rounded-xl border border-slate-200 font-semibold text-slate-800" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Registered Contact</label>
              <input type="text" readOnly value={user.phone || "+91 98******10"} className="w-full bg-slate-100 p-2 rounded-xl border border-slate-200 font-semibold text-slate-800" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 mb-2">Notifications</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={notif} onChange={() => setNotif(!notif)} className="w-4 h-4 text-blue-900 cursor-pointer" />
            <span>Receive instant SMS alerts via Maharashtra State Gateway (MAHAGOV)</span>
          </label>
        </div>

        {status && <p className="text-emerald-600 font-semibold">{status}</p>}

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button onClick={handleSave} className="bg-[#1b327b] text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-900 cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}