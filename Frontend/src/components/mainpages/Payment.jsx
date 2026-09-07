import { useState } from "react";

const initialPayments = [
  { id: "PAY-1049", desc: "Shop & Establishment Registration Fee", appRef: "MH-2026-90214", amount: 450, status: "Pending" },
  { id: "PAY-1052", desc: "Verification & Scrutiny Charges (NCL)", appRef: "MH-2026-91560", amount: 1200, status: "Pending" },
  { id: "PAY-0982", desc: "Income Certificate Government Fee", appRef: "MH-2026-89421", amount: 53, status: "Paid" },
];

export default function Payment() {
  const [payments, setPayments] = useState(initialPayments);

  const handlePayNow = (id) => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status: "Paid" } : p)));
    alert("Payment successful via Maha-ePayment Gateway!");
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 font-sans">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Fee & Payment Portal</h1>
        <p className="text-xs text-slate-500 mt-1">Integrated with GRAS (Government Receipt Accounting System)</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100 uppercase">
            <tr>
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Particulars</th>
              <th className="py-3 px-4">Application ID</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {payments.map((p) => (
              <tr key={p.id}>
                <td className="py-3.5 px-4 font-semibold text-slate-900">{p.id}</td>
                <td className="py-3.5 px-4 font-medium text-slate-800">{p.desc}</td>
                <td className="py-3.5 px-4 text-slate-500">{p.appRef}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">₹{p.amount}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      p.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  {p.status === "Pending" ? (
                    <button
                      onClick={() => handlePayNow(p.id)}
                      className="bg-[#1b327b] text-white px-3 py-1 rounded-lg font-semibold hover:bg-blue-900 transition"
                    >
                      Pay Now
                    </button>
                  ) : (
                    <button className="text-slate-400 font-semibold hover:underline">Receipt</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}