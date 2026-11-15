
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (loading) return;
    if (user) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [user, loading, router]);
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-emerald-500" />
        <h1 className="text-xl font-semibold">
          Checking your session...
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Please wait while we redirect you.
        </p>
      </div>
    </main>
  );
}