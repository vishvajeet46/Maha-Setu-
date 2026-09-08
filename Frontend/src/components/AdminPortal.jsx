import { useState, useEffect, useId } from "react";
import { useNavigate } from "react-router-dom";

const departmentConfig = {
  "Revenue and Forest Department": {
    badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    theme: "from-slate-900 via-slate-900 to-amber-950",
    activeTabClass: "bg-amber-600/30 text-amber-300 border-l-4 border-amber-400 font-semibold",
    guidelines: "Verify Satbara 7/12 extracts against DigiLocker and MahaBhulekh records. Verify pre-1967 ancestral lineage for Domicile files.",
    checklistItems: ["Lineage validation via Pre-1967 registry", "7/12 Land extract verification", "Affidavit & Talathi Endorsement"],
  },
  "Labour Department": {
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    theme: "from-slate-900 via-slate-900 to-blue-950",
    activeTabClass: "bg-blue-600/30 text-blue-300 border-l-4 border-blue-400 font-semibold",
    guidelines: "Audit Shop and Commercial Establishment (Gumasta) partner lists, business premise NOC, and employee census.",
    checklistItems: ["Commercial premise rent/ownership proof", "Fire safety self-certification", "Employee roster audit"],
  },
  "Social Justice Department": {
    badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    theme: "from-slate-900 via-slate-900 to-purple-950",
    activeTabClass: "bg-purple-600/30 text-purple-300 border-l-4 border-purple-400 font-semibold",
    guidelines: "Examine Caste and Non-Creamy Layer (NCL) verification against verified state genealogy registers and SDPO inquiries.",
    checklistItems: ["Vanshavali (Genealogy Family Tree)", "School leaving certificate check", "Annual family income threshold check"],
  },
  "Public Health Department": {
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    theme: "from-slate-900 via-slate-900 to-emerald-950",
    activeTabClass: "bg-emerald-600/30 text-emerald-300 border-l-4 border-emerald-400 font-semibold",
    guidelines: "Examine public welfare registrations, medical disability claims, and health scheme eligibility credentials.",
    checklistItems: ["Civil surgeon disability certificate", "State health card validation", "Income verification certificate"],
  },
  "Agriculture Department": {
    badgeColor: "bg-lime-100 text-lime-800 border-lime-300",
    theme: "from-slate-900 via-slate-900 to-lime-950",
    activeTabClass: "bg-lime-600/30 text-lime-300 border-l-4 border-lime-400 font-semibold",
    guidelines: "Verify DBT subsidy requests, PM-Kisan state top-ups, and digital crop survey (e-Pik Pahani) extracts.",
    checklistItems: ["8A Khatedar holding extract", "e-Pik crop sowing validation", "Bank Aadhaar-linkage confirmation"],
  },
};

