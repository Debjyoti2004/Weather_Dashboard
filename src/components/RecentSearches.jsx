import React from "react";

const RecentSearches = ({ searches, onSearch }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">Recent Searches</h3>
      <ul className="list-disc pl-4 mt-2">
        {searches.map((city, index) => (
          <li
            key={index}
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={() => onSearch(city)}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;