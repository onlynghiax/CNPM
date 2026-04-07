import { Link, Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const hasToken = Boolean(localStorage.getItem("token"));

  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b p-4 flex gap-4">
        <Link className="text-blue-600" to="/register">Register</Link>
        <Link className="text-blue-600" to="/login">Login</Link>
        <Link className="text-blue-600" to="/profile">Profile</Link>
      </nav>

      <div className="max-w-2xl mx-auto p-6">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={hasToken ? <ProfilePage /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
