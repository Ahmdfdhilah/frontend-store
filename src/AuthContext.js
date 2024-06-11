import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const accessToken = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        console.log("Entering validateToken function");
        if (accessToken) {
          console.log("Access token found");
          const response = await axios.get('http://localhost:3000/auth/validate-token', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (response.data.message === 'Token is valid') {
            console.log("Token is valid");
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error validating token:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [accessToken]);

  useEffect(() => {
    console.log("isAuthenticated updated:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
