'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Hook to get or create a user ID from localStorage
 * This is used for tracking votes and upvotes without requiring sign-in
 */
export function useUserId(): string {
  const [userId, setUserId] = useState<string>('');
  
  useEffect(() => {
    // Get userId from localStorage or create a new one
    let storedUserId = localStorage.getItem('userId');
    
    if (!storedUserId) {
      storedUserId = uuidv4();
      localStorage.setItem('userId', storedUserId);
    }
    
    setUserId(storedUserId);
  }, []);
  
  return userId;
}