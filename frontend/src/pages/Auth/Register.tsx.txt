import { Link } from "react-router-dom";
import { Mail, User } from "lucide-react";

import AuthLayout from "./components/AuthLayout";
import AuthCard from "./components/AuthCard";
import AuthInput from "./components/AuthInput";
import PasswordInput from "./components/PasswordInput";
import Divider from "./components/Divider";
import SocialLogin from "./components/SocialLogin";

const Register = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join CourseMate and start organizing your notes"
    >
      <AuthCard>
        <form className="space-y-1">
          <AuthInput
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            icon={User}
          />

          <AuthInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={Mail}
          />

          <PasswordInput
            label="Password"
            placeholder="Create a password"
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
          />

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-sky-600 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            Create Account
          </button>
        </form>

        <Divider />

        <SocialLogin />

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-sky-600 hover:text-sky-700"
          >
            Sign In
          </Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default Register;