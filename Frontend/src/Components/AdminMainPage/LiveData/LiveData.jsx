import React, { useEffect, useState } from "react";
import "./LiveData.css";

const LiveData = () => {
  const [flightStats, setFlightStats] = useState({
    onTime: 0,
    delayed: 0,
    inAir: 0,
    totalFlights: 0,
    arrivals: 0,
    departures: 0,
  });

  const [weatherData, setWeatherData] = useState([]);
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        setFlightStats({
          onTime: 84,
          delayed: 12,
          inAir: 37,
          totalFlights: 128,
          arrivals: 42,
          departures: 39,
        });

        setWeatherData([
          { city: "Istanbul", condition: "partly-sunny", temp: 22, code: "IST" },
          { city: "Berlin", condition: "rainy", temp: 17, code: "BER" },
          { city: "Dubai", condition: "sunny", temp: 35, code: "DXB" },
        ]);

        setNotices([
          { id: 1, type: "announcement", message: "New Istanbul-Tokyo flights starting June 15!" },
          { id: 2, type: "alert", message: "Increased security at EU airports" },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching live data:", error);
        setIsLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setFlightStats((prev) => ({
        ...prev,
        inAir: Math.max(30, Math.min(45, prev.inAir + (Math.random() > 0.5 ? 1 : -1))),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "sunny":
        return "☀️";
      case "rainy":
        return "🌧️";
      case "cloudy":
        return "☁️";
      case "partly-sunny":
        return "⛅";
      case "clear-night":
        return "🌃";
      default:
        return "🌤️";
    }
  };

  const getWeatherColor = (condition) => {
    switch (condition) {
      case "sunny":
        return "#FFD700";
      case "rainy":
        return "#6495ED";
      case "cloudy":
        return "#A9A9A9";
      case "partly-sunny":
        return "#87CEEB";
      case "clear-night":
        return "#191970";
      default:
        return "#ADD8E6";
    }
  };

  if (isLoading) {
    return (
      <div className="live-data-container">
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Loading real-time data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="live-data-container">
      <div className="live-data-header">
        <h2 className="live-data-title">
          <span className="live-indicator"></span>
          Real-Time Flight Data
        </h2>
        <div className="last-updated">
          Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="live-data-content">
        {/* Performance Card */}
        <div className="data-card performance">
          <div className="card-header">
            <h3>Flight Performance</h3>
            <span className={`status-tag ${flightStats.onTime > 80 ? 'positive' : 'warning'}`}>
              {flightStats.onTime > 80 ? 'Excellent' : 'Needs Attention'}
            </span>
          </div>
          <div className="card-content">
            <div className="progress-container">
              <div className="progress-labels">
                <span>On Time: {flightStats.onTime}%</span>
                <span>Delayed: {flightStats.delayed}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${flightStats.onTime}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Card */}
        <div className="data-card traffic">
          <div className="card-header">
            <h3>Air Traffic</h3>
            <span className="status-tag neutral">Live</span>
          </div>
          <div className="card-content">
            <div className="traffic-stats">
              <div className="traffic-stat">
                <div className="stat-icon">✈️</div>
                <div className="stat-value">{flightStats.inAir}</div>
                <div className="stat-label">In Air</div>
              </div>
              <div className="traffic-stat">
                <div className="stat-icon">↑</div>
                <div className="stat-value">{flightStats.departures}</div>
                <div className="stat-label">Departures</div>
              </div>
              <div className="traffic-stat">
                <div className="stat-icon">↓</div>
                <div className="stat-value">{flightStats.arrivals}</div>
                <div className="stat-label">Arrivals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather Card */}
        <div className="data-card weather">
          <div className="card-header">
            <h3>Weather Conditions</h3>
            <span className="status-tag">{weatherData.length} Cities</span>
          </div>
          <div className="card-content">
            <div className="weather-grid">
              {weatherData.map((weather, index) => (
                <div key={index} className="weather-item">
                  <div 
                    className="weather-icon"
                    style={{ backgroundColor: getWeatherColor(weather.condition) }}
                  >
                    {getWeatherIcon(weather.condition)}
                  </div>
                  <div className="weather-details">
                    <span className="city-code">{weather.code}</span>
                    <span className="city-name">{weather.city}</span>
                    <span className="city-temp">{weather.temp}°C</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notices Card */}
        <div className="data-card notices">
          <div className="card-header">
            <h3>Notices & Alerts</h3>
            <span className="status-tag">{notices.length} Active</span>
          </div>
          <div className="card-content">
            <div className="notices-list">
              {notices.map((notice) => (
                <div key={notice.id} className={`notice-item ${notice.type}`}>
                  <div className="notice-icon">
                    {notice.type === "announcement" ? "📢" : "⚠️"}
                  </div>
                  <div className="notice-text">{notice.message}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveData;