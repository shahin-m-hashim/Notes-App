import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

import { Navigate, Outlet, useLocation } from "react-router";

export default function PrivateLayout() {
  const { pathname } = useLocation();

  if (!localStorage.getItem("isAuthenticated")) {
    return <Navigate to="auth/login" replace />;
  }

  return (
    <section className="min-w-[320px]">
      <Navbar />
      {pathname === "/notes" && <Sidebar />}

      <Outlet />
    </section>
  );
}
