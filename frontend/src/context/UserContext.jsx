import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('userData');
    return storedUser ? JSON.parse(storedUser) : { userName: 'Guest', userId: null, role: null };
  });

  useEffect(() => {
    if (user.userId) {
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      localStorage.removeItem('userData');
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('userData');
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
