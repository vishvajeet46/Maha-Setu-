import { useState } from "react";

const availableServices = [
  { id: "s1", title: "Income Certificate", dept: "Revenue and Forest Department", days: "7 Days", fee: 53 },
  { id: "s2", title: "Domicile & Nationality Certificate", dept: "Revenue and Forest Department", days: "15 Days", fee: 53 },
  { id: "s3", title: "Caste Certificate", dept: "Social Justice Department", days: "21 Days", fee: 53 },
  { id: "s4", title: "Non-Creamy Layer (NCL) Certificate", dept: "Social Justice Department", days: "21 Days", fee: 53 },
  { id: "s5", title: "Shop & Establishment (Gumasta License)", dept: "Labour Department", days: "1 Day", fee: 450 },
  { id: "s6", title: "Trade License Renewal", dept: "Labour Department", days: "3 Days", fee: 200 },
  { id: "s7", title: "Disability Welfare Assistance", dept: "Public Health Department", days: "10 Days", fee: 0 },
  { id: "s8", title: "Shetkari Krishi Yojana Assistance", dept: "Agriculture Department", days: "12 Days", fee: 0 },
];

export default function Dashboard({ applications = [], onRefresh, setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("mahasetu_token");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleApply = async (srv) => {
    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          service: srv.title,
          dept: srv.dept,
          fee: srv.fee,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit application");

      setIsApplyModalOpen(false);
      triggerToast(`Application submitted! Reference ID: ${data.appId}`);

      if (onRefresh) {
        await onRefresh();
      }
    } catch (err) {
      triggerToast(err.message || "Network error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = applications.filter((app) => {
    const matches =
      app.service?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.appId?.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "Pending") return matches && app.status === "Payment Pending";
    if (selectedFilter === "Approved") return matches && app.status === "Approved";
    return matches;
  });

  const totalDues = applications.reduce((sum, item) => sum + (item.amountDue || 0), 0);

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 overflow-y-auto font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-sm flex items-center gap-2 border border-slate-700 animate-bounce">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Citizen & Business Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time tracking for official Maharashtra Government e-Services.</p>
        </div>
        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#1b327b] hover:bg-[#142661] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer shadow-sm"
        >
          <span>+</span>
          <span>Apply New Service</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Applications</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{applications.length}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Under Review</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {applications.filter((a) => a.status === "Under Review").length}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Approved</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {applications.filter((a) => a.status === "Approved").length}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Dues</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">₹{totalDues}</h3>
        </div>
      </div>

      {/* Applications Table Section */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-800 self-start md:self-auto">Recent Applications</h2>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium">
              {["All", "Pending", "Approved"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    selectedFilter === filter ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-500"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.appId} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {item.appId}
                      <div className="text-[10px] text-slate-400 font-normal">{item.appliedDate}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{item.service}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.dept}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.stage}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${
                          item.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.status === "Payment Pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : item.status === "Rejected"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {item.status === "Payment Pending" ? (
                        <button
                          onClick={() => setActiveTab && setActiveTab("Payment")}
                          className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Pay ₹{item.amountDue}
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTab && setActiveTab("My Applications")}
                          className="px-2.5 py-1 text-blue-900 font-bold bg-blue-50 hover:bg-blue-100 rounded-lg text-xs cursor-pointer"
                        >
                          View File
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No records found. Click "Apply New Service" above to start an application.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">Official Maharashtra State Services</h3>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-base cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
              {availableServices.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => !submitting && handleApply(srv)}
                  className="p-3 border border-slate-200 rounded-xl hover:border-[#1b327b] hover:bg-blue-50/40 transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{srv.title}</p>
                    <p className="text-[11px] text-blue-900 font-medium">{srv.dept}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">RTS SLA: {srv.days}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                    {srv.fee > 0 ? `₹${srv.fee}` : "Free"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}