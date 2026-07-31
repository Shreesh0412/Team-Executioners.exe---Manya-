import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaFilePdf,
  FaClipboardList,
  FaLayerGroup,
  FaQuestionCircle,
  FaChevronLeft,
  FaChevronRight,
  FaSyncAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import {
  getDocument,
  getDocumentText,
  getDocumentFileUrl,
  getSummary,
  generateSummary,
  getFlashcards,
  generateFlashcards,
  getQuiz,
  generateQuiz,
} from "../api";

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function ToolCard({ icon, iconClass, title, description, accentBtn, children, badge }) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column" }}>
      {badge && (
        <span className="locked-badge" style={{ background: "var(--violet-light)", color: "var(--violet-dark)" }}>
          {badge}
        </span>
      )}
      <div className={`feature-icon ${iconClass}`}>{icon}</div>
      <h3 style={{ marginBottom: 6 }}>{title}</h3>
      <p style={{ color: "var(--ink-soft)", fontSize: 14, marginBottom: 16, flexGrow: 1 }}>
        {description}
      </p>
      {children}
    </div>
  );
}

function GenerateButton({ onClick, loading, label = "Generate", className = "btn btn-sm" }) {
  return (
    <button className={className} onClick={onClick} disabled={loading}>
      {loading ? (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <span className="spinner" /> Generating…
        </span>
      ) : (
        label
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Summary panel                                                             */
/* -------------------------------------------------------------------------- */

function SummaryPanel({ docId, canGenerate }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function check() {
      try {
        const res = await getSummary(docId);
        if (!ignore) setSummary(res.data);
      } catch {
        // no summary yet — that's fine
      } finally {
        if (!ignore) setChecked(true);
      }
    }
    check();
    return () => {
      ignore = true;
    };
  }, [docId]);

  async function handleGenerate(regenerate = false) {
    setLoading(true);
    setError("");
    try {
      const res = await generateSummary(docId, { regenerate });
      setSummary(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Couldn't generate a summary.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolCard
      icon={<FaClipboardList />}
      iconClass="icon-sky"
      title="Summary"
      description={
        summary
          ? "An AI-generated summary of this document."
          : "Generate a concise study summary of this document."
      }
    >
      {error && <p className="error-text" style={{ marginBottom: 10 }}>{error}</p>}

      {summary ? (
        <>
          <div
            style={{
              background: "var(--surface-alt)",
              borderRadius: "var(--radius-md)",
              padding: 16,
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--ink-soft)",
              whiteSpace: "pre-wrap",
              maxHeight: 220,
              overflowY: "auto",
              marginBottom: 14,
            }}
          >
            {summary.content}
          </div>
          <button className="btn btn-sm btn-outline" onClick={() => handleGenerate(true)} disabled={loading}>
            {loading ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span className="spinner" /> Regenerating…
              </span>
            ) : (
              <>
                <FaSyncAlt style={{ marginRight: 6 }} /> Regenerate
              </>
            )}
          </button>
        </>
      ) : (
        <GenerateButton
          onClick={() => handleGenerate(false)}
          loading={loading || !checked}
          className="btn btn-sm"
        />
      )}

      {!canGenerate && !summary && (
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", marginTop: 10 }}>
          No extracted text is available for this document yet.
        </p>
      )}
    </ToolCard>
  );
}

/* -------------------------------------------------------------------------- */
/*  Flashcards panel                                                          */
/* -------------------------------------------------------------------------- */

function FlashcardsPanel({ docId, canGenerate }) {
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function check() {
      try {
        const res = await getFlashcards(docId);
        if (!ignore && res.data.flashcards?.length) {
          setCards(res.data.flashcards);
        }
      } catch {
        // none yet
      } finally {
        if (!ignore) setChecked(true);
      }
    }
    check();
    return () => {
      ignore = true;
    };
  }, [docId]);

  async function handleGenerate(regenerate = false) {
    setLoading(true);
    setError("");
    try {
      const res = await generateFlashcards(docId, { regenerate, count: 10 });
      setCards(res.data.flashcards || []);
      setIndex(0);
      setFlipped(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Couldn't generate flashcards.");
    } finally {
      setLoading(false);
    }
  }

  const current = cards[index];

  return (
    <ToolCard
      icon={<FaLayerGroup />}
      iconClass="icon-pink"
      title="Flashcards"
      description={
        cards.length
          ? `Card ${index + 1} of ${cards.length}. Click the card to flip it.`
          : "Generate flashcards from this document to help you memorize key concepts."
      }
    >
      {error && <p className="error-text" style={{ marginBottom: 10 }}>{error}</p>}

      {cards.length > 0 ? (
        <>
          <div
            onClick={() => setFlipped((f) => !f)}
            style={{
              background: flipped ? "var(--violet-light)" : "var(--surface-alt)",
              borderRadius: "var(--radius-md)",
              padding: 20,
              minHeight: 110,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: 14.5,
              fontWeight: 500,
              color: "var(--ink)",
              cursor: "pointer",
              marginBottom: 12,
              userSelect: "none",
            }}
            title="Click to flip"
          >
            {flipped ? current?.answer : current?.question}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <button
              className="icon-btn"
              onClick={() => {
                setFlipped(false);
                setIndex((i) => (i - 1 + cards.length) % cards.length);
              }}
              aria-label="Previous card"
            >
              <FaChevronLeft />
            </button>
            <span style={{ fontSize: 12.5, color: "var(--ink-faint)" }}>
              {index + 1} / {cards.length}
            </span>
            <button
              className="icon-btn"
              onClick={() => {
                setFlipped(false);
                setIndex((i) => (i + 1) % cards.length);
              }}
              aria-label="Next card"
            >
              <FaChevronRight />
            </button>
          </div>

          <button className="btn btn-sm btn-outline" onClick={() => handleGenerate(true)} disabled={loading}>
            {loading ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span className="spinner" /> Regenerating…
              </span>
            ) : (
              <>
                <FaSyncAlt style={{ marginRight: 6 }} /> Regenerate
              </>
            )}
          </button>
        </>
      ) : (
        <GenerateButton
          onClick={() => handleGenerate(false)}
          loading={loading || !checked}
          className="btn btn-sm btn-pink"
        />
      )}

      {!canGenerate && cards.length === 0 && (
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", marginTop: 10 }}>
          No extracted text is available for this document yet.
        </p>
      )}
    </ToolCard>
  );
}

/* -------------------------------------------------------------------------- */
/*  Quiz panel                                                                */
/* -------------------------------------------------------------------------- */

function QuizPanel({ docId, canGenerate }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function check() {
      try {
        const res = await getQuiz(docId);
        if (!ignore) setQuiz(res.data);
      } catch {
        // none yet
      } finally {
        if (!ignore) setChecked(true);
      }
    }
    check();
    return () => {
      ignore = true;
    };
  }, [docId]);

  async function handleGenerate(regenerate = false) {
    setLoading(true);
    setError("");
    try {
      const res = await generateQuiz(docId, { regenerate, count: 5 });
      setQuiz(res.data);
      setAnswers({});
      setSubmitted(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Couldn't generate a quiz.");
    } finally {
      setLoading(false);
    }
  }

  function selectAnswer(questionId, letter) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: letter }));
  }

  const score =
    quiz && submitted
      ? quiz.questions.filter((q) => answers[q.id] === q.correct_answer).length
      : null;

  return (
    <ToolCard
      icon={<FaQuestionCircle />}
      iconClass="icon-mint"
      title="Quiz"
      description={
        quiz
          ? `${quiz.questions.length} question${quiz.questions.length === 1 ? "" : "s"} — test what you've learned.`
          : "Generate a quiz to test your understanding of this document."
      }
    >
      {error && <p className="error-text" style={{ marginBottom: 10 }}>{error}</p>}

      {quiz ? (
        <>
          <div style={{ maxHeight: 320, overflowY: "auto", marginBottom: 14, paddingRight: 4 }}>
            {quiz.questions.map((q, qi) => {
              const options = [
                ["A", q.option_a],
                ["B", q.option_b],
                ["C", q.option_c],
                ["D", q.option_d],
              ];
              const selected = answers[q.id];

              return (
                <div key={q.id} style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                    {qi + 1}. {q.question}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {options.map(([letter, text]) => {
                      const isSelected = selected === letter;
                      const isCorrect = q.correct_answer === letter;
                      let bg = "var(--surface-alt)";
                      let icon = null;

                      if (submitted) {
                        if (isCorrect) {
                          bg = "#DCFCE7";
                          icon = <FaCheckCircle color="#15803D" />;
                        } else if (isSelected && !isCorrect) {
                          bg = "#FEE2E2";
                          icon = <FaTimesCircle color="#DC2626" />;
                        }
                      } else if (isSelected) {
                        bg = "var(--violet-light)";
                      }

                      return (
                        <button
                          key={letter}
                          onClick={() => selectAnswer(q.id, letter)}
                          disabled={submitted}
                          style={{
                            textAlign: "left",
                            padding: "9px 12px",
                            borderRadius: 10,
                            border: "1px solid var(--border)",
                            background: bg,
                            fontSize: 13.5,
                            cursor: submitted ? "default" : "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span>
                            <strong>{letter}.</strong> {text}
                          </span>
                          {icon}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {submitted ? (
            <>
              <p style={{ fontWeight: 700, marginBottom: 10 }}>
                Score: {score} / {quiz.questions.length}
              </p>
              <button className="btn btn-sm btn-outline" onClick={() => handleGenerate(true)} disabled={loading}>
                {loading ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span className="spinner" /> Regenerating…
                  </span>
                ) : (
                  <>
                    <FaSyncAlt style={{ marginRight: 6 }} /> New Quiz
                  </>
                )}
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm"
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length < quiz.questions.length}
            >
              Submit Answers
            </button>
          )}
        </>
      ) : (
        <GenerateButton
          onClick={() => handleGenerate(false)}
          loading={loading || !checked}
          className="btn btn-sm"
        />
      )}

      {!canGenerate && !quiz && (
        <p style={{ fontSize: 12.5, color: "var(--ink-faint)", marginTop: 10 }}>
          No extracted text is available for this document yet.
        </p>
      )}
    </ToolCard>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main Viewer                                                               */
/* -------------------------------------------------------------------------- */

function Viewer() {
  const { id } = useParams();

  const [doc, setDoc] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("pdf"); // "pdf" | "text"

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      try {
        const docRes = await getDocument(id);
        setDoc(docRes.data);

        if (docRes.data.extracted) {
          try {
            const textRes = await getDocumentText(id);
            setText(textRes.data.text);
          } catch (textErr) {
            console.error(textErr);
          }
        }

        setViewMode(docRes.data.file_url ? "pdf" : "text");
      } catch (err) {
        console.error(err);
        setError("Couldn't load this document.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  const fileUrl = doc ? getDocumentFileUrl(doc) : null;
  const hasExtractedText = Boolean(text && text !== "No extractable text found in this PDF.");

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
            {fileUrl && hasExtractedText && (
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                <button
                  className={`btn btn-sm ${viewMode === "pdf" ? "" : "btn-outline"}`}
                  onClick={() => setViewMode("pdf")}
                >
                  PDF View
                </button>
                <button
                  className={`btn btn-sm ${viewMode === "text" ? "" : "btn-outline"}`}
                  onClick={() => setViewMode("text")}
                >
                  Extracted Text
                </button>
              </div>
            )}

            <div className="reader-pane" style={{ marginBottom: 28, padding: viewMode === "pdf" && fileUrl ? 0 : 28 }}>
              {viewMode === "pdf" && fileUrl ? (
                <iframe
                  src={fileUrl}
                  title={doc?.title || "PDF preview"}
                  style={{
                    width: "100%",
                    height: "620px",
                    border: "none",
                    borderRadius: "var(--radius-md)",
                  }}
                />
              ) : hasExtractedText ? (
                text
              ) : (
                <div className="empty-state" style={{ padding: "40px 0" }}>
                  <div className="feature-icon icon-violet" style={{ display: "inline-flex" }}>
                    <FaFilePdf />
                  </div>
                  <p>
                    {fileUrl
                      ? "No extracted text is available for this document. You can still view the raw PDF above."
                      : "No preview is available for this document yet."}
                  </p>
                </div>
              )}
            </div>

            <div className="grid">
              <SummaryPanel docId={id} canGenerate={hasExtractedText} />
              <FlashcardsPanel docId={id} canGenerate={hasExtractedText} />
              <QuizPanel docId={id} canGenerate={hasExtractedText} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Viewer;
