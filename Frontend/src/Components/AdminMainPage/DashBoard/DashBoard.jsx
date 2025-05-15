import React, { useEffect, useState } from "react";
import "./DashBoard.css";

const DashBoard = () => {
  const [pilots, setPilots] = useState([]);
  const [maintenances, setMaintenances] = useState([]);
  const [adminLogs, setAdminLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setPilots([
          { id: 1, name: "Ahmet Yılmaz", flight: "TK2023", status: "active", avatarColor: "#4361ee" },
          { id: 2, name: "Ayşe Demir", flight: "PC5566", status: "active", avatarColor: "#3a0ca3" },
          { id: 3, name: "Mehmet Kaya", flight: "TK4512", status: "on-break", avatarColor: "#7209b7" },
        ]);

        setMaintenances([
          { id: 1, plane: "Boeing 737", date: "2025-05-15", type: "Routine", status: "scheduled" },
          { id: 2, plane: "Airbus A320", date: "2025-05-17", type: "Engine Check", status: "scheduled" },
          { id: 3, plane: "Boeing 787", date: "2025-05-10", type: "Emergency", status: "completed" },
        ]);

        setAdminLogs([
          { id: 1, user: "admin1", time: "10:45", action: "Login", icon: "🔐" },
          { id: 2, user: "admin2", time: "11:10", action: "User update", icon: "👤" },
          { id: 3, user: "admin1", time: "12:30", action: "Flight edit", icon: "✈️" },
        ]);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Flight Operations Dashboard</h1>
          <p className="dashboard-subtitle">Overview of your flight operations</p>
        </div>
        <div className="dashboard-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>

      <div className="dashboard-stats">
        <div className="stat-card primary">
          <div className="stat-icon">✈️</div>
          <div className="stat-content">
            <h3>Total Flights</h3>
            <p>128</p>
            <span className="stat-trend positive">↑ 5% from last week</span>
          </div>
        </div>
        
        <div className="stat-card secondary">
          <div className="stat-icon">🛫</div>
          <div className="stat-content">
            <h3>Active Flights</h3>
            <p>36</p>
            <span className="stat-trend negative">↓ 2 from yesterday</span>
          </div>
        </div>
        
        <div className="stat-card accent">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <h3>Cancelled</h3>
            <p>5</p>
            <span className="stat-trend">No change</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Flights</h2>
            <button className="section-button">View All →</button>
          </div>
          <div className="section-content">
            <div className="flight-card">
              <div className="flight-info">
                <span className="flight-number">TK1234</span>
                <span className="flight-route">Istanbul ➔ Ankara</span>
              </div>
              <div className="flight-time">
                <span>14:30</span>
                <span className="badge success">On Time</span>
              </div>
            </div>
            <div className="flight-card">
              <div className="flight-info">
                <span className="flight-number">PC5678</span>
                <span className="flight-route">Izmir ➔ Berlin</span>
              </div>
              <div className="flight-time">
                <span>16:15</span>
                <span className="badge warning">Delayed</span>
              </div>
            </div>
            <div className="flight-card">
              <div className="flight-info">
                <span className="flight-number">TH9012</span>
                <span className="flight-route">Antalya ➔ London</span>
              </div>
              <div className="flight-time">
                <span>18:00</span>
                <span className="badge success">On Time</span>
              </div>
            </div>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Active Pilots</h2>
            <button className="section-button">Manage →</button>
          </div>
          <div className="section-content">
            {pilots.map((pilot) => (
              <div key={pilot.id} className="pilot-card">
                <div 
                  className="pilot-avatar" 
                  style={{ backgroundColor: pilot.avatarColor }}
                >
                  {pilot.name.charAt(0)}
                </div>
                <div className="pilot-info">
                  <h4>{pilot.name}</h4>
                  <p>Flight {pilot.flight}</p>
                </div>
                <div className={`pilot-status ${pilot.status}`}>
                  {pilot.status === "active" ? "On Duty" : "On Break"}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Maintenance Schedule</h2>
            <button className="section-button">Calendar →</button>
          </div>
          <div className="section-content">
            {maintenances.map((item) => (
              <div key={item.id} className="maintenance-card">
                <div className="maintenance-icon">🔧</div>
                <div className="maintenance-info">
                  <h4>{item.plane}</h4>
                  <p>{item.type}</p>
                </div>
                <div className="maintenance-details">
                  <span>{item.date}</span>
                  <span className={`badge ${item.status}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <button className="section-button">View Logs →</button>
          </div>
          <div className="section-content">
            {adminLogs.map((log) => (
              <div key={log.id} className="activity-card">
                <div className="activity-icon">{log.icon}</div>
                <div className="activity-info">
                  <h4>{log.action}</h4>
                  <p>by {log.user}</p>
                </div>
                <div className="activity-time">{log.time}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashBoard;