import React from "react";
import ThemeToggle from "./ThemeToggle";
import HistoryButton from "./HistoryButton";

const Navbar = ({ onHistoryToggle }) => {
  return (
    <nav className="dark:bg-gray-800 bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold dark:text-white text-gray-900">
          Weather Dashboard
          </h1>
          
          <div className="flex items-center space-x-4">
            <HistoryButton onClick={onHistoryToggle} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;