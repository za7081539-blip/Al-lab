"use client";
import { useSelector } from "react-redux";
export default function SessionInfo() {
  const { user } = useSelector((state) => state.authReducer);
  return (
    <div>
      <p className="text-sm text-slate-500">Logged in as</p>
      <p className="font-medium">{user?.email || "No email available"}</p>
    </div>
  );
}
