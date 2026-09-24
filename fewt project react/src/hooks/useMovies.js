import { useState, useEffect, useCallback } from "react";
import * as api from "../services/tmdbApi";

export const useMovieFetch = (apiFunc, ...args) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      setData(response);
    } catch (err) {
      console.error("useMovieFetch error:", err);
      setError(err.message || "Something went wrong while fetching data");
    } finally {
      setLoading(false);
    }
  }, [apiFunc, JSON.stringify(args)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for home page lists (Popular, Top Rated, Trending, Upcoming)
export const useHomeFeeds = () => {
  const [feeds, setFeeds] = useState({
    trending: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [trendingRes, popularRes, topRatedRes, upcomingRes] = await Promise.all([
          api.getTrendingMovies(),
          api.getPopularMovies(),
          api.getTopRatedMovies(),
          api.getUpcomingMovies(),
        ]);

        setFeeds({
          trending: trendingRes.results || [],
          popular: popularRes.results || [],
          topRated: topRatedRes.results || [],
          upcoming: upcomingRes.results || [],
        });
      } catch (err) {
        console.error("useHomeFeeds error:", err);
        setError("Could not load homepage category feeds.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { feeds, loading, error };
};
