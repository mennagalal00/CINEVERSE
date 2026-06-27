import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../lib/api";
import axiosInstance from "../lib/axiosInstance";
import { API_KEY } from "../lib/constants";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ search, page, filters = {} }, { rejectWithValue }) => {
    try {
      let res;
      if (search) {
        res = await api.searchMovies(search, page, filters);
      } else if (Object.values(filters).some(Boolean)) {
        res = await api.discoverMovies(page, filters);
      } else {
        res = await axiosInstance.get(`/movie/popular?api_key=${API_KEY}&page=${page}`);
      }
      return { results: res.data.results, totalPages: res.data.total_pages };
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch movies");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: { items: [], loading: false, error: null, totalPages: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
