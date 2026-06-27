import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import moviesReducer from "./moviesSlice";
import watchlistReducer from "./watchlistSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
    watchlist: watchlistReducer,
  },
});
