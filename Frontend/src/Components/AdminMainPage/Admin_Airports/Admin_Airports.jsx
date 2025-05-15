import React, { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from "react-icons/fi";
import "./Admin_Airports.css";

const Admin_Airports = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAirport, setNewAirport] = useState({
    AirportName: "",
    City: "",
    Country: "",
    Code: "",
  });

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const response = await fetch("http://localhost:8081/airports");
        if (!response.ok) throw new Error("Failed to fetch airports");
        const data = await response.json();
        setAirports(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching airports:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAirports();
  }, []);

  const handleChange = (e) => {
    setNewAirport({ ...newAirport, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newAirport.AirportName.trim() ||
      !newAirport.City.trim() ||
      !newAirport.Country.trim() ||
      !newAirport.Code.trim()
    ) {
      setError("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/airports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAirport),
      });

      if (!response.ok) throw new Error("Failed to add airport");

      const data = await response.json();
      setAirports((prev) => [...prev, data]);
      setNewAirport({ AirportName: "", City: "", Country: "", Code: "" });
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this airport?")) return;

    try {
      const response = await fetch(`http://localhost:8081/airports/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete airport");

      setAirports((prev) => prev.filter((airport) => airport.AirportID !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Error deleting airport");
    }
  };

  const filteredAirports = airports.filter((airport) =>
    (airport?.AirportName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (airport?.City || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (airport?.Country || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (airport?.Code || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="premium-admin-container">
      <div className="premium-header">
        <h1>Airport Management</h1>
        <p className="premium-subtitle">Manage your airport database</p>
      </div>

      <div className="premium-content">
        {/* Add Airport Card */}
        <div className="premium-card">
          <div className="card-header">
            <h2>Add New Airport</h2>
          </div>
          <form onSubmit={handleSubmit} className="premium-form">
            <div className="form-row">
              <div className="form-group">
                <label>Airport Name</label>
                <input
                  type="text"
                  name="AirportName"
                  value={newAirport.AirportName}
                  onChange={handleChange}
                  placeholder="e.g. Istanbul Airport"
                  className="premium-input"
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="City"
                  value={newAirport.City}
                  onChange={handleChange}
                  placeholder="e.g. Istanbul"
                  className="premium-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="Country"
                  value={newAirport.Country}
                  onChange={handleChange}
                  placeholder="e.g. Turkey"
                  className="premium-input"
                />
              </div>
              <div className="form-group">
                <label>Airport Code</label>
                <input
                  type="text"
                  name="Code"
                  value={newAirport.Code}
                  onChange={handleChange}
                  placeholder="e.g. IST"
                  maxLength="3"
                  className="premium-input"
                />
              </div>
            </div>

            {error && <div className="premium-error">{error}</div>}

            <button type="submit" className="premium-button primary">
              <FiPlus className="icon" /> Add Airport
            </button>
          </form>
        </div>

        {/* Airports List Card */}
        <div className="premium-card">
          <div className="card-header">
            <h2>Airports List</h2>
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search airports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="premium-search"
              />
            </div>
          </div>

          {loading ? (
            <div className="premium-loading">
              <div className="loading-spinner"></div>
              <p>Loading airports...</p>
            </div>
          ) : error ? (
            <div className="premium-error-state">
              <p>Error loading airports: {error}</p>
            </div>
          ) : filteredAirports.length === 0 ? (
            <div className="premium-empty-state">
              <p>No airports found</p>
            </div>
          ) : (
            <div className="premium-table-container">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Airport Name</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAirports.map((airport) => (
                    <tr key={airport.AirportID || airport.Code}>
                      <td>
                        <span className="airport-code-badge">{airport.Code}</span>
                      </td>
                      <td>{airport.AirportName}</td>
                      <td>
                        {airport.City}, {airport.Country}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="premium-button delete"
                            onClick={() => handleDelete(airport.AirportID)}
                          >
                            <FiTrash2 className="icon" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin_Airports;
