import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    appId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    applicant: { type: String, required: true },
    service: { type: String, required: true },
    dept: { type: String, required: true },
    appliedDate: { type: String, required: true },
    status: {
      type: String,
      enum: ["Under Review", "Payment Pending", "Approved", "Rejected", "Action Required"],
      default: "Under Review",
    },
    stage: { type: String, default: "Document Verification at Tehsil" },
    amountDue: { type: Number, default: 0 },
    rtsLimitDays: { type: Number, default: 15 },
    reviewedBy: { type: String, default: null },
    reviewerEmployeeId: { type: String, default: null },
    officialRemarks: { type: String, default: "Pending initial document inspection." },
    checklistVerified: {
      identityVerified: { type: Boolean, default: false },
      registryMatch: { type: Boolean, default: false },
      affidavitValid: { type: Boolean, default: false },
    },
    rejectionReason: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);