import { createSlice } from "@reduxjs/toolkit";

const load = () => {
  try {
    const d = localStorage.getItem("cv_watchlist");
    return d ? JSON.parse(d) : [];
  } catch { return []; }
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { items: load() },
  reducers: {
    toggleWatchlist: (state, action) => {
      const movie = action.payload;
      const exists = state.items.some((i) => i.id === movie.id);
      if (exists) {
        state.items = state.items.filter((i) => i.id !== movie.id);
      } else {
        state.items.push(movie);
      }
      localStorage.setItem("cv_watchlist", JSON.stringify(state.items));
    },
  },
});

export const { toggleWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
