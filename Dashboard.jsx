import React from "react";
import Navbar from "./Navbar";
import "../css/Navbar.css";
import "../css/Dashboard.css";

const Dashboard = ({ darkMode, setDarkMode, isOpen, setIsOpen }) => {
  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`dashboard-container ${darkMode ? "dark-mode" : ""} ${isOpen ? "expanded" : ""}`}>
        <div className="stats-section">
          <div className="stat-card">
            <span>38</span>
            <p>Total No. of Registered Hog Raisers</p>
          </div>
          <div className="stat-card">
            <span>10</span>
            <p>Pending Applications</p>
          </div>
          <div className="stat-card">
            <span>2</span>
            <p>ASF Outbreak Reports</p>
          </div>
          <div className="stat-card">
            <span>10</span>
            <p>Hogs Ready for Market</p>
          </div>
        </div>
        <div className="content-section">
          <div className="map-container">
            <h3>ASF MAP (EX. SHOWS OUTBREAK ZONES, ETC)</h3>
            <img src="/path-to-map.png" alt="ASF Map" className="map-image" />
          </div>
          <div className="quick-access">
            <h3>Quick Access Tools:</h3>
            <button>Register New Hog Raiser</button>
            <button>View ASF Statistics</button>
            <button>Report ASF Case</button>
            <button>Assign Quarantine Zone</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
