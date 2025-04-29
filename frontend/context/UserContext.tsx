'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { User } from 'types/user';
import apiClient from '@/lib/axios';

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
      const response = await apiClient.get<User>('/api/v1/me', {
        withCredentials: true,
      });
  
      if (response?.data) {
        setUser({
          username: response.data.username,
          role: response.data.role,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // No user logged in — not a problem, just reset user
        setUser(null);
      } else {
        console.error('Error fetching user data:', error);
      }
    } finally {
      setLoading(false);
    }
  };
  

  const logout = async () => {
    try {
      const response = await apiClient.post('/api/v1/logout', null, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(null);
        toast.success('Signed out successfully');
        router.push('/');
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
