import { useState } from "react";

const faqData = [
  {
    category: "General & Portal Interoperability",
    items: [
      {
        q: "What is the primary objective of MAHA-SETU?",
        ans: "MAHA-SETU serves as a unified interoperability gateway connecting independent Maharashtra state systems—such as Aaple Sarkar, MahaBhulekh, MAITRI, and the Social Welfare portal. It eliminates duplicate verifications and repetitive document submissions across state departments.",
      },
      {
        q: "How does Single Sign-On (SSO) work on MAHA-SETU?",
        ans: "MAHA-SETU supports federated authentication through MeriPehchan and DigiLocker. Once verified, citizens can access welfare schemes, commercial licensing, and land extracts using a single profile without creating multiple department-specific credentials.",
      },
      {
        q: "Is my personal data secure under MAHA-SETU?",
        ans: "Yes. The platform operates on India's Data Empowerment and Protection Architecture (DEPA) standards in compliance with the Digital Personal Data Protection (DPDP) Act. Inter-departmental data exchanges require purpose-bound citizen consent and are logged with tamper-evident audit trails.",
      },
    ],
  },
  {
    category: "Services, Documents & RTS Compliance",
    items: [
      {
        q: "What services can I apply for through this portal?",
        ans: "The portal processes over 400+ citizen and business services across 25+ state departments, including Revenue & Identity (Income, Domicile, Caste, Non-Creamy Layer), Land & Property Records (7/12 Satbara, 8A extracts, Property Card), and Commercial Clearances (Shop Act Gumasta License, Trade Permits).",
      },
      {
        q: "What standard documents are needed for revenue and identity applications?",
        ans: "Requirements depend on the requested service, but typically include Proof of Identity (Voter ID, Passport, PAN Card), Proof of Address (Electricity bill, Ration Card), Proof of Age/Lineage (School Leaving Certificate, pre-1967/1961 records for caste certificates), and Income Proof (Form 16, Salary Slips, or Tahsildar valuation).",
      },
      {
        q: "What legal guarantee exists under the Right to Public Services (RTS) Act 2015?",
        ans: "Under the Maharashtra Right to Public Services Act 2015, each notified public service has a legally mandated delivery timeline (e.g., 7 days for an Income Certificate, 15 days for a Domicile Certificate, 1 day for Shop Act registration). Officers failing to act within the timeline are subject to statutory review and penalties.",
      },
      {
        q: "Are downloaded certificates legally valid without physical seals or stamps?",
        ans: "Yes. All digital certificates and approvals issued through MAHA-SETU feature a cryptographically secured digital signature from the competent issuing officer along with an official verification QR code, making them legally binding under the Information Technology Act for admissions, competitive exams, and legal filings.",
      },
    ],
  },
  {
    category: "Payments, Status & Grievance Redressal",
    items: [
      {
        q: "Which payment options are supported for statutory government fees?",
        ans: "Payments are processed through the official Government Receipt Accounting System (GRAS) integration, supporting UPI, Debit/Credit Cards, Net Banking, and NEFT/RTGS challans with real-time electronic treasury receipts.",
      },
      {
        q: "What should I do if an amount was deducted but the status shows 'Payment Pending'?",
        ans: "GRAS payment reconciliation can occasionally take up to 2 hours during interbank settlement windows. If the receipt does not update automatically after 2 hours, submit a support ticket above selecting 'Payment Gateway Deduction without Receipt' along with your Bank Transaction Reference Number.",
      },
      {
        q: "How can I track the progress of an application after submission?",
        ans: "You can track your application in real time using the 13-digit Application Reference ID on the 'Application Tracking (RTS)' tab or via the unified Citizen Dashboard. Status updates and processing stages are also notified through state SMS alerts.",
      },
      {
        q: "How do I escalate an application delayed beyond its RTS deadline?",
        ans: "If your file crosses the designated RTS timeline, you can lodge a formal first appeal directly via the Grievance & Helpdesk tab. The appeal is routed to the designated First Appellate Authority (such as the Sub-Divisional Officer or Deputy Collector) for time-bound resolution.",
      },
    ],
  },
];

const HelpSupport = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit message");

      setStatusMessage(`Inquiry ticket #${data.ticketId} created. A representative will contact you shortly.`);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Contact & Support Section */}
      <div className="mt-8 px-4 md:px-8">
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Official Helplines */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Help & Support</h1>
              <p className="text-xs text-slate-500 mt-1">
                Official contact desk for MAHA-SETU public services and administrative escalation.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-slate-800">Helplines & Telephonic Contact</h2>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">Citizen Call Centre (Toll-Free):</span>
                  <span>1800 120 8040</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">Maharashtra State Control Room:</span>
                  <span>022-22027990</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">Disaster Management Helpline:</span>
                  <span>022-22694725</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-800">Email Communication</h2>
              <p className="text-sm text-blue-700">
                cm@maharashtra.gov.in <br />
                msdc.exadmin@maharashtra.gov.in <br />
                support@mahasetu.gov.in
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-800">Physical Mail & In-Person Visits</h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900">
                  Directorate of Information Technology (DIT)
                </span>
                <br />
                7th Floor, Mantralaya, Madam Cama Road, <br />
                Nariman Point, Mumbai - 400032 <br />
                <span className="font-semibold text-slate-900">Mantralaya Exchange:</span> 022-22044586 / 022-22024177
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="w-full lg:w-1/2">
            <div className="w-full max-w-lg bg-gray-50 border border-slate-200 mx-auto px-6 py-6 rounded-3xl shadow-sm">
              <h2 className="text-center text-2xl text-blue-900 font-bold">Contact Support</h2>
              <p className="text-xs text-center text-slate-500 mt-1 mb-5">
                Submit an inquiry directly to our department grievance officer.
              </p>

              {statusMessage && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold">
                  {statusMessage}
                </div>
              )}

              {errorMessage && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-semibold">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your legal name"
                    className="p-3 bg-white border border-slate-300 rounded-xl w-full focus:border-blue-900 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="p-3 bg-white border border-slate-300 rounded-xl w-full focus:border-blue-900 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Describe Issue / Query</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about your query or application reference..."
                    className="p-3 bg-white border border-slate-300 rounded-xl w-full focus:border-blue-900 focus:outline-none text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-slate-400 text-white p-3 rounded-xl font-bold cursor-pointer transition shadow-sm text-sm"
                >
                  {loading ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Accordion FAQ Section */}
      <div className="w-full bg-slate-50 border-t border-slate-200 py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xs md:text-sm text-slate-500">
              Everything you need to know about portal integrations, RTS service delivery rules, and status verifications.
            </p>
          </div>

          <div className="space-y-6">
            {faqData.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-950 px-1">
                  {cat.category}
                </h3>
                <div className="space-y-2">
                  {cat.items.map((item, itemIdx) => {
                    const uniqueIndex = `${catIdx}-${itemIdx}`;
                    const isOpen = openFaqIndex === uniqueIndex;

                    return (
                      <div
                        key={itemIdx}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all shadow-xs"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(uniqueIndex)}
                          className="w-full flex justify-between items-center text-left p-4 cursor-pointer hover:bg-slate-50 transition"
                        >
                          <span className="text-sm font-semibold text-slate-800 pr-4">
                            {item.q}
                          </span>
                          <span className="text-blue-900 font-bold text-base shrink-0">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                            {item.ans}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;