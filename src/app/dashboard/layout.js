import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/dashboard/Sidebar";
export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 lg:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
