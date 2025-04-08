# Weather Dashboard

## 🌤️ Overview
This is a Weather Dashboard built using React.js, designed to fetch real-time weather data from the OpenWeatherMap API. The app allows users to search for any city, view live weather information, and toggle between Dark Mode and Light Mode. Bonus features include recent search history, a 5-day forecast, and smooth animations.

## 🛠️ Tech Stack
- **Framework**: React.js (Vite)
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **HTTP Requests**: Axios
- **Environment Variables**: Vite's `import.meta.env` for secure API key storage

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Debjyoti2004/Weather_Dashboard.git
   cd weather_dashboard

   ```

2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
- Create a .env file in the root directory.
- Add your OpenWeatherMap API key:
```bash
VITE_OPENWEATHER_API_KEY= your_api_key_here
```
4. Start the development server:
```bash
npm run dev
```
- The app will be available at http://localhost:5173 .

## API Integration Details
- **API Used**: [OpenWeatherMap API](https://openweathermap.org/api)
- **API Documentation**:
  - [Current Weather Data API](https://openweathermap.org/current)
  - [5-Day Forecast API](https://openweathermap.org/forecast5)

## API Endpoints

1. Current Weather :
```sh
https://api.openweathermap.org/data/2.5/weather?units=metric&q=
```
2. 5-Day Forecast :
```sh
https://api.openweathermap.org/data/2.5/weather?units=metric&q=
```
3. API Key :

```sh
e593ebbfb5672309205d72b113c19530
```