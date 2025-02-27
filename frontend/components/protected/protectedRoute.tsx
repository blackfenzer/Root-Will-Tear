'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from 'types/user';
import Cookies from 'js-cookie';

const PUBLIC_PATHS = ['/', '/login', '/register'];
const ADMIN_PROTECTED_PATH = '/customers';
const AUTH_PROTECTED_PATHS = ['/machine', '/prediction']; // Paths that require authentication

export default function ProtectedRoute({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null); // State to store the user info
  const [isLoading, setLoading] = useState(true); // Loading state for user data
  const router = useRouter();
  const pathname = usePathname();

  // Fetch user data when the component mounts
  useEffect(() => {
    const sessionToken = Cookies.get('session_token');

    const fetchUserData = async () => {
      if (sessionToken) {
        try {
          const response = await axios.get('http://localhost:8000/api/v1/me', {
            withCredentials: true, // Ensure cookies are included
          });

          // Set user data if response is successful
          if (response?.data) {
            setUser({
              username: response.data.username,
              role: response.data.role,
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);

          if (axios.isAxiosError(error) && error.response?.status === 401) {
            Cookies.remove('session_token');
            setUser(null);
            router.push('/login');
          }
        }
      }

      setLoading(false); // Set loading to false once fetching is complete (or failed)
    };

    fetchUserData(); // Call the function to fetch user data
  }, []); // This effect runs only once when the component mounts

  // Handle the redirection logic after the user state is fetched
  useEffect(() => {
    const sessionToken = Cookies.get('session_token');

    const handleNavigation = (path: string) => {
      if (pathname !== path) {
        router.push(path);
      }
    };

    // Handle public paths
    if (PUBLIC_PATHS.includes(pathname)) {
      if (sessionToken) {
        if (pathname === '/login' || pathname === '/register') {
          handleNavigation('/'); // Redirect logged-in users away from login/register to home
        }
      }
      return;
    }
    

    // Redirect to login if no session token exists for protected paths
    if (!sessionToken) {
      if (AUTH_PROTECTED_PATHS.includes(pathname)) {
        handleNavigation('/login'); // Redirect to login if not logged in and trying to access protected page
      }
      return;
    }

    // Handle user role-based navigation (admin protection for /customers)
    if (pathname.startsWith(ADMIN_PROTECTED_PATH)) {
      if (user?.role !== 'admin') {
        handleNavigation('/'); // Redirect to home if user is not admin
      }
    }
  }, [pathname, router, user]); // This effect depends on pathname, router, and user

  // Show loading spinner until user data is fetched and redirection is processed
  if (isLoading) {
    return <div>Loading...</div>; // Replace this with a loading spinner if preferred
  }

  // Render the children components if the user is authenticated and state is loaded
  return <>{children}</>;
}
