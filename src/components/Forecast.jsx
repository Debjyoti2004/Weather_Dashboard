import React from "react";
import { motion } from "framer-motion";

const Forecast = ({ data }) => {
  if (!data || !data.length) return null;

  const getDayName = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString(undefined, { weekday: 'short' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">5-Day Forecast</h3>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {data.map((day, index) => (
          <motion.div
            key={day.dt}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 text-center transition-transform hover:scale-105"
            variants={item}
          >
            <h4 className="font-medium text-gray-800 dark:text-white">{getDayName(day.dt)}</h4>
            <div className="flex justify-center">
              <img 
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="w-16 h-16"
              />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(day.main.temp)}°C</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{day.weather[0].description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Forecast;