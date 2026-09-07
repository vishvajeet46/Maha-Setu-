import { useState } from "react";

const initialDocs = [
  { name: "Aadhaar Card (UIDAI)", size: "450 KB", verified: true, date: "12 Jan 2026" },
  { name: "PAN Card", size: "320 KB", verified: true, date: "12 Jan 2026" },
  { name: "Electricity Bill (MSEDCL)", size: "1.2 MB", verified: false, date: "06 Sep 2026" },
  { name: "School Leaving Certificate", size: "850 KB", verified: true, date: "02 Feb 2026" },
];

export default function Documents() {
  const [docs, setDocs] = useState(initialDocs);

  const handleUploadFake = () => {
    const newDoc = { name: "Ration Card (Scanned).pdf", size: "780 KB", verified: true, date: "Today" };
    setDocs([newDoc, ...docs]);
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">DigiLocker & Document Locker</h1>
          <p className="text-xs text-slate-500 mt-1">Secured e-Vault for auto-verification across all Maharashtra certificates</p>
        </div>
        <button
          onClick={handleUploadFake}
          className="bg-[#1b327b] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-900"
        >
          + Upload Document
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {docs.map((doc, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400">{doc.size}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${doc.verified ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                {doc.verified ? "Verified" : "Pending"}
              </span>
            </div>
            <h4 className="text-xs font-bold text-slate-800 truncate">{doc.name}</h4>
            <p className="text-[11px] text-slate-400">Added: {doc.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}