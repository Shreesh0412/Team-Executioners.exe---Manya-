import { motion } from "framer-motion";

const blobs = [
  {
    size: 350,
    top: "5%",
    left: "-5%",
    color: "bg-sky-300/30",
    duration: 18,
  },
  {
    size: 280,
    top: "60%",
    left: "70%",
    color: "bg-pink-300/30",
    duration: 20,
  },
  {
    size: 320,
    top: "30%",
    left: "80%",
    color: "bg-green-300/30",
    duration: 24,
  },
  {
    size: 250,
    top: "75%",
    left: "10%",
    color: "bg-yellow-300/30",
    duration: 16,
  },
];

const GradientBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-gradient-to-br from-sky-50 via-pink-50 to-green-50">
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${blob.color}`}
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -30, 25, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: blob.duration,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default GradientBackground;