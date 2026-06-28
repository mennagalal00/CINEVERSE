import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaInfoCircle, FaStar } from "react-icons/fa";
import { IMG_ORIGINAL } from "../../lib/constants";
import { api } from "../../lib/api";
import { SkeletonHero } from "../ui/SkeletonCard";
import TrailerModal from "../ui/TrailerModal";

function HeroBanner() {
  const [movies, setMovies] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [trailerModal, setTrailerModal] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerTitle, setTrailerTitle] = useState("");

  useEffect(() => {
    api.getTrending().then((res) => {
      const top = res.data.results.filter((m) => m.backdrop_path).slice(0, 5);
      setMovies(top);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (movies.length < 2) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % movies.length), 7000);
    return () => clearInterval(t);
  }, [movies]);

  const openTrailer = async () => {
    const movie = movies[current];
    if (!movie) return;
    try {
      const res = await api.getMovieDetails(movie.id);
      const trailer = res.data.videos?.results?.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
        setTrailerTitle(movie.title);
        setTrailerModal(true);
      }
    } catch {}
  };

  if (loading) return <SkeletonHero />;
  if (!movies.length) return null;

  const movie = movies[current];
  const backdrop = movie.backdrop_path ? `${IMG_ORIGINAL}${movie.backdrop_path}` : null;

  return (
    <>
      <div className="relative h-[75vh] min-h-[500px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {backdrop ? (
              <img
                src={backdrop}
                alt={movie.title}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full bg-[#1a1a1a]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
          </motion.div>
        </AnimatePresence>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-8 md:px-16 pb-16 pt-32 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-[#e50914] uppercase tracking-widest">Featured</span>
                <span className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="flex items-center gap-1 text-xs text-yellow-400">
                  <FaStar className="text-[10px]" />
                  {movie.vote_average?.toFixed(1)}
                </span>
                {movie.release_date && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-600" />
                    <span className="text-xs text-gray-400">{movie.release_date.slice(0,4)}</span>
                  </>
                )}
              </div>

              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-wider text-white leading-none mb-4">
                {movie.title?.toUpperCase()}
              </h1>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 max-w-xl">
                {movie.overview}
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={openTrailer}
                  className="flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:scale-105"
                >
                  <FaPlay className="text-xs" /> Watch Trailer
                </button>
                <Link
                  to={`/movie/${movie.id}`}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm border border-white/20 transition-all duration-200 backdrop-blur-sm"
                >
                  <FaInfoCircle className="text-sm" /> View Details
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${i === current ? "w-6 h-2 bg-[#e50914]" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </div>

      <TrailerModal
        isOpen={trailerModal}
        onClose={() => { setTrailerModal(false); setTrailerKey(null); }}
        trailerKey={trailerKey}
        title={trailerTitle}
      />
    </>
  );
}

export default HeroBanner;
