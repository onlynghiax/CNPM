import { Link, Navigate, Route, Routes } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import MusicStore from "./pages/MusicStore";
import AlbumDetail from "./pages/AlbumDetail";
import CartPage from "./pages/CartPage";
import { useCart } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

function App() {
  const hasToken = Boolean(localStorage.getItem("token"));
  const { itemCount } = useCart();

  const navLink =
    "text-sm text-muted hover:text-mist transition pb-0.5 border-b border-transparent hover:border-white/20 font-light";

  return (
    <div className="min-h-screen bg-void text-mist">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#050505',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#A3A3A3',
              secondary: '#050505',
            },
          },
        }}
      />
      <nav className="sticky top-0 z-10 border-b border-white/[0.06] bg-void/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:justify-between">
          <Link to="/" className="text-center md:text-left">
            <span className="block text-2xl font-black tracking-wider text-white">BadGenius</span>
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
            <Link className={`${navLink} relative flex items-center mt-1 mr-2`} to="/cart" aria-label="Cart">
              <ShoppingCart className="w-5 h-5 text-white" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex items-center justify-center bg-accent-neon text-void text-[10px] font-bold h-4 w-4 rounded-full shadow-soft-sm">
                  {itemCount}
                </span>
              )}
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
          <Route path="/cart" element={hasToken ? <CartPage /> : <Navigate to="/login" replace />} />
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
