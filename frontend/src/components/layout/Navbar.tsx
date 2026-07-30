import { useEffect, useState } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Workflow", path: "/workflow" },
    { name: "About", path: "/about" },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: .5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/70 shadow-lg border-b border-white/40"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        <Logo />

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `relative font-medium transition duration-300 ${
                  isActive
                    ? "text-sky-600"
                    : "text-slate-700 hover:text-sky-500"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.name}

                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-sky-400"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">

          <button
            onClick={() => setDark(!dark)}
            className="rounded-xl bg-white/60 p-3 shadow transition hover:scale-110"
          >
            {dark ? <Sun size={18}/> : <Moon size={18}/>}
          </button>

          <Link
            to="/login"
            className="hidden rounded-full px-5 py-2 font-medium text-slate-700 transition hover:text-sky-600 md:block"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hidden rounded-full bg-gradient-to-r from-sky-300 via-cyan-200 to-emerald-200 px-6 py-2 font-semibold shadow-lg transition hover:scale-105 md:block"
          >
            Get Started
          </Link>

          <button className="rounded-xl p-3 md:hidden">
            <Menu />
          </button>

        </div>

      </div>
    </motion.header>
  );
}