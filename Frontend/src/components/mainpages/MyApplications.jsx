import { useState } from "react";

const allApps = [
  { id: "MH-2026-89421", title: "Income Certificate", dept: "Revenue", date: "02 Sep 2026", status: "Approved" },
  { id: "MH-2026-90214", title: "Shop & Establishment License", dept: "Labour", date: "04 Sep 2026", status: "Pending Payment" },
  { id: "MH-2026-91045", title: "Domicile Certificate", dept: "Revenue", date: "05 Sep 2026", status: "Under Review" },
  { id: "MH-2026-91560", title: "Non-Creamy Layer Certificate", dept: "Social Justice", date: "06 Sep 2026", status: "Action Required" },
  { id: "MH-2026-78119", title: "Water Connection Permission", dept: "Urban Dev", date: "22 Aug 2026", status: "Approved" },
  { id: "MH-2026-74312", title: "Property Tax Mutation", dept: "Municipal Corp", date: "15 Aug 2026", status: "Approved" },
  { id: "MH-2026-69123", title: "Trade License Renewal", dept: "Labour", date: "01 Aug 2026", status: "Rejected" },
];

export default function MyApplications() {
  const [filter, setFilter] = useState("All");

  const list = allApps.filter((item) => (filter === "All" ? true : item.status === filter));

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 overflow-y-auto font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Applications</h1>
          <p className="text-xs text-slate-500 mt-1">Manage and track all 7 filed citizen & business forms</p>
        </div>
        <div className="flex gap-2 bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
          {["All", "Approved", "Under Review", "Pending Payment"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg transition ${
                filter === tab ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md">{item.id}</span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                  item.status === "Approved"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : item.status === "Pending Payment"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : item.status === "Rejected"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }`}
              >
                {item.status}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{item.dept} Department</p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
              <span>Applied: {item.date}</span>
              <button className="text-blue-700 font-semibold hover:underline">Details &rarr;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}