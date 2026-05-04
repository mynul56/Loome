import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Public Pages
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Index from "./pages/Index";
import LiveScores from "./pages/LiveScores";
import MyOrders from "./pages/MyOrders";
import Nations from "./pages/Nations";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import Shop from "./pages/Shop";

// Auth Pages
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Admin Pages
import AdminLayout from "./layouts/AdminLayout";
import AdminCMS from "./pages/admin/CMS";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOrders from "./pages/admin/Orders";
import AdminProducts from "./pages/admin/Products";
import AdminUsers from "./pages/admin/Users";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/nations" element={<Nations />} />
          <Route path="/live" element={<LiveScores />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* Redirect /admin to /admin/dashboard */}
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="cms" element={<AdminCMS />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
