import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import ErrorBox from "./components/ErrorBox";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import SearchHistory from "./components/SearchHistory";
import Forecast from "./components/Forecast";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeContext from "./context/ThemeContext";
import Footer from "./components/Footer";
import "./App.css";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const CURRENT_API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const savedHistory = localStorage.getItem("weatherSearchHistory");
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        const validHistory = parsedHistory.filter(
          item => item?.name && item?.main && item?.weather
        );
        setSearchHistory(validHistory);
      } catch (error) {
        console.error("Error parsing history:", error);
      }
    }

    const handleOnline = () => setError("");
    const handleOffline = () => setError("No internet connection");
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const processForecastData = (data) => {
    const dailyForecasts = {};
    data?.list?.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = item;
      }
    });
    return Object.values(dailyForecasts).slice(1, 6);
  };

  const updateHistory = (weatherData) => {
    if (!weatherData?.name) {
      console.error("Invalid weather data");
      return;
    }

    const newEntry = {
      ...weatherData,
      timestamp: Date.now()
    };

    const newHistory = [
      newEntry,
      ...searchHistory.filter(item => 
        item?.name?.toLowerCase() !== weatherData.name.toLowerCase()
      )
    ].slice(0, 5);

    setSearchHistory(newHistory);
    localStorage.setItem("weatherSearchHistory", JSON.stringify(newHistory));
  };

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${CURRENT_API_URL}${city}&appid=${API_KEY}`),
        axios.get(`${FORECAST_API_URL}${city}&appid=${API_KEY}`)
      ]);
      
      if (currentRes?.status !== 200 || forecastRes?.status !== 200) {
        throw new Error("API request failed");
      }
      
      setWeather(currentRes.data);
      setForecast(processForecastData(forecastRes.data));
      updateHistory(currentRes.data);
      setShowHistory(false);
    } catch (err) {
      let errorMessage = "Connection error";
      
      if (err.response) {
        errorMessage = err.response.status === 404 
          ? "Location not found" 
          : `API Error: ${err.response.data?.message || err.message}`;
      } else if (err.request) {
        errorMessage = "Network error - check internet connection";
      } else {
        errorMessage = `Error: ${err.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="app-container min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-white">
        <Navbar onHistoryToggle={() => setShowHistory(true)} />
        
        <AnimatePresence>
          {showHistory && (
            <SearchHistory
              history={searchHistory}
              onSearch={fetchWeather}
              onClose={() => setShowHistory(false)}
            />
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen dark:bg-gray-900 bg-gray-50 p-8 pt-24 relative"
        >
          <div className="max-w-4xl mx-auto">
            <SearchBar 
              onSearch={fetchWeather} 
              hasResults={!!weather}
            />
            
            <AnimatePresence>
              {loading && <Loader />}
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ErrorBox message={error} />
                </motion.div>
              )}
              
              {weather && (
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <WeatherCard weather={weather} />
                  {forecast && <Forecast data={forecast} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        <Footer />
      </div>
  );
};

const RootApp = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default RootApp;