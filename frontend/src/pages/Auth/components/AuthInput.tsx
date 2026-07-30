import { InputHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

const AuthInput = ({
  label,
  icon: Icon,
  error,
  ...props
}: AuthInputProps) => {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div
        className={`flex items-center rounded-xl border bg-white px-4 py-3 transition ${
          error
            ? "border-red-500"
            : "border-slate-300 focus-within:border-sky-500"
        }`}
      >
        {Icon && (
          <Icon
            size={20}
            className="mr-3 text-slate-400"
          />
        )}

        <input
          {...props}
          className="w-full bg-transparent outline-none placeholder:text-slate-400"
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthInput;