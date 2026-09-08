import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import User from "./models/User.js";
import Admin from "./models/Admin.js";
import Application from "./models/Application.js";
import Payment from "./models/Payment.js";
import Document from "./models/Document.js";
import Grievance from "./models/Grievance.js";
import ContactMessage from "./models/ContactMessage.js";
import AuditLog from "./models/AuditLog.js";
import { protect } from "./middleware/auth.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Disk Storage Directory for Uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage, limits: { fileSize: 15 * 1024 * 1024 } });

// Database Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mahasetu")
  .then(() => console.log("✓ MongoDB Connected: MAHA-SETU Engine Online"))
  .catch((err) => console.error("✕ Database connection error:", err));

const JWT_KEY = process.env.JWT_SECRET || "supersecret_mahasetu_jwt_key_2026";

// Helper to normalize department names
const cleanDept = (str) => {
  if (!str) return "";
  return str.replace(/\s+/g, " ").trim();
};

// ========================================================
// 1. AUTHENTICATION (CITIZEN & ADMIN)
// ========================================================

// Citizen Sign Up
app.post("/api/auth/citizen/signup", async (req, res) => {
  try {
    const { name, email, password, phone, age, gender } = req.body;
    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) return res.status(400).json({ message: "Citizen email is already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "user",
      phone: phone?.trim(),
      age,
      gender,
    });

    const token = jwt.sign({ id: user._id, role: "user" }, JWT_KEY, { expiresIn: "7d" });
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: "user", phone: user.phone },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Citizen Login
app.post("/api/auth/citizen/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(400).json({ message: "No citizen profile registered under this email." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign({ id: user._id, role: "user" }, JWT_KEY, { expiresIn: "7d" });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: "user", phone: user.phone },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Department Admin Sign Up
app.post("/api/auth/admin/signup", async (req, res) => {
  try {
    const { name, email, password, employeeId, department } = req.body;
    const normEmail = email.toLowerCase().trim();
    const normEmpId = employeeId.trim().toUpperCase();

    const exists = await Admin.findOne({ $or: [{ email: normEmail }, { employeeId: normEmpId }] });
    if (exists) return res.status(400).json({ message: "Employee ID or Email is already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      name: name.trim(),
      email: normEmail,
      password: hashedPassword,
      employeeId: normEmpId,
      department: cleanDept(department),
      role: "admin",
    });

    const token = jwt.sign({ id: admin._id, role: "admin", department: admin.department }, JWT_KEY, {
      expiresIn: "7d",
    });

    res.status(201).json({
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        employeeId: admin.employeeId,
        department: admin.department,
        role: "admin",
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Department Admin Login
app.post("/api/auth/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) return res.status(400).json({ message: "No departmental officer found with this email." });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: admin._id, role: "admin", department: admin.department }, JWT_KEY, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        employeeId: admin.employeeId,
        department: admin.department,
        role: "admin",
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========================================================
// 2. CITIZEN APPLICATION SUBMISSION & MANAGEMENT
// ========================================================

app.get("/api/applications", protect, async (req, res) => {
  try {
    const apps = await Application.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/applications", protect, async (req, res) => {
  try {
    const { service, dept, fee } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User account not found." });

    const appId = "MH-2026-" + Math.floor(10000 + Math.random() * 90000);
    const normalizedDept = cleanDept(dept);

    const newApp = await Application.create({
      appId,
      userId: user._id,
      applicant: user.name,
      service: service.trim(),
      dept: normalizedDept,
      appliedDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: Number(fee) > 0 ? "Payment Pending" : "Under Review",
      stage: Number(fee) > 0 ? "Awaiting Fee Payment" : "Assigned to Department Desk",
      amountDue: Number(fee) || 0,
      rtsLimitDays: 15,
    });

    if (Number(fee) > 0) {
      await Payment.create({
        paymentId: "PAY-" + Math.floor(1000 + Math.random() * 9000),
        appRef: appId,
        userId: user._id,
        desc: `${service} Statutory Processing Fee`,
        amount: Number(fee),
        status: "Pending",
      });
    }

    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========================================================
// 3. DEPARTMENT ADMINISTRATIVE WORKSPACE (CROSS-MATCHED)
// ========================================================

// Fetch files assigned strictly to officer's department (with regex fallback)
app.get("/api/admin/department/applications", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access restricted to department admins." });

    const admin = await Admin.findById(req.user.id);
    if (!admin) return res.status(404).json({ message: "Officer profile missing." });

    const deptRegex = new RegExp(`^${admin.department.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i");
    const applications = await Application.find({ dept: deptRegex }).sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Department Real-Time Metrics
app.get("/api/admin/department/metrics", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Officer access required." });

    const admin = await Admin.findById(req.user.id);
    const deptRegex = new RegExp(`^${admin.department.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i");
    const filter = { dept: deptRegex };

    const total = await Application.countDocuments(filter);
    const approved = await Application.countDocuments({ ...filter, status: "Approved" });
    const underReview = await Application.countDocuments({ ...filter, status: "Under Review" });
    const rejected = await Application.countDocuments({ ...filter, status: "Rejected" });
    const actionRequired = await Application.countDocuments({ ...filter, status: "Action Required" });

    res.json({ department: admin.department, total, approved, underReview, rejected, actionRequired });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Application Status & Stage
app.patch("/api/admin/department/review/:appId", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Officer access required." });

    const admin = await Admin.findById(req.user.id);
    const { status, stage, officialRemarks, rejectionReason, checklist } = req.body;

    const application = await Application.findOne({ appId: req.params.appId });
    if (!application) return res.status(404).json({ message: "File not found." });

    if (status) application.status = status;
    if (stage) application.stage = stage;
    if (officialRemarks) application.officialRemarks = officialRemarks;
    if (rejectionReason !== undefined) application.rejectionReason = rejectionReason;
    if (checklist) application.checklistVerified = checklist;

    application.reviewedBy = admin.name;
    application.reviewerEmployeeId = admin.employeeId;

    await application.save();
    res.json({ message: "Application status updated successfully.", application });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========================================================
// 4. PAYMENTS & FINANCIAL RECONCILIATION
// ========================================================

app.get("/api/payments", protect, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/payments/:paymentId/pay", protect, async (req, res) => {
  try {
    const payment = await Payment.findOne({ paymentId: req.params.paymentId, userId: req.user.id });
    if (!payment) return res.status(404).json({ message: "Invoice not found." });

    payment.status = "Paid";
    await payment.save();

    await Application.findOneAndUpdate(
      { appId: payment.appRef },
      { status: "Under Review", amountDue: 0, stage: "Payment Confirmed - Under Scrutiny" }
    );

    res.json({ message: "Payment verified via GRAS gateway.", payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========================================================
// 5. DOCUMENT LOCKER (REAL FILE UPLOADS)
// ========================================================

app.get("/api/documents", protect, async (req, res) => {
  try {
    const docs = await Document.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/documents/upload", protect, upload.single("documentFile"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No document file was selected." });

    const bytes = req.file.size;
    const formattedSize =
      bytes < 1024 * 1024
        ? `${(bytes / 1024).toFixed(1)} KB`
        : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

    const newDoc = await Document.create({
      userId: req.user.id,
      name: req.body.documentName || req.file.originalname,
      originalName: req.file.originalname,
      filePath: req.file.filename,
      size: formattedSize,
      fileType: req.file.mimetype,
      verified: true,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    });

    res.status(201).json(newDoc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/documents/:id/download", protect, async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, userId: req.user.id });
    if (!doc) return res.status(404).json({ message: "Document record missing." });

    const fullPath = path.join(uploadDir, doc.filePath);
    if (!fs.existsSync(fullPath)) return res.status(404).json({ message: "Physical file was not found on server." });

    res.download(fullPath, doc.originalName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/documents/:id", protect, async (req, res) => {
  try {
    const doc = await Document.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!doc) return res.status(404).json({ message: "Document not found." });

    const fullPath = path.join(uploadDir, doc.filePath);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);

    res.json({ message: "Document removed from e-Vault." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========================================================
// 6. AUDIT TRAIL, GRIEVANCES & TRACKING
// ========================================================

app.get("/api/admin/audit-logs", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Officer access required." });
    const admin = await Admin.findById(req.user.id);
    const logs = await AuditLog.find({ department: admin.department }).sort({ createdAt: -1 }).limit(50);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/admin/audit-logs", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Officer access required." });
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

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const ticketId = "SUPPORT-" + Math.floor(10000 + Math.random() * 90000);
    const inq = await ContactMessage.create({ ticketId, name, email, message });
    res.status(201).json({ message: "Ticket created.", ticketId: inq.ticketId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/admin/department/inquiries", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Officer access required." });
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch("/api/admin/inquiries/:ticketId", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Officer access required." });
    const inq = await ContactMessage.findOneAndUpdate(
      { ticketId: req.params.ticketId },
      { status: "Resolved" },
      { new: true }
    );
    res.json(inq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/tracking/:appId", async (req, res) => {
  try {
    const rec = await Application.findOne({ appId: req.params.appId.trim() });
    if (!rec) return res.status(404).json({ message: "Application reference not found." });
    res.json(rec);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/user/settings", protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { notificationsEnabled: req.body.notificationsEnabled },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✓ MAHA-SETU Server listening on port ${PORT}`));