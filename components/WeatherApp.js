import React, { useContext, useState } from 'react';
import { WeatherContext } from './WeatherContext';
import styles from './WeatherDisplay.module.css';

const WeatherApp = () => {
  const { weatherData, setWeatherData, loading, setLoading, error, setError } = useContext(WeatherContext);
  const [city, setCity] = useState('');

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4576e8930a969471777ac04c08b5f78b`);
      if (!response.ok) throw new Error('City Not Found');
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#282c34', color: 'white' }}>
        <h1>Weather App</h1>
      </header>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: '10px',
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={fetchWeather}
          style={{
            padding: '10px 15px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Get Weather
        </button>
      </div>
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      {weatherData && (
        <div className={styles.weatherInfo}>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
