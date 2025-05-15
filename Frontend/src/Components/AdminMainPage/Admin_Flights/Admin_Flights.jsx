import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiTrash2, FiPlus, FiEdit, FiSearch, FiClock, FiCalendar } from "react-icons/fi";
import "./Admin_Flights.css";

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState({
    AircraftID: "",
    DepartureAirportID: "",
    ArrivalAirportID: "",
    DepartureTime: "",
    ArrivalTime: "",
    Status: "Scheduled"
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [airports, setAirports] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Verileri yükle
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [flightsRes, airportsRes, aircraftsRes] = await Promise.all([
          fetch("http://localhost:8081/flights"),
          fetch("http://localhost:8081/airports"),
          fetch("http://localhost:8081/aircrafts")
        ]);
        
        const flightsData = await flightsRes.json();
        const airportsData = await airportsRes.json();
        const aircraftsData = await aircraftsRes.json();
        
        setFlights(flightsData);
        setAirports(airportsData);
        setAircrafts(aircraftsData);
      } catch (err) {
        toast.error("Veriler yüklenirken hata oluştu");
        console.error("Hata:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Uçuş ekle veya güncelle
  const handleSubmitFlight = async () => {
    // Validasyonlar
    if (!newFlight.AircraftID || !newFlight.DepartureAirportID || 
        !newFlight.ArrivalAirportID || !newFlight.DepartureTime || 
        !newFlight.ArrivalTime) {
      toast.warn("Lütfen tüm alanları doldurun");
      return;
    }

    if (newFlight.DepartureAirportID === newFlight.ArrivalAirportID) {
      toast.warn("Kalkış ve varış havalimanları aynı olamaz");
      return;
    }

    try {
      const url = editingId 
        ? `http://localhost:8081/flights/${editingId}`
        : "http://localhost:8081/flights";
      
      const method = editingId ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AircraftID: parseInt(newFlight.AircraftID),
          DepartureAirportID: parseInt(newFlight.DepartureAirportID),
          ArrivalAirportID: parseInt(newFlight.ArrivalAirportID),
          DepartureTime: newFlight.DepartureTime,
          ArrivalTime: newFlight.ArrivalTime,
          Status: newFlight.Status
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || (editingId ? "Güncelleme başarısız" : "Ekleme başarısız"));
      }

      toast.success(editingId ? "Uçuş güncellendi!" : "Uçuş eklendi!");
      
      // Formu sıfırla
      setNewFlight({ 
        AircraftID: "", 
        DepartureAirportID: "", 
        ArrivalAirportID: "", 
        DepartureTime: "", 
        ArrivalTime: "", 
        Status: "Scheduled"
      });
      setEditingId(null);
      
      // Listeyi güncelle
      if (editingId) {
        setFlights(flights.map(flight => 
          flight.FlightID === editingId ? data : flight
        ));
      } else {
        const res = await fetch("http://localhost:8081/flights");
        const updatedData = await res.json();
        setFlights(updatedData);
      }
    } catch (err) {
      toast.error(err.message || "İşlem sırasında hata oluştu");
      console.error("Hata:", err);
    }
  };

  // Uçuş sil
  const handleDeleteFlight = async (id) => {
    try {
      const res = await fetch(`http://localhost:8081/flights/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Silme başarısız");
      }

      toast.success("Uçuş silindi!");
      setFlights(flights.filter(flight => flight.FlightID !== id));
    } catch (err) {
      toast.error(err.message || "Silme işlemi başarısız");
      console.error("Hata:", err);
    }
  };

  // Düzenleme moduna geç
  const handleEditFlight = (flight) => {
    setNewFlight({
      AircraftID: flight.AircraftID,
      DepartureAirportID: flight.DepartureAirportID,
      ArrivalAirportID: flight.ArrivalAirportID,
      DepartureTime: flight.DepartureTime.replace(' ', 'T').slice(0, 16),
      ArrivalTime: flight.ArrivalTime.replace(' ', 'T').slice(0, 16),
      Status: flight.Status
    });
    setEditingId(flight.FlightID);
  };

  // Arama sonuçlarını filtrele
  const filteredFlights = flights.filter(flight => {
    const searchLower = searchTerm.toLowerCase();
    return (
      flight.DepartureCity.toLowerCase().includes(searchLower) ||
      flight.ArrivalCity.toLowerCase().includes(searchLower) ||
      flight.AircraftModel.toLowerCase().includes(searchLower) ||
      flight.Status.toLowerCase().includes(searchLower) ||
      flight.DepartureTime.toLowerCase().includes(searchLower) ||
      flight.ArrivalTime.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="admin-flights-container">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="admin-flights-header">
        <h1>Uçuş Yönetim Paneli</h1>
        <p>Sistemde kayıtlı uçuşları görüntüleyebilir ve yönetebilirsiniz</p>
      </div>

      <div className="admin-flights-card">
        {/* Arama ve Filtreleme */}
        <div className="search-bar">
          <div className="search-input-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Uçuş ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Yeni Uçuş Ekleme/Güncelleme Formu */}
        <div className="flight-form">
          <h2>{editingId ? "Uçuş Bilgilerini Güncelle" : "Yeni Uçuş Ekle"}</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Kalkış Havalimanı</label>
              <select
                value={newFlight.DepartureAirportID}
                onChange={(e) => setNewFlight({ ...newFlight, DepartureAirportID: e.target.value })}
              >
                <option value="">Havalimanı seçin</option>
                {airports.map(airport => (
                  <option key={airport.AirportID} value={airport.AirportID}>
                    {airport.AirportName} ({airport.Code})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Varış Havalimanı</label>
              <select
                value={newFlight.ArrivalAirportID}
                onChange={(e) => setNewFlight({ ...newFlight, ArrivalAirportID: e.target.value })}
              >
                <option value="">Havalimanı seçin</option>
                {airports.map(airport => (
                  <option key={airport.AirportID} value={airport.AirportID}>
                    {airport.AirportName} ({airport.Code})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Uçak</label>
              <select
                value={newFlight.AircraftID}
                onChange={(e) => setNewFlight({ ...newFlight, AircraftID: e.target.value })}
              >
                <option value="">Uçak seçin</option>
                {aircrafts.map(aircraft => (
                  <option key={aircraft.AircraftID} value={aircraft.AircraftID}>
                    {aircraft.Model} (Kapasite: {aircraft.Capacity})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Kalkış Zamanı</label>
              <div className="datetime-input">
                
                <input
                  type="datetime-local"
                  value={newFlight.DepartureTime}
                  onChange={(e) => setNewFlight({ ...newFlight, DepartureTime: e.target.value })}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Varış Zamanı</label>
              <div className="datetime-input">
                
                <input
                  type="datetime-local"
                  value={newFlight.ArrivalTime}
                  onChange={(e) => setNewFlight({ ...newFlight, ArrivalTime: e.target.value })}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Durum</label>
              <select
                value={newFlight.Status}
                onChange={(e) => setNewFlight({ ...newFlight, Status: e.target.value })}
              >
                <option value="Scheduled">Planlandı</option>
                <option value="Delayed">Gecikti</option>
                <option value="Cancelled">İptal Edildi</option>
              </select>
            </div>
          </div>
          
          <div className="form-actions">
            {editingId && (
              <button 
                className="cancel-btn"
                onClick={() => {
                  setNewFlight({ 
                    AircraftID: "", 
                    DepartureAirportID: "", 
                    ArrivalAirportID: "", 
                    DepartureTime: "", 
                    ArrivalTime: "", 
                    Status: "Scheduled"
                  });
                  setEditingId(null);
                }}
              >
                İptal
              </button>
            )}
            <button 
              className="submit-btn"
              onClick={handleSubmitFlight}
            >
              {editingId ? "Güncelle" : "Ekle"} <FiPlus />
            </button>
          </div>
        </div>

        {/* Uçuş Listesi */}
        <div className="flights-table-container">
          {isLoading ? (
            <div className="loading-spinner">Yükleniyor...</div>
          ) : (
            <>
              <div className="table-header">
                <h3>Uçuş Listesi</h3>
                <span>Toplam: {filteredFlights.length} uçuş</span>
              </div>
              
              {filteredFlights.length === 0 ? (
                <div className="no-results">Sonuç bulunamadı</div>
              ) : (
                <table className="flights-table">
                  <thead>
                    <tr>
                      <th>Kalkış</th>
                      <th>Varış</th>
                      <th>Uçak</th>
                      <th>Kalkış Zamanı</th>
                      <th>Varış Zamanı</th>
                      <th>Durum</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFlights.map((flight) => (
                      <tr key={flight.FlightID}>
                        <td>
                          {flight.AirportName} ({flight.DepartureCode})
                          <br />
                          <small>{flight.DepartureCity}</small>
                        </td>
                        <td>
                          {flight.ArrivalAirportName} ({flight.ArrivalCode})
                          <br />
                          <small>{flight.ArrivalCity}</small>
                        </td>
                        <td>{flight.AircraftModel}</td>
                        <td>{new Date(flight.DepartureTime).toLocaleString()}</td>
                        <td>{new Date(flight.ArrivalTime).toLocaleString()}</td>
                        <td>
                          <span className={`status-badge ${flight.Status.toLowerCase()}`}>
                            {flight.Status}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <button 
                            className="edit-btn"
                            onClick={() => handleEditFlight(flight)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => {
                              if (window.confirm(`${flight.DepartureCode} → ${flight.ArrivalCode} uçuşunu silmek istediğinize emin misiniz?`)) {
                                handleDeleteFlight(flight.FlightID);
                              }
                            }}
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFlights;