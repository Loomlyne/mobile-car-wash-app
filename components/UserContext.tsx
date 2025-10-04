import React, { createContext, useContext, useState } from 'react';

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const clearUser = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUserContext must be used within a UserProvider');
  return context;
}; 