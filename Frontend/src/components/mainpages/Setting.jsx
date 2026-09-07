import { useState } from "react";

export default function Settings() {
  const [notif, setNotif] = useState(true);

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Portal Settings</h1>
        <p className="text-xs text-slate-500 mt-1">User profile, Aadhaar eKYC linkage, and notification channels</p>
      </div>

      <div className="max-w-2xl bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6 text-xs text-slate-700">
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-3">Citizen Profile</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Full Name</label>
              <input type="text" readOnly value="Rahul Ramesh Deshmukh" className="w-full bg-slate-100 p-2 rounded-xl border border-slate-200 font-semibold text-slate-800" />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Aadhaar Linked Mobile</label>
              <input type="text" readOnly value="+91 98******10" className="w-full bg-slate-100 p-2 rounded-xl border border-slate-200 font-semibold text-slate-800" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 mb-2">Notifications</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={notif} onChange={() => setNotif(!notif)} className="w-4 h-4 text-blue-900" />
            <span>Receive instant SMS alerts via Maharashtra State Gateway (MAHAGOV)</span>
          </label>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button className="bg-[#1b327b] text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-900">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}