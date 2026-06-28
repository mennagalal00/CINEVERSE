import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/favoritesSlice";
import { toggleWatchlist } from "../../redux/watchlistSlice";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaStar, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { IMG_W500, PLACEHOLDER } from "../../lib/constants";
import { useAuth } from "../../context/AuthContext";
import LoginRequiredModal from "../ui/LoginRequiredModal";

function MovieCard({ movie, index = 0 }) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const favorites = useSelector((s) => s.favorites.items);
  const watchlist = useSelector((s) => s.watchlist.items);
  const isFav = favorites.some((f) => f.id === movie.id);
  const isWatched = watchlist.some((f) => f.id === movie.id);
  const [loginModal, setLoginModal] = useState(false);
  const [loginAction, setLoginAction] = useState("add to favorites");

  const handleFav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { setLoginAction("add to favorites"); setLoginModal(true); return; }
    dispatch(toggleFavorite(movie));
  };

  const handleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { setLoginAction("add to watchlist"); setLoginModal(true); return; }
    dispatch(toggleWatchlist(movie));
  };

  const posterUrl = movie.poster_path ? `${IMG_W500}${movie.poster_path}` : PLACEHOLDER;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.4) }}
        whileHover={{ y: -6 }}
      >
        <Link to={`/movie/${movie.id}`} className="block group">
          <div className="relative overflow-hidden rounded-xl bg-[#1a1a1a] shadow-lg">
            <div className="aspect-[2/3] overflow-hidden">
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <p className="text-white text-xs line-clamp-3 leading-relaxed">
                {movie.overview || "No description available."}
              </p>
            </div>

            
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm rounded-full px-2 py-0.5">
              <FaStar className="text-yellow-400 text-xs" />
              <span className="text-white text-xs font-semibold">{movie.vote_average?.toFixed(1)}</span>
            </div>

            <div className="absolute top-2 right-2 flex flex-col gap-1.5">
              <button
                onClick={handleFav}
                aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-sm hover:bg-[#e50914] transition-colors duration-200"
              >
                {isFav ? <FaHeart className="text-[#e50914] hover:text-white text-xs" /> : <FaRegHeart className="text-white text-xs" />}
              </button>
              <button
                onClick={handleWatchlist}
                aria-label={isWatched ? "Remove from watchlist" : "Add to watchlist"}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-sm hover:bg-indigo-500 transition-colors duration-200"
              >
                {isWatched ? <FaBookmark className="text-indigo-400 text-xs" /> : <FaRegBookmark className="text-white text-xs" />}
              </button>
            </div>
          </div>

          <div className="mt-2 px-1">
            <h3 className="text-white text-sm font-medium truncate">{movie.title}</h3>
            <p className="text-gray-500 text-xs mt-0.5">{movie.release_date?.slice(0, 4) || "—"}</p>
          </div>
        </Link>
      </motion.div>
      <LoginRequiredModal isOpen={loginModal} onClose={() => setLoginModal(false)} action={loginAction} />
    </>
  );
}

export default MovieCard;
