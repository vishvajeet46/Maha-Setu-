import { useState } from "react";

const availableServices = [
  {
    id: "s1",
    title: "Income Certificate",
    dept: "Revenue and Forest Department",
    days: "7 Days",
    fee: 53,
    fields: [
      { name: "applicantName", label: "Full Name of Applicant", type: "text", placeholder: "e.g. Ramesh Shankar Patil", required: true },
      { name: "annualIncome", label: "Total Annual Family Income (INR)", type: "number", placeholder: "e.g. 180000", required: true },
      { name: "incomeSource", label: "Primary Source of Income", type: "select", options: ["Agriculture", "Salaried Employment", "Business / Trade", "Daily Wage Labor"], required: true },
      { name: "tehsil", label: "Taluka / Tehsil Office", type: "text", placeholder: "e.g. Haveli, Pune", required: true },
      { name: "purpose", label: "Purpose of Certificate", type: "select", options: ["Scholarship / Education", "Ration Card Updation", "Government Welfare Subsidy", "Bank Loan Subsidy"], required: true },
    ],
  },
  {
    id: "s2",
    title: "Domicile & Nationality Certificate",
    dept: "Revenue and Forest Department",
    days: "15 Days",
    fee: 53,
    fields: [
      { name: "applicantName", label: "Full Legal Name", type: "text", placeholder: "e.g. Pooja Anant Shinde", required: true },
      { name: "yearsInMaharashtra", label: "Continuous Period of Residence in Maharashtra (Years)", type: "number", placeholder: "e.g. 18", required: true },
      { name: "birthPlace", label: "Place of Birth (Village/City, District)", type: "text", placeholder: "e.g. Satara, Maharashtra", required: true },
      { name: "rationCardNo", label: "Ration Card / Voter Reference No.", type: "text", placeholder: "e.g. MH-PUN-RC-9810", required: true },
      { name: "residentialAddress", label: "Permanent Residential Address", type: "textarea", placeholder: "Complete address with PIN code", required: true },
    ],
  },
  {
    id: "s3",
    title: "Caste Certificate",
    dept: "Social Justice Department",
    days: "21 Days",
    fee: 53,
    fields: [
      { name: "applicantName", label: "Applicant Name", type: "text", placeholder: "Full Name as per School Record", required: true },
      { name: "casteCategory", label: "Reservation Category", type: "select", options: ["Scheduled Caste (SC)", "Scheduled Tribe (ST)", "Other Backward Class (OBC)", "Vimukta Jati / Nomadic Tribes (VJNT)", "Special Backward Category (SBC)"], required: true },
      { name: "subCaste", label: "Sub-Caste / Community", type: "text", placeholder: "e.g. Mahar, Maratha-Kunbi, Dhangar", required: true },
      { name: "pre1967DocType", label: "Ancestral Residence Proof Prior to 1967", type: "select", options: ["Father/Grandfather School Leaving Certificate", "Pre-1967 Birth Register Extract", "Ancestral 7/12 Land Record", "Pahani Patrak Record"], required: true },
      { name: "familyTreeLineage", label: "Genealogy Details (Father & Grandfather Name)", type: "text", placeholder: "Father: ..., Grandfather: ...", required: true },
    ],
  },
  {
    id: "s4",
    title: "Non-Creamy Layer (NCL) Certificate",
    dept: "Social Justice Department",
    days: "21 Days",
    fee: 53,
    fields: [
      { name: "applicantName", label: "Applicant Name", type: "text", placeholder: "Legal Name", required: true },
      { name: "casteCertRef", label: "Existing Caste Certificate Number", type: "text", placeholder: "e.g. CC/REV/2022/9842", required: true },
      { name: "threeYearsIncome", label: "Total Gross Family Income of Last 3 Years (Combined)", type: "number", placeholder: "e.g. 540000", required: true },
      { name: "fatherDesignation", label: "Father / Mother Government Employment Category", type: "select", options: ["Not in Government Service", "Class III / Class IV Employee", "Private Employment / Farming"], required: true },
    ],
  },
  {
    id: "s5",
    title: "Shop & Establishment (Gumasta License)",
    dept: "Labour Department",
    days: "1 Day",
    fee: 450,
    fields: [
      { name: "businessName", label: "Name of Establishment / Enterprise", type: "text", placeholder: "e.g. Sahyadri Agro Products & Logistics", required: true },
      { name: "natureOfBusiness", label: "Nature of Business Operations", type: "select", options: ["Retail Shop", "Wholesale Trading", "IT / Tech Services Office", "Hotel / Restaurant / Eatery", "Commercial Warehouse"], required: true },
      { name: "employeeCount", label: "Total Number of Engaged Workers", type: "number", placeholder: "e.g. 6", required: true },
      { name: "commencementDate", label: "Date of Business Commencement", type: "date", required: true },
      { name: "premiseAddress", label: "Premise Address & Municipal Ward", type: "textarea", placeholder: "Full shop address with Ward and Pincode", required: true },
    ],
  },
  {
    id: "s6",
    title: "Trade License Renewal",
    dept: "Labour Department",
    days: "3 Days",
    fee: 200,
    fields: [
      { name: "existingLicenseNo", label: "Existing Municipal Trade License No.", type: "text", placeholder: "e.g. TL-MUM-2023-8821", required: true },
      { name: "enterpriseName", label: "Trade Establishment Name", type: "text", placeholder: "Business Entity Name", required: true },
      { name: "fireNocValid", label: "Fire Safety Audit Clearance", type: "select", options: ["Valid & Self-Certified", "Exempted Premise (< 50 sq.m.)"], required: true },
      { name: "taxReceiptNo", label: "Latest Property Tax Assessment Challan No.", type: "text", placeholder: "e.g. PTX-2025-0091", required: true },
    ],
  },
  {
    id: "s7",
    title: "Disability Welfare Assistance",
    dept: "Public Health Department",
    days: "10 Days",
    fee: 0,
    fields: [
      { name: "applicantName", label: "Patient / Applicant Name", type: "text", placeholder: "Full Name", required: true },
      { name: "disabilityType", label: "Type of Disability", type: "select", options: ["Locomotor Disability", "Visual Impairment", "Hearing Impairment", "Multiple Disabilities", "Intellectual Disability"], required: true },
      { name: "percentageDisability", label: "Disability Percentage as per Medical Board (%)", type: "number", placeholder: "e.g. 45", required: true },
      { name: "udidNumber", label: "Unique Disability ID (UDID) Card No. (if issued)", type: "text", placeholder: "e.g. MH27101200100982", required: false },
      { name: "hospitalName", label: "Government District Hospital / Civil Surgeon Name", type: "text", placeholder: "e.g. Sassoon General Hospital, Pune", required: true },
    ],
  },
  {
    id: "s8",
    title: "Shetkari Krishi Yojana Assistance",
    dept: "Agriculture Department",
    days: "12 Days",
    fee: 0,
    fields: [
      { name: "farmerName", label: "Farmer Name (as on 7/12 Extract)", type: "text", placeholder: "e.g. Balasaheb Tukaram More", required: true },
      { name: "landAccountNo", label: "8A Khatedar Account Number", type: "text", placeholder: "e.g. KH-88120", required: true },
      { name: "gutNumber", label: "Survey / Gut Number", type: "text", placeholder: "e.g. Gat No. 142/2A", required: true },
      { name: "cultivatedCrop", label: "Primary Crop Sown (e-Pik Pahani Registered)", type: "select", options: ["Soybean", "Cotton", "Sugarcane", "Paddy / Rice", "Pulses & Oilseeds", "Horticulture"], required: true },
      { name: "bankAccountLinked", label: "Direct Benefit Transfer (DBT) Bank IFSC", type: "text", placeholder: "e.g. SBIN0001234", required: true },
    ],
  },
];

export default function Dashboard({ applications = [], onRefresh, setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formInputs, setFormInputs] = useState({});
  const [toastMessage, setToastMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("mahasetu_token");
  const user = JSON.parse(localStorage.getItem("mahasetu_user") || "{}");

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const handleSelectService = (srv) => {
    setSelectedService(srv);
    setFormInputs({
      applicantName: user.name || "",
    });
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!selectedService) return;

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          applicantName: formInputs.applicantName || user.name,
          service: selectedService.title,
          dept: selectedService.dept,
          fee: selectedService.fee,
          formData: formInputs,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to submit application");

      setSelectedService(null);
      setIsServiceModalOpen(false);
      setFormInputs({});
      triggerToast(`Application submitted! ID: ${data.appId}`);

      if (onRefresh) await onRefresh();
    } catch (err) {
      triggerToast(err.message || "Network error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = applications.filter((app) => {
    const matches =
      (app.service || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.appId || "").toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedFilter === "Pending") return matches && app.status === "Payment Pending";
    if (selectedFilter === "Approved") return matches && app.status === "Approved";
    return matches;
  });

  const totalDues = applications.reduce((sum, item) => sum + (item.amountDue || 0), 0);

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 overflow-y-auto font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-sm flex items-center gap-2 border border-slate-700 animate-bounce">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Citizen & Business Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time tracking for official Maharashtra Government e-Services.</p>
        </div>
        <button
          onClick={() => {
            setSelectedService(null);
            setIsServiceModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-[#1b327b] hover:bg-[#142661] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition cursor-pointer shadow-sm"
        >
          <span>+</span>
          <span>Apply New Service</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Applications</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">{applications.length}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Under Review</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">
            {applications.filter((a) => a.status === "Under Review").length}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Approved</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {applications.filter((a) => a.status === "Approved").length}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Dues</p>
          <h3 className="text-2xl font-bold text-rose-600 mt-1">₹{totalDues}</h3>
        </div>
      </div>

      {/* Applications Table Section */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-800 self-start md:self-auto">Recent Applications</h2>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium">
              {["All", "Pending", "Approved"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                    selectedFilter === filter ? "bg-white text-slate-900 shadow-xs font-semibold" : "text-slate-500"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.appId} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {item.appId}
                      <div className="text-[10px] text-slate-400 font-normal">{item.appliedDate}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{item.service}</td>
                    <td className="py-3.5 px-4 text-slate-500">{item.dept}</td>
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
                      {item.status === "Payment Pending" ? (
                        <button
                          onClick={() => setActiveTab && setActiveTab("Payment")}
                          className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer"
                        >
                          Pay ₹{item.amountDue}
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTab && setActiveTab("My Applications")}
                          className="px-2.5 py-1 text-blue-900 font-bold bg-blue-50 hover:bg-blue-100 rounded-lg text-xs cursor-pointer"
                        >
                          View File
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No records found. Click "Apply New Service" above to start an application.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Service Catalog Selection */}
      {isServiceModalOpen && !selectedService && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Official Maharashtra State Services</h3>
                <p className="text-[11px] text-slate-500">Select an electronic service to open the statutory application form</p>
              </div>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-base cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-2.5 max-h-[70vh] overflow-y-auto">
              {availableServices.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => handleSelectService(srv)}
                  className="p-3.5 border border-slate-200 rounded-xl hover:border-blue-900 hover:bg-blue-50/40 transition cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-blue-900 transition">{srv.title}</p>
                    <p className="text-[11px] text-slate-600 font-medium">{srv.dept}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">RTS Mandated Delivery: {srv.days}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md block">
                      {srv.fee > 0 ? `₹${srv.fee}` : "Free"}
                    </span>
                    <span className="text-[11px] text-blue-700 font-semibold mt-1 inline-block">Fill Form &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Dynamic Application Form */}
      {isServiceModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">{selectedService.dept}</span>
                <h3 className="font-bold text-slate-900 text-base">{selectedService.title} Application Form</h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="bg-blue-50/70 border border-blue-200 p-3.5 rounded-xl flex items-center justify-between text-slate-700">
                <div>
                  <p className="font-bold text-blue-950">Statutory Guarantee (RTS 2015)</p>
                  <p className="text-[11px] text-slate-600">Disposal Timeline: {selectedService.days}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] block font-semibold text-slate-500">Statutory Fee</span>
                  <span className="text-sm font-bold text-slate-900">{selectedService.fee > 0 ? `₹${selectedService.fee}` : "Free of Cost"}</span>
                </div>
              </div>

              {/* Dynamic Service Inputs */}
              <div className="space-y-3.5 pt-2">
                {selectedService.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {field.label} {field.required && <span className="text-rose-500">*</span>}
                    </label>

                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        required={field.required}
                        value={formInputs[field.name] || ""}
                        onChange={handleFormInputChange}
                        className="w-full border border-slate-300 rounded-xl p-2.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-900 text-xs"
                      >
                        <option value="">-- Choose Option --</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        rows="2"
                        required={field.required}
                        value={formInputs[field.name] || ""}
                        onChange={handleFormInputChange}
                        placeholder={field.placeholder}
                        className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-900 text-xs"
                      ></textarea>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        required={field.required}
                        value={formInputs[field.name] || ""}
                        onChange={handleFormInputChange}
                        placeholder={field.placeholder}
                        className="w-full border border-slate-300 rounded-xl p-2.5 focus:outline-none focus:border-blue-900 text-xs"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                ⚖️ <strong>Legal Undertaking:</strong> By submitting this form, you affirm that the information provided is backed by authentic public records and identity data under the Information Technology Act & Maharashtra RTS Act 2015.
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="text-slate-600 hover:text-slate-800 font-semibold px-3 py-2 cursor-pointer"
                >
                  &larr; Back to Services
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#1b327b] hover:bg-blue-900 disabled:bg-slate-400 text-white px-6 py-2.5 rounded-xl font-bold transition shadow-sm cursor-pointer"
                >
                  {submitting ? "Submitting Application..." : "Confirm & Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}