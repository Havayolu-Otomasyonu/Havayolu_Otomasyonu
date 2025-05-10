import { useEffect, useState } from "react";
import { FiClock, FiMapPin, FiAirplay, FiCalendar, FiAlertCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";
import styles from "./User_Flights.module.css";

const User_Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch("http://localhost:8081/flights")
      .then((response) => response.json())
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Veri çekilirken hata oluştu:", error);
        setLoading(false);
      });
  }, []);

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'delayed': return <FiAlertCircle className={styles.statusIcon} />;
      case 'on-time': return <FiCheckCircle className={styles.statusIcon} />;
      case 'cancelled': return <FiXCircle className={styles.statusIcon} />;
      default: return <FiClock className={styles.statusIcon} />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Uçuş Bilgileriniz</h2>
        <p className={styles.subtitle}>Tüm uçuşlarınız burada listelenmektedir</p>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Uçuş bilgileri yükleniyor...</p>
        </div>
      ) : (
        <div className={styles.list}>
          {flights.map((flight) => (
            <div key={flight.FlightID} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.flightNumber}>
                  <FiAirplay className={styles.flightIcon} />
                  <span>Uçuş #{flight.FlightID}</span>
                </div>
                <div className={`${styles.status} ${styles[flight.Status.toLowerCase()]}`}>
                  {getStatusIcon(flight.Status)}
                  <span>{flight.Status}</span>
                </div>
              </div>

              <div className={styles.details}>
                <div className={styles.route}>
                  <div className={styles.departure}>
                    <div className={styles.city}>{flight.DepartureCity}</div>
                    <div className={styles.time}>{flight.DepartureTime}</div>
                  </div>
                  
                  <div className={styles.divider}>
                    <div className={styles.line}></div>
                    <div className={styles.planeIcon}>✈</div>
                  </div>
                  
                  <div className={styles.arrival}>
                    <div className={styles.city}>{flight.ArrivalCity}</div>
                    <div className={styles.time}>{flight.ArrivalTime}</div>
                  </div>
                </div>

                <div className={styles.info}>
                  <div className={styles.infoItem}>
                    <FiCalendar className={styles.infoIcon} />
                    <span>{flight.Date}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <FiMapPin className={styles.infoIcon} />
                    <span>Kapı: {flight.Gate || 'A12'}</span>
                  </div>
                </div>
              </div>

              <div className={styles.footer}>
                <button className={styles.button}>Detayları Görüntüle</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default User_Flights;