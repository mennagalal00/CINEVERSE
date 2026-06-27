import { useState, useEffect } from "react";
import { api } from "../lib/api";

export function useGenres() {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    api.getGenres().then((res) => setGenres(res.data.genres)).catch(() => {});
  }, []);
  return genres;
}
