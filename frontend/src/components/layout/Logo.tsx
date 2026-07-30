import { GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: -5,
        }}
        whileTap={{
          scale: 0.95,
        }}
        transition={{
          duration: 0.25,
        }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-200 via-pink-200 to-yellow-100 shadow-lg">
          <GraduationCap
            className="text-slate-700"
            size={24}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-slate-800">
            CourseMate
          </span>

          <span className="text-xs tracking-wider text-slate-500">
            AI Study Companion
          </span>
        </div>
      </motion.div>
    </Link>
  );
}