import { useState, useEffect } from "react";

export default function Status({ applications = [] }) {
  const [appId, setAppId] = useState("");
  const [trackedRecord, setTrackedRecord] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (applications.length > 0 && !appId) {
      setAppId(applications[0].appId);
      setTrackedRecord(applications[0]);
    }
  }, [applications]);

  const handleTrack = async () => {
    if (!appId.trim()) return;
    setError("");

    const localMatch = applications.find(
      (a) => a.appId.toLowerCase() === appId.trim().toLowerCase()
    );

    if (localMatch) {
      setTrackedRecord(localMatch);
      return;
    }

    try {
      const res = await fetch(`https://maha-setu-backend.onrender.com/api/tracking/${appId.trim()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Application not found");
      setTrackedRecord(data);
    } catch (err) {
      setError(err.message || "Invalid Token / Application ID");
      setTrackedRecord(null);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Application Tracking (RTS)</h1>
        <p className="text-xs text-slate-500 mt-1">
          Right to Public Services Act (RTS 2015) Status verification
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs max-w-2xl space-y-4">
        <label className="text-xs font-semibold text-slate-600 block">
          Enter MahaSetu Application ID
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            placeholder="e.g. MH-2026-89421"
            className="flex-1 text-sm border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-900"
          />
          <button
            onClick={handleTrack}
            className="bg-[#1b327b] text-white text-xs font-bold px-5 py-2 rounded-xl hover:bg-blue-900 cursor-pointer"
          >
            Track
          </button>
        </div>

        {error && <p className="text-xs text-rose-600 font-semibold">{error}</p>}

        {trackedRecord && (
          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">
                Service: {trackedRecord.service} ({trackedRecord.dept})
              </span>
              <span
                className={`font-bold px-2.5 py-0.5 rounded-full border ${
                  trackedRecord.status === "Approved"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : trackedRecord.status === "Payment Pending"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : trackedRecord.status === "Rejected"
                    ? "bg-rose-50 text-rose-700 border-rose-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }`}
              >
                {trackedRecord.status}
              </span>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-5 pl-3 border-l-2 border-blue-600">
              <div className="relative">
                <span className="absolute -left-[19px] top-1 w-3 h-3 bg-blue-600 rounded-full"></span>
                <p className="text-xs font-bold text-slate-800">Form Submitted Online</p>
                <p className="text-[11px] text-slate-400">Date: {trackedRecord.appliedDate}</p>
              </div>

              <div className="relative">
                <span
                  className={`absolute -left-[19px] top-1 w-3 h-3 rounded-full ${
                    trackedRecord.status === "Approved"
                      ? "bg-emerald-600"
                      : trackedRecord.status === "Rejected"
                      ? "bg-rose-600"
                      : "bg-amber-500"
                  }`}
                ></span>
                <p className="text-xs font-bold text-slate-800">Department Review Stage</p>
                <p className="text-[11px] text-slate-600 font-semibold">{trackedRecord.stage}</p>

                {trackedRecord.officialRemarks && (
                  <p className="text-[11px] text-slate-500 italic mt-0.5">
                    Note: {trackedRecord.officialRemarks}
                  </p>
                )}
              </div>

              {trackedRecord.status === "Rejected" && (
                <div className="relative">
                  <span className="absolute -left-[19px] top-1 w-3 h-3 bg-rose-600 rounded-full"></span>
                  <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl space-y-1">
                    <p className="text-xs font-bold text-rose-800">Application Rejected & Returned</p>
                    <p className="text-xs text-rose-700">
                      <strong>Reason: </strong>
                      {trackedRecord.rejectionReason || "Requirements not fulfilled under state guidelines."}
                    </p>
                    <p className="text-[10px] text-rose-500 mt-1">
                      You may submit a fresh application or appeal via the Grievance Helpdesk.
                    </p>
                  </div>
                </div>
              )}

              {trackedRecord.status === "Approved" && (
                <div className="relative">
                  <span className="absolute -left-[19px] top-1 w-3 h-3 bg-emerald-600 rounded-full"></span>
                  <p className="text-xs font-bold text-emerald-700">Digitally Signed & Dispatched</p>
                  <p className="text-[11px] text-slate-400">Valid under IT Act 2000</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}