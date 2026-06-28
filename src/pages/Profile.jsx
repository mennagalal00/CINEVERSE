import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaBookmark, FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function Profile() {
  const { user, logout } = useAuth();
  const favorites = useSelector((s) => s.favorites.items);
  const watchlist = useSelector((s) => s.watchlist.items);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully", { icon: "👋" });
    navigate("/");
  };

  if (!user) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-400 mb-4">You need to be signed in to view your profile.</p>
        <Link to="/login" className="bg-[#e50914] text-white px-6 py-2.5 rounded-xl text-sm font-medium">Sign In</Link>
      </div>
    );
  }

  const username = user.email.split("@")[0];
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-br from-[#e50914] to-red-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl ring-4 ring-[#e50914]/20">
            <span className="font-display text-4xl text-white tracking-widest">{initials}</span>
          </div>
          <h1 className="font-display text-3xl tracking-wider text-white">{username.toUpperCase()}</h1>
          <p className="text-gray-500 text-sm mt-1 flex items-center justify-center gap-1.5">
            <FaEnvelope className="text-xs" /> {user.email}
          </p>
        </div>

     
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link to="/favorites" className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#e50914]/30 rounded-2xl p-6 text-center transition-colors group">
            <FaHeart className="text-[#e50914] text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-3xl font-bold text-white mb-1">{favorites.length}</div>
            <div className="text-gray-500 text-sm">Favorite{favorites.length !== 1 ? "s" : ""}</div>
          </Link>
          <Link to="/watchlist" className="bg-[#1a1a1a] border border-[#2a2a2a] hover:border-indigo-500/30 rounded-2xl p-6 text-center transition-colors group">
            <FaBookmark className="text-indigo-400 text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <div className="text-3xl font-bold text-white mb-1">{watchlist.length}</div>
            <div className="text-gray-500 text-sm">Watchlist</div>
          </Link>
        </div>

        
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 mb-6">
          <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
            <FaUser className="text-gray-500 text-xs" /> Account Details
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#2a2a2a]">
              <span className="text-gray-500 text-sm">Username</span>
              <span className="text-white text-sm font-medium">{username}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-500 text-sm">Email</span>
              <span className="text-white text-sm font-medium">{user.email}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] hover:border-red-800/50 hover:bg-red-900/10 text-gray-400 hover:text-red-400 py-3 rounded-xl text-sm font-medium transition-all duration-200"
        >
          <FaSignOutAlt /> Sign Out
        </button>
      </motion.div>
    </div>
  );
}

export default Profile;
