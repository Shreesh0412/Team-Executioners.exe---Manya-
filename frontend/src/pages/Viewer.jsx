import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaFilePdf, FaClipboardList, FaLayerGroup, FaQuestionCircle } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import { getDocument, getDocumentText } from "../api";

function Viewer() {
  const { id } = useParams();

  const [doc, setDoc] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      try {
        const docRes = await getDocument(id);
        setDoc(docRes.data);

        if (docRes.data.extracted) {
          const textRes = await getDocumentText(id);
          setText(textRes.data.text);
        }
      } catch (err) {
        console.error(err);
        setError("Couldn't load this document.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return (
    <div className="app-shell flex">
      <Sidebar />

      <div className="main">
        <div className="page-head">
          <div>
            <h1>{loading ? "Loading…" : doc?.title || "Document"}</h1>
            <p>{doc?.subject || "PDF viewer & reading pane"}</p>
          </div>

          <Link to="/organizer">
            <button className="btn btn-outline">Back to Organizer</button>
          </Link>
        </div>

        {error && <p className="error-text" style={{ marginBottom: 20 }}>{error}</p>}

        {loading ? (
          <p style={{ color: "var(--ink-faint)" }}>Loading…</p>
        ) : (
          <>
            <div className="reader-pane" style={{ marginBottom: 28 }}>
              {text ? (
                text
              ) : (
                <div className="empty-state" style={{ padding: "40px 0" }}>
                  <div className="feature-icon icon-violet" style={{ display: "inline-flex" }}>
                    <FaFilePdf />
                  </div>
                  <p>
                    No extracted text is available for this document yet.
                    The raw PDF preview isn't wired up on the backend yet —
                    once the API serves the uploaded file, this pane can
                    embed it directly.
                  </p>
                </div>
              )}
            </div>

            <div className="grid">
              <div className="card locked-card">
                <span className="locked-badge">Coming soon</span>
                <div className="feature-icon icon-sky">
                  <FaClipboardList />
                </div>
                <h3 style={{ marginBottom: 6 }}>Summary</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: 14, marginBottom: 16 }}>
                  AI summaries need a backend endpoint that doesn't exist yet.
                </p>
                <button className="btn btn-sm" disabled>
                  Generate
                </button>
              </div>

              <div className="card locked-card">
                <span className="locked-badge">Coming soon</span>
                <div className="feature-icon icon-pink">
                  <FaLayerGroup />
                </div>
                <h3 style={{ marginBottom: 6 }}>Flashcards</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: 14, marginBottom: 16 }}>
                  Flashcard generation isn't exposed by the API yet.
                </p>
                <button className="btn btn-sm btn-pink" disabled>
                  Generate
                </button>
              </div>

              <div className="card locked-card">
                <span className="locked-badge">Coming soon</span>
                <div className="feature-icon icon-mint">
                  <FaQuestionCircle />
                </div>
                <h3 style={{ marginBottom: 6 }}>Quiz</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: 14, marginBottom: 16 }}>
                  Quiz generation isn't exposed by the API yet.
                </p>
                <button className="btn btn-sm" disabled>
                  Generate
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Viewer;
