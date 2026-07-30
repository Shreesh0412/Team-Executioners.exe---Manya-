import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, FolderOpen, Shield } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700">
            <Sparkles size={16} />
            Smart Note Management
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
            Organize Your Study Notes
            <span className="block text-sky-600">
              Smarter Than Ever.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-600">
            CourseMate helps students organize notes, upload PDFs,
            manage folders, and access study material anytime,
            anywhere.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700">
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">
              <Play size={18} />
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative flex flex-1 items-center justify-center"
        >
          <div className="relative h-[420px] w-[420px]">
            {/* Main Circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300 via-pink-200 to-green-200 blur-3xl opacity-50" />

            {/* Main Card */}
            <div className="absolute left-10 top-16 flex h-64 w-72 flex-col justify-center rounded-3xl bg-white/80 p-8 shadow-2xl backdrop-blur-md">
              <FolderOpen className="mb-4 text-sky-500" size={40} />
              <h3 className="text-xl font-bold">CourseMate</h3>
              <p className="mt-2 text-slate-500">
                Your personal study companion.
              </p>
            </div>

            {/* Floating Card 1 */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute right-0 top-8 rounded-2xl bg-white p-5 shadow-xl"
            >
              📚 Notes Organized
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="absolute bottom-8 left-0 flex items-center gap-2 rounded-2xl bg-white p-5 shadow-xl"
            >
              <Shield className="text-green-500" size={18} />
              Secure Storage
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;