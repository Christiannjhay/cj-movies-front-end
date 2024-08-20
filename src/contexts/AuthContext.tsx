import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of the AuthContext value
interface AuthContextType {
  isAuthenticated: boolean;
}

// Create a default value for the AuthContext
const defaultAuthContextValue: AuthContextType = {
  isAuthenticated: false,
};

// Create the AuthContext with the default value
const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

// AuthProvider component to wrap the app and provide authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check authentication status when the app loads
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/profile', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};