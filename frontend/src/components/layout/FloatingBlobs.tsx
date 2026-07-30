import { motion } from "framer-motion";

export default function FloatingBlobs() {
  return (
    <>
      {/* Blob 1 */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed left-[-120px] top-[100px] -z-10 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl"
      />

      {/* Blob 2 */}
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed right-[-100px] top-[300px] -z-10 h-96 w-96 rounded-full bg-pink-200/30 blur-3xl"
      />

      {/* Blob 3 */}
      <motion.div
        animate={{
          y: [0, -80, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed bottom-[-100px] left-1/2 -translate-x-1/2 -z-10 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl"
      />

      {/* Blob 4 */}
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="fixed right-20 bottom-20 -z-10 h-72 w-72 rounded-full bg-yellow-200/20 blur-3xl"
      />
    </>
  );
}