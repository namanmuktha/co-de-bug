import React, { useState, useEffect } from "react";
import data from "../data/BigDataMedicine (9).json";
import Widget from "./widget.js";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const maxSuggestions = 3;

  useEffect(() => {
    const storedRecentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedRecentSearches);
  }, []);

  const updateRecentSearches = (query) => {
    const updatedRecentSearches = [query, ...recentSearches.slice(0, 4)];
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecentSearches));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setLoading(true);
    setError(null);

    const filteredSuggestions = data.filter((item) =>
      item.MedicineName.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filteredSuggestions.slice(0, maxSuggestions));
    setLoading(false);
  };

  const handleSuggestionClick = (index) => {
    const selected = suggestions[index];
    setSelectedData(selected);
    setSuggestions([]);
    updateRecentSearches(selected.MedicineName);
  };

  const opendescription = () => {
    setShowDescription((prev) => !prev);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSuggestionClick(highlightedIndex);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setSelectedData(null);
    setHighlightedIndex(-1);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for Recent Searches */}
      <aside className="w-1/4 bg-white shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Searches</h3>
        <Widget selectedData={selectedData} recentSearches={recentSearches} />
      </aside>

      {/* Main Content for Search */}
      <main className="flex-1 p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">MedSearch</h1>
        <form className="w-full max-w-md">
          <div className="relative">
            <input
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search for medicines"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              aria-label="Search for medicines"
            />
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 top-2 px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            >
              Clear
            </button>
          </div>
          {loading && <p className="text-blue-500 mt-2">Loading...</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {suggestions.length > 0 && (
            <ul className="mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(index)}
                  className={`p-4 hover:bg-blue-100 cursor-pointer ${
                    highlightedIndex === index ? "bg-blue-200" : ""
                  }`}
                >
                  <h5 className="text-lg font-semibold text-gray-700">
                    {item.MedicineName}
                  </h5>
                  <p className="text-sm text-gray-500">{item.Manufacturer}</p>
                </li>
              ))}
            </ul>
          )}
        </form>

        {selectedData && (
          <div className="mt-8 w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
            <h5 className="text-2xl font-semibold text-gray-800">
              {selectedData.MedicineName}
            </h5>
            <p className="text-sm text-gray-500 mt-2">
              Manufacturer: {selectedData.Manufacturer}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={opendescription}
            >
              {showDescription ? "Hide Description" : "Show Description"}
            </button>
            {showDescription && (
              <div className="mt-4">
                <h6 className="font-bold text-lg text-gray-700">Uses:</h6>
                {selectedData.Uses.split("\n").map((line, index) => (
                  <p key={index} className="text-gray-600">
                    {line}
                  </p>
                ))}
                <h6 className="font-bold text-lg text-gray-700 mt-4">
                  Side Effects:
                </h6>
                {selectedData.Side_effects.split("\n").map((line, index) => (
                  <p key={index} className="text-gray-600">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default Search;
