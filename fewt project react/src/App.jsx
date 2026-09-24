import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { WatchlistProvider } from "./context/WatchlistContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import PersonDetails from "./pages/PersonDetails/PersonDetails";
import Watchlist from "./pages/Watchlist/Watchlist";

const App = () => {
  return (
    <ThemeProvider>
      <WatchlistProvider>
        <Router>
          {/* Main Layout Container */}
          <Navbar />
          
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movie/:movie_id" element={<MovieDetails />} />
              <Route path="/person/:person_id" element={<PersonDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
              
              {/* Catch-all Redirect */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          
          <Footer />
        </Router>
      </WatchlistProvider>
    </ThemeProvider>
  );
};

export default App;
