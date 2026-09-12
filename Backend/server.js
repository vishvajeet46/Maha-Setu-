import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import Admin from "./models/Admin.js";
import Application from "./models/Application.js";
import AuditLog from "./models/AuditLog.js";
import ContactMessage from "./models/ContactMessage.js";
import Document from "./models/Document.js";
import Grievance from "./models/Grievance.js";
import Payment from "./models/Payment.js";
import { protect } from "./middleware/auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret_mahasetu_jwt_key_2026";

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mahasetu")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ---------------- AUTH ROUTES ----------------
app.post("/api/auth/citizen/signup", async (req, res) => {
  try {
    const { name, email, password, phone, age, gender } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Citizen email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, phone, age, gender });
    const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/auth/citizen/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid citizen credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid citizen credentials." });

    const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/auth/admin/signup", async (req, res) => {
  try {
    const { name, email, password, employeeId, department } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: "Admin officer account already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashedPassword, employeeId, department });
    const token = jwt.sign(
      { id: admin._id, role: "admin", department: admin.department, employeeId: admin.employeeId },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.status(201).json({ token, user: admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/auth/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid officer credentials." });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid officer credentials." });

    const token = jwt.sign(
      { id: admin._id, role: "admin", department: admin.department, employeeId: admin.employeeId },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ token, user: admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------- APPLICATION ROUTES ----------------
app.post("/api/applications", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const appId = `MH-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const appRecord = await Application.create({
      appId,
      userId: req.user.id,
      applicant: req.body.applicantName || (user ? user.name : "Citizen Applicant"),
      service: req.body.service,
      dept: req.body.dept,
      appliedDate: new Date().toISOString().split("T")[0],
      amountDue: req.body.fee || 0,
      status: req.body.fee > 0 ? "Payment Pending" : "Under Review",
      stage: "Initial Scrutiny at Desk",
      formData: req.body.formData || {},
    });

    if (req.body.fee > 0) {
      await Payment.create({
        paymentId: `PAY-${Date.now().toString().slice(-6)}`,
        appRef: appId,
        userId: req.user.id,
        desc: `Statutory fee for ${req.body.service}`,
        amount: req.body.fee,
        status: "Pending",
      });
    }

    res.status(201).json(appRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/applications", protect, async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user.id }).sort({ createdAt: -1 }).lean();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/tracking/:appId", async (req, res) => {
  try {
    const appRecord = await Application.findOne({ appId: req.params.appId.trim() }).lean();
    if (!appRecord) return res.status(404).json({ message: "Application ID not recognized." });
    res.json(appRecord);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------- ADMIN ENDPOINTS ----------------
app.get("/api/admin/department/applications", protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(403).json({ message: "Desk access forbidden." });

    const apps = await Application.find({ dept: admin.department }).sort({ createdAt: -1 }).lean();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/admin/department/metrics", protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(403).json({ message: "Desk access forbidden." });

    const total = await Application.countDocuments({ dept: admin.department });
    const approved = await Application.countDocuments({ dept: admin.department, status: "Approved" });
    const underReview = await Application.countDocuments({ dept: admin.department, status: "Under Review" });
    const rejected = await Application.countDocuments({ dept: admin.department, status: "Rejected" });
    const actionRequired = await Application.countDocuments({ dept: admin.department, status: "Action Required" });

    res.json({ total, approved, underReview, rejected, actionRequired });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch("/api/admin/department/review/:appId", protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(403).json({ message: "Unauthorized action." });

    const updated = await Application.findOneAndUpdate(
      { appId: req.params.appId, dept: admin.department },
      {
        status: req.body.status,
        stage: req.body.stage,
        officialRemarks: req.body.officialRemarks,
        rejectionReason: req.body.rejectionReason,
        checklistVerified: req.body.checklist,
        reviewedBy: admin.name,
        reviewerEmployeeId: admin.employeeId,
      },
      { new: true }
    ).lean();

    if (!updated) {
      return res.status(404).json({ message: "Application file not found in your department desk." });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------- CONTACT, INQUIRY & AUDIT ROUTES ----------------
app.post("/api/contact", async (req, res) => {
  try {
    const ticketId = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = await ContactMessage.create({
      ticketId,
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/grievance", protect, async (req, res) => {
  try {
    const ticketId = `GRV-${Math.floor(100000 + Math.random() * 900000)}`;
    const item = await Grievance.create({
      ticketId,
      userId: req.user.id,
      category: req.body.category,
      problem: req.body.problem,
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/admin/department/inquiries", protect, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch("/api/admin/inquiries/:ticketId", protect, async (req, res) => {
  try {
    const inq = await ContactMessage.findOneAndUpdate(
      { ticketId: req.params.ticketId },
      { status: "Resolved" },
      { new: true }
    ).lean();
    res.json(inq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/admin/audit-logs", protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    const logs = await AuditLog.find({ department: admin.department }).sort({ timestamp: -1 }).lean();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/admin/audit-logs", protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id);
    const log = await AuditLog.create({
      officerName: admin.name,
      employeeId: admin.employeeId,
      department: admin.department,
      action: req.body.action,
      targetAppId: req.body.targetAppId,
      details: req.body.details,
    });
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------- PAYMENTS & SETTINGS ----------------
app.get("/api/payments", protect, async (req, res) => {
  const p = await Payment.find({ userId: req.user.id }).lean();
  res.json(p);
});

app.post("/api/payments/:paymentId/pay", protect, async (req, res) => {
  const payment = await Payment.findOneAndUpdate({ paymentId: req.params.paymentId }, { status: "Paid" }, { new: true });
  if (payment) {
    await Application.findOneAndUpdate({ appId: payment.appRef }, { status: "Under Review", stage: "Scrutiny in Progress" });
  }
  res.json({ success: true });
});

app.put("/api/user/settings", protect, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { notificationsEnabled: req.body.notificationsEnabled }, { new: true });
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});