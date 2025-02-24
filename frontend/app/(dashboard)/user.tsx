'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie to handle cookies
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  role: string;
}

export function User() {
  const [user, setUser] = useState<User | null>(null); // State to store the user info
  const router = useRouter();

  // Fetch the session asynchronously on component mount if the user is logged in
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

    // Call handleGetMe when the component mounts
    handleGetMe();
  }, []); // Empty dependency array ensures this runs once on mount

  const handleSignOut = async () => {
    try {
      // Send a POST request to logout the user (invalidate session)
      const response = await axios.post(
        'http://localhost:8000/api/v1/logout',
        {},
        {
          withCredentials: true // Ensure cookies are sent with the request
        }
      );

      if (response.status === 200) {
        // Clear the user state and remove any cookies if needed
        setUser(null); // Reset user state
        Cookies.remove('access_token'); // Optional: Remove access token cookie
        Cookies.remove('csrf_token'); // Optional: Remove CSRF token cookie
        toast.success('Signed out successfully');
        router.push('/'); // Redirect to the homepage or another page
      }
    } catch (error) {
      toast.error('Failed to sign out');
      // console.error('Error signing out:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={'/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user ? `Hello, ${user?.username}` : 'My Account'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <button
              onClick={handleSignOut} // Handle the sign-out process
            >
              Sign Out
            </button>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem>
              <Link href="/login">Sign In</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/register">Sign Up</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
