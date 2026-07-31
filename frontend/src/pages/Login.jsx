import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaGraduationCap } from "react-icons/fa";
import { login, saveSession } from "../api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login({ email, password });
      saveSession(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail
          ? String(err.response.data.detail)
          : "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="center-page">
      <div className="blob-field">
        <div className="blob blob-violet" />
        <div className="blob blob-pink" />
      </div>

      <motion.div
        className="card auth-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="logo flex" style={{ alignItems: "center", gap: 8, marginBottom: 24 }}>
          <FaGraduationCap />
          CourseMate
        </Link>

        <span className="auth-eyebrow">Welcome back</span>
        <h2>Log in to your account</h2>
        <p className="auth-sub">Pick up right where you left off.</p>

        <form onSubmit={handleLogin}>
          <div className="field-group">
            <FaEnvelope className="field-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <FaLock className="field-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn btn-block" style={{ marginTop: 20 }} disabled={loading}>
            {loading && <span className="spinner" />}
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: "center", color: "var(--ink-soft)" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "var(--violet)", fontWeight: 600 }}>
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
