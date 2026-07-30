import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aryan Srivastava",
    role: "CSE Student",
    review:
      "CourseMate helped me organize all my study notes in one place. Finding documents is now incredibly easy.",
  },
  {
    name: "Priya Sharma",
    role: "Engineering Student",
    review:
      "The clean interface and folder organization make studying much more efficient. Highly recommended!",
  },
  {
    name: "Rahul Verma",
    role: "Computer Science Student",
    review:
      "Uploading and accessing notes from anywhere has completely changed my study routine.",
  },
];

const Testimonials = () => {
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
            What Students Say
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Trusted by students for smarter study management.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="rounded-3xl bg-white/70 p-8 shadow-xl backdrop-blur-md"
            >
              <div className="mb-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mb-6 text-slate-600 italic">
                "{item.review}"
              </p>

              <h3 className="text-lg font-bold text-slate-900">
                {item.name}
              </h3>

              <p className="text-sm text-slate-500">
                {item.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;