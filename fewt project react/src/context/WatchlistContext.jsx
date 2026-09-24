import React, { createContext, useState, useEffect, useContext } from "react";

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem("movie_explorer_watchlist");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse watchlist from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("movie_explorer_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    if (!watchlist.some((item) => item.id === movie.id)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== movieId));
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((item) => item.id === movieId);
  };

  const toggleWatchlist = (movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        toggleWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
