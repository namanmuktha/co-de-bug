import React, { useState, useEffect } from "react";
import "../styles/search.scss";
import { IoSearch } from "react-icons/io5";
import data from "../data/BigDataMedicine (9).json";
import Widget from "./widget.js";
import Chatbot from "./chatbot.js";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const maxSuggestions = 3;

  useEffect(() => {
    // Load recent searches from localStorage
    const storedRecentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedRecentSearches);
  }, []);

  const updateRecentSearches = (query) => {
    // Update recent searches in state and localStorage
    const updatedRecentSearches = [query, ...recentSearches.slice(0, 4)]; // Limit to the last 5 searches
    setRecentSearches(updatedRecentSearches);
    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updatedRecentSearches)
    );
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredSuggestions = data.filter(
      (item) =>
        item.MedicineName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );

    setSuggestions(filteredSuggestions.slice(0, maxSuggestions));
  };

  const handleSuggestionClick = (index) => {
    const selected = suggestions[index];
    setSelectedData(selected);
    setSuggestions([]);
    updateRecentSearches(selected.MedicineName);
  };

  const opendescription = () => {
    setShowDescription((prevShowDescription) => !prevShowDescription);
  };

  return (
    <div className="search">
      <Widget selectedData={selectedData} recentSearches={recentSearches} />
      <h1>MedSearch</h1>
      <form action="/results" method="get">
        <div className="search-container">
          <input
            className="searching"
            type="text"
            name="q"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <br />
          <br />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(index)}
                  className={showDescription && index === 0 ? "selected" : ""}
                >
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{item.MedicineName}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        {item.Manufacturer} <br />
                      </h6>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>

      <div className="info">
        {selectedData && (
          <div className="card info1">
            <div className="card-body">
              <h5 className="card-title">{selectedData.MedicineName}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                <p>{Object.values(selectedData.Manufacturer)}</p>
                <br />
                <button
                  className="description-button"
                  onClick={opendescription}
                >
                  Description
                </button>
                <br />
                <br />
              </h6>

              {showDescription && (
                <div className="tooltip-text active">
                  <h6>Uses:</h6>
                  {selectedData.Uses.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                  <br />
                  <br />
                  <h6>Side Effects:</h6>
                  {selectedData.Side_effects.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* <Chatbot /> */}
    </div>
  );
}

export default Search;
