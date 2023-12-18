import React from "react";
import "../styles/widget.scss";
import data from "../data/BigDataMedicine (9).json";
function Widget({ selectedData, recentSearches }) {
  return (
    <div className="widget">
      <h3>Recent Searches</h3>

      <ul>
        {recentSearches.map((search, index) => (
          <li key={index}>{search}</li>
        ))}
      </ul>
    </div>
  );
}

export default Widget;
