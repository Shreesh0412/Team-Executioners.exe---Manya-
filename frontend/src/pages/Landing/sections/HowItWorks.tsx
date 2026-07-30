import { motion } from "framer-motion";
import { UserPlus, Upload, FolderOpen } from "lucide-react";

const steps = [
  {
    icon: <UserPlus size={36} className="text-sky-500" />,
    title: "Create Your Account",
    description:
      "Sign up in seconds and securely access your personal dashboard.",
  },
  {
    icon: <Upload size={36} className="text-green-500" />,
    title: "Upload Your Notes",
    description:
      "Upload PDFs, notes, and study materials into organized folders.",
  },
  {
    icon: <FolderOpen size={36} className="text-purple-500" />,
    title: "Study Anytime",
    description:
      "Access your notes anytime from any device and stay organized.",
  },
];

const HowItWorks = () => {
  return (
    <section className="px-6 py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-slate-900">
            How It Works
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Get started with CourseMate in just three simple steps.
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              whileHover={{
                y: -8,
              }}
              className="rounded-3xl bg-white p-8 shadow-xl text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                {step.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="text-slate-600">
                {step.description}
              </p>

              <div className="mt-8 text-5xl font-bold text-sky-100">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;