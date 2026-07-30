import { ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

const ErrorState = ({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  icon,
  action,
}: ErrorStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/60 p-8 text-center shadow-lg backdrop-blur-md"
    >
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-500">
        {icon ?? <AlertTriangle size={40} />}
      </div>

      <h2 className="text-2xl font-semibold text-slate-800">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-slate-600">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default ErrorState;