import { useState, useEffect } from "react";

export default function Payment({ onRefresh }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("mahasetu_token");

  const fetchPayments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setPayments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handlePayNow = async (paymentId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/payments/${paymentId}/pay`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Payment verified successfully via GRAS gateway!");
        fetchPayments();
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      alert("Payment processing error");
    }
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
            {payments.length > 0 ? (
              payments.map((p) => (
                <tr key={p.paymentId}>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{p.paymentId}</td>
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
                        onClick={() => handlePayNow(p.paymentId)}
                        className="bg-[#1b327b] text-white px-3 py-1 rounded-lg font-semibold hover:bg-blue-900 transition cursor-pointer"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-semibold">Verified</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-slate-400">
                  {loading ? "Loading dues..." : "No invoices pending payment."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}