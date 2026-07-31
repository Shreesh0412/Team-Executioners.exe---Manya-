import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await login({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Invalid Email or Password");
    }
  }

  return (
    <div className="center-page">
      <div className="card" style={{ width: 420 }}>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br /><br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br /><br />

          <button type="submit">
            Login
          </button>

        </form>

        <br />

        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;