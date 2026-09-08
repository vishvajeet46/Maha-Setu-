import { useState } from "react";

export default function MyApplications({ applications = [], setActiveTab }) {
  const [filter, setFilter] = useState("All");

  const filteredList = applications.filter((item) => {
    if (filter === "All") return true;
    return item.status === filter;
  });

  const handleDownloadFilledForm = (item) => {
    const user = JSON.parse(localStorage.getItem("mahasetu_user") || "{}");
    const content = `
================================================================================
          GOVERNMENT OF MAHARASHTRA - MAHA-SETU UNIFIED PORTAL
                 CITIZEN COMPOSITE APPLICATION FORM
================================================================================

APPLICATION REFERENCE ID : ${item.appId}
SUBMISSION DATE          : ${item.appliedDate}
SERVICE REQUESTED        : ${item.service}
DESIGNATED DEPARTMENT    : ${item.dept}
APPLICATION STATUS       : ${item.status}
CURRENT DESK STAGE       : ${item.stage}
RTS TIME LIMIT           : ${item.rtsLimitDays || 15} Working Days

--------------------------------------------------------------------------------
1. APPLICANT DETAILS
--------------------------------------------------------------------------------
Full Legal Name          : ${item.applicant || user.name}
Registered Email         : ${user.email || "N/A"}
Registered Phone         : ${user.phone || "N/A"}
Identity Source          : MeriPehchan / DigiLocker e-Vault

--------------------------------------------------------------------------------
2. STATUTORY SCRUTINY & REVENUE PARTICULARS
--------------------------------------------------------------------------------
Assigned Scrutiny Desk   : District Collectorate / Tehsil Office
Statutory Processing Fee : ₹${item.amountDue || 0}
Department Remarks       : ${item.officialRemarks || "Documents queued for inspection"}
Rejection Reason         : ${item.rejectionReason || "None"}

--------------------------------------------------------------------------------
3. LEGAL DECLARATION UNDER MAHARASHTRA RTS ACT 2015
--------------------------------------------------------------------------------
I hereby declare that all particulars filled in this electronic form are true
and valid according to the official registries of the State of Maharashtra.

[Digitally Generated via MahaSetu Unified Gateway - Valid Under IT Act 2000]
================================================================================
    `;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Application_Form_${item.appId}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAcknowledgement = (item) => {
    const user = JSON.parse(localStorage.getItem("mahasetu_user") || "{}");
    const htmlReceipt = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>MahaSetu Acknowledgement - ${item.appId}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #1e293b; }
          .receipt-box { max-width: 650px; margin: auto; border: 2px solid #1b327b; padding: 25px; border-radius: 12px; }
          .header { text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 20px; }
          .header h2 { margin: 0; color: #1b327b; font-size: 20px; text-transform: uppercase; }
          .header p { margin: 4px 0 0; font-size: 12px; color: #64748b; }
          .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px; }
          .meta-table td { padding: 8px 6px; border-bottom: 1px solid #f1f5f9; }
          .meta-table td.label { font-weight: 600; color: #475569; width: 40%; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-weight: bold; font-size: 11px; background: #e0f2fe; color: #0369a1; }
          .footer { font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px dashed #cbd5e1; padding-top: 15px; margin-top: 20px; }
          .btn-print { background: #1b327b; color: white; padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; margin-top: 10px; }
          @media print { .btn-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="receipt-box">
          <div class="header">
            <h2>Government of Maharashtra</h2>
            <p>MAHA-SETU Unified Citizen & Business Service Delivery Portal</p>
            <p><strong>OFFICIAL APPLICATION ACKNOWLEDGEMENT & TOKEN SLIP</strong></p>
          </div>

          <table class="meta-table">
            <tr>
              <td class="label">Token / Application ID:</td>
              <td><strong style="color:#1b327b; font-size:15px;">${item.appId}</strong></td>
            </tr>
            <tr>
              <td class="label">Applicant Full Name:</td>
              <td>${item.applicant || user.name}</td>
            </tr>
            <tr>
              <td class="label">Applied Service:</td>
              <td>${item.service}</td>
            </tr>
            <tr>
              <td class="label">Competent Department:</td>
              <td>${item.dept}</td>
            </tr>
            <tr>
              <td class="label">Date of Application:</td>
              <td>${item.appliedDate}</td>
            </tr>
            <tr>
              <td class="label">Statutory RTS Time Limit:</td>
              <td>${item.rtsLimitDays || 15} Working Days</td>
            </tr>
            <tr>
              <td class="label">Application Status:</td>
              <td><span class="badge">${item.status}</span></td>
            </tr>
            <tr>
              <td class="label">Current Scrutiny Stage:</td>
              <td>${item.stage}</td>
            </tr>
          </table>

          <div style="background:#f8fafc; padding:12px; border-radius:8px; font-size:12px; border:1px solid #e2e8f0;">
            <strong>Tracking Notice:</strong>
            <p style="margin:4px 0 0; color:#64748b;">
              Keep this Acknowledgement Token safe. You can track this application on the MAHA-SETU portal using ID <strong>${item.appId}</strong> under <em>Application Tracking (RTS)</em>.
            </p>
          </div>

          <div class="footer">
            <p>© Government of Maharashtra • Directorate of Information Technology (DIT)</p>
            <p>Cryptographically validated e-Receipt under Maharashtra Right to Public Services Act (RTS 2015)</p>
            <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
          </div>
        </div>
      </body>
      </html>
    `;

    const win = window.open("", "_blank");
    win.document.write(htmlReceipt);
    win.document.close();
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 overflow-y-auto font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Applications</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage, track, and download records for all {applications.length} filed citizen & business forms
          </p>
        </div>
        <div className="flex flex-wrap gap-2 bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
          {["All", "Approved", "Under Review", "Payment Pending", "Action Required", "Rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                filter === tab ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {filteredList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredList.map((item) => (
            <div
              key={item.appId}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-md">
                    {item.appId}
                  </span>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      item.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : item.status === "Payment Pending"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : item.status === "Action Required"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : item.status === "Rejected"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-slate-800">{item.service}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{item.dept}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Stage: <span className="font-semibold">{item.stage}</span>
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Applied: {item.appliedDate}</span>
                  {item.status === "Payment Pending" && (
                    <button
                      onClick={() => setActiveTab && setActiveTab("Payment")}
                      className="text-amber-600 font-bold hover:underline cursor-pointer"
                    >
                      Pay ₹{item.amountDue} &rarr;
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleDownloadFilledForm(item)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer text-center"
                  >
                    📄 Filled Form
                  </button>

                  <button
                    onClick={() => handleDownloadAcknowledgement(item)}
                    className="bg-blue-50 hover:bg-blue-100 text-[#1b327b] px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition cursor-pointer text-center"
                  >
                    🖨️ Receipt / Slip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <p className="text-slate-500 text-sm font-medium">No applications found in this category.</p>
          <button
            onClick={() => setActiveTab && setActiveTab("Dashboard")}
            className="bg-[#1b327b] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-900 cursor-pointer"
          >
            Apply for a Service
          </button>
        </div>
      )}
    </div>
  );
}