import { useState } from "react";

export default function Status() {
  const [appId, setAppId] = useState("MH-2026-91045");
  const [searched, setSearched] = useState(true);

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Application Tracking (RTS)</h1>
        <p className="text-xs text-slate-500 mt-1">
          Right to Public Services Act (RTS) 2015 Status verification
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs max-w-2xl space-y-4">
        <label className="text-xs font-semibold text-slate-600 block">Enter 13-digit MahaSetu Token / Application ID</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            placeholder="e.g. MH-2026-91045"
            className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-900"
          />
          <button
            onClick={() => setSearched(true)}
            className="bg-[#1b327b] text-white text-xs font-bold px-5 py-2 rounded-xl hover:bg-blue-900"
          >
            Track
          </button>
        </div>

        {searched && (
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-500">Service: Domicile Certificate</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">In Time Limit (Within 15 Days)</span>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-4 pl-3 border-l-2 border-blue-600">
              <div className="relative">
                <span className="absolute -left-[19px] top-1 w-3 h-3 bg-blue-600 rounded-full"></span>
                <p className="text-xs font-bold text-slate-800">Form Submitted Online</p>
                <p className="text-[11px] text-slate-400">05 Sep 2026, 11:30 AM</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[19px] top-1 w-3 h-3 bg-blue-600 rounded-full"></span>
                <p className="text-xs font-bold text-slate-800">Tehsildar Desk Scrutiny</p>
                <p className="text-[11px] text-emerald-600 font-semibold">Under Progress (Talathi Office, Pune)</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[19px] top-1 w-3 h-3 bg-slate-300 rounded-full"></span>
                <p className="text-xs font-medium text-slate-400">Digital Signature by Sub-Divisional Officer</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}