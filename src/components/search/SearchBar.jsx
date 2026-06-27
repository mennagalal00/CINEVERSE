import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaTimes, FaHistory, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { getSearchHistory, addSearchHistory, clearSearchHistory } from "../../lib/localStorage";
import { useGenres } from "../../hooks/useGenres";

const YEARS = Array.from({ length: 35 }, (_, i) => (2024 - i).toString());
const LANGUAGES = [
  { code: "en", label: "English" }, { code: "es", label: "Spanish" },
  { code: "fr", label: "French" }, { code: "de", label: "German" },
  { code: "ja", label: "Japanese" }, { code: "ko", label: "Korean" },
  { code: "zh", label: "Chinese" }, { code: "hi", label: "Hindi" },
  { code: "it", label: "Italian" }, { code: "pt", label: "Portuguese" },
];

function SearchBar({ inputVal, setInputVal, onSearch, onClear, hasSearch, filters, setFilters }) {
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const containerRef = useRef(null);
  const genres = useGenres();
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(getSearchHistory());
  }, [showHistory]);

  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setShowHistory(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) addSearchHistory(inputVal.trim());
    onSearch(e);
    setShowHistory(false);
  };

  const selectHistory = (q) => {
    setInputVal(q);
    addSearchHistory(q);
    setShowHistory(false);
    navigate(`/?search=${encodeURIComponent(q)}`);
  };

  const activeFilters = Object.values(filters).filter(Boolean).length;

  return (
    <div ref={containerRef} className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
          <input
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white pl-10 pr-4 py-3 rounded-xl outline-none focus:border-[#e50914] transition-colors placeholder-gray-600 text-sm"
            placeholder="Search movies, titles..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onFocus={() => setShowHistory(true)}
          />
          <AnimatePresence>
            {showHistory && history.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-full left-0 right-0 mt-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl z-50 overflow-hidden"
              >
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a2a2a]">
                  <span className="text-xs text-gray-500 flex items-center gap-1.5"><FaHistory className="text-[10px]" />Recent</span>
                  <button type="button" onClick={() => { clearSearchHistory(); setHistory([]); }} className="text-xs text-gray-600 hover:text-red-400 transition-colors">Clear</button>
                </div>
                {history.map((q, i) => (
                  <button key={i} type="button" onClick={() => selectHistory(q)}
                    className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2">
                    <FaHistory className="text-xs text-gray-600" />{q}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button type="button" onClick={() => setShowFilters((p) => !p)}
          className={`relative flex items-center gap-1.5 px-3 py-3 rounded-xl border text-sm transition-colors duration-200 ${showFilters || activeFilters > 0 ? "bg-red-900/20 border-red-800/40 text-red-400" : "bg-[#1a1a1a] border-[#2a2a2a] text-gray-400 hover:text-white"}`}>
          Filters
          {activeFilters > 0 && <span className="w-4 h-4 bg-[#e50914] rounded-full text-white text-[9px] flex items-center justify-center font-bold">{activeFilters}</span>}
          {showFilters ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
        </button>

        <button type="submit" className="bg-[#e50914] hover:bg-red-700 text-white px-5 py-3 rounded-xl font-medium text-sm transition-colors whitespace-nowrap">Search</button>
        {hasSearch && (
          <button type="button" onClick={onClear} className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl text-sm transition-colors">
            <FaTimes />
          </button>
        )}
      </form>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="mt-3 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Genre</label>
                <select value={filters.genre || ""} onChange={(e) => setFilters((p) => ({ ...p, genre: e.target.value }))}
                  className="w-full bg-[#141414] border border-[#2a2a2a] text-white text-xs px-2 py-2 rounded-lg outline-none focus:border-[#e50914]">
                  <option value="">All Genres</option>
                  {genres.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Year</label>
                <select value={filters.year || ""} onChange={(e) => setFilters((p) => ({ ...p, year: e.target.value }))}
                  className="w-full bg-[#141414] border border-[#2a2a2a] text-white text-xs px-2 py-2 rounded-lg outline-none focus:border-[#e50914]">
                  <option value="">Any Year</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Min Rating</label>
                <select value={filters.rating || ""} onChange={(e) => setFilters((p) => ({ ...p, rating: e.target.value }))}
                  className="w-full bg-[#141414] border border-[#2a2a2a] text-white text-xs px-2 py-2 rounded-lg outline-none focus:border-[#e50914]">
                  <option value="">Any Rating</option>
                  {[9,8,7,6,5].map((r) => <option key={r} value={r}>{r}+ Stars</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Language</label>
                <select value={filters.language || ""} onChange={(e) => setFilters((p) => ({ ...p, language: e.target.value }))}
                  className="w-full bg-[#141414] border border-[#2a2a2a] text-white text-xs px-2 py-2 rounded-lg outline-none focus:border-[#e50914]">
                  <option value="">Any Language</option>
                  {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
                </select>
              </div>
            </div>
            {activeFilters > 0 && (
              <div className="mt-2 flex justify-end">
                <button type="button" onClick={() => setFilters({})} className="text-xs text-gray-500 hover:text-red-400 transition-colors">Clear all filters</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;
