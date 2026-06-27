import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaFilm, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    login(form.email);
    toast.success("Welcome back! 🎬");
    navigate("/");
    setLoading(false);
  };

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background blur blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e50914]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-red-900/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#e50914] rounded-xl flex items-center justify-center">
              <FaFilm className="text-white" />
            </div>
            <span className="font-display text-3xl tracking-widest text-white">CINEVERSE</span>
          </Link>
          <h2 className="text-white text-xl font-semibold mt-2">Welcome back</h2>
          <p className="text-gray-500 text-sm mt-1">Sign in to access your favourites</p>
        </div>

        {/* Card */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
                className={`w-full bg-[#141414] border ${errors.email ? "border-[#e50914]" : "border-[#2a2a2a]"} text-white px-4 py-3 rounded-xl text-sm outline-none focus:border-[#e50914] transition-colors placeholder-gray-700`}
              />
              {errors.email && <p className="text-[#e50914] text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange("password")}
                  placeholder="••••••••"
                  className={`w-full bg-[#141414] border ${errors.password ? "border-[#e50914]" : "border-[#2a2a2a]"} text-white px-4 py-3 pr-10 rounded-xl text-sm outline-none focus:border-[#e50914] transition-colors placeholder-gray-700`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  {showPw ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
              {errors.password && <p className="text-[#e50914] text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e50914] hover:bg-red-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold text-sm transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs mt-6">
            Enter any valid email and a password (6+ chars) to sign in
          </p>
        </div>

        <p className="text-center mt-5">
          <Link to="/" className="text-gray-500 text-sm hover:text-white transition-colors">
            ← Back to browsing
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
