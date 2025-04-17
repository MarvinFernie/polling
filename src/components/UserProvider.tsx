'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create a context for the user ID
interface UserContextType {
  userId: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component that wraps app and makes userId available to any child component
export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This code only runs in the browser
    let storedUserId = localStorage.getItem('userId');
    
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem('userId', storedUserId);
    }
    
    setUserId(storedUserId);
    setIsLoaded(true);
  }, []);

  // Show nothing until the userId is loaded from localStorage
  if (!isLoaded) {
    return null; // Or a loading spinner if you prefer
  }

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook to use the user context
export function useUser(): UserContextType {
  const context = useContext(UserContext);
  
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  
  return context;
}