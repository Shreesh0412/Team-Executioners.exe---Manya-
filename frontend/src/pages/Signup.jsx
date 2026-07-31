import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaGraduationCap } from "react-icons/fa";
import { register } from "../api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      navigate("/login");
    } catch (err) {
      const detail = err.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(detail.map((d) => d.msg).join(" "));
      } else if (detail) {
        setError(String(detail));
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="center-page">
      <div className="blob-field">
        <div className="blob blob-sky" />
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

        <span className="auth-eyebrow">Get started</span>
        <h2>Create your account</h2>
        <p className="auth-sub">Free forever, no credit card needed.</p>

        <form onSubmit={handleSignup}>
          <div className="field-group">
            <FaUser className="field-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-group">
            <FaEnvelope className="field-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-group">
            <FaLock className="field-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password (min. 8 characters)"
              value={form.password}
              onChange={handleChange}
              minLength={8}
              required
            />
          </div>

          <div className="field-group">
            <FaLock className="field-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn btn-block" style={{ marginTop: 20 }} disabled={loading}>
            {loading && <span className="spinner" />}
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: "center", color: "var(--ink-soft)" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "var(--violet)", fontWeight: 600 }}>
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
