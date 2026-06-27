import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { addRecentlyViewed } from "../lib/localStorage";

export function useMovieDetails(id) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    api
      .getMovieDetails(id)
      .then((res) => {
        setMovie(res.data);
        addRecentlyViewed(res.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { movie, loading, error };
}
