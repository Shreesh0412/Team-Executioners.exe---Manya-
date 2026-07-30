import { useState, InputHTMLAttributes } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PasswordInput = ({
  label,
  error,
  ...props
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

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
        <Lock
          size={20}
          className="mr-3 text-slate-400"
        />

        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className="w-full bg-transparent outline-none placeholder:text-slate-400"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="ml-2 text-slate-400 transition hover:text-slate-600"
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;