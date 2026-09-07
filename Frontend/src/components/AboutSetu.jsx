const AboutSetu = () => {
  return (
    <div className="mx-3 mb-6 space-y-5 text-justify">
      <div className="mt-14 space-y-1">
        <div className="text-4xl font-bold text-blue-900">About MAHA-SETU</div>
        <div className="text-[22px] font-semibold">The Core Challenge </div>
        <p>
          Maharashtra runs dozens of independent public portals—such as Aaple Sarkar, MahaBhulekh, and MAITRI. Because these systems operate on
          isolated databases and fragmented legacy software, citizens and businesses are forced to repeatedly submit the same identity proofs, land ownership papers, and income certificates. MAHA-SETU serves as the unified interoperability gateway connecting these isolated departments into a single, coordinated service delivery network.
        </p>
      </div>
      <div>
        <div className="text-[22px] font-semibold">Our Mission</div>
        <p>
          To eliminate administrative bottlenecks duplicate verifications, and physical paperwork by enabling secure, real-time machine-to-machine data exchanges under India’s National Enterprise Architecture standards.
        </p>
      </div>
      <div>
        <div className="text-[22px] font-semibold">Architectural Pillars</div>
        <ul>
          <li>
            <span className="text-[18px] font-[480]">Federated Single Sign-On (SSO): </span>Access all state welfare, licensing, and municipal services through one unified login powered by MeriPehchan and DigiLocker.
          </li>
          <li>
            <span className="text-[18px] font-[480]">Consent-Driven Exchange (DEPA): </span>Built in compliance with the Digital Personal Data Protection (DPDP) Act.  Inter-departmental data queries occur strictly with purpose-bound, revocable citizen authorization.
          </li>
          <li>
            <span className="text-[18px] font-[480]">Automated Data Federation: </span>Replaces manual document scans. System registries (such as MahaBhulekh for 7/12 land extracts and Social Welfare for caste status) communicate directly through standardized canonical APIs.
          </li>
          <li>
            <span className="text-[18px] font-[480]">Unified Lifecycle Tracking: </span>Monitor approvals, inter-departmental NOCs, and disbursals across multiple administrative bodies using a single composite tracking ID.
          </li>
          <li>
            <span className="text-[18px] font-[480]">Tamper-Evident Auditability: </span>Every cross-department data query is cryptographically logged to guarantee departmental accountability and citizen data privacy.
          </li>
        </ul>
      </div>
      <div>
        <div className="text-[22px] font-semibold">Standards & State Alignments</div>
        <ul>
          <li><span className="text-[18px] font-[480]">Framework: </span>India Enterprise Architecture (IndEA 2.0).</li>
          <li><span className="text-[18px] font-[480]">Privacy Architecture: </span>Data Empowerment and Protection Architecture (DEPA).</li>
          <li><span className="text-[18px] font-[480]">Integrated Registries: </span>MahaBhulekh (Revenue & Land Records), Aaple Sarkar (Citizen Services), MAITRI (Single Window Clearance), and Social Welfare Subsidies Engine.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutSetu;
