import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Landing() {
  return (
    <>
      <div className="gradient">
        <Navbar />

        <div className="container hero">
          <div style={{ flex: 1 }}>
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Study Smarter with AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Organize your notes, upload PDFs, generate quizzes,
              summaries, flashcards and get an AI-powered study
              schedule.
            </motion.p>

            <Link to="/login">
              <button className="btn">
                Get Started
              </button>
            </Link>
          </div>

          {/* Hero Illustration Placeholder */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              className="card center"
              style={{
                width: "420px",
                height: "320px",
                fontSize: "28px",
                fontWeight: "bold",
                background:
                  "linear-gradient(135deg,#BDE0FE,#D8F3DC,#FFF3B0,#FFC8DD)"
              }}
            >
              📚 CourseMate
            </div>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{ padding: "80px 0" }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "50px"
          }}
        >
          Features
        </h1>

        <div className="grid">
          <div className="card">
            <h2>📂 Organizer</h2>
            <p>Store all your PDFs neatly.</p>
          </div>

          <div className="card">
            <h2>🤖 AI Planner</h2>
            <p>Automatically creates study plans.</p>
          </div>

          <div className="card">
            <h2>📝 Flashcards</h2>
            <p>Generate flashcards instantly.</p>
          </div>

          <div className="card">
            <h2>📊 Quiz</h2>
            <p>Practice using AI-generated quizzes.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;