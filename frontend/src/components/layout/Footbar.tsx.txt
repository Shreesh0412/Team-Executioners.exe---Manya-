import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-40 border-t border-slate-200 bg-white/60 backdrop-blur-lg">

      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-20 md:grid-cols-4">

        <div>

          <Logo />

          <p className="mt-6 text-slate-600 leading-7">
            Study smarter with AI-powered notes, quizzes,
            flashcards and productivity tools designed for
            students.
          </p>

        </div>

        <div>

          <h3 className="mb-4 font-semibold text-slate-800">
            Product
          </h3>

          <ul className="space-y-3 text-slate-600">

            <li>Dashboard</li>
            <li>Documents</li>
            <li>Flashcards</li>
            <li>AI Chat</li>

          </ul>

        </div>

        <div>

          <h3 className="mb-4 font-semibold text-slate-800">
            Resources
          </h3>

          <ul className="space-y-3 text-slate-600">

            <li>Help Center</li>
            <li>Documentation</li>
            <li>Privacy Policy</li>
            <li>Terms</li>

          </ul>

        </div>

        <div>

          <h3 className="mb-4 font-semibold text-slate-800">
            Connect
          </h3>

          <div className="flex gap-4">

            {[Github, Linkedin, Instagram, Mail].map((Icon, index) => (

              <motion.div
                whileHover={{
                  y: -6,
                  scale: 1.15
                }}
                key={index}
                className="rounded-2xl bg-white p-4 shadow-lg cursor-pointer"
              >
                <Icon size={20}/>
              </motion.div>

            ))}

          </div>

        </div>

      </div>

      <div className="border-t border-slate-200 py-8">

        <p className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} CourseMate • Built with ❤️ for students
        </p>

      </div>

    </footer>
  );
}