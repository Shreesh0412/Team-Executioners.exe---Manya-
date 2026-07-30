import { ReactNode } from "react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

const EmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/70 p-8 text-center shadow-lg backdrop-blur-md"
    >
      {icon && (
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-sky-100 text-sky-500">
          {icon}
        </div>
      )}

      <h2 className="text-2xl font-semibold text-slate-800">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-slate-500">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
};

export default EmptyState;