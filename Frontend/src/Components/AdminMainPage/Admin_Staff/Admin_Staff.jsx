import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin_Staff.css";

const Admin_Staff = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [personel, setPersonel] = useState([]);
  const [newPersonel, setNewPersonel] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    Role: "Pilot",
  });
  const [isAdding, setIsAdding] = useState(false); // Formun görünürlüğü
  const [isSubmitting, setIsSubmitting] = useState(false); // Ekleme işlemi durumu
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8081/personnels");
      const data = await response.json();
      setPersonel(data);
    } catch (err) {
      toast.error("Veriler yüklenirken hata oluştu");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddPersonel = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8081/personnels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPersonel),
      });

      if (response.ok) {
        toast.success("Personel başarıyla eklendi");
        setNewPersonel({
          FirstName: "",
          LastName: "",
          Email: "",
          PhoneNumber: "",
          Role: "Pilot",
        });
        fetchData();
        setIsAdding(false);
      } else {
        toast.error("Ekleme başarısız");
      }
    } catch (err) {
      toast.error("Sunucu hatası");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu personeli silmek istediğinize emin misiniz?")) {
      try {
        const response = await fetch(`http://localhost:8081/personnels/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("Personel silindi");
          fetchData();
        } else {
          toast.error("Silme başarısız");
        }
      } catch (err) {
        toast.error("Sunucu hatası");
      }
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      const response = await fetch(`http://localhost:8081/personnels/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Status: newStatus }),
      });

      if (response.ok) {
        toast.success(`Personel ${newStatus === "Active" ? "aktif" : "pasif"} hale getirildi`);
        fetchData();
      } else {
        toast.error("Durum güncellenemedi");
      }
    } catch (err) {
      toast.error("Sunucu hatası");
    }
  };

  const filteredPersonel = personel.filter((item) => {
    const fullName = `${item.FirstName} ${item.LastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      item.Email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="admin-staff-container">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="admin-header">
        <h1>Personel Yönetimi</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Personel ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>
      </div>

      <div className="add-personel-section">
        <button 
          className="toggle-add-form"
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? "Formu Kapat" : "Yeni Personel Ekle"} <i className={`fas fa-${isAdding ? "times" : "plus"}`}></i>
        </button>
        
        {isAdding && (
          <form onSubmit={handleAddPersonel} className="personel-form">
            <h2>Yeni Personel Bilgileri</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Ad</label>
                <input
                  type="text"
                  value={newPersonel.FirstName}
                  onChange={(e) => setNewPersonel({ ...newPersonel, FirstName: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Soyad</label>
                <input
                  type="text"
                  value={newPersonel.LastName}
                  onChange={(e) => setNewPersonel({ ...newPersonel, LastName: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={newPersonel.Email}
                  onChange={(e) => setNewPersonel({ ...newPersonel, Email: e.target.value })}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Telefon</label>
                <input
                  type="text"
                  value={newPersonel.PhoneNumber}
                  onChange={(e) => setNewPersonel({ ...newPersonel, PhoneNumber: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label>Rol</label>
                <select
                  value={newPersonel.Role}
                  onChange={(e) => setNewPersonel({ ...newPersonel, Role: e.target.value })}
                >
                  <option value="Pilot">Pilot</option>
                  <option value="Cabin Crew">Kabin Ekibi</option>
                  <option value="Technician">Teknisyen</option>
                  <option value="Ground Staff">Yer Hizmetleri</option>
                  <option value="Admin">Yönetici</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Ekleniyor..." : "Personel Ekle"}
            </button>
          </form>
        )}
      </div>

      <div className="personel-list">
        <h2>Personel Listesi</h2>
        {isLoading ? (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i> Yükleniyor...
          </div>
        ) : filteredPersonel.length === 0 ? (
          <div className="no-results">
            <i className="fas fa-user-slash"></i>
            <p>Sonuç bulunamadı</p>
          </div>
        ) : (
          <div className="personel-grid">
            {filteredPersonel.map((item) => (
              <div key={item.PersonnelID} className="personel-card">
                <div className="personel-header">
                  <div className="avatar">
                    {item.FirstName.charAt(0)}{item.LastName.charAt(0)}
                  </div>
                  <div className="personel-name">
                    <h3>{item.FirstName} {item.LastName}</h3>
                    <span className={`badge ${item.Role.replace(/\s+/g, '-').toLowerCase()}`}>
                      {item.Role}
                    </span>
                  </div>
                </div>
                
                <div className="personel-details">
                  <div className="detail-item">
                    <i className="fas fa-envelope"></i>
                    <span>{item.Email}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-phone"></i>
                    <span>{item.PhoneNumber || "Belirtilmemiş"}</span>
                  </div>
                  <div className="detail-item">
                    <i className="fas fa-circle" style={{ 
                      color: item.Status === "Active" ? "#4CAF50" : "#F44336" 
                    }}></i>
                    <span>{item.Status === "Active" ? "Aktif" : "Pasif"}</span>
                  </div>
                </div>
                
                <div className="personel-actions">
                  <button 
                    onClick={() => toggleStatus(item.PersonnelID, item.Status)}
                    className={`status-btn ${item.Status === "Active" ? "inactive" : "active"}`}
                  >
                    {item.Status === "Active" ? "Pasifleştir" : "Aktifleştir"}
                  </button>
                  <button
                    onClick={() => handleDelete(item.PersonnelID)}
                    className="delete-btn"
                  >
                    <i className="fas fa-trash"></i> Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin_Staff;
