import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPortal() {
  const navigate = useNavigate();
  const token = localStorage.getItem("mahasetu_token");
  const admin = JSON.parse(localStorage.getItem("mahasetu_user") || "{}");

  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, underReview: 0, totalGrievances: 0, totalInquiries: 0 });
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchAdminData = async () => {
    try {
      const [appRes, statRes, inqRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/applications", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/analytics", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/contact-messages", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (appRes.ok) setApplications(await appRes.json());
      if (statRes.ok) setStats(await statRes.json());
      if (inqRes.ok) setInquiries(await inqRes.json());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleUpdateStatus = async (appId, newStatus, newStage) => {
    setUpdating(true);
    try {
      const res = await fetch(`http://localhost:5000/api/admin/applications/${appId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus, stage: newStage }),
      });

      if (res.ok) {
        await fetchAdminData();
        setSelectedApp(null);
      }
    } catch (err) {
      alert("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mahasetu_token");
    localStorage.removeItem("mahasetu_user");
    navigate("/");
  };

  const filtered = applications.filter((app) => {
    const matches =
      app.appId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.service.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === "All") return matches;
    return matches && app.status === statusFilter;
  });

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between p-5 shrink-0">
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-rose-500 rounded-full animate-ping"></span>
              <h2 className="font-bold text-base tracking-wider uppercase">MAHA-ADMIN</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">Official Desk • {admin.department || "Revenue & Forest"}</p>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => setActiveTab("applications")}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                activeTab === "applications" ? "bg-blue-800 text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              Verification Queue
            </button>
            <button
              onClick={() => setActiveTab("inquiries")}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                activeTab === "inquiries" ? "bg-blue-800 text-white" : "text-slate-400 hover:bg-slate-800"
              }`}
            >
              Support Helpdesk Tickets ({inquiries.length})
            </button>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-1">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-2">Officer Info</div>
            <p className="text-sm font-semibold">{admin.name || "Designated Officer"}</p>
            <p className="text-xs text-slate-400">Desk ID: {admin.employeeId || "MH-GOV-991"}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {activeTab === "applications" ? "Scrutiny & RTS Approval Desk" : "Helpdesk Inquiries"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Maharashtra Right to Public Services Act (RTS 2015) Workstream
          </p>
        </div>

        {/* Analytics Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Files</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.total}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-amber-600 uppercase">Under Review</p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">{stats.underReview}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-emerald-600 uppercase">Approved</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">{stats.approved}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-blue-600 uppercase">Support Inquiries</p>
            <h3 className="text-2xl font-bold text-blue-600 mt-1">{stats.totalInquiries || inquiries.length}</h3>
          </div>
        </div>

        {/* TAB 1: Applications Queue */}
        {activeTab === "applications" && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
              <h2 className="text-base font-bold text-slate-800">Pending Review Queue</h2>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Search Applicant or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium">
                  {["All", "Under Review", "Approved", "Payment Pending"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setStatusFilter(tab)}
                      className={`px-3 py-1.5 rounded-lg transition ${
                        statusFilter === tab ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-500"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100 uppercase">
                  <tr>
                    <th className="py-3 px-4">Application ID</th>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.length > 0 ? (
                    filtered.map((item) => (
                      <tr key={item.appId} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{item.appId}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{item.applicant}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-slate-800">{item.service}</div>
                          <div className="text-[10px] text-slate-400">{item.dept}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{item.stage}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full border ${
                              item.status === "Approved"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : item.status === "Payment Pending"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedApp(item)}
                            className="bg-blue-900 hover:bg-blue-800 text-white px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Review File &rarr;
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-400">
                        No files matching current criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Contact Support Inquiries */}
        {activeTab === "inquiries" && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800">Direct Citizen Inquiries (Help & Support Form)</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {inquiries.length > 0 ? (
                inquiries.map((msg) => (
                  <div key={msg._id} className="p-4 space-y-2 hover:bg-slate-50 transition">
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{msg.name}</span>
                        <span className="text-slate-400">&bull;</span>
                        <span className="text-blue-600">{msg.email}</span>
                      </div>
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-semibold">
                        {msg.ticketId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      {msg.message}
                    </p>
                    <p className="text-[10px] text-slate-400">Received: {new Date(msg.createdAt).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-slate-400 text-xs">No inquiries logged yet.</div>
              )}
            </div>
          </div>
        )}

        {/* Scrutiny Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-sm">Official Desk: {selectedApp.appId}</h3>
                <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 font-bold">
                  ✕
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl">
                  <div>
                    <span className="text-slate-400 block font-semibold">Citizen / Applicant</span>
                    <span className="text-slate-800 font-bold text-sm">{selectedApp.applicant}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Service</span>
                    <span className="text-slate-800 font-bold text-sm">{selectedApp.service}</span>
                  </div>
                </div>

                <div className="border border-slate-200 p-3 rounded-xl space-y-1">
                  <span className="font-semibold text-slate-700 block mb-1">Verification Status:</span>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <span>✓</span> Verified identity proofs via DigiLocker / MeriPehchan
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <span>✓</span> Verified Land / Revenue Records match
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    disabled={updating}
                    onClick={() =>
                      handleUpdateStatus(selectedApp.appId, "Under Review", "Additional Document Scrutiny Required")
                    }
                    className="bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-xl font-bold cursor-pointer transition"
                  >
                    Flag For Inquiry
                  </button>
                  <button
                    disabled={updating}
                    onClick={() =>
                      handleUpdateStatus(selectedApp.appId, "Approved", "Digitally Signed Certificate Issued")
                    }
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold cursor-pointer transition"
                  >
                    Digitally Sign & Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}