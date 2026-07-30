import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
}

export default function PageWrapper({
  children,
}: Props) {
  return (
    <motion.main
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        min-h-screen
        pt-28
        pb-16
      "
    >
      {children}
    </motion.main>
  );
}