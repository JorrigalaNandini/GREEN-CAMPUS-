import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ReportIssue from "./pages/ReportIssue";
import IssueDetails from "./pages/IssueDetails";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
  path="/"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>

        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportIssue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/issue"
          element={
            <ProtectedRoute>
              <IssueDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;