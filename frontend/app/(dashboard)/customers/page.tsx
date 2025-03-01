'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/axios';
import { Customer, CustomerUpdateData } from 'types/customer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import Footer from '@/components/footer/page';

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [formData, setFormData] = useState<CustomerUpdateData>({});

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await apiClient.get<Customer[]>('/api/v1/users/');
        setCustomers(response.data);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const openEditModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormData({
      username: customer.username,
      // Avoid pre-filling the password for security reasons
      role: customer.role,
      is_active: customer.is_active
    });
  };

  const handleDeleteClick = async (customerId: number) => {
    try {
      await apiClient.delete(`/api/v1/users/${customerId}`);
      setCustomers(customers.filter((cust) => cust.id !== customerId));
    } catch (err) {
      console.error('Error deleting customer:', err);
      setError('Failed to delete customer');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    try {
      const response = await apiClient.put<Customer>(
        `/api/v1/users/${selectedCustomer.id}`,
        formData
      );
      setCustomers((prev) =>
        prev.map((cust) =>
          cust.id === selectedCustomer.id ? response.data : cust
        )
      );
      setSelectedCustomer(null);
    } catch (err) {
      console.error('Error updating customer:', err);
      setError('Failed to update customer');
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card className="dark:bg-[#141414]">
        <CardHeader>
          <CardTitle>Customers</CardTitle>
          <CardDescription>View, update, and delete customers.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="space-y-4">
              {customers.map((customer) => (
                <li
                  key={customer.id}
                  className="flex justify-between items-center border p-4 rounded"
                >
                  <div className="flex flex-row gap-5">
                    <p className="font-bold">Username: {customer.username}</p>
                    <p>Role: {customer.role}</p>
                    <p>Status: {customer.is_active ? 'Active' : 'Inactive'}</p>
                  </div>
                  <div className="space-x-2">
                    {/* Edit Modal using shadcn/ui Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => openEditModal(customer)}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Customer</DialogTitle>
                          <DialogDescription>
                            Update the details of the customer.
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                          <div>
                            <label
                              htmlFor="username"
                              className="block text-sm font-medium"
                            >
                              Username
                            </label>
                            <Input
                              id="username"
                              name="username"
                              type="text"
                              value={formData.username || ''}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium"
                            >
                              Password
                            </label>
                            <Input
                              id="password"
                              name="password"
                              type="password"
                              placeholder="Leave blank to keep unchanged"
                              value={formData.password || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="role"
                              className="block text-sm font-medium"
                            >
                              Role
                            </label>
                            <Input
                              id="role"
                              name="role"
                              type="text"
                              value={formData.role || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex items-center">
                            <input
                              id="is_active"
                              name="is_active"
                              type="checkbox"
                              checked={formData.is_active || false}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            <label
                              htmlFor="is_active"
                              className="text-sm font-medium"
                            >
                              Active
                            </label>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save Changes</Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteClick(customer.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
};

export default CustomersPage;
