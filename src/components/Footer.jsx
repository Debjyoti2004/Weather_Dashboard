import React from "react";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <footer className=" 'bg-gray-800 text-gray-300 py-4 mt-8 border-t transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm">
          Created with ❤️ by Debjyoti 
          <span className="mx-2">•</span>
          © {new Date().getFullYear()} Weather Dashboard
        </p>
      </div>
    </footer>
  );
};

export default Footer;