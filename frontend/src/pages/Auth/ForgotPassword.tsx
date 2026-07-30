import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

import AuthLayout from "./components/AuthLayout";
import AuthCard from "./components/AuthCard";
import AuthInput from "./components/AuthInput";

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your email and we'll send you a password reset link."
    >
      <AuthCard>
        <form className="space-y-1">
          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
          />

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-sky-600 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold text-sky-600 hover:text-sky-700"
          >
            Back to Login
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPassword;