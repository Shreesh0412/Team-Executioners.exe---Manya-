import { motion } from "framer-motion";
import {
  Brain,
  Cloud,
  FolderOpen,
  Lock,
  Upload,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: <Brain size={32} className="text-sky-500" />,
    title: "AI Search",
    description: "Find your notes instantly using smart search.",
  },
  {
    icon: <Cloud size={32} className="text-green-500" />,
    title: "Cloud Storage",
    description: "Access your documents anytime from anywhere.",
  },
  {
    icon: <FolderOpen size={32} className="text-yellow-500" />,
    title: "Smart Organization",
    description: "Organize notes into folders with ease.",
  },
  {
    icon: <Lock size={32} className="text-red-500" />,
    title: "Secure Login",
    description: "Your data stays protected with secure authentication.",
  },
  {
    icon: <Upload size={32} className="text-purple-500" />,
    title: "Fast Upload",
    description: "Upload PDFs, notes, and documents in seconds.",
  },
  {
    icon: <Smartphone size={32} className="text-pink-500" />,
    title: "Responsive Design",
    description: "Works beautifully on mobile, tablet, and desktop.",
  },
];

const Features = () => {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-slate-900">
            Why Choose CourseMate?
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Everything you need to organize and manage your study materials.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="rounded-3xl border border-white/30 bg-white/70 p-8 shadow-xl backdrop-blur-md"
            >
              <div className="mb-5">{feature.icon}</div>

              <h3 className="mb-3 text-xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="text-slate-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;