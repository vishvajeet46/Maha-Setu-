const HelpSupport = () => {
  return (
    <div>
      <div className="mt-14 ">
        <div className="w-full flex justify-between items-center h-[70%] p-4 m-4">
          <div className="w-1/2 space-y-4">
            <h1 className="text-3xl font-bold text-blue-900 mt-3">
              Contact Us
            </h1>
            <div>
              <h1 className="text-2xl font-semibold">
                Helplines & Telephonic Contact
              </h1>
              <ul>
                <li>
                  <span className="text-[18px] font-[450]">
                    Citizen Call Centre:{" "}
                  </span>
                  1800 120 8040
                </li>
              </ul>
              <ul>
                <li>
                  <span className="text-[18px] font-[450]">
                    Maharashtra Control Room:{" "}
                  </span>
                  022-22027990
                </li>
              </ul>
              <ul>
                <li>
                  <span className="text-[18px] font-[450]">
                    Disaster Helpline:{" "}
                  </span>
                  022-22694725
                </li>
              </ul>
            </div>

            <div>
              <h1 className="text-2xl font-semibold">Email Communication</h1>
              <p className="text-blue-600">
                cm@maharashtra.gov.in <br />
                msdc.exadmin@maharashtra.gov.in
              </p>
            </div>

            <div>
              <h1 className="text-2xl font-semibold">
                Physical Mail & In-Person Visits
              </h1>
              <p>
                <span className="text-[18px] font-[450]">
                  Directorate Of Information Technology
                </span>
                <br />
                7th Floor, Mantralaya, <br />
                Mumbai - 400032 <br />
                <span className="text-[18px] font-[450]">Phone: </span>
                022-22044586 / 022-22024177
              </p>
            </div>
          </div>
          <div className="w-1/2 px-5">
            <div className="w-[80%] align bg-gray-100 mx-4 my-6 px-4 rounded-[20px]">
              <h1 className="text-center text-3xl text-blue-900 font-bold py-4">
                Contact Support
              </h1>
              <form
                action=""
                className="flex flex-col justify-center items-center p-4 space-y-4 "
              >
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter Your Name"
                  className="p-2 bg-white border-2 border-gray-400 rounded-2xl w-full focus:border-blue-900 focus:outline-none"
                />
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter Your Email"
                  className="p-2 bg-white border-2 border-gray-400 rounded-2xl w-full focus:border-blue-900 focus:outline-none"
                />
                <textarea
                  name=""
                  id=""
                  placeholder="Message"
                  className="p-2 bg-white border-2 border-gray-400 rounded-2xl w-full focus:border-blue-900 focus:outline-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white p-2 my-4 rounded-[15px] hover:bg-blue-800 cursor-pointer"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-50 text-center mt-10">
        <h1 className=" text-blue-900 font-bold text-2xl px-8 pt-5 pb-10">
          Frequently Asked Question
        </h1>
        <div className="px-4">
          <p className="p-2 text-justify">
            <span className="text-[18px] font-[450]  text-blue-900">
              Q. What is the primary objective of Maha-Setu?
            </span>
            <br />
            <span className="text-[18px] font-[450] text-blue-900">
              Ans:
            </span>{" "}
            The initiative aims to bring transparency efficiency, and
            accessibility to public administration. It eliminates the need for
            citizens to run between multiple government offices (like the Tehsil
            office, Collectorate, or municipal bodies) by consolidating services
            under one physical and digital portal.
          </p>{" "}
          <br />
          <hr className="text-gray-300" />
          <p className="p-2 text-justify">
            <span className="text-[18px] font-[450]  text-blue-900">
              Q. What types of certificates and services are available through
              Maha-Setu?
            </span>
            <br />
            <span className="text-[18px] font-[450] text-blue-900">
              Ans:
            </span>{" "}
            The centers process over 30+ citizen services across revenue, social
            welfare, and rural development departments:
            <ul>
              <li>
                <span className="text-[18px] font-[450] ">
                  Revenue & Identity Certificates:{" "}
                </span>
                Income Certificate, Domicile/Nationality Certificate, Caste
                Certificate, Non-Creamy Layer (NCL) Certificate, Solvency
                Certificate, Senior Citizen Card.
              </li>
              <li>
                <span className="text-[18px] font-[450] ">
                  Land & Property Records:{" "}
                </span>
                Digitally signed 7/12 extracts (Satbara Utara), 8A extracts,
                property card verification, and mutation entries.
              </li>
              <li>
                <span className="text-[18px] font-[450] ">
                  Identity & Utilities:{" "}
                </span>
                Aadhaar corrections/enrollment, PAN card application, Voter ID
                reg text-blue-900istrations, and Ration Card modifications.
              </li>
              <li>
                <span className="text-[18px] font-[450] ">
                  Licenses & Registrations:{" "}
                </span>
                Shop Act registration (Gumasta License), Udyam Registration for
                MSMEs, and agricultural scheme enrollments.{" "}
              </li>
            </ul>
          </p>{" "}
          <br />
          <hr className="text-gray-300" />
          <p className="p-2 text-justify">
            <span className="text-[18px] font-[450]  text-blue-900">
              Q. What standard documents are required for applying?
            </span>
            <br />
            <span className="text-[18px] font-[450] text-blue-900">
              Ans:
            </span>{" "}
            While requirements vary by service, common documentation includes:
            <ul>
              <li>
                <span className="text-[18px] font-[450] ">
                  Proof of Identity:{" "}
                </span>
                Aadhaar Card, Voter ID, or Passport.
              </li>
              <li>
                <span className="text-[18px] font-[450] ">
                  Proof of Address:{" "}
                </span>
                Electricity bill, ration card, or rent agreement.
              </li>
              <li>
                <span className="text-[18px] font-[450] ">
                  Financial Proof (for Income/EWS):{" "}
                </span>
                Salary slip, Form 16, or Talathi/Tahsildar income report.
              </li>
              <li>
                <span className="text-[18px] font-[450] ">
                  Lineage Proof (for Caste/NCL):{" "}
                </span>
                Pre-1967/1961 caste records, school leaving certificates of
                applicant/father.
              </li>
              <li>
                <span className="text-[18px] font-[450] ">
                  Photograph & Self-Declaration:{" "}
                </span>
                Recent passport-size photograph and signed
                affidavit/self-declaration.
              </li>
            </ul>
          </p>{" "}
          <br />
          <hr className="text-gray-300" />
          <p className="p-2 text-justify">
            <span className="text-[18px] font-[450]  text-blue-900">
              Q. Can an applicant track the progress of their application?
            </span>
            <br />
            <span className="text-[18px] font-[450] text-blue-900">
              Ans:
            </span>{" "}
            Yes. Upon submission (online or at the counter), applicants receive
            an Acknowledgement Slip / Token Number with a unique Application ID
            and an expected delivery date. This tracking ID can be entered on
            the Aaple Sarkar portal or verified via SMS/WhatsApp alerts if
            registered.
          </p>{" "}
          <br />
          <hr className="text-gray-300" />
          <p className="p-2 text-justify">
            <span className="text-[18px] font-[450]  text-blue-900">
              Q. Are the downloaded certificates legally valid everywhere?
            </span>
            <br />
            <span className="text-[18px] font-[450] text-blue-900">
              Ans:
            </span>{" "}
            Yes. Certificates issued through the portal carry a
            cryptographically validated QR code and digital signature from the
            competent issuing authority (Sub-Divisional Officer, Tehsildar, or
            Nayab Tehsildar). They do not require a manual rubber stamp or
            physical signature to be considered valid for college admissions,
            government exams, or legal transactions.
          </p>{" "}
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
