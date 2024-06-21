import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const accessToken = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (accessToken) {
          const response = await axios.get('https://trust-d4cbc4aea2b1.herokuapp.com/auth/validate-token', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          if (response.data.message === 'Token is valid') {
            setIsAuthenticated(true);

            // Fetch userId after token validation
            const userResponse = await axios.get('https://trust-d4cbc4aea2b1.herokuapp.com/auth/me', {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            setUserId(userResponse.data.userId);
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
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, setIsAuthenticated, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
