import mongoose from "mongoose";

const grievanceSchema = new mongoose.Schema(
  {
    ticketId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: String, required: true },
    problem: { type: String, required: true },
    status: { type: String, default: "Under Investigation" },
  },
  { timestamps: true }
);

export default mongoose.model("Grievance", grievanceSchema);