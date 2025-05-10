import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiGlobe, FiNavigation, FiInfo, FiSearch } from "react-icons/fi";
import styles from "./User_Airports.module.css";

const User_Airports = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/airports")
      .then((response) => response.json())
      .then((data) => {
        setAirports(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Veri çekilirken hata oluştu:", error);
        setLoading(false);
      });
  }, []);

  const handleAirportClick = (code) => {
    navigate(`/airport/${code}`);
  };

  const filteredAirports = airports.filter(airport => 
    airport.AirportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.Country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airport.Code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dünya Havalimanları</h1>
        <p className={styles.subtitle}>Keşfetmek için bir havalimanı seçin</p>
        
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Havalimanı, şehir veya kod ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Havalimanları yükleniyor...</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredAirports.map((item) => (
            <div
              key={item.Code}
              className={styles.card}
              onClick={() => handleAirportClick(item.Code)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.code}>{item.Code}</div>
                <div className={styles.badge}>
                  <FiNavigation className={styles.badgeIcon} />
                  <span>Havalimanı</span>
                </div>
              </div>
              
              <h3 className={styles.name}>{item.AirportName}</h3>
              
              <div className={styles.location}>
                <div className={styles.infoItem}>
                  <FiMapPin className={styles.icon} />
                  <span>{item.City}, {item.Country}</span>
                </div>
                
                <div className={styles.infoItem}>
                  <FiGlobe className={styles.icon} />
                  <span>{item.Country}</span>
                </div>
              </div>
              
              <button className={styles.button}>
                <FiInfo className={styles.buttonIcon} />
                <span>Detayları Gör</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default User_Airports;