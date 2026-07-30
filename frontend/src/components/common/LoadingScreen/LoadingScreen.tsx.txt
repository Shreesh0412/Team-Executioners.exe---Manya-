import { AnimatePresence, motion } from "framer-motion";

interface LoadingScreenProps {
  loading: boolean;
}

const LoadingScreen = ({ loading }: LoadingScreenProps) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-sky-50 via-pink-50 to-green-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
              }}
              className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl"
            >
              <span className="text-4xl">📚</span>
            </motion.div>

            {/* App Name */}
            <motion.h1
              className="text-3xl font-bold text-slate-800"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                repeat: Infinity,
                duration: 1.8,
              }}
            >
              CourseMate
            </motion.h1>

            {/* Loading Dots */}
            <div className="flex gap-2">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="h-3 w-3 rounded-full bg-sky-400"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay: dot * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-2 w-64 overflow-hidden rounded-full bg-white shadow-md">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-pink-400 to-green-400"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;