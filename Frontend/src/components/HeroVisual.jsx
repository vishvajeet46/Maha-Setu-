export default function HeroVisual() {
  return (
    <div className="relative w-full max-w-md lg:max-w-lg mx-auto select-none">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-indigo-50/60 to-emerald-50 rounded-3xl blur-xl opacity-80 -z-10"></div>

      {/* Glassmorphic Container Panel */}
      <div className="relative bg-white/95 border border-slate-200/90 rounded-3xl p-6 shadow-xl space-y-6">
        
        {/* Top Header Badge Strip */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0b1c48]">
              Data Exchange & Verification Hub
            </span>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono font-bold border border-slate-200">
            IndEA 2.0 • DEPA
          </span>
        </div>

        {/* 4-Node Registry Grid */}
        <div className="relative grid grid-cols-2 gap-3.5 py-1">
          
          {/* Central Security Core Badge */}
          <div className="absolute inset-0 m-auto w-20 h-20 bg-gradient-to-br from-[#0c1f50] via-[#102a6b] to-[#081536] rounded-2xl shadow-xl flex flex-col items-center justify-center text-white border-2 border-white z-20 transition transform hover:scale-105">
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[8px] font-black tracking-widest text-emerald-300 uppercase mt-0.5">VERIFIED</span>
          </div>

          {/* Node 1: Citizen Identity & Lineage */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-3.5 space-y-1.5 hover:border-blue-400 hover:bg-white transition shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0b1c48]">Identity & Lineage</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-500">
              <div className="flex justify-between">
                <span>Registry:</span>
                <span className="font-semibold text-slate-800">DigiLocker API</span>
              </div>
              <div className="flex justify-between">
                <span>Validation:</span>
                <span className="font-bold text-emerald-600">Cryptographic</span>
              </div>
            </div>
          </div>

          {/* Node 2: MahaBhulekh 7/12 */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-3.5 space-y-1.5 hover:border-amber-400 hover:bg-white transition shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0b1c48]">MahaBhulekh 7/12</span>
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-500">
              <div className="flex justify-between">
                <span>Registry:</span>
                <span className="font-semibold text-slate-800">Land & Revenue</span>
              </div>
              <div className="flex justify-between">
                <span>Extract:</span>
                <span className="font-bold text-slate-800">Satbara / 8A</span>
              </div>
            </div>
          </div>

          {/* Node 3: Welfare & Lineage */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-3.5 space-y-1.5 hover:border-purple-400 hover:bg-white transition shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0b1c48]">Welfare & Lineage</span>
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-500">
              <div className="flex justify-between">
                <span>Registry:</span>
                <span className="font-semibold text-slate-800">Social Justice</span>
              </div>
              <div className="flex justify-between">
                <span>Lineage:</span>
                <span className="font-bold text-slate-800">Genealogy Check</span>
              </div>
            </div>
          </div>

          {/* Node 4: MAITRI Clearances */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-3.5 space-y-1.5 hover:border-blue-400 hover:bg-white transition shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0b1c48]">MAITRI Commercial</span>
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-500">
              <div className="flex justify-between">
                <span>Registry:</span>
                <span className="font-semibold text-slate-800">Labour Dept</span>
              </div>
              <div className="flex justify-between">
                <span>Clearance:</span>
                <span className="font-bold text-slate-800">Shop Act Gumasta</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Federated Trust Footer */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Federated Gateway
            </span>
            <div className="flex items-center gap-2.5 mt-1 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1 text-[#0b1c48]">
                <span>🏛️</span> MeriPehchan
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-blue-700">
                <span>☁️</span> DigiLocker
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-emerald-700">
                <span>🛡️</span> DPDP / DEPA
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full self-start sm:self-auto flex items-center gap-1.5 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            <span>Zero Document Duplication</span>
          </div>
        </div>

      </div>
    </div>
  );
}