import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // User not logged in
  if (!token) {
    return <Navigate to="/" />;
  }

  // Only admin can access /admin
  if (location.pathname === "/admin" && role !== "admin") {
    toast.error("Access Denied! Admins only.");
    return <Navigate to="/home" />;
  }

  return children;
}

export default ProtectedRoute;