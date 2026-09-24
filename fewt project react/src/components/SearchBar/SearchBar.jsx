import React from "react";
import { Search, X } from "lucide-react";
import "./SearchBar.css";

const SearchBar = ({ value, onChange, onClear, placeholder = "Search for movies..." }) => {
  return (
    <div className="search-bar-wrapper glass-panel">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      {value && (
        <button onClick={onClear} className="clear-btn" aria-label="Clear Search">
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
