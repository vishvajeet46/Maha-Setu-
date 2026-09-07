const Icons = {
  Dashboard: () => (
    <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  Applications: () => (
    <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Payment: () => (
    <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  Status: () => (
    <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Support: () => (
    <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Documents: () => (
    <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const NavBar = ({ activeItem = "Dashboard", setActiveItem }) => {
  const mainNavItems = [
    { name: "Dashboard", icon: Icons.Dashboard },
    { name: "My Applications", icon: Icons.Applications },
    { name: "Payment", icon: Icons.Payment },
    { name: "Status", icon: Icons.Status },
    { name: "Support", icon: Icons.Support },
  ];

  const workspaceNavItems = [
    { name: "Documents", icon: Icons.Documents },
    { name: "Settings", icon: Icons.Settings },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#1b327b] text-white flex flex-col justify-between p-4 select-none shrink-0 font-sans">
      <div>
        {/* Brand / Logo Section */}
        <div className="flex items-center gap-3 px-2 py-4 mb-6">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-[#1b327b] font-black text-xl tracking-wider">M</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold tracking-wide leading-tight">MAHA-SETU</h1>
            <span className="text-[11px] text-blue-200 leading-tight">
              Unified Citizen & Business Portal
            </span>
          </div>
        </div>

        {/* MAIN Section */}
        <div className="mb-6">
          <p className="px-3 text-xs font-semibold text-blue-300/70 tracking-wider uppercase mb-3">
            Main
          </p>
          <ul className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => setActiveItem && setActiveItem(item.name)}
                    className={`w-full flex items-center px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium cursor-pointer ${
                      isActive
                        ? "bg-[#2546a8] text-white shadow-sm font-semibold"
                        : "text-blue-100/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <Icon />
                      <span>{item.name}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* WORKSPACE Section */}
        <div>
          <p className="px-3 text-xs font-semibold text-blue-300/70 tracking-wider uppercase mb-3">
            Workspace
          </p>
          <ul className="space-y-1">
            {workspaceNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => setActiveItem && setActiveItem(item.name)}
                    className={`w-full flex items-center px-3.5 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium cursor-pointer ${
                      isActive
                        ? "bg-[#2546a8] text-white shadow-sm font-semibold"
                        : "text-blue-100/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <Icon />
                      <span>{item.name}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Footer / System Status Section */}
      <div className="pt-4 border-t border-blue-400/20 px-2 space-y-2">
        <div className="flex items-center gap-2 text-xs text-blue-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>All systems operational</span>
        </div>
        <p className="text-[11px] text-blue-300/60">
          © Government of Maharashtra
        </p>
      </div>
    </aside>
  );
};

export default NavBar;