import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiTrash2, FiPlus, FiEdit, FiSearch } from "react-icons/fi";
import "./AdminAircrafts.css";

const AdminAircrafts = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const [newAircraft, setNewAircraft] = useState({
    AircraftName: "",
    Capacity: "",
    AirlineID: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [airlines, setAirlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Uçakları ve havayollarını getir
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [aircraftsRes, airlinesRes] = await Promise.all([
          fetch("http://localhost:8081/aircrafts"),
          fetch("http://localhost:8081/airlines")
        ]);
        
        const aircraftsData = await aircraftsRes.json();
        const airlinesData = await airlinesRes.json();
        
        setAircrafts(aircraftsData);
        setAirlines(airlinesData);
      } catch (err) {
        toast.error("Veriler yüklenirken hata oluştu");
        console.error("Hata:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Yeni uçak ekle veya güncelle
const handleSubmitAircraft = async () => {
  if (!newAircraft.AircraftName || !newAircraft.Capacity || !newAircraft.AirlineID) {
    toast.warn("Lütfen tüm alanları doldurun");
    return;
  }

  try {
    const url = editingId 
      ? `http://localhost:8081/aircrafts/${editingId}`
      : "http://localhost:8081/aircrafts";
    
    const method = editingId ? "PUT" : "POST";
    
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Model: newAircraft.AircraftName,
        Capacity: parseInt(newAircraft.Capacity),
        AirlineID: parseInt(newAircraft.AirlineID) // Burada AirlineID yazım hatası vardı (AirlineID yerine AirlineID)
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || (editingId ? "Güncelleme başarısız" : "Ekleme başarısız"));
    }

    toast.success(editingId ? "Uçak güncellendi!" : "Uçak eklendi!");
    setNewAircraft({ AircraftName: "", Capacity: "", AirlineID: "" });
    setEditingId(null);
    
    // Listeyi yenile
    const res = await fetch("http://localhost:8081/aircrafts");
    const updatedData = await res.json();
    setAircrafts(updatedData);
  } catch (err) {
    toast.error(err.message || "İşlem sırasında hata oluştu");
    console.error("Hata:", err);
  }
};

  // Uçak sil
  const handleDeleteAircraft = async (id) => {
    try {
      const res = await fetch(`http://localhost:8081/aircrafts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Silme başarısız");
      }

      toast.success("Uçak silindi!");
      setAircrafts(aircrafts.filter(aircraft => aircraft.AircraftID !== id));
    } catch (err) {
      toast.error("Silme işlemi başarısız");
      console.error("Hata:", err);
    }
  };

  // Düzenleme moduna geç
  const handleEditAircraft = (aircraft) => {
    setNewAircraft({
      AircraftName: aircraft.Model,
      Capacity: aircraft.Capacity,
      AirlineID: aircraft.AirlineID
    });
    setEditingId(aircraft.AircraftID);
  };

  // Arama sonuçlarını filtrele
  const filteredAircrafts = aircrafts.filter(aircraft => {
    const searchLower = searchTerm.toLowerCase();
    return (
      aircraft.Model.toLowerCase().includes(searchLower) ||
      (airlines.find(a => a.AirlineID === aircraft.AirlineID)?.AirlineName.toLowerCase().includes(searchLower) ||
      aircraft.Capacity.toString().includes(searchTerm))
    );
  });

  // Havayolu adını getir
  const getAirlineName = (airlineId) => {
    const airline = airlines.find(a => a.AirlineID === airlineId);
    return airline ? airline.AirlineName : "Bilinmiyor";
  };

  return (
    <div className="admin-aircrafts-container">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="admin-aircrafts-header">
        <h1>Uçak Yönetim Paneli</h1>
        <p>Sistemde kayıtlı uçakları görüntüleyebilir ve yönetebilirsiniz</p>
      </div>

      <div className="admin-aircrafts-card">
        {/* Arama ve Filtreleme */}
        <div className="search-bar">
          <div className="search-input-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Uçak ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Yeni Uçak Ekleme/Güncelleme Formu */}
        <div className="aircraft-form">
          <h2>{editingId ? "Uçak Bilgilerini Güncelle" : "Yeni Uçak Ekle"}</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Uçak Modeli</label>
              <input
                type="text"
                placeholder="Örnek: Boeing 737"
                value={newAircraft.AircraftName}
                onChange={(e) => setNewAircraft({ ...newAircraft, AircraftName: e.target.value })}
              />
            </div>
            
            <div className="form-group">
              <label>Yolcu Kapasitesi</label>
              <input
                type="number"
                placeholder="Örnek: 180"
                value={newAircraft.Capacity}
                onChange={(e) => setNewAircraft({ ...newAircraft, Capacity: e.target.value })}
              />
            </div>
            
            <div className="form-group">
              <label>Havayolu</label>
              <select
                value={newAircraft.AirlineID}
                onChange={(e) => setNewAircraft({ ...newAircraft, AirlineID: e.target.value })}
              >
                <option value="">Havayolu seçin</option>
                {airlines.map(airline => (
                  <option key={airline.AirlineID} value={airline.AirlineID}>
                    {airline.AirlineName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-actions">
            {editingId && (
              <button 
                className="cancel-btn"
                onClick={() => {
                  setNewAircraft({ AircraftName: "", Capacity: "", AirlineID: "" });
                  setEditingId(null);
                }}
              >
                İptal
              </button>
            )}
            <button 
              className="submit-btn"
              onClick={handleSubmitAircraft}
            >
              {editingId ? "Güncelle" : "Ekle"} <FiPlus />
            </button>
          </div>
        </div>

        {/* Uçak Listesi */}
        <div className="aircrafts-table-container">
          {isLoading ? (
            <div className="loading-spinner">Yükleniyor...</div>
          ) : (
            <>
              <div className="table-header">
                <h3>Uçak Listesi</h3>
                <span>Toplam: {filteredAircrafts.length} uçak</span>
              </div>
              
              {filteredAircrafts.length === 0 ? (
                <div className="no-results">Sonuç bulunamadı</div>
              ) : (
                <table className="aircrafts-table">
                  <thead>
                    <tr>
                      <th>Model</th>
                      <th>Kapasite</th>
                      <th>Havayolu</th>
                      <th>İşlemler</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAircrafts.map((aircraft) => (
                      <tr key={aircraft.AircraftID}>
                        <td>{aircraft.Model}</td>
                        <td>{aircraft.Capacity}</td>
                        <td>{getAirlineName(aircraft.AirlineID)}</td>
                        <td className="actions-cell">
                          <button 
                            className="edit-btn"
                            onClick={() => handleEditAircraft(aircraft)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => {
                              if (window.confirm(`${aircraft.Model} model uçağı silmek istediğinize emin misiniz?`)) {
                                handleDeleteAircraft(aircraft.AircraftID);
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

export default AdminAircrafts;