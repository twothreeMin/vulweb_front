import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

export const AuthContext = createContext({
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = useMemo(() => ({ setIsAuthenticated }), [setIsAuthenticated]);

  console.log(`AuthProvider : ${isAuthenticated}`);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const response = await axios.get("/api/token/isAuthenticated", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ value }}>{children}</AuthContext.Provider>
  );
};
