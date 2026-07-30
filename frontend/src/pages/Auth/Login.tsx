import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

import AuthLayout from "./components/AuthLayout";
import AuthCard from "./components/AuthCard";
import AuthInput from "./components/AuthInput";
import PasswordInput from "./components/PasswordInput";
import Divider from "./components/Divider";
import SocialLogin from "./components/SocialLogin";

const Login = () => {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue to CourseMate"
    >
      <AuthCard>
        <form className="space-y-1">
          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
          />

          <div className="flex items-center justify-between py-2">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                className="rounded border-slate-300"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-medium text-sky-600 hover:text-sky-700"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-sky-600 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Sign In
          </button>
        </form>

        <Divider />

        <SocialLogin />

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-sky-600 hover:text-sky-700"
          >
            Create Account
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;