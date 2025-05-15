import React, { useState, useEffect } from "react";
import { FiSearch, FiClock, FiCalendar, FiX } from "react-icons/fi";
import { MdFlight, MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import styles from "./User_FlightSearch.module.css";

const User_FlightsSearch = () => {
  const [flightNumber, setFlightNumber] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:8081/flights");
        if (!response.ok) {
          throw new Error("Failed to fetch flights");
        }
        const data = await response.json();
        setFlights(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleSearch = () => {
    if (!flightNumber.trim()) {
      setFilteredFlights([]);
      return;
    }

    const filtered = flights.filter(flight => 
      flight.FlightID.toString().includes(flightNumber) ||
      `${flight.DepartureCity.slice(0, 2).toUpperCase()}${flight.FlightID}`.includes(flightNumber.toUpperCase())
    );

    setFilteredFlights(filtered);

    // Add to search history if not already present and we have results
    if (filtered.length > 0 && !searchHistory.includes(flightNumber)) {
      setSearchHistory([flightNumber, ...searchHistory].slice(0, 5));
    }
  };

  const handleHistoryClick = (historyItem) => {
    setFlightNumber(historyItem);
    // Trigger search immediately when clicking history
    const filtered = flights.filter(flight => 
      flight.FlightID.toString().includes(historyItem) ||
      `${flight.DepartureCity.slice(0, 2).toUpperCase()}${flight.FlightID}`.includes(historyItem.toUpperCase())
    );
    setFilteredFlights(filtered);
  };

  const clearSearch = () => {
    setFlightNumber("");
    setFilteredFlights([]);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return '#3b82f6';
      case 'Delayed': return '#f59e0b';
      case 'Cancelled': return '#ef4444';
      case 'Departed': return '#10b981';
      case 'Arrived': return '#10b981';
      default: return '#6b7280';
    }
  };


  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <MdFlight className={styles.logoIcon} />
          <span>Uçuş Takip</span>
        </div>
        <h1 className={styles.title}>Uçuş Durumu Sorgulama</h1>
        <p className={styles.subtitle}>Gerçek zamanlı uçuş bilgileri</p>
      </div>

      <div className={styles.searchCard}>
        <div className={styles.inputGroup}>
          <label htmlFor="flightNumber" className={styles.label}>
            <MdFlightTakeoff className={styles.labelIcon} />
            Uçuş Numarası
          </label>
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="flightNumber"
              placeholder="Örnek: TK1953 veya uçuş ID"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              className={styles.input}
              autoComplete="off"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            {flightNumber && (
              <button className={styles.clearButton} onClick={clearSearch}>
                <FiX className={styles.clearIcon} />
              </button>
            )}
            <FiSearch className={styles.inputIcon} />
          </div>
          <p className={styles.inputHint}>Havayolu kodu ve numara girin (Örnek: TK1953) veya uçuş ID</p>
        </div>

        <button 
          className={styles.searchButton} 
          onClick={handleSearch}
          disabled={loading}
        >
          <FiSearch className={styles.searchIcon} />
          {loading ? 'Yükleniyor...' : 'Uçuş Ara'}
        </button>
      </div>

      {error && (
        <div className={styles.errorCard}>
          <p className={styles.errorText}>{error}</p>
        </div>
      )}

      {searchHistory.length > 0 && (
        <div className={styles.historySection}>
          <h3 className={styles.sectionTitle}>
            <FiClock className={styles.sectionIcon} />
            Son Aramalar
          </h3>
          <div className={styles.historyItems}>
            {searchHistory.map((item, index) => (
              <button
                key={index}
                className={styles.historyItem}
                onClick={() => handleHistoryClick(item)}
              >
                <MdFlightLand className={styles.historyIcon} />
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredFlights.length > 0 ? (
        <div className={styles.resultsSection}>
          <h3 className={styles.sectionTitle}>
            <MdFlight className={styles.sectionIcon} />
            Uçuş Sonuçları
          </h3>
          <div className={styles.flightsList}>
            {filteredFlights.map((flight) => (
              <div key={flight.FlightID} className={styles.flightCard}>
                <div className={styles.flightHeader}>
                  <div className={styles.flightNumber}>
                    {flight.DepartureCity.slice(0, 2).toUpperCase()}{flight.FlightID}
                  </div>
                  <div 
                    className={styles.flightStatus}
                    style={{ backgroundColor: getStatusColor(flight.Status) }}
                  >
                    {flight.Status === 'Scheduled' ? 'Planlanan' : 
                     flight.Status === 'Delayed' ? 'Gecikmeli' :
                     flight.Status === 'Cancelled' ? 'İptal Edildi' :
                     flight.Status === 'Departed' ? 'Kalkış Yaptı' :
                     flight.Status === 'Arrived' ? 'Varış Yaptı' : flight.Status}
                  </div>
                </div>
                <div className={styles.flightRoute}>
                  <div className={styles.routeSegment}>
                    <div className={styles.airportCode}>{flight.DepartureCity.slice(0, 3).toUpperCase()}</div>
                    <div className={styles.time}>{formatTime(flight.DepartureTime)}</div>
                    <div className={styles.date}>{formatDate(flight.DepartureTime)}</div>
                  </div>
                  <div className={styles.flightSeparator}>
                    <div className={styles.flightLine}></div>
                    <MdFlight className={styles.flightIcon} />
                  </div>
                  <div className={styles.routeSegment}>
                    <div className={styles.airportCode}>{flight.ArrivalCity.slice(0, 3).toUpperCase()}</div>
                    <div className={styles.time}>{formatTime(flight.ArrivalTime)}</div>
                    <div className={styles.date}>{formatDate(flight.ArrivalTime)}</div>
                  </div>
                </div>
                <div className={styles.flightDetails}>
                  <div className={styles.detailItem}>
                    <span>Uçuş ID:</span>
                    <span>{flight.FlightID}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span>Rota:</span>
                    <span>{flight.DepartureCity} → {flight.ArrivalCity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : flightNumber && !loading && !error && (
        <div className={styles.noResults}>
          <p>"{flightNumber}" için uçuş bulunamadı</p>
        </div>
      )}

      {!flightNumber && !loading && !error && (
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <FiCalendar className={styles.featureIcon} />
            <h4>Uçuş Programları</h4>
            <p>Yaklaşan uçuş saatlerini ve tarihlerini görüntüleyin</p>
          </div>
          <div className={styles.featureCard}>
            <MdFlightTakeoff className={styles.featureIcon} />
            <h4>Anlık Güncellemeler</h4>
            <p>Gerçek zamanlı kalkış ve varış bilgileri</p>
          </div>
          <div className={styles.featureCard}>
            <MdFlightLand className={styles.featureIcon} />
            <h4>Detaylı Durum</h4>
            <p>Kapı bilgileri, gecikmeler ve bagaj bilgileri</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default User_FlightsSearch;