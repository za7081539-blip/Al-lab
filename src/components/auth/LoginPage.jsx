"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  loginWithGoogle,
  loginWithFacebook,
} from "@/reduxToolkit/authSlice";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi";
import RightSideVisual from "@/components/RightSideVisual";
function getLoginError(code) {
  switch (code) {
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/invalid-email":
      return "Enter a valid email.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return "Unable to sign in. Please try again.";
  }
}
function getSocialLoginError(code) {
  switch (code) {
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Sign-in was cancelled.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email. Sign in with the method you used before.";
    default:
      return "Social sign-in failed. Check your Firebase settings.";
  }
}
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading: authLoading } = useSelector(
    (state) => state.authReducer,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/dashboard");
    }
  }, [authLoading, user, router]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const result = await dispatch(
        login({
          email: email.trim(),
          password,
        }),
      );
      if (login.rejected.match(result)) {
        setError(getLoginError(result.payload?.code));
        return;
      }
      router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  };
  const handleSocialLogin = async (loginAction) => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const result = await dispatch(loginAction());
      if (loginAction.rejected.match(result)) {
        setError(getSocialLoginError(result.payload?.code));
        return;
      }
      router.replace("/dashboard");
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassword = async () => {
    setError("");
    setMessage("");
    console.log("we will add this feature later");
    
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
            <div className="mb-7 text-center">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome to AI Labs
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                Please sign in to continue to your account.
              </p>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSocialLogin(loginWithGoogle)}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 px-4 transition hover:bg-slate-50 disabled:opacity-60"
              >
                <FaGoogle size={19} />
                <span>Sign in with Google</span>
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSocialLogin(loginWithFacebook)}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 px-4 transition hover:bg-slate-50 disabled:opacity-60"
              >
                <FaFacebook size={20} />
                <span>Sign in with Facebook</span>
              </button>
            </div>
            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
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
                    className="h-12 w-full rounded-lg border border-slate-200 pl-11 pr-3 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
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
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 w-full rounded-lg border border-slate-200 pl-11 pr-11 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
                  />
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}
              {message && (
                <p role="status" className="text-sm text-green-700">
                  {message}
                </p>
              )}
              <div className="flex justify-end text-sm">
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleForgotPassword}
                  className="font-medium hover:underline disabled:opacity-60"
                >
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center rounded-lg bg-slate-950 px-4 font-medium text-white transition hover:bg-slate-800 disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Continue"}
              </button>
            </form>
            <p className="mt-5 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/signup")}
                className="font-semibold text-slate-900 hover:underline"
              >
                Sign up
              </button>
            </p>
            <p className="mt-3 pb-1 text-center text-xs text-slate-500">
              Having trouble signing in?
            </p>
          </div>
        </section>
        <RightSideVisual />
      </div>
    </main>
  );
}