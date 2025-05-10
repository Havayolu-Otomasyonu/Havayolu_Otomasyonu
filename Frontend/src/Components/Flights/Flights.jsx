import React, { useEffect, useState } from "react";
import foto from "./assests/havayolu_foto.jpg";
import "./Flights.css";

const AnimatedText = ({ text, className }) => {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="char"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

const Flights = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/flights")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFlights(data);
      })
      .catch((error) => {
        console.error("Veri çekilirken hata oluştu:", error);
      });
  }, []);

  const getStatusClass = (status) => {
    if (status === "Scheduled") return "status-scheduled";
    if (status === "Delayed") return "status-delayed";
    if (status === "Cancelled") return "status-cancelled";
    return "";
  };

  return (
    <div className="banner-container">
      <img src={foto} className="banner-image" alt="Havayolu" />
      <div className="banner-opacity"></div>
      <div className="banner-text">
        <h1 className="text-from-left">
          <AnimatedText text="Hoş Geldiniz" />
        </h1>
        <p className="text-from-bottom">
          <AnimatedText text="Hava Yolu Otomasyonu" />
        </p>
      </div>

      {/* Uçuş tablosu */}
      <div className="flight-table-container">
        <table className="flight-table">
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Uçuş Kodu</th>
              <th>Gideceği Yer</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.FlightID}>
                <td>{flight.ArrivalTime}</td>
                <td>{flight.FlightID}</td>
                <td>{flight.DepartureCity}</td>
                <td className={getStatusClass(flight.Status)}>{flight.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Flights;
