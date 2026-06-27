import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ICONS = {
  favorites: (
    <svg viewBox="0 0 64 64" fill="none" className="w-24 h-24">
      <circle cx="32" cy="32" r="32" fill="#e50914" fillOpacity="0.08" />
      <path d="M32 44s-16-10-16-20a10 10 0 0120 0 10 10 0 0120 0c0 10-16 20-24 20z" stroke="#e50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M32 44s-16-10-16-20a10 10 0 0120 0 10 10 0 0120 0c0 10-16 20-24 20z" fill="#e50914" fillOpacity="0.1" />
    </svg>
  ),
  watchlist: (
    <svg viewBox="0 0 64 64" fill="none" className="w-24 h-24">
      <circle cx="32" cy="32" r="32" fill="#6366f1" fillOpacity="0.08" />
      <rect x="16" y="14" width="32" height="36" rx="4" stroke="#6366f1" strokeWidth="2" fill="none" />
      <path d="M22 24h20M22 32h20M22 40h12" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
      <circle cx="44" cy="44" r="8" fill="#141414" stroke="#6366f1" strokeWidth="2" />
      <path d="M41 44l2 2 4-4" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 64 64" fill="none" className="w-24 h-24">
      <circle cx="32" cy="32" r="32" fill="#f59e0b" fillOpacity="0.08" />
      <circle cx="28" cy="28" r="12" stroke="#f59e0b" strokeWidth="2" fill="none" />
      <path d="M36 36l8 8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 28h8M28 24v8" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

function EmptyState({ type = "favorites", title, description, actionLabel, actionPath }) {
  const defaults = {
    favorites: { title: "No favorites yet", description: "Start exploring movies and save the ones you love here." },
    watchlist: { title: "Your watchlist is empty", description: "Add movies you want to watch later to keep track of them." },
    search: { title: "No results found", description: "Try different keywords or adjust your filters." },
  };

  const t = title || defaults[type]?.title;
  const d = description || defaults[type]?.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-24 px-4"
    >
      <div className="flex justify-center mb-6">{ICONS[type]}</div>
      <h3 className="text-white text-xl font-semibold mb-2">{t}</h3>
      <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">{d}</p>
      {actionLabel && actionPath && (
        <Link
          to={actionPath}
          className="inline-block bg-[#e50914] hover:bg-red-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-colors"
        >
          {actionLabel}
        </Link>
      )}
    </motion.div>
  );
}

export default EmptyState;
