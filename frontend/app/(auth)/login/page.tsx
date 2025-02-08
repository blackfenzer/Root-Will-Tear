"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/login?username=${formData.username}&password=${formData.password}`
      );

      if (response.status === 200) {
        Cookies.set('session_token', response.data.access_token, { expires: 1 }); // 1 day expiration for example
        Cookies.set('csrf_token', response.data.csrf_token, { expires: 1 });
        router.push("/");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="username" placeholder="Username" onChange={handleChange} />
            <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          <p className="text-center mt-4">
            Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Sign Up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
