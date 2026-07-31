import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSignup(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Account created successfully!");

      navigate("/login");
    } catch (err) {
      console.error(err);

      if (err.response) {
        alert(JSON.stringify(err.response.data, null, 2));
      } else {
        alert("Registration failed.");
      }
    }
  }

  return (
    <div className="center-page">
      <div className="card" style={{ width: 420 }}>
        <h2>Create Account</h2>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <br /><br />

          <button type="submit">
            Sign Up
          </button>

        </form>

        <br />

        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;