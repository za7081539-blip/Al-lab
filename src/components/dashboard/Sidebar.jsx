"use client";
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FiGrid, FiLogOut } from "react-icons/fi";
import { logout } from "@/reduxToolkit/authSlice";
export default function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const handleLogout = async () => {
    setLoggingOut(true);
    setError("");
    const result = await dispatch(logout());
    if (logout.rejected.match(result)) {
      setError("Unable to log out. Please try again.");
      setLoggingOut(false);
      return;
    }
    router.replace("/login");
  };
  return (
    <aside className="flex w-full flex-col border-b border-slate-200 bg-white p-5 lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <Link href="/dashboard" className="text-2xl font-bold">
        <span className="text-emerald-600">AI</span> Labs
      </Link>
      <nav className="mt-10">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3 font-medium text-emerald-700"
        >
          <FiGrid size={19} />
          Dashboard
        </Link>
      </nav>
      <div className="mt-auto border-t border-slate-100 pt-5">
        {error && (
          <p role="alert" className="mb-2 text-sm text-red-600">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FiLogOut size={19} />
          {loggingOut ? "Logging out..." : "Log out"}
        </button>
      </div>
    </aside>
  );
}
