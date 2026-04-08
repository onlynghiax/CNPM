import { Link, Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MusicStore from "./pages/MusicStore";
import AlbumDetail from "./pages/AlbumDetail";

function App() {
  const hasToken = Boolean(localStorage.getItem("token"));

  const navLink =
    "text-sm text-muted hover:text-mist transition pb-0.5 border-b border-transparent hover:border-white/20 font-light";

  return (
    <div className="min-h-screen bg-void text-mist">
      <nav className="sticky top-0 z-10 border-b border-white/[0.06] bg-void/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:justify-between">
          <Link to="/" className="text-center md:text-left">
            <span className="block text-xl font-extralight tracking-tight text-white">BadGenius</span>
            <span className="block text-[10px] uppercase tracking-[0.28em] text-muted mt-1">
              Rap Exclusive Music Store
            </span>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link className={navLink} to="/">
              Home
            </Link>
            <Link className={navLink} to="/register">
              Register
            </Link>
            <Link className={navLink} to="/login">
              Login
            </Link>
            <Link className={navLink} to="/profile">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20">
        <Routes>
          <Route path="/" element={<MusicStore />} />
          <Route path="/album/:id" element={<AlbumDetail />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={hasToken ? <ProfilePage /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
