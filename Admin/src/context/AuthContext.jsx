import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true); // for page load
  const navigate = useNavigate();

  // Restore auth on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      navigate("/"); // redirect to dashboard/home
    }
    setLoadingAuth(false);
  }, []);

  // Login function
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
