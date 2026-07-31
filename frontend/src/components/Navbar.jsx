import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

function Navbar() {
  return (
    <div className="nav-wrap">
      <motion.div
        className="nav"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="logo flex" style={{ alignItems: "center", gap: 8 }}>
          <FaGraduationCap />
          CourseMate
        </Link>

        <div className="nav-links">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/login">
            Login
          </Link>

          <Link to="/signup">
            <button className="btn btn-sm">Get Started</button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Navbar;
