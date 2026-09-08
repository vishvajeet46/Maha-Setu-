import { useState, useEffect, useRef } from "react";

export default function Documents() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [docLabel, setDocLabel] = useState("");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fileInputRef = useRef(null);
  const token = localStorage.getItem("mahasetu_token");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  const fetchDocs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/documents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) setDocs(data);
    } catch (err) {
      console.error("Error loading documents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setDocLabel(file.name.replace(/\.[^/.]+$/, ""));
      setShowUploadModal(true);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("documentFile", selectedFile);
    formData.append("documentName", docLabel || selectedFile.name);

    try {
      const res = await fetch("http://localhost:5000/api/documents/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to upload file");

      showToast(`Uploaded ${data.name} successfully!`);
      setShowUploadModal(false);
      setSelectedFile(null);
      setDocLabel("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchDocs();
    } catch (err) {
      alert(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadFile = async (docId, fileName) => {
    try {
      const res = await fetch(`http://localhost:5000/api/documents/${docId}/download`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Could not download file.");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "document.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert(err.message || "Download error");
    }
  };

  const handleDeleteFile = async (docId) => {
    if (!window.confirm("Remove this document from your e-Vault?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/documents/${docId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        showToast("Document deleted successfully.");
        fetchDocs();
      }
    } catch (err) {
      alert("Failed to delete document.");
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-50 p-6 md:p-8 space-y-6 font-sans">
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-sm flex items-center gap-2 border border-slate-700">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">DigiLocker & Document Locker</h1>
          <p className="text-xs text-slate-500 mt-1">
            Secured e-Vault for auto-verification across all Maharashtra certificates
          </p>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        />

        <button
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="bg-[#1b327b] hover:bg-blue-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer inline-flex items-center gap-2"
        >
          <span>+ Upload Document</span>
        </button>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">Upload Document to e-Vault</h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-5 space-y-4 text-xs">
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                <span className="text-slate-400 block font-semibold text-[11px]">Selected File</span>
                <span className="text-blue-900 font-bold truncate block">{selectedFile?.name}</span>
                <span className="text-slate-400 text-[10px]">
                  Size: {(selectedFile?.size / 1024).toFixed(1)} KB
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Document Title / Display Name
                </label>
                <input
                  type="text"
                  required
                  value={docLabel}
                  onChange={(e) => setDocLabel(e.target.value)}
                  placeholder="e.g. Ration Card, Electricity Bill, 7/12 Extract"
                  className="w-full border border-slate-200 rounded-xl p-2.5 outline-none focus:border-blue-900 text-slate-800 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-[#1b327b] text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-900 disabled:bg-slate-400 cursor-pointer"
                >
                  {uploading ? "Saving File..." : "Save to Locker"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-slate-400 text-sm">Loading secured vault...</div>
      ) : docs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {docs.map((doc) => (
            <div
              key={doc._id}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3 hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">{doc.size}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      doc.verified
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {doc.verified ? "Verified" : "Pending"}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-800 truncate" title={doc.name}>
                    {doc.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">
                    File: {doc.originalName}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Added: {doc.date}</span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleDownloadFile(doc._id, doc.originalName)}
                    className="bg-blue-50 text-blue-900 hover:bg-blue-100 px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDeleteFile(doc._id)}
                    className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-1.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <p className="text-slate-500 text-sm font-medium">Your digital document locker is empty.</p>
          <p className="text-xs text-slate-400">
            Click "+ Upload Document" to pick files from your computer.
          </p>
        </div>
      )}
    </div>
  );
}