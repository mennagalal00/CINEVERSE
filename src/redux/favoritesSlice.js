import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const loadFavorites = () => {
  try {
    const data = localStorage.getItem("cv_favorites");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { items: loadFavorites() },
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.items.some((item) => item.id === movie.id);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== movie.id);
        toast.success(`Added "${movie.title}" to favorites`, {
  icon: <FaHeart color="red" />,
});

toast.info(`Removed "${movie.title}" from favorites`, {
  icon: <FaRegHeart color="gray" />,
});}
      localStorage.setItem("cv_favorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
