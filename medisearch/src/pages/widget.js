import React from "react";

function Widget({ selectedData, recentSearches }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full mx-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Searches</h3>
      {recentSearches.length > 0 ? (
        <ul className="space-y-2">
          {recentSearches.map((search, index) => (
            <li
              key={index}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-md shadow-sm transition-transform transform hover:scale-105 hover:bg-blue-200"
            >
              {search}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No recent searches found.</p>
      )}
    </div>
  );
}

export default Widget;
