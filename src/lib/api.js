import axiosInstance from "./axiosInstance";
import { API_KEY } from "./constants";

const params = (extra = {}) => ({ api_key: API_KEY, ...extra });

export const api = {
  // Home categories
  getTrending: (page = 1) =>
    axiosInstance.get("/trending/movie/week", { params: params({ page }) }),
  getPopular: (page = 1) =>
    axiosInstance.get("/movie/popular", { params: params({ page }) }),
  getTopRated: (page = 1) =>
    axiosInstance.get("/movie/top_rated", { params: params({ page }) }),
  getUpcoming: (page = 1) =>
    axiosInstance.get("/movie/upcoming", { params: params({ page }) }),
  getNowPlaying: (page = 1) =>
    axiosInstance.get("/movie/now_playing", { params: params({ page }) }),

  // Search
  searchMovies: (query, page = 1, filters = {}) => {
    const extra = { query, page };
    if (filters.genre) extra.with_genres = filters.genre;
    if (filters.year) extra.year = filters.year;
    if (filters.rating) extra["vote_average.gte"] = filters.rating;
    if (filters.language) extra.with_original_language = filters.language;
    return axiosInstance.get("/search/movie", { params: params(extra) });
  },
  discoverMovies: (page = 1, filters = {}) => {
    const extra = { page, sort_by: "popularity.desc" };
    if (filters.genre) extra.with_genres = filters.genre;
    if (filters.year) extra.primary_release_year = filters.year;
    if (filters.rating) extra["vote_average.gte"] = filters.rating;
    if (filters.language) extra.with_original_language = filters.language;
    return axiosInstance.get("/discover/movie", { params: params(extra) });
  },

  // Details
  getMovieDetails: (id) =>
    axiosInstance.get(`/movie/${id}`, {
      params: params({ append_to_response: "credits,videos,similar,images" }),
    }),

  // Genres
  getGenres: () =>
    axiosInstance.get("/genre/movie/list", { params: params() }),
};
