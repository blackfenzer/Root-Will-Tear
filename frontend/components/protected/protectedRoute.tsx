'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { User } from 'types/user';
import Cookies from 'js-cookie';

const PUBLIC_PATHS = ['/', '/login', '/register'];
const ADMIN_PROTECTED_PATH = "/customers";
const AUTH_PROTECTED_PATHS = ["/machine", "/prediction"]; // Paths that require authentication

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null); // State to store the user info
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setLoading] = useState(true);

  // Handle fetching user data only once, when the component is mounted or the session token changes
  useEffect(() => {
    const handleGetMe = async () => {
      const sessionToken = Cookies.get('session_token'); // Adjust the cookie name based on your app

      // Skip the API call if no session token exists
      if (!sessionToken) {
        console.log('No session token, skipping user fetch.');
        return;
      }

      try {
        // Make a GET request to fetch the user information (adjust API endpoint accordingly)
        const response = await axios.get('http://localhost:8000/api/v1/me', {
          withCredentials: true // Ensure cookies are included
        });

        // If the response contains user data, set the user state
        if (response?.data) {
          setUser({
            username: response.data.username, // Assuming the response has `username` and `role`
            role: response.data.role
          });
          console.log(response.data.role);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    handleGetMe(); // Fetch user data when the component mounts or session token changes
  }, []); // Only run this effect once (on mount)

  // Handle the redirection logic based on the user and path
  useEffect(() => {
    const sessionToken = Cookies.get('session_token');

    const handleNavigation = (path: string) => {
      if (pathname !== path) {
        router.push(path);
      } else {
        setLoading(false);
      }
    };

    // Handle public paths
    if (PUBLIC_PATHS.includes(pathname)) {
      if (sessionToken) {
        handleNavigation("/"); // If logged in, redirect to home
      } else {
        setLoading(false);
      }
      return;
    }

    // Redirect to login if no session token exists
    if (!sessionToken) {
      if (AUTH_PROTECTED_PATHS.includes(pathname)) {
        handleNavigation("/login"); // Redirect to login if not logged in and trying to access protected page
      }
      return;
    }

    // Handle user role-based navigation (admin protection for /customers)
    if (pathname.startsWith(ADMIN_PROTECTED_PATH)) {
      if (user?.role !== 'admin') {
        handleNavigation("/"); // Redirect to login if user is not admin
        return;
      } else {
        handleNavigation(ADMIN_PROTECTED_PATH); // If admin, continue to /customers
      }
    }

  }, [pathname, router, user]); // This effect depends on pathname, router, and user

  return isLoading ? null : children;
}
