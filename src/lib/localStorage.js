// Recently viewed
export const getRecentlyViewed = () => {
  try {
    return JSON.parse(localStorage.getItem("cv_recently_viewed") || "[]");
  } catch { return []; }
};

export const addRecentlyViewed = (movie) => {
  try {
    const list = getRecentlyViewed();
    const filtered = list.filter((m) => m.id !== movie.id);
    const updated = [movie, ...filtered].slice(0, 20);
    localStorage.setItem("cv_recently_viewed", JSON.stringify(updated));
  } catch {}
};

// Search history
export const getSearchHistory = () => {
  try {
    return JSON.parse(localStorage.getItem("cv_search_history") || "[]");
  } catch { return []; }
};

export const addSearchHistory = (query) => {
  if (!query.trim()) return;
  try {
    const list = getSearchHistory();
    const filtered = list.filter((q) => q.toLowerCase() !== query.toLowerCase());
    const updated = [query, ...filtered].slice(0, 5);
    localStorage.setItem("cv_search_history", JSON.stringify(updated));
  } catch {}
};

export const clearSearchHistory = () => {
  localStorage.removeItem("cv_search_history");
};
