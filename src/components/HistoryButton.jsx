import React from "react";

const HistoryButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-gray-300 text-gray-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      History
    </button>
  );
};

export default HistoryButton;