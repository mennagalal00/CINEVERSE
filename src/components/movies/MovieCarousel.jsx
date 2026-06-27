import { useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";
import SkeletonCard from "../ui/SkeletonCard";

function MovieCarousel({ title, movies, loading, accentColor = "#e50914" }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 600, behavior: "smooth" });
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full" style={{ backgroundColor: accentColor }} />
          <h2 className="text-white font-semibold text-lg">{title}</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll(-1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            onClick={() => scroll(1)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 pb-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {loading
          ? [...Array(8)].map((_, i) => (
              <div key={i} className="flex-none w-36 sm:w-44" style={{ scrollSnapAlign: "start" }}>
                <SkeletonCard />
              </div>
            ))
          : movies.map((movie, i) => (
              <div key={movie.id} className="flex-none w-36 sm:w-44" style={{ scrollSnapAlign: "start" }}>
                <MovieCard movie={movie} index={i} />
              </div>
            ))}
      </div>
    </section>
  );
}

export default MovieCarousel;
