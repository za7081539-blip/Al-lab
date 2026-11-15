"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  signup,
  loginWithGoogle,
  loginWithFacebook,
} from "@/reduxToolkit/authSlice";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { FiLock, FiMail, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import RightSideVisual from "@/components/RightSideVisual";
function getSignupError(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/weak-password":
      return "Password must contain at least 6 characters.";
    default:
      return "Unable to create your account. Please try again.";
  }
}
function getSocialSignupError(code) {
  switch (code) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Sign-up was cancelled.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email. Sign in with the method you used before.";
    default:
      return "Social sign-up failed. Check your Firebase settings.";
  }
}
export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector(
    (state) => state.authReducer
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [authLoading, user, router]);
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const result = await dispatch(
        signup({
          email: email.trim(),
          password,
          name: name.trim(),
        })
      );
      if (signup.rejected.match(result)) {
        setError(getSignupError(result.payload?.code));
        return;
      }
      router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  };
  const handleSocialSignup = async (signupAction) => {
    setError("");
    setLoading(true);
    try {
      const result = await dispatch(signupAction());
      if (signupAction.rejected.match(result)) {
        setError(getSocialSignupError(result.payload?.code));
        return;
      }
      router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-dvh bg-white text-slate-900">
      <div className="grid min-h-dvh lg:grid-cols-2">
        <section className="flex items-center justify-center px-5 py-8 sm:px-10 lg:px-12 lg:py-10 xl:px-16">
          <div className="w-full max-w-[440px]">
            <div className="mb-5 flex justify-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white shadow-md">
                <FiLock size={22} />
              </div>
            </div>
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Create your account
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                Sign up to get started with AI Labs.
              </p>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSocialSignup(loginWithGoogle)}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 px-4 transition hover:bg-slate-50 disabled:opacity-60"
              >
                <FaGoogle size={19} />
                Sign up with Google
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSocialSignup(loginWithFacebook)}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 px-4 transition hover:bg-slate-50 disabled:opacity-60"
              >
                <FaFacebook size={20} />
                Sign up with Facebook
              </button>
            </div>
            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <form onSubmit={handleSignup} className="space-y-3.5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full name
                </label>
                <div className="relative">
                  <FiUser
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={19}
                  />
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-11 w-full rounded-lg border border-slate-200 pl-11 pr-3 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>
                <div className="relative">
                  <FiMail
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={19}
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 w-full rounded-lg border border-slate-200 pl-11 pr-3 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <FiLock
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={19}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 w-full rounded-lg border border-slate-200 pl-11 pr-11 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? (
                      <FiEyeOff size={19} />
                    ) : (
                      <FiEye size={19} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter your password again"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-11 w-full rounded-lg border border-slate-200 px-3 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                />
              </div>
              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center rounded-lg bg-slate-950 px-4 font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>
            <p className="mt-5 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-semibold text-slate-900 hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </section>
        <RightSideVisual />
      </div>
    </main>
  );
}