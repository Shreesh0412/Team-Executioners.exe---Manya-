import { ReactNode } from "react";
import { motion } from "framer-motion";
import GradientBackground from "@/components/common/GradientBackground";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const AuthLayout = ({
  title,
  subtitle,
  children,
}: AuthLayoutProps) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <GradientBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="mt-3 text-slate-600">
            {subtitle}
          </p>
        </div>

        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout;