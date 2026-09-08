import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    ticketId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("ContactMessage", contactMessageSchema);