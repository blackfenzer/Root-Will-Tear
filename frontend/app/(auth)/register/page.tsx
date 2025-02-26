'use client';

import {FormEvent, ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import Footer from '@/components/footer/page';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Validate password
    if (!passwordRegex.test(formData.password)) {
      setError(
        'Password must be at least 8 characters long, include a number, and a special character.'
      );
      return;
    }

    try {
      // Make API call to register the user
      const response = await axios.post(
        `http://localhost:8000/api/v1/register?username=${formData.username}&password=${formData.password}`
      );

      if (response.status === 200) {
        // Show success notification
        toast.success('Account created successfully');

        // Redirect user after successful registration
        router.push('/');
      }
    } catch (error) {
      // Handle specific errors based on response or default to a generic message
      // if (error.response && error.response.data) {
      //   setError(error.response.data.message || 'Error creating account');
      // } else {
      //   setError('Error creating account');
      // }
      setError('Error creating account');

      // Optionally display error toast
      toast.error('Error creating account');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-4">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Register</h1>
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
              Sign Up
            </Button>
          </form>
          <p className="text-center text-gray-500 mt-4">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-gray-800 dark:text-gray-200 hover:underline font-semibold"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
}
