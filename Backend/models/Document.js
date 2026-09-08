import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    originalName: { type: String, required: true },
    filePath: { type: String, required: true },
    size: { type: String, default: "Unknown" },
    fileType: { type: String, default: "application/octet-stream" },
    verified: { type: Boolean, default: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);