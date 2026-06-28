import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchMovies } from "../redux/moviesSlice";
import MovieCard from "../components/movies/MovieCard";
import MovieCarousel from "../components/movies/MovieCarousel";
import HeroBanner from "../components/movies/HeroBanner";
import SkeletonCard from "../components/ui/SkeletonCard";
import EmptyState from "../components/ui/EmptyState";
import SearchBar from "../components/search/SearchBar";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDebounce } from "../hooks/useDebounce";
import { api } from "../lib/api";
import { getRecentlyViewed } from "../lib/localStorage";

const CATEGORIES = [
  { key: "trending", label: "Trending This Week", color: "#e50914", fetcher: (p) => api.getTrending(p) },
  { key: "popular", label: "Popular Movies", color: "#f59e0b", fetcher: (p) => api.getPopular(p) },
  { key: "top_rated", label: "Top Rated", color: "#10b981", fetcher: (p) => api.getTopRated(p) },
  { key: "upcoming", label: "Coming Soon", color: "#6366f1", fetcher: (p) => api.getUpcoming(p) },
  { key: "now_playing", label: "Now Playing", color: "#ec4899", fetcher: (p) => api.getNowPlaying(p) },
];

function Home() {
  const dispatch = useDispatch();
  const { items: movies, loading, error, totalPages } = useSelector((s) => s.movies);
  const [searchParams, setSearchParams] = useSearchParams();

  const [inputVal, setInputVal] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [categoryData, setCategoryData] = useState({});
  const [categoryLoading, setCategoryLoading] = useState({});
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const search = searchParams.get("search") || "";
  const debouncedInput = useDebounce(inputVal, 500);
  const hasFilters = Object.values(filters).some(Boolean);

  // Load recently viewed
  useEffect(() => {
    setRecentlyViewed(getRecentlyViewed().slice(0, 10));
  }, []);

  // Fetch categories only when no search
  useEffect(() => {
    if (search) return;
    CATEGORIES.forEach(({ key, fetcher }) => {
      setCategoryLoading((p) => ({ ...p, [key]: true }));
      fetcher(1).then((res) => {
        setCategoryData((p) => ({ ...p, [key]: res.data.results }));
      }).catch(() => {}).finally(() => {
        setCategoryLoading((p) => ({ ...p, [key]: false }));
      });
    });
  }, [search]);

  // Search/filter
  useEffect(() => {
    if (!search && !hasFilters) return;
    setPage(1);
  }, [search, hasFilters]);

  useEffect(() => {
    if (!search && !hasFilters) return;
    if (search) {
      dispatch(fetchMovies({ search, page }));
    } else if (hasFilters) {
      dispatch(fetchMovies({ search: "", page, filters }));
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search, page, dispatch, hasFilters, filters]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (trimmed) setSearchParams({ search: trimmed });
    else setSearchParams({});
    setPage(1);
  };

  const handleClear = () => {
    setSearchParams({});
    setInputVal("");
    setFilters({});
    setPage(1);
  };

  const changePage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  const showSearchResults = search || hasFilters;

  return (
    <div>
      {/* Hero */}
      {!showSearchResults && <HeroBanner />}

      <div className={showSearchResults ? "max-w-7xl mx-auto px-4 sm:px-6 py-8" : "py-8"}>

        {/* Search bar */}
        <div className={showSearchResults ? "mb-8" : "px-4 sm:px-6 mb-12"}>
          {!showSearchResults && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
              <h1 className="font-display text-4xl sm:text-5xl tracking-wider text-white mb-2">
                DISCOVER <span className="text-[#e50914]">MOVIES</span>
              </h1>
              <p className="text-gray-500 text-sm">Explore thousands of films — find your next favourite</p>
            </motion.div>
          )}
          <SearchBar
            inputVal={inputVal}
            setInputVal={setInputVal}
            onSearch={handleSearch}
            onClear={handleClear}
            hasSearch={showSearchResults}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

      
        {showSearchResults && (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-[#e50914] rounded-full" />
              <p className="text-gray-400 text-sm">
                {search ? <>Results for <span className="text-white font-semibold">"{search}"</span></> : "Filtered results"}
                {!loading && movies.length > 0 && <span className="ml-2 text-gray-600">({movies.length} found)</span>}
              </p>
            </div>

            {error && (
              <div className="text-center py-20">
                <p className="text-red-400 text-sm mb-3">{error}</p>
                <button onClick={() => dispatch(fetchMovies({ search, page }))} className="text-white bg-[#e50914] px-4 py-2 rounded-lg text-sm">Retry</button>
              </div>
            )}

            {!error && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {loading
                  ? [...Array(18)].map((_, i) => <SkeletonCard key={i} />)
                  : movies.map((movie, i) => <MovieCard key={movie.id} movie={movie} index={i} />)
                }
              </div>
            )}

            {!loading && !error && movies.length === 0 && (
              <EmptyState type="search" description={`No movies found for "${search || "these filters"}"`} />
            )}

           
            {!loading && movies.length > 0 && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button onClick={() => changePage(page - 1)} disabled={page === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#e50914] disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors">
                  <FaChevronLeft className="text-sm" />
                </button>
                {[...Array(Math.min(5, totalPages))].map((_, idx) => {
                  let p;
                  if (totalPages <= 5) p = idx + 1;
                  else if (page <= 3) p = idx + 1;
                  else if (page >= totalPages - 2) p = totalPages - 4 + idx;
                  else p = page - 2 + idx;
                  return (
                    <button key={p} onClick={() => changePage(p)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-[#e50914] text-white" : "bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#e50914] text-white"}`}>
                      {p}
                    </button>
                  );
                })}
                <button onClick={() => changePage(page + 1)} disabled={page >= totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#e50914] disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors">
                  <FaChevronRight className="text-sm" />
                </button>
              </div>
            )}
          </>
        )}

      
        {!showSearchResults && (
          <div className="mt-8">
            {recentlyViewed.length > 1 && (
              <MovieCarousel
                title="Recently Viewed"
                movies={recentlyViewed}
                loading={false}
                accentColor="#94a3b8"
              />
            )}
            {CATEGORIES.map(({ key, label, color }) => (
              <MovieCarousel
                key={key}
                title={label}
                movies={categoryData[key] || []}
                loading={!!categoryLoading[key]}
                accentColor={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
