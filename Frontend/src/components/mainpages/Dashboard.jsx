import { useState } from "react";

const initialApplications = [
  {
    id: "MH-2026-89421",
    service: "Income Certificate (Revenue Dept)",
    applicant: "Rahul Deshmukh",
    appliedDate: "02 Sep 2026",
    status: "Approved",
    amountDue: 0,
    stage: "Digitally Signed Certificate Issued",
  },
  {
    id: "MH-2026-90214",
    service: "Shop & Establishment (Gumasta License)",
    applicant: "Deshmukh Agro Trade",
    appliedDate: "04 Sep 2026",
    status: "Payment Pending",
    amountDue: 450,
    stage: "Awaiting Fee Payment",
  },
  {
    id: "MH-2026-91045",
    service: "Domicile & Nationality Certificate",
    applicant: "Rahul Deshmukh",
    appliedDate: "05 Sep 2026",
    status: "Under Review",
    amountDue: 0,
    stage: "Document Verification at Tehsil",
  },
  {
    id: "MH-2026-91560",
    service: "Non-Creamy Layer Certificate",
    applicant: "Rahul Deshmukh",
    appliedDate: "06 Sep 2026",
    status: "Payment Pending",
    amountDue: 1200,
    stage: "Awaiting Payment of Verification Fee",
  },
];

const availableServices = [
  { id: "s1", title: "Income Certificate", dept: "Revenue Department", days: "7 Days", fee: "53" },
  { id: "s2", title: "Caste Certificate", dept: "Social Justice Dept", days: "21 Days", fee: "53" },
  { id: "s3", title: "Shop Act Registration", dept: "Labour Department", days: "1 Day", fee: "450" },
  { id: "s4", title: "Domicile Certificate", dept: "Revenue Department", days: "15 Days", fee: "53" },
];

export default function Dashboard() {
  const [applications, setApplications] = useState(initialApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handlePay = (appId) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, status: "Under Review", amountDue: 0, stage: "Payment Successful - Processing" }
          : app
      )
    );
    triggerToast("Payment successful for " + appId);
  };

  const handleApply = (serviceTitle) => {
    const newId = "MH-2026-" + Date.now().toString().slice(-5);

    const newRecord = {
      id: newId,
      service: serviceTitle,
      applicant: "Rahul Deshmukh",
      appliedDate: "Today",
      status: "Under Review",
      amountDue: 0,
      stage: "Submitted - Verification Pending",
    };

    setApplications([newRecord, ...applications]);
    setIsApplyModalOpen(false);
    triggerToast("Applied for " + serviceTitle + "! ID: " + newId);
  };

  const filtered = applications.filter((app) => {
    const matches =
      app.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "Pending") return matches && app.status === "Payment Pending";
    if (selectedFilter === "Approved") return matches && app.status === "Approved";
    return matches;
  });

  const totalDues = applications.reduce((sum, item) => sum + item.amountDue, 0);

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 overflow-y-auto font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-sm flex items-center gap-2 border border-slate-700">
          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Citizen & Business Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time tracking for official Maharashtra Government e-Services.
          </p>
        </div>
        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#1b327b] hover:bg-[#142661] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm"
        >
          <span>+</span>
          <span>Apply New Service</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Applications</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{applications.length}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Under Review</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {applications.filter((a) => a.status === "Under Review").length}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Approved</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {applications.filter((a) => a.status === "Approved").length}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Dues</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">₹{totalDues}</h3>
        </div>
      </div>

      {/* Applications Table Section */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Search & Filter Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-800 self-start md:self-auto">Recent Applications</h2>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1b327b]/20"
            />
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium">
              {["All", "Pending", "Approved"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={
                    "px-3 py-1.5 rounded-lg transition " +
                    (selectedFilter === filter
                      ? "bg-white text-slate-900 shadow-sm font-semibold"
                      : "text-slate-500 hover:text-slate-800")
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {item.id}
                      <div className="text-[10px] text-slate-400 font-normal">{item.appliedDate}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{item.service}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.stage}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={
                          "inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full border " +
                          (item.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.status === "Payment Pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-blue-50 text-blue-700 border-blue-200")
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === "Payment Pending" && (
                          <button
                            onClick={() => handlePay(item.id)}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-lg text-xs font-semibold"
                          >
                            Pay ₹{item.amountDue}
                          </button>
                        )}
                        {item.status === "Approved" && (
                          <button
                            onClick={() => triggerToast("Downloading " + item.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-xs font-semibold"
                          >
                            Download
                          </button>
                        )}
                        <button
                          onClick={() => triggerToast("Viewing details for " + item.id)}
                          className="px-2.5 py-1 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">Apply for Citizen Services</h3>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-base"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2">
              {availableServices.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => handleApply(srv.title)}
                  className="p-3 border border-slate-200 rounded-xl hover:border-[#1b327b] hover:bg-blue-50/30 transition cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{srv.title}</p>
                    <p className="text-[11px] text-slate-400">{srv.dept} • {srv.days}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md">
                    ₹{srv.fee}
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