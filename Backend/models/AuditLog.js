import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    officerName: { type: String, required: true },
    employeeId: { type: String, required: true },
    department: { type: String, required: true },
    action: { type: String, required: true },
    targetAppId: { type: String, required: true },
    details: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);