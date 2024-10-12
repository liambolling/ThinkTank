// src/contexts/UserContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUserDetails, setCurrentUserDetails] = useState({});

  useEffect(() => {
    // Check if window is defined (so we're on the client)
    if (typeof window !== 'undefined') {
      const cachedDetails = localStorage.getItem('currentUserDetails');
      if (cachedDetails) {
        setCurrentUserDetails(JSON.parse(cachedDetails));
      }
    }
  }, []);

  const setUserDetails = (details) => {
    setCurrentUserDetails(details);
    // Again, check if window is defined (so we're on the client)
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUserDetails', JSON.stringify(details));
    }
  };

  return (
    <UserContext.Provider value={{ currentUserDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserDetails = () => useContext(UserContext);
