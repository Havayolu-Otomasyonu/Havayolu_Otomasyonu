import React, { useEffect, useState } from "react";
import "./Admin_Airlines.css";

const Admin_Airlines = () => {
  const [airlines, setAirlines] = useState([]);
  const [newAirline, setNewAirline] = useState({
    AirlineName: "",
    Country: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirlines = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8081/airlines");
        if (!response.ok) throw new Error("Failed to fetch airlines");
        const data = await response.json();
        setAirlines(data);
        setError(null);
      } catch (err) {
        console.error("Havayolları yüklenemedi:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAirlines();
  }, []);

  const handleAddAirline = async () => {
    if (!newAirline.AirlineName.trim() || !newAirline.Country.trim()) {
      setError("Lütfen tüm alanları doldurun");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/airlines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAirline),
      });

      if (!response.ok) throw new Error("Havayolu eklenemedi");
      
      setNewAirline({ AirlineName: "", Country: "" });
      setError(null);
      
      // Refresh the list
      const res = await fetch("http://localhost:8081/airlines");
      const data = await res.json();
      setAirlines(data);
    } catch (err) {
      console.error("Havayolu eklenemedi:", err);
      setError(err.message);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/airlines/${id}/toggle-status`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Durum değiştirilemedi");
      
      const updatedAirlines = airlines.map(airline => 
        airline.AirlineID === id 
          ? { ...airline, isActive: !airline.isActive } 
          : airline
      );
      setAirlines(updatedAirlines);
    } catch (err) {
      console.error("Durum değiştirilemedi:", err);
      setError(err.message);
    }
  };

  return (
    <div className="admin-airlines-container">
      <div className="admin-airlines-card">
        <h1 className="admin-airlines-title">Havayolları Yönetimi</h1>

        {/* Add Airline Form */}
        <div className="add-airline-form">
          <h2>Yeni Havayolu Ekle</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Havayolu Adı"
              value={newAirline.AirlineName}
              onChange={(e) => setNewAirline({ ...newAirline, AirlineName: e.target.value })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Ülke"
              value={newAirline.Country}
              onChange={(e) => setNewAirline({ ...newAirline, Country: e.target.value })}
              className="form-input"
            />
          </div>
          <button 
            onClick={handleAddAirline}
            className="add-airline-button"
          >
            Havayolu Ekle
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Airlines List */}
        <div className="airlines-list-container">
          <h2>Havayolu Listesi</h2>
          {isLoading ? (
            <div className="loading-spinner">Yükleniyor...</div>
          ) : (
            <div className="table-responsive">
              <table className="airlines-table">
                <thead>
                  <tr>
                    <th>Havayolu Adı</th>
                    <th>Ülke</th>
                    <th>Durum</th>
                    <th>İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {airlines.length > 0 ? (
                    airlines.map((airline) => (
                      <tr key={airline.AirlineID}>
                        <td>{airline.AirlineName}</td>
                        <td>{airline.Country}</td>
                        <td>
                          <span className={`status-badge ${airline.isActive ? 'active' : 'inactive'}`}>
                            {airline.isActive ? "Aktif" : "Pasif"}
                          </span>
                        </td>
                        <td>
                          <button 
                            onClick={() => handleToggleStatus(airline.AirlineID)}
                            className={`toggle-button ${airline.isActive ? 'active' : 'inactive'}`}
                          >
                            {airline.isActive ? "Pasif Yap" : "Aktif Yap"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="no-data">Kayıtlı havayolu bulunamadı</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin_Airlines;