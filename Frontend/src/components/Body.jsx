import { useState } from "react";
import Login from "./Login";
import HeroVisual from "./HeroVisual";

export default function Body() {
  const [quickTrackId, setQuickTrackId] = useState("");
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState("");
  const [tracking, setTracking] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [defaultAuthRole, setDefaultAuthRole] = useState("user");

  const handleQuickTrack = async (e) => {
    e.preventDefault();
    if (!quickTrackId.trim()) return;

    setTracking(true);
    setTrackError("");
    setTrackResult(null);

    try {
      const res = await fetch(`http://localhost:5000/api/tracking/${quickTrackId.trim()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Application token not found.");
      setTrackResult(data);
    } catch (err) {
      setTrackError(err.message || "Token unrecognized in state records.");
    } finally {
      setTracking(false);
    }
  };

  const openPortalLogin = (role) => {
    setDefaultAuthRole(role);
    setShowAuthModal(true);
  };

  return (
    <div className="w-full space-y-14 pb-16 font-sans bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="px-4 md:px-10 pt-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            
            {/* National Compliance Pill */}
            <div className="inline-flex items-center gap-2 bg-blue-50/80 border border-blue-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0c235a] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>National Enterprise Architecture (IndEA 2.0) Framework</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0a1840] tracking-tight leading-[1.15]">
              One Unified Gateway. <br />
              <span className="text-[#102a6b]">All Maharashtra State Services.</span>
            </h1>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl font-normal">
              Access social welfare schemes, revenue certificates, and commercial business licenses with guaranteed service delivery under the Maharashtra Right to Public Services Act (RTS 2015).
            </p>

            {/* Quick RTS Tracker Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-sm space-y-2.5 max-w-xl">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-500 block">
                Quick RTS Application Tracker (No Login Required)
              </span>
              <form onSubmit={handleQuickTrack} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Enter Application ID (e.g. MH-215804-1111)"
                  value={quickTrackId}
                  onChange={(e) => setQuickTrackId(e.target.value)}
                  className="flex-1 text-xs border border-slate-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#102a6b] bg-slate-50/50 focus:bg-white transition"
                />
                <button
                  type="submit"
                  disabled={tracking}
                  className="bg-[#0f2868] hover:bg-[#0b1c48] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition cursor-pointer shadow-xs active:scale-98"
                >
                  {tracking ? "Searching..." : "Track RTS Status"}
                </button>
              </form>

              {trackError && <p className="text-xs text-rose-600 font-semibold">{trackError}</p>}

              {trackResult && (
                <div className="mt-3 p-3.5 bg-blue-50/40 border border-blue-100 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#0a1840]">{trackResult.service}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                      {trackResult.status}
                    </span>
                  </div>
                  <p className="text-slate-600"><strong>Applicant:</strong> {trackResult.applicant}</p>
                  <p className="text-slate-600"><strong>Current Stage:</strong> {trackResult.stage}</p>
                </div>
              )}
            </div>

            {/* Dual Gateway Entrance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl pt-1">
              <div
                onClick={() => openPortalLogin("user")}
                className="p-4 border border-blue-200 bg-white hover:border-[#102a6b] hover:shadow-md rounded-2xl cursor-pointer transition shadow-xs group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-lg">
                    👤
                  </div>
                  <span className="text-[#102a6b] font-bold text-xs group-hover:translate-x-1 transition">&rarr;</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-2.5">Citizen & Business Desk</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Apply for 400+ services, store in e-Vault, track approvals.</p>
              </div>

              <div
                onClick={() => openPortalLogin("admin")}
                className="p-4 border border-slate-200 bg-white hover:border-slate-700 hover:shadow-md rounded-2xl cursor-pointer transition shadow-xs group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg">
                    🏛️
                  </div>
                  <span className="text-slate-800 font-bold text-xs group-hover:translate-x-1 transition">&rarr;</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm mt-2.5">Official Mantralaya Desk</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Desk scrutiny, registry cross-verification, digital approval.</p>
              </div>
            </div>
          </div>

          {/* Right Hero Visual */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Live Service Delivery Counter Ribbon */}
      <section className="bg-gradient-to-r from-[#0a1840] via-[#0f2868] to-[#0a1840] text-white py-10 border-y border-slate-800 px-4 md:px-10 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-amber-400">428+</p>
            <p className="text-xs uppercase tracking-wider text-slate-300 font-bold">Notified RTS Services</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-emerald-400">99.2%</p>
            <p className="text-xs uppercase tracking-wider text-slate-300 font-bold">Statutory SLA Compliance</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-blue-300">36 Districts</p>
            <p className="text-xs uppercase tracking-wider text-slate-300 font-bold">Integrated Setu Kendras</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-purple-300">100%</p>
            <p className="text-xs uppercase tracking-wider text-slate-300 font-bold">DPDP Data Privacy</p>
          </div>
        </div>
      </section>

      {/* Participating State Registries */}
      <section className="px-4 md:px-10 max-w-7xl mx-auto space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-[#0a1840]">Connected State Registries</h2>
          <p className="text-xs text-slate-500 font-medium">Direct machine-to-machine integrations with official Maharashtra departmental backends.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 text-xs">
          <div className="p-3.5 bg-white border border-slate-200/90 rounded-2xl text-center space-y-1 shadow-2xs hover:border-amber-400 transition">
            <span className="font-extrabold text-amber-900 block">MahaBhulekh</span>
            <span className="text-[11px] text-slate-500 block">7/12 & 8A Land Extracts</span>
          </div>
          <div className="p-3.5 bg-white border border-slate-200/90 rounded-2xl text-center space-y-1 shadow-2xs hover:border-blue-400 transition">
            <span className="font-extrabold text-blue-900 block">Aaple Sarkar</span>
            <span className="text-[11px] text-slate-500 block">Revenue & Identity Proofs</span>
          </div>
          <div className="p-3.5 bg-white border border-slate-200/90 rounded-2xl text-center space-y-1 shadow-2xs hover:border-emerald-400 transition">
            <span className="font-extrabold text-emerald-900 block">MAITRI Gateway</span>
            <span className="text-[11px] text-slate-500 block">Single Window Business NOCs</span>
          </div>
          <div className="p-3.5 bg-white border border-slate-200/90 rounded-2xl text-center space-y-1 shadow-2xs hover:border-purple-400 transition">
            <span className="font-extrabold text-purple-900 block">e-Pik Pahani</span>
            <span className="text-[11px] text-slate-500 block">Digital Crop Sowing Records</span>
          </div>
          <div className="p-3.5 bg-white border border-slate-200/90 rounded-2xl text-center space-y-1 shadow-2xs hover:border-indigo-400 transition col-span-2 sm:col-span-1">
            <span className="font-extrabold text-indigo-900 block">GRAS Gateway</span>
            <span className="text-[11px] text-slate-500 block">Treasury Electronic Payments</span>
          </div>
        </div>
      </section>

      {/* Embedded Login Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-slate-950/50 p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl p-2 shadow-2xl border border-slate-200">
            <button
              className="text-slate-400 hover:text-slate-700 text-2xl absolute top-3 right-3 z-10 cursor-pointer"
              onClick={() => setShowAuthModal(false)}
            >
              ✕
            </button>
            <Login
              defaultRole={defaultAuthRole}
              onClose={() => setShowAuthModal(false)}
              onLoginSuccess={() => setShowAuthModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}