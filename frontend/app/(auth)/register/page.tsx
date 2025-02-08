"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
// import Footer from "@/components/footer/footer";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/register?username=${formData.username}&password=${formData.password}`
      );
  
      if (response.status === 200) {
        router.push("/");
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      setError("Error creating account");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Register</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="username" placeholder="Username" onChange={handleChange} />
            {/* <Input name="email" type="email" placeholder="Email" onChange={handleChange} /> */}
            <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
          <p className="text-center mt-4">
            Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
