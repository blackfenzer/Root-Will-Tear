'use client';

import { FormEvent, ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '@/components/footer/page';
import { toast } from 'react-hot-toast';
import { useUser } from 'context/UserContext';
import apiClient from '@/lib/axios';
export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { fetchUser } = useUser();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.post(
        `${apiUrl}/api/v1/login`,
        {
          username: formData.username,
          password: formData.password
        }, // Empty body if using query params
        {
          withCredentials: false
        }
      );

      if (response.status === 200) {
        Cookies.set('session_token', response.data.access_token, {
          expires: (1 / 24 / 60) * 30 * 5
        }); // 1 day expiration for example
        Cookies.set('csrf_token', response.data.csrf_token, {
          expires: (1 / 24 / 60) * 30 * 5
        });
        toast.success('Login successful');
        await fetchUser();
        router.push('/');
      }
      // else {
      //   throw new Error("Login failed");
      // }
    } catch (error) {
      // toast.error("Invalid username or password");
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-4">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              required
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <Input
              required
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <p className="text-center text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-gray-800 dark:text-gray-200 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
}