export default function AdminPortal() {
  const navigate = useNavigate();
  const token = localStorage.getItem("mahasetu_token");
  const admin = JSON.parse(localStorage.getItem("mahasetu_user") || "{}");

  const [activeTab, setActiveTab] = useState("queue");
  const [applications, setApplications] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [metrics, setMetrics] = useState({ total: 0, approved: 0, underReview: 0, rejected: 0, actionRequired: 0 });
  const [selectedApp, setSelectedApp] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [processing, setProcessing] = useState(false);

  // Scrutiny Modal Fields
  const [checklist, setChecklist] = useState({ identityVerified: false, registryMatch: false, affidavitValid: false });
  const [remarks, setRemarks] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const identityId = useId();
  const registryId = useId();
  const affidavitId = useId();

  const deptMeta = departmentConfig[admin.department] || {
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    theme: "from-slate-900 via-slate-900 to-blue-950",
    activeTabClass: "bg-blue-600/30 text-blue-300 border-l-4 border-blue-400 font-semibold",
    guidelines: "General administrative desk scrutiny under Maharashtra Right to Public Services Act (RTS 2015).",
    checklistItems: ["Citizen identity check", "Registry cross-match", "Competent authority endorsement"],
  };

  const loadData = async () => {
    try {
      const [appRes, metRes, inqRes, logRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/department/applications", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/department/metrics", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/department/inquiries", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/audit-logs", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (appRes.ok) setApplications(await appRes.json());
      if (metRes.ok) setMetrics(await metRes.json());
      if (inqRes.ok) setInquiries(await inqRes.json());
      if (logRes.ok) setAuditLogs(await logRes.json());
    } catch (err) {
      console.error("Error loading administrative records:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openReviewModal = (app) => {
    setSelectedApp(app);
    setChecklist(app.checklistVerified || { identityVerified: false, registryMatch: false, affidavitValid: false });
    setRemarks(app.officialRemarks || "");
    setRejectionReason(app.rejectionReason || "");
  };

  const handleReviewDecision = async (newStatus, newStage) => {
    if (newStatus === "Rejected" && !rejectionReason.trim()) {
      alert("Please state the statutory ground for rejection before returning this file.");
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch(`http://localhost:5000/api/admin/department/review/${selectedApp.appId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
          stage: newStage,
          officialRemarks: remarks,
          rejectionReason,
          checklist,
        }),
      });

      if (res.ok) {
        await fetch("http://localhost:5000/api/admin/audit-logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            action: `File ${newStatus.toUpperCase()}`,
            targetAppId: selectedApp.appId,
            details: remarks || `Status marked as ${newStatus}`,
          }),
        });

        await loadData();
        setSelectedApp(null);
      }
    } catch (err) {
      alert("Error saving review decision.");
    } finally {
      setProcessing(false);
    }
  };

  const handleResolveTicket = async (ticketId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/inquiries/${ticketId}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) await loadData();
    } catch (err) {
      console.error(err);
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
      <aside className={`w-72 bg-gradient-to-b ${deptMeta.theme} text-white flex flex-col justify-between p-5 shrink-0 select-none shadow-xl`}>
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-black uppercase tracking-widest text-emerald-400">MAHA-ADMIN DESK</span>
            </div>
            <h2 className="font-bold text-base leading-tight mt-1.5 text-white">{admin.department || "State Administration"}</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Government of Maharashtra</p>
          </div>

          <nav className="space-y-1.5 text-xs">
            <button
              onClick={() => setActiveTab("queue")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition ${
                activeTab === "queue" ? deptMeta.activeTabClass : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <span>Verification Queue</span>
              <span className="bg-white/15 px-2 py-0.5 rounded-full text-[10px] font-bold">{applications.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("helpdesk")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition ${
                activeTab === "helpdesk" ? deptMeta.activeTabClass : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <span>Citizen Inquiries</span>
              <span className="bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full text-[10px] font-bold">{inquiries.length}</span>
            </button>

            <button
              onClick={() => setActiveTab("guidelines")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition ${
                activeTab === "guidelines" ? deptMeta.activeTabClass : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <span>Department Guidelines</span>
            </button>

            <button
              onClick={() => setActiveTab("audit")}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition ${
                activeTab === "audit" ? deptMeta.activeTabClass : "text-slate-300 hover:bg-white/10"
              }`}
            >
              <span>Security Audit Logs</span>
            </button>
          </nav>

          <div className="pt-4 border-t border-white/10 space-y-1 text-xs">
            <p className="uppercase text-[10px] tracking-wider text-slate-400 font-bold">Officer on Duty</p>
            <p className="font-bold text-white text-sm">{admin.name}</p>
            <p className="text-slate-400 font-mono text-[11px]">Desk ID: {admin.employeeId}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-xs font-bold transition cursor-pointer shadow-md"
        >
          Sign Out of Mantralaya Gateway
        </button>
      </aside>

      {/* Main Administrative Console */}
      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-800">Scrutiny & RTS Approval Desk</h1>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${deptMeta.badgeColor}`}>
                {admin.department}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Statutory verification under the Maharashtra Right to Public Services Act (RTS 2015)
            </p>
          </div>

          <button
            onClick={loadData}
            className="self-start sm:self-auto bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs cursor-pointer"
          >
            ↻ Refresh Queue
          </button>
        </div>

        {/* Analytics Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-slate-400 uppercase">Department Files</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{applications.length}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-amber-600 uppercase">Under Review</p>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">{metrics.underReview}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-emerald-600 uppercase">Approved & Issued</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">{metrics.approved}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-rose-600 uppercase">Rejected</p>
            <h3 className="text-2xl font-bold text-rose-600 mt-1">{metrics.rejected}</h3>
          </div>
        </div>

        {/* TAB 1: Live Verification Queue */}
        {activeTab === "queue" && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
              <h2 className="text-base font-bold text-slate-800">Assigned Department Files</h2>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Search Applicant or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
                <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium">
                  {["All", "Under Review", "Approved", "Payment Pending", "Rejected"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setStatusFilter(tab)}
                      className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
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
                    <th className="py-3 px-4">Requested Service</th>
                    <th className="py-3 px-4">Current Stage</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Desk Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.length > 0 ? (
                    filtered.map((item) => (
                      <tr key={item.appId} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {item.appId}
                          <div className="text-[10px] text-slate-400 font-normal">Date: {item.appliedDate}</div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{item.applicant}</td>
                        <td className="py-3.5 px-4 font-medium text-slate-800">{item.service}</td>
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
                          <button
                            onClick={() => openReviewModal(item)}
                            className="bg-blue-900 hover:bg-blue-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
                          >
                            Review File &rarr;
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-slate-400">
                        No applications currently waiting for action under {admin.department}.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Support Inquiries */}
        {activeTab === "helpdesk" && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-800">Citizen Inquiries & Grievance Tickets</h2>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              {inquiries.length > 0 ? (
                inquiries.map((inq) => (
                  <div key={inq._id} className="p-4 space-y-2 hover:bg-slate-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-900">{inq.name}</span>
                        <span className="text-slate-400 mx-1.5">&bull;</span>
                        <span className="text-blue-600 font-medium">{inq.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono text-[11px]">
                          {inq.ticketId}
                        </span>
                        {inq.status !== "Resolved" ? (
                          <button
                            onClick={() => handleResolveTicket(inq.ticketId)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-0.5 rounded font-bold cursor-pointer"
                          >
                            Mark Resolved
                          </button>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold text-[10px]">
                            Resolved
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">{inq.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-slate-400">No support tickets found.</p>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Department Guidelines */}
        {activeTab === "guidelines" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-800">Department Scrutiny Manual: {admin.department}</h2>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed">
              {deptMeta.guidelines}
            </div>
            <div className="space-y-2 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-500">Mandatory Verification Criteria</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                {deptMeta.checklistItems.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: Audit Logs */}
        {activeTab === "audit" && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-sm font-bold text-slate-800">Official Decision Audit Trail</h2>
            </div>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left text-slate-600">
                <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100 uppercase">
                  <tr>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Officer Desk ID</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Application Reference</th>
                    <th className="py-3 px-4">Official Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLogs.length > 0 ? (
                    auditLogs.map((log) => (
                      <tr key={log._id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 text-slate-400">{new Date(log.timestamp).toLocaleString()}</td>
                        <td className="py-3 px-4 font-bold text-slate-800">{log.employeeId}</td>
                        <td className="py-3 px-4 font-semibold text-blue-900">{log.action}</td>
                        <td className="py-3 px-4 font-mono">{log.targetAppId}</td>
                        <td className="py-3 px-4 text-slate-600">{log.details}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-slate-400">No actions recorded in audit log yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Interactive Scrutiny Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col font-sans">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div>
                  <span className="text-[10px] font-bold text-blue-900 uppercase">Statutory Review Desk</span>
                  <h3 className="font-bold text-slate-800 text-sm">File: {selectedApp.appId}</h3>
                </div>
                <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer">
                  ✕
                </button>
              </div>

              <div className="p-5 overflow-y-auto space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block font-semibold">Applicant</span>
                    <span className="text-slate-800 font-bold text-sm">{selectedApp.applicant}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-semibold">Service</span>
                    <span className="text-slate-800 font-bold text-sm">{selectedApp.service}</span>
                  </div>
                </div>

                <div className="border border-slate-200 p-3.5 rounded-xl space-y-2.5">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wide">Statutory Verification Checklist</h4>
                  <label htmlFor={identityId} className="flex items-center gap-2 cursor-pointer">
                    <input
                      id={identityId}
                      type="checkbox"
                      checked={checklist.identityVerified}
                      onChange={(e) => setChecklist({ ...checklist, identityVerified: e.target.checked })}
                      className="w-4 h-4 text-blue-900 cursor-pointer"
                    />
                    <span>Proof of Identity & Address authenticated via verified state records</span>
                  </label>
                  <label htmlFor={registryId} className="flex items-center gap-2 cursor-pointer">
                    <input
                      id={registryId}
                      type="checkbox"
                      checked={checklist.registryMatch}
                      onChange={(e) => setChecklist({ ...checklist, registryMatch: e.target.checked })}
                      className="w-4 h-4 text-blue-900 cursor-pointer"
                    />
                    <span>Departmental record & registry match cross-verified</span>
                  </label>
                  <label htmlFor={affidavitId} className="flex items-center gap-2 cursor-pointer">
                    <input
                      id={affidavitId}
                      type="checkbox"
                      checked={checklist.affidavitValid}
                      onChange={(e) => setChecklist({ ...checklist, affidavitValid: e.target.checked })}
                      className="w-4 h-4 text-blue-900 cursor-pointer"
                    />
                    <span>Self-Declaration & Legal Undertaking on record</span>
                  </label>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Desk Remarks</label>
                  <textarea
                    rows="2"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Enter compliance details or officer observations..."
                    className="w-full border border-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-blue-900"
                  ></textarea>
                </div>

                <div>
                  <label className="block font-semibold text-rose-700 mb-1">Rejection Ground (if returning file)</label>
                  <input
                    type="text"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="State reason for rejection..."
                    className="w-full border border-rose-200 bg-rose-50/50 rounded-xl p-2.5 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    disabled={processing}
                    onClick={() => handleReviewDecision("Rejected", "File Defective - Returned to Applicant")}
                    className="bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-xl font-bold cursor-pointer transition"
                  >
                    Reject File
                  </button>
                  <button
                    disabled={processing}
                    onClick={() => handleReviewDecision("Action Required", "Additional Scrutiny / Inquiry Required")}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 rounded-xl font-bold cursor-pointer transition"
                  >
                    Flag Query
                  </button>
                  <button
                    disabled={processing}
                    onClick={() => handleReviewDecision("Approved", "Certificate Issued & Digitally Signed")}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold cursor-pointer transition shadow-sm"
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