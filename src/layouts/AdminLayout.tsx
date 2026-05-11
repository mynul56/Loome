import { authService } from "@/services/auth.service";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-svh bg-gray-100 text-black">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 p-6 flex flex-col transform transition-transform duration-200 md:static md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8 md:block">
          <h2 className="text-2xl font-heading font-medium">Admin Panel</h2>
          <button
            className="md:hidden text-gray-500 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="flex-1 space-y-2">
          <Link
            to="/admin/dashboard"
            className="block p-3 rounded hover:bg-gray-50 font-medium"
            onClick={() => setIsSidebarOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className="block p-3 rounded hover:bg-gray-50 font-medium"
            onClick={() => setIsSidebarOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/admin/orders"
            className="block p-3 rounded hover:bg-gray-50 font-medium"
            onClick={() => setIsSidebarOpen(false)}
          >
            Orders
          </Link>
          <Link
            to="/admin/users"
            className="block p-3 rounded hover:bg-gray-50 font-medium"
            onClick={() => setIsSidebarOpen(false)}
          >
            Users
          </Link>
          <Link
            to="/admin/cms"
            className="block p-3 rounded hover:bg-gray-50 font-medium"
            onClick={() => setIsSidebarOpen(false)}
          >
            CMS / Content
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto p-3 text-red-600 font-medium text-left hover:bg-red-50 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium"
            aria-label="Open sidebar"
          >
            Menu
          </button>
          <span className="text-sm font-medium text-gray-500">Admin</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
