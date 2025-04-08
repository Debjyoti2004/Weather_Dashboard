import React from "react";
import { motion } from "framer-motion";

const SearchHistory = ({ history, onSearch, onClose }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Search History</h2>
        
        {history.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No recent searches</p>
        ) : (
          <ul className="space-y-3">
            {history.map((item, index) => (
              <motion.li 
                key={item.name + index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={() => onSearch(item.name)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      className="w-10 h-10"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.name}, {item.sys.country}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {Math.round(item.main.temp)}°C - {item.weather[0].description}
                      </p>
                    </div>
                  </div>
                  {item.timestamp && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTime(item.timestamp)}
                    </span>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SearchHistory;