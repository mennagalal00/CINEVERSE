import { useSelector, useDispatch } from "react-redux";
import { toggleWatchlist } from "../redux/watchlistSlice";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { IMG_W500, PLACEHOLDER } from "../lib/constants";
import StarRating from "../components/ui/StarRating";
import EmptyState from "../components/ui/EmptyState";
import { toast } from "react-toastify";


function Watchlist() {
  const watchlist = useSelector((s) => s.watchlist.items);
  const dispatch = useDispatch();

  const handleRemove = (movie) => {
    dispatch(toggleWatchlist(movie));
    toast.info(`Removed "${movie.title}" from watchlist`, { icon: "🗑️" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-indigo-500 rounded-full" />
        <div>
          <h1 className="font-display text-4xl tracking-wider text-white">MY WATCHLIST</h1>
          <p className="text-gray-500 text-sm mt-0.5">{watchlist.length} {watchlist.length === 1 ? "movie" : "movies"} to watch</p>
        </div>
      </div>

      {watchlist.length === 0 ? (
        <EmptyState type="watchlist" actionLabel="Discover Movies" actionPath="/" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {watchlist.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group flex gap-4 bg-[#1a1a1a] rounded-xl p-3 border border-[#2a2a2a] hover:border-indigo-500/30 transition-colors"
              >
                <Link to={`/movie/${movie.id}`} className="flex-shrink-0">
                  <img
                    src={movie.poster_path ? `${IMG_W500}${movie.poster_path}` : PLACEHOLDER}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/movie/${movie.id}`}>
                    <h3 className="text-white font-semibold text-sm truncate hover:text-indigo-400 transition-colors">{movie.title}</h3>
                  </Link>
                  <p className="text-gray-500 text-xs mt-0.5 mb-2">{movie.release_date?.slice(0, 4)}</p>
                  {movie.vote_average > 0 && <StarRating rating={movie.vote_average} />}
                  <p className="text-gray-600 text-xs mt-2 line-clamp-2">{movie.overview}</p>
                </div>
                <button
                  onClick={() => handleRemove(movie)}
                  className="self-start opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-900/30 text-gray-500 hover:text-red-400 transition-colors"
                  title="Remove"
                >
                  <FaTrash className="text-xs" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default Watchlist;
