// UserContext.js

import React, { useContext, createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
      const { token, id, role, name } = userData;

      // Decode the token to get the role
      const decodedToken = await decodeToken(token);

      // Check if the decoded token has the expected properties
      if (decodedToken && decodedToken.role) {
        // Update the user context with user data
        setUser({
          token,
          id,
          role: decodedToken.role, // Use the role from the decoded token
          name,
        });

        // Redirect to the appropriate dashboard
        redirectToDashboard(decodedToken.role);
      } else {
        throw new Error('Invalid token format');
      }
    } catch (error) {
      // Handle token decoding or other errors
      console.error(error);
      // You can redirect to an error page or handle the error in another way
    }
  };

  const redirectToDashboard = (userRole) => {
    let dashboardPath = '/';
    
    // Navigate based on the user's role
    switch (userRole) {
      case 'admin':
        dashboardPath = '/dashbord';
        break;
      case 'resto':
        dashboardPath = '/ProfileResto';
        break;
      // Add more cases if needed for other roles
      default:
        break;
    }
  
    // Use the navigate function for proper redirection
    navigate(dashboardPath);
  };
  
  // Replace this function with the actual API call to decode the token
  const decodeToken = async (token) => {
    try {
      const response = await fetch(`http://localhost:3004/auth/decode-token/${token}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error decoding token:', error);
      throw new Error('Error decoding token');
    }
  };

  const getAccessToken = () => {
    // Replace with your implementation
    return localStorage.getItem('accessToken');
  };

  const isAuthenticated = () => {
    return !!getAccessToken();
  };

  return (
    <UserContext.Provider value={{ user, login, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };