import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationForm from "./assets/Registration";
import LoginForm from "./assets/Login";
import ASFMap from "./assets/ASFMap";
import SPM from "./assets/SPM";
import MapFixer from "./assets/MapFixer";
import EmployeeDashboard from "./assets/EmployeeDashboard";
import UserDashboard from "./assets/UserDashboard";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [position, setPosition] = useState([13.9374, 120.7335]);
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        try {
            const token = localStorage.getItem('authToken');
            const userData = localStorage.getItem('userData');
            
            if (token) {
                setIsAuthenticated(true);
                if (userData && userData !== "undefined") {
                    try {
                        const parsedUserData = JSON.parse(userData);
                        setCurrentUser(parsedUserData);
                    } catch (error) {
                        console.error("Error parsing user data:", error);
                        setCurrentUser(null);
                        localStorage.removeItem('userData'); // Remove invalid data
                    }
                } else {
                    // Handle case where userData is undefined or "undefined"
                    setCurrentUser(null);
                    localStorage.removeItem('userData'); // Clean up localStorage
                }
            } else {
                setIsAuthenticated(false);
                setCurrentUser(null);
            }
        } catch (error) {
            console.error("Error in authentication check:", error);
            setIsAuthenticated(false);
            setCurrentUser(null);
        }
    }, []);

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);

    // Login function to be passed to the LoginForm
    const handleLogin = (userData, token) => {
        console.log("Setting user data:", userData); // Debug log
        console.log("Setting token:", token); // Debug log
        
        // Store the token
        localStorage.setItem('authToken', token);
        
        // Store user data as a JSON string
        if (userData) {
            localStorage.setItem('userData', JSON.stringify(userData));
        }
        
        // Update state
        setCurrentUser(userData);
        setIsAuthenticated(true);
    };

    // Protected route component
    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <Router>
            <div className={darkMode ? "dark-mode" : ""}>
                <Routes>
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/login" element={
                        <LoginForm setIsAuthenticated={setIsAuthenticated} handleLogin={handleLogin} />
                    } />
                    <Route path="/" element={
                        <ProtectedRoute>
                            <UserDashboard 
                                darkMode={darkMode} 
                                setDarkMode={setDarkMode} 
                                currentUser={currentUser}
                            />
                        </ProtectedRoute>
                    } />
                    {/* Add other protected routes here, passing currentUser prop */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;