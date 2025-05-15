import React, { useEffect, useState } from "react";
import { FiEdit, FiSun, FiCloud, FiCloudRain, FiCloudSnow } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin_Runways.css";

const Admin_Runways = () => {
  const [runwayData, setRunwayData] = useState({
    length: "3200",
    width: "Bilinmiyor",
    surfaceType: "Asphalt",
    lighting: "Evet",
    weather: "sunny"
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Pist bilgileri güncellendi!");
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    setRunwayData({
      length: "3200",
      width: "Bilinmiyor",
      surfaceType: "Asphalt",
      lighting: "Evet",
      weather: "sunny"
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRunwayData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getWeatherIcon = () => {
    switch(runwayData.weather) {
      case 'sunny':
        return <FiSun className="weather-icon sunny" />;
      case 'cloudy':
        return <FiCloud className="weather-icon cloudy" />;
      case 'rainy':
        return <FiCloudRain className="weather-icon rainy" />;
      case 'snowy':
        return <FiCloudSnow className="weather-icon snowy" />;
      default:
        return <FiSun className="weather-icon sunny" />;
    }
  };

  return (
    <div className="admin-runways-container">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="admin-header">
        <h1>SkyWings Havalimanı Pist Bilgileri</h1>
        <p>Havalimanı pist durumunu görüntüleyebilirsiniz.</p>
      </div>

      <div className="admin-card">
        <div className="runway-status">
          <div className="status-header">
            <h2>Pist Durum Paneli</h2>
            <div className="weather-display">
              {getWeatherIcon()}
              <span className="weather-text">
                {runwayData.weather === 'sunny' && 'Güneşli'}
                {runwayData.weather === 'cloudy' && 'Bulutlu'}
                {runwayData.weather === 'rainy' && 'Yağmurlu'}
                {runwayData.weather === 'snowy' && 'Karlı'}
              </span>
            </div>
          </div>
          
          <div className="runway-info-grid">
            <div className="info-card">
              <div className="info-label">Uzunluk</div>
              {isEditing ? (
                <input
                  type="text"
                  name="length"
                  value={runwayData.length}
                  onChange={handleChange}
                  className="info-input"
                />
              ) : (
                <div className="info-value">{runwayData.length} metre</div>
              )}
            </div>
            
            <div className="info-card">
              <div className="info-label">Genişlik</div>
              {isEditing ? (
                <input
                  type="text"
                  name="width"
                  value={runwayData.width}
                  onChange={handleChange}
                  className="info-input"
                />
              ) : (
                <div className="info-value">{runwayData.width} metre</div>
              )}
            </div>
            
            <div className="info-card">
              <div className="info-label">Yüzey Tipi</div>
              {isEditing ? (
                <select
                  name="surfaceType"
                  value={runwayData.surfaceType}
                  onChange={handleChange}
                  className="info-select"
                >
                  <option value="Asphalt">Asfalt</option>
                  <option value="Concrete">Beton</option>
                  <option value="Grass">Çim</option>
                  <option value="Gravel">Çakıl</option>
                </select>
              ) : (
                <div className="info-value">
                  <span className={`surface-badge ${runwayData.surfaceType.toLowerCase()}`}>
                    {runwayData.surfaceType === "Asphalt" && "Asfalt"}
                    {runwayData.surfaceType === "Concrete" && "Beton"}
                    {runwayData.surfaceType === "Grass" && "Çim"}
                    {runwayData.surfaceType === "Gravel" && "Çakıl"}
                  </span>
                </div>
              )}
            </div>
            
            <div className="info-card">
              <div className="info-label">Aydınlatma</div>
              {isEditing ? (
                <select
                  name="lighting"
                  value={runwayData.lighting}
                  onChange={handleChange}
                  className="info-select"
                >
                  <option value="Evet">Evet</option>
                  <option value="Hayır">Hayır</option>
                  <option value="Kısmi">Kısmi</option>
                </select>
              ) : (
                <div className="info-value">
                  <span className={`lighting-badge ${runwayData.lighting.toLowerCase()}`}>
                    {runwayData.lighting}
                  </span>
                </div>
              )}
            </div>
            
            {isEditing && (
              <div className="info-card">
                <div className="info-label">Hava Durumu</div>
                <select
                  name="weather"
                  value={runwayData.weather}
                  onChange={handleChange}
                  className="info-select"
                >
                  <option value="sunny">Güneşli</option>
                  <option value="cloudy">Bulutlu</option>
                  <option value="rainy">Yağmurlu</option>
                  <option value="snowy">Karlı</option>
                </select>
              </div>
            )}
          </div>
          
          
        </div>
        
        <div className="runway-notifications">
          <h3>Pist Durum Bildirimleri</h3>
          <div className="notification-list">
            <div className="notification-item">
              <div className="notification-icon info">i</div>
              <div className="notification-content">
                <p>Pist yüzeyi rutin bakım için kontrol edildi.</p>
                <span className="notification-time">2 saat önce</span>
              </div>
            </div>
            <div className="notification-item">
              <div className="notification-icon warning">!</div>
              <div className="notification-content">
                <p>Pist aydınlatma sisteminde arıza tespit edildi.</p>
                <span className="notification-time">1 gün önce</span>
              </div>
            </div>
            <div className="notification-item">
              <div className="notification-icon success">✓</div>
              <div className="notification-content">
                <p>Pist çizgileri yenilendi.</p>
                <span className="notification-time">3 gün önce</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Runways;