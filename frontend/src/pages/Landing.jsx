import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFolderOpen,
  FaRobot,
  FaLayerGroup,
  FaClipboardCheck,
  FaMagic,
  FaBolt,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function Landing() {
  return (
    <>
      <div className="hero-section">
        <div className="blob-field">
          <div className="blob blob-violet" />
          <div className="blob blob-sky" />
          <div className="blob blob-pink" />
        </div>

        <Navbar />

        <div className="container hero">
          <motion.div
            className="hero-copy"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-eyebrow">
              <FaMagic /> AI-powered studying, organized
            </div>

            <h1>
              Study smarter <span className="accent">with CourseMate</span>
            </h1>

            <p>
              Keep every PDF, note, and deadline in one calm workspace —
              then let AI turn your material into summaries, flashcards,
              and quizzes.
            </p>

            <div className="hero-actions">
              <Link to="/signup">
                <button className="btn">Get Started Free</button>
              </Link>

              <Link to="/login">
                <button className="btn btn-outline">I already have an account</button>
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <strong>1 place</strong>
                <span>For every course PDF</span>
              </div>
              <div className="hero-stat">
                <strong>Instant</strong>
                <span>Folders &amp; uploads</span>
              </div>
              <div className="hero-stat">
                <strong>Zero</strong>
                <span>Clutter</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-media"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="video-frame">
              <video
                src="/media/intro.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>

            <div className="video-badge">
              <span className="video-badge-dot" />
              See it in action
            </div>

            <div className="floating-chip chip-top">
              <FaClipboardCheck color="#7C3AED" /> Quiz generated
            </div>

            <div className="floating-chip chip-bottom">
              <FaLayerGroup color="#F472B6" /> 3 folders synced
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section container">
        <div className="section-head">
          <span className="section-eyebrow">Features</span>
          <h2>Everything your study workflow needs</h2>
          <p>
            From the first upload to the last revision session, CourseMate
            keeps your material organized and ready to review.
          </p>
        </div>

        <div className="grid">
          <motion.div
            className="card feature-card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
          >
            <div className="feature-icon icon-violet">
              <FaFolderOpen />
            </div>
            <h3>Organizer</h3>
            <p>Sort every PDF into folders by course, subject, or semester.</p>
          </motion.div>

          <motion.div
            className="card feature-card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="feature-icon icon-sky">
              <FaRobot />
            </div>
            <h3>AI Study Plans</h3>
            <p>Turn a stack of notes into a study plan you'll actually follow.</p>
          </motion.div>

          <motion.div
            className="card feature-card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="feature-icon icon-pink">
              <FaLayerGroup />
            </div>
            <h3>Flashcards</h3>
            <p>Generate flashcards straight from your uploaded material.</p>
          </motion.div>

          <motion.div
            className="card feature-card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="feature-icon icon-mint">
              <FaBolt />
            </div>
            <h3>Quizzes</h3>
            <p>Practice with AI-generated quizzes built from your own notes.</p>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 100 }}>
        <motion.div
          className="cta-band"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to organize your semester?</h2>
          <p>Create your free CourseMate account in under a minute.</p>
          <Link to="/signup">
            <button className="btn">Create Free Account</button>
          </Link>
        </motion.div>
      </div>

      <footer>© {new Date().getFullYear()} CourseMate. Built for focused studying.</footer>
    </>
  );
}

export default Landing;
