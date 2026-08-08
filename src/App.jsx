import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Main Website */}
      <Route
        path="/"
        element={<HomePage />}
      />

      {/* Login Page */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Admin Page - Protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;