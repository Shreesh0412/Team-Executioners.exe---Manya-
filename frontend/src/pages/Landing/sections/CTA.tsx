import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-600 p-12 text-center shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-white">
          Ready to Organize Your Study Notes?
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-sky-100">
          Join thousands of students using CourseMate to organize,
          manage, and access their study materials from anywhere.
        </p>

        <button className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-sky-600 transition hover:scale-105 hover:bg-slate-100">
          Get Started
          <ArrowRight size={20} />
        </button>
      </motion.div>
    </section>
  );
};

export default CTA;