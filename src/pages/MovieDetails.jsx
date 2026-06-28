import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/favoritesSlice";
import { toggleWatchlist } from "../redux/watchlistSlice";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { IMG_W500, IMG_ORIGINAL, PLACEHOLDER } from "../lib/constants";
import { motion } from "framer-motion";
import StarRating from "../components/ui/StarRating";
import TrailerModal from "../components/ui/TrailerModal";
import LoginRequiredModal from "../components/ui/LoginRequiredModal";
import MovieCarousel from "../components/movies/MovieCarousel";
import { SkeletonDetails } from "../components/ui/SkeletonCard";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  FaHeart, FaRegHeart, FaArrowLeft, FaClock, FaCalendar, FaGlobe,
  FaPlay, FaBookmark, FaRegBookmark, FaShare, FaStar
} from "react-icons/fa";

function MovieDetails() {
  const { id } = useParams();
  const { movie, loading, error } = useMovieDetails(id);
  const dispatch = useDispatch();
  const { user } = useAuth();
  const favorites = useSelector((s) => s.favorites.items);
  const watchlist = useSelector((s) => s.watchlist.items);
  const isFav = favorites.some((f) => f.id === Number(id));
  const isWatched = watchlist.some((f) => f.id === Number(id));
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [loginAction, setLoginAction] = useState("add to favorites");

  const handleFav = () => {
    if (!user) { setLoginAction("add to favorites"); setLoginModal(true); return; }
    dispatch(toggleFavorite(movie));
  };

  const handleWatchlist = () => {
    if (!user) { setLoginAction("add to watchlist"); setLoginModal(true); return; }
    dispatch(toggleWatchlist(movie));
    toast.success(isWatched ? `Removed from watchlist` : `Added to watchlist`, { icon: isWatched ? "🗑️" : "🔖" });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: movie?.title, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!", { icon: "🔗" });
    }
  };

  if (loading) return <SkeletonDetails />;

  if (error || !movie) {
    return (
      <div className="text-center py-24">
        <p className="text-6xl mb-4">🎬</p>
        <h2 className="text-white text-xl font-semibold mb-2">Movie not found</h2>
        <p className="text-gray-500 text-sm mb-6">We couldn't find what you were looking for.</p>
        <Link to="/" className="text-white bg-[#e50914] px-4 py-2 rounded-lg text-sm">Go Home</Link>
      </div>
    );
  }

  const backdrop = movie.backdrop_path ? `${IMG_ORIGINAL}${movie.backdrop_path}` : null;
  const poster = movie.poster_path ? `${IMG_W500}${movie.poster_path}` : PLACEHOLDER;
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;
  const director = movie.credits?.crew?.find((c) => c.job === "Director");
  const cast = movie.credits?.cast?.slice(0, 12) || [];
  const trailer = movie.videos?.results?.find((v) => v.type === "Trailer" && v.site === "YouTube");
  const similar = movie.similar?.results?.filter((m) => m.poster_path).slice(0, 10) || [];
  const companies = movie.production_companies?.filter((c) => c.logo_path).slice(0, 4) || [];

  return (
    <>
      <div>
        {/* Backdrop */}
        {backdrop && (
          <div className="relative h-[50vh] overflow-hidden">
            <img src={backdrop} alt="" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/60 to-transparent" />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 -mt-24 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-6 group">
            <FaArrowLeft className="text-xs group-hover:-translate-x-1 transition-transform" />
            Back to Movies
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
      
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex-shrink-0">
              <img src={poster} alt={movie.title} className="w-48 md:w-64 rounded-2xl shadow-2xl mx-auto md:mx-0 ring-1 ring-white/10" />
            </motion.div>

          
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {movie.genres?.map((g) => (
                  <span key={g.id} className="text-xs font-medium px-3 py-1 rounded-full bg-[#e50914]/20 text-[#e50914] border border-[#e50914]/30">{g.name}</span>
                ))}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl tracking-wider text-white mb-2">{movie.title?.toUpperCase()}</h1>
              {movie.tagline && <p className="text-gray-400 italic text-sm mb-4">"{movie.tagline}"</p>}

              <div className="flex flex-wrap gap-4 items-center text-sm text-gray-400 mb-5">
                <StarRating rating={movie.vote_average} />
                <span className="text-gray-600 text-xs flex items-center gap-1">
                  <FaStar className="text-yellow-400 text-xs" />
                  {movie.vote_count?.toLocaleString()} votes
                </span>
                {movie.release_date && (
                  <span className="flex items-center gap-1.5"><FaCalendar className="text-xs text-gray-600" />{movie.release_date}</span>
                )}
                {runtime && (
                  <span className="flex items-center gap-1.5"><FaClock className="text-xs text-gray-600" />{runtime}</span>
                )}
                {movie.original_language && (
                  <span className="flex items-center gap-1.5"><FaGlobe className="text-xs text-gray-600" />{movie.original_language.toUpperCase()}</span>
                )}
              </div>

              {director && (
                <p className="text-sm text-gray-400 mb-4">
                  <span className="text-gray-600">Directed by</span>{" "}
                  <span className="text-white font-medium">{director.name}</span>
                </p>
              )}

              <p className="text-gray-300 leading-relaxed text-sm mb-6 max-w-2xl">{movie.overview || "No overview available."}</p>

             
              <div className="flex flex-wrap gap-3 mb-8">
                {trailer && (
                  <button onClick={() => setTrailerOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white text-black hover:bg-gray-200 transition-all duration-200 hover:scale-105">
                    <FaPlay className="text-xs" /> Watch Trailer
                  </button>
                )}
                <button onClick={handleFav}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isFav ? "bg-[#e50914] text-white hover:bg-red-700" : "bg-white/10 text-white hover:bg-white/20 border border-white/10"}`}>
                  {isFav ? <FaHeart /> : <FaRegHeart />}
                  {isFav ? "Remove Favorite" : "Add to Favorites"}
                </button>
                <button onClick={handleWatchlist}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isWatched ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white/10 text-white hover:bg-white/20 border border-white/10"}`}>
                  {isWatched ? <FaBookmark /> : <FaRegBookmark />}
                  {isWatched ? "In Watchlist" : "Add to Watchlist"}
                </button>
                <button onClick={handleShare}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white/10 text-white hover:bg-white/20 border border-white/10 transition-all duration-200">
                  <FaShare className="text-xs" /> Share
                </button>
              </div>

              
              {cast.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <div className="w-0.5 h-4 bg-[#e50914] rounded-full" />Cast
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {cast.map((actor) => (
                      <div key={actor.id} className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full pl-1 pr-3 py-1 hover:border-[#e50914]/30 transition-colors">
                        <img
                          src={actor.profile_path ? `${IMG_W500}${actor.profile_path}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=2a2a2a&color=fff&size=40`}
                          alt={actor.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-xs text-gray-300 font-medium">{actor.name}</p>
                          {actor.character && <p className="text-[10px] text-gray-600">{actor.character}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              
              {companies.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                    <div className="w-0.5 h-4 bg-[#e50914] rounded-full" />Production
                  </h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    {companies.map((c) => (
                      <div key={c.id} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                        <img
                          src={`https://image.tmdb.org/t/p/w200${c.logo_path}`}
                          alt={c.name}
                          className="h-5 object-contain filter brightness-0 invert opacity-70"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-4 pb-8">
            <MovieCarousel title="Similar Movies" movies={similar} loading={false} accentColor="#e50914" />
          </div>
        )}
      </div>

      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        trailerKey={trailer?.key}
        title={movie.title}
      />
      <LoginRequiredModal isOpen={loginModal} onClose={() => setLoginModal(false)} action={loginAction} />
    </>
  );
}

export default MovieDetails;
