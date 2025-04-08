import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 transition-all duration-300 mx-2 sm:mx-4 md:m-12 mt-6 sm:mt-6 md:mt-12 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
        <div className="text-center md:text-left w-full md:w-auto mb-4 md:mb-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-1 capitalize">
            {weather.weather[0].description}
          </p>
        </div>
        
        <div className="flex items-center justify-center md:justify-end w-full md:w-auto">
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="w-20 h-20 sm:w-24 sm:h-24 -mr-2 sm:-mr-4"
          />
          <div className="text-center md:text-right">
            <h3 className="text-5xl sm:text-6xl font-bold text-gray-800 dark:text-white">
              {Math.round(weather.main.temp)}°C
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Feels like {Math.round(weather.main.feels_like)}°C
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-4 sm:mt-6">
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Humidity</p>
          <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">{weather.main.humidity}%</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Wind</p>
          <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
            {Math.round(weather.wind.speed * 3.6)} km/h
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Pressure</p>
          <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">{weather.main.pressure} hPa</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Sunrise / Sunset</p>
          <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
            {formatTime(weather.sys.sunrise)} / {formatTime(weather.sys.sunset)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;