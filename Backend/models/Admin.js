import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    employeeId: { type: String, required: true, unique: true },
    department: {
      type: String,
      required: true,
      enum: [
        "Revenue and Forest Department",
        "Labour Department",
        "Social Justice Department",
        "Public Health Department",
        "Agriculture Department",
      ],
    },
    designation: { type: String, default: "Desk Officer / Scrutiny In-Charge" },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);