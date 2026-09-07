import { useState } from "react";

export default function Support() {
  const [ticketSent, setTicketSent] = useState(false);

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Citizen Grievance & Helpdesk</h1>
        <p className="text-xs text-slate-500 mt-1">24x7 Maha-Setu Assistance & Aaple Sarkar Support</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-800">Lodge an Electronic Grievance</h2>
          {ticketSent ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold">
              Grievance ticket #TKT-8842 created. An officer will resolve this within 48 hours.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTicketSent(true);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Issue Category</label>
                <select className="w-full border border-slate-200 rounded-xl p-2.5">
                  <option>Payment Gateway Deduction without Receipt</option>
                  <option>Document Upload & Format Error</option>
                  <option>Delay beyond RTS Timeline</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Describe Problem</label>
                <textarea rows="4" className="w-full border border-slate-200 rounded-xl p-2.5" placeholder="Explain the error in detail..." required></textarea>
              </div>
              <button type="submit" className="bg-[#1b327b] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-900">
                Submit Grievance
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Toll Free Helpline</h3>
            <p className="text-lg font-black text-blue-900 mt-1">1800-120-8040</p>
            <p className="text-[11px] text-slate-400 mt-1">Operational 24x7 in Marathi, Hindi & English</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Helpdesk Email</h3>
            <p className="text-sm font-semibold text-blue-900 mt-1">support@mahasetu.gov.in</p>
          </div>
        </div>
      </div>
    </div>
  );
}