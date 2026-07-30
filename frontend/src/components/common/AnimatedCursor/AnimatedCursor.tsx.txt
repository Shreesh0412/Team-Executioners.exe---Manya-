import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const AnimatedCursor = () => {
  // Mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth movement
  const springX = useSpring(mouseX, {
    stiffness: 500,
    damping: 35,
  });

  const springY = useSpring(mouseY, {
    stiffness: 500,
    damping: 35,
  });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-5 w-5 rounded-full bg-sky-400/70 shadow-[0_0_25px_10px_rgba(56,189,248,0.45)] backdrop-blur-md"
      style={{
        x: springX,
        y: springY,
      }}
    />
  );
};

export default AnimatedCursor;