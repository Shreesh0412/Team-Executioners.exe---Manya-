import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFolderOpen,
  FaFilePdf,
  FaCloudUploadAlt,
  FaGraduationCap,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { getFolders, getRecentDocuments, getSessionUser } from "../api";

function Dashboard() {
  const [folders, setFolders] = useState([]);
  const [recentDocs, setRecentDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = getSessionUser();
  const firstName = user?.name ? user.name.split(" ")[0] : "there";

  useEffect(() => {
    async function loadData() {
      try {
        const [folderRes, docRes] = await Promise.all([
          getFolders(),
          getRecentDocuments(),
        ]);

        setFolders(folderRes.data);
        setRecentDocs(docRes.data);
      } catch (err) {
        console.error(err);
        setError("Couldn't load your dashboard. Is the backend running?");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="app-shell flex">
      <Sidebar />

      <div className="main">
        <motion.div
          className="page-head"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h1>Welcome back, {firstName} 👋</h1>
            <p>Here's what's happening in your workspace.</p>
          </div>

          <Link to="/organizer">
            <button className="btn">
              <FaCloudUploadAlt /> Upload a document
            </button>
          </Link>
        </motion.div>

        {error && <p className="error-text" style={{ marginBottom: 20 }}>{error}</p>}

        <div className="grid" style={{ marginBottom: 40 }}>
          <Card title="Folders" value={loading ? "…" : folders.length} icon={<FaFolderOpen />} tone="violet" />
          <Card title="Recent Documents" value={loading ? "…" : recentDocs.length} icon={<FaFilePdf />} tone="sky" />
          <Card title="Signed in as" value={user?.name || "Guest"} icon={<FaGraduationCap />} tone="pink" />
        </div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 style={{ marginBottom: 20 }}>Recent Documents</h2>

          {loading ? (
            <p style={{ color: "var(--ink-faint)" }}>Loading…</p>
          ) : recentDocs.length === 0 ? (
            <div className="empty-state">
              <div className="feature-icon icon-violet" style={{ display: "inline-flex" }}>
                <FaFilePdf />
              </div>
              <p>No documents yet. Upload your first PDF from the Organizer.</p>
              <Link to="/organizer">
                <button className="btn btn-sm" style={{ marginTop: 16 }}>
                  Go to Organizer
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid">
              {recentDocs.map((doc) => (
                <Link to={`/viewer/${doc.id}`} key={doc.id}>
                  <div className="card doc-card">
                    <div className="doc-icon">
                      <FaFilePdf />
                    </div>
                    <div>
                      <h3 style={{ fontSize: 15 }}>{doc.title}</h3>
                      <div className="doc-meta">
                        {doc.subject || "No subject"} ·{" "}
                        {new Date(doc.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
