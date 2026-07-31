import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFolderOpen,
  FaFilePdf,
  FaCloudUploadAlt,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import {
  getFolders,
  createFolder,
  deleteFolder,
  getDocuments,
  uploadPDF,
  deleteDocument,
} from "../api";

function Organizer() {
  const [folders, setFolders] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [uploadFolder, setUploadFolder] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      const [folderRes, docRes] = await Promise.all([
        getFolders(),
        getDocuments(),
      ]);

      setFolders(folderRes.data);
      setDocuments(docRes.data);
    } catch (err) {
      console.error(err);
      setError("Couldn't load your folders and documents.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function addFolder() {
    if (!folderName.trim()) return;

    try {
      await createFolder({ name: folderName.trim() });
      setFolderName("");
      loadData();
    } catch (err) {
      console.error(err);
      setError("Couldn't create that folder.");
    }
  }

  async function removeFolder(id) {
    try {
      await deleteFolder(id);
      if (selectedFolder === String(id)) setSelectedFolder("all");
      loadData();
    } catch (err) {
      console.error(err);
      setError("Couldn't delete that folder.");
    }
  }

  async function removeDocument(id) {
    try {
      await deleteDocument(id);
      loadData();
    } catch (err) {
      console.error(err);
      setError("Couldn't delete that document.");
    }
  }

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setUploading(true);

    const formData = new FormData();
    // Backend requires a title — default to the filename minus extension.
    formData.append("title", file.name.replace(/\.pdf$/i, ""));
    formData.append("file", file);
    if (uploadFolder) formData.append("folder_id", uploadFolder);

    try {
      await uploadPDF(formData);
      await loadData();
    } catch (err) {
      console.error(err);
      setError("Upload failed. Only PDF files are supported.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const visibleDocs =
    selectedFolder === "all"
      ? documents
      : documents.filter((doc) => String(doc.folder_id) === selectedFolder);

  function formatSize(bytes) {
    if (!bytes && bytes !== 0) return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  }

  return (
    <div className="app-shell flex">
      <Sidebar />

      <div className="main">
        <div className="page-head">
          <div>
            <h1>Organizer</h1>
            <p>Group your material into folders and upload new PDFs.</p>
          </div>
        </div>

        {error && <p className="error-text" style={{ marginBottom: 20 }}>{error}</p>}

        <div className="grid" style={{ gridTemplateColumns: "1.1fr 1fr", marginBottom: 32 }}>
          <div className="card">
            <h3 style={{ marginBottom: 16 }}>New folder</h3>
            <div className="flex" style={{ gap: 10 }}>
              <input
                placeholder="e.g. Operating Systems"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addFolder()}
              />
              <button className="btn btn-sky" style={{ flexShrink: 0 }} onClick={addFolder}>
                <FaPlus /> Add
              </button>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: 16 }}>Upload a PDF</h3>
            <select value={uploadFolder} onChange={(e) => setUploadFolder(e.target.value)}>
              <option value="">No folder (root)</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>

            <label className="file-drop" style={{ marginTop: 8 }}>
              <FaCloudUploadAlt style={{ marginRight: 8 }} />
              {uploading ? "Uploading…" : "Click or drop a PDF here"}
              <input type="file" accept=".pdf" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>
        </div>

        <div className="flex" style={{ gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
          <button
            className={`folder-chip${selectedFolder === "all" ? " active" : ""}`}
            onClick={() => setSelectedFolder("all")}
          >
            <FaFolderOpen /> All Documents
          </button>

          {folders.map((folder) => (
            <button
              key={folder.id}
              className={`folder-chip${selectedFolder === String(folder.id) ? " active" : ""}`}
              onClick={() => setSelectedFolder(String(folder.id))}
            >
              <FaFolderOpen /> {folder.name}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  removeFolder(folder.id);
                }}
                style={{ opacity: 0.6, marginLeft: 4 }}
              >
                <FaTrash size={11} />
              </span>
            </button>
          ))}
        </div>

        <h2 style={{ marginBottom: 18 }}>Documents</h2>

        {loading ? (
          <p style={{ color: "var(--ink-faint)" }}>Loading…</p>
        ) : visibleDocs.length === 0 ? (
          <div className="card empty-state">
            <div className="feature-icon icon-pink" style={{ display: "inline-flex" }}>
              <FaFilePdf />
            </div>
            <p>No documents in this view yet. Upload a PDF above to get started.</p>
          </div>
        ) : (
          <div className="grid">
            {visibleDocs.map((doc) => (
              <motion.div
                className="card doc-card"
                key={doc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="doc-icon">
                  <FaFilePdf />
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15 }}>{doc.title}</h3>
                  <div className="doc-meta">
                    {doc.subject || "No subject"} · {formatSize(doc.file_size)}
                  </div>

                  <div className="doc-actions">
                    <Link to={`/viewer/${doc.id}`}>
                      <button className="btn btn-sm">Open</button>
                    </Link>
                    <button className="btn btn-sm btn-danger" onClick={() => removeDocument(doc.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Organizer;
