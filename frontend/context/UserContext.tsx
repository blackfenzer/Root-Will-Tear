// context/UserContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { User } from 'types/user';
import { logoutAction } from 'app/actions/auth';
import axios from 'axios';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/user', {
        withCredentials: true // Needed if this were a cross-origin call (but here it's internal)
      });

      const data = response.data.user;

      if (data) {
        setUser({
          username: data.username,
          role: data.role
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const result = await logoutAction();

      if (result.success) {
        setUser(null);
        toast.success('Signed out successfully');
        router.push('/');
      } else {
        toast.error(result.error || 'Failed to sign out');
      }
    } catch (error) {
      toast.error('Failed to sign out');
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
