'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast'; // Import toast for notifications
import { User } from 'types/user';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;  // Make logout an async function
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    setLoading(true);
    const sessionToken = Cookies.get('session_token');

    if (!sessionToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/v1/me', {
        withCredentials: true,
      });

      if (response?.data) {
        setUser({
          username: response.data.username,
          role: response.data.role,
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        logout(); // Auto-logout if token is invalid
      }
    }

    setLoading(false);
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/logout',
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUser(null); // Reset user state
        Cookies.remove('access_token');
        Cookies.remove('csrf_token');
        Cookies.remove('session_token');
        toast.success('Signed out successfully');
        router.push('/'); // Redirect to homepage
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
