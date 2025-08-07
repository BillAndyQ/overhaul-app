// app/context/UserContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the user payload interface
interface UserPayload {
  userId: string;
  username: string;
  role: string;
}

// Define context shape
interface UserContextType {
  user: UserPayload | null;
  setUser: (user: UserPayload | null) => void;
  isLoading: boolean;
  logout: () => Promise<void>;
}

// Create context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// User context provider
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch user data on mount
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/user', {
          credentials: 'include', // Include cookies
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setIsLoading(true);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  // Handle logout
  const logout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      window.location.href = '/login'; // Redirect to login
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to access user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}