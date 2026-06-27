import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaSearch, FaTimes, FaBars, FaUser, FaSignOutAlt, FaFilm, FaBookmark, FaList } from "react-icons/fa";
import { toast } from "react-toastify";

function Navbar() {
  const { user, logout } = useAuth();
  const favCount = useSelector((s) => s.favorites.items.length);
  const watchCount = useSelector((s) => s.watchlist.items.length);
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchOpen(false);
      setSearchVal("");
    }
  };

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully", { icon: "👋" });
    navigate("/");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/favorites" },
    { label: "Watchlist", path: "/watchlist" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-white/5 shadow-xl" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[#e50914] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaFilm className="text-white text-sm" />
              </div>
              <span className="font-display text-2xl tracking-widest text-white">CINEVERSE</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const active = location.pathname === link.path;
                return (
                  <Link key={link.path} to={link.path}
                    className={`text-sm font-medium transition-colors duration-200 relative ${active ? "text-white" : "text-gray-400 hover:text-white"}`}>
                    {link.label}
                    {active && <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e50914] rounded-full" />}
                  </Link>
                );
              })}
              {user && (
                <Link to="/profile" className={`text-sm font-medium transition-colors duration-200 relative ${location.pathname === "/profile" ? "text-white" : "text-gray-400 hover:text-white"}`}>
                  Profile
                  {location.pathname === "/profile" && <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#e50914] rounded-full" />}
                </Link>
              )}
            </div>

            <div className="flex items-center gap-2">
              <AnimatePresence>
                {searchOpen ? (
                  <motion.form key="search-form" onSubmit={handleSearch}
                    initial={{ width: 0, opacity: 0 }} animate={{ width: 220, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }} className="flex items-center overflow-hidden">
                    <input autoFocus value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
                      placeholder="Search movies..."
                      className="bg-white/10 text-white text-sm px-3 py-1.5 rounded-l-lg outline-none border border-white/10 w-full placeholder-gray-500" />
                    <button type="submit" className="bg-[#e50914] px-3 py-1.5 rounded-r-lg hover:bg-red-700 transition-colors">
                      <FaSearch className="text-white text-sm" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.button key="search-icon" onClick={() => setSearchOpen(true)}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
                    <FaSearch className="text-sm" />
                  </motion.button>
                )}
              </AnimatePresence>

              {searchOpen && (
                <button onClick={() => setSearchOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-300">
                  <FaTimes className="text-sm" />
                </button>
              )}

              <Link to="/favorites" className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
                <FaHeart className="text-sm" />
                {favCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#e50914] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                    {favCount > 9 ? "9+" : favCount}
                  </span>
                )}
              </Link>

              <Link to="/watchlist" className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
                <FaBookmark className="text-sm" />
                {watchCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-indigo-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                    {watchCount > 9 ? "9+" : watchCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                    <FaUser className="text-gray-400 text-xs" />
                    <span className="text-white text-xs font-medium truncate max-w-[100px]">{user.email.split("@")[0]}</span>
                  </div>
                  <button onClick={handleLogout}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-red-400" title="Logout">
                    <FaSignOutAlt className="text-sm" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="hidden sm:block text-sm font-medium bg-[#e50914] hover:bg-red-700 text-white px-4 py-1.5 rounded-lg transition-colors duration-200">
                  Sign In
                </Link>
              )}

              <button onClick={() => setMobileOpen((p) => !p)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-gray-300">
                {mobileOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }} className="md:hidden overflow-hidden glass border-t border-white/5">
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} className="block text-sm text-gray-300 hover:text-white py-2 border-b border-white/5 last:border-0">
                    {link.label}
                  </Link>
                ))}
                {user && <Link to="/profile" className="block text-sm text-gray-300 hover:text-white py-2 border-b border-white/5">Profile</Link>}
                {!user && (
                  <Link to="/login" className="block text-sm font-medium bg-[#e50914] text-white px-4 py-2 rounded-lg text-center mt-2">Sign In</Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <div className="h-16" />
    </>
  );
}

export default Navbar;
