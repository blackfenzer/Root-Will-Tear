'use client';
import React, { useState, useEffect } from 'react';
import apiClient from '@/lib/axios';
import { User, UserUpdateData } from 'types/customer';
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
  DialogClose,
  DialogFooter
} from '@/components/ui/dialog';
import Footer from '@/components/footer/page';
import { toast } from 'react-hot-toast';

const usersPage: React.FC = () => {
  const [users, setusers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selecteduser, setSelecteduser] = useState<User | null>(
    null
  );
  const [formData, setFormData] = useState<UserUpdateData>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteuserId, setDeleteuserId] = useState<number | null>(null);

  // Function to handle deletion after confirmation
  const confirmDelete = async () => {
    if (deleteuserId) {
      await handleDeleteClick(deleteuserId);
      setIsDeleteModalOpen(false);
      setDeleteuserId(null);
    }
  };

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await apiClient.get<User[]>('/api/v1/users/');
        setusers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchusers();
  }, []);

  const openEditModal = (user: User) => {
    setSelecteduser(user);
    setFormData({
      username: user.username,
      // Avoid pre-filling the password for security reasons
      role: user.role,
      is_active: user.is_active
    });
  };

  const handleDeleteClick = async (userId: number) => {
    try {
      await apiClient.delete(`/api/v1/users/${userId}`);
      setusers(users.filter((cust) => cust.id !== userId));
      toast.success('User deleted successfully');
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user');
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
    if (!selecteduser) return;

    try {
      const response = await apiClient.put<User>(
        `/api/v1/users/${selecteduser.id}`,
        formData
      );
      setusers((prev) =>
        prev.map((cust) =>
          cust.id === selecteduser.id ? response.data : cust
        )
      );
      setSelecteduser(null);
      toast.success('User updated successfully');
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user');
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8 min-h-screen">
      <Card className="dark:bg-[#141414]">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>View, update, and delete users.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <React.Fragment>
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center border p-4 rounded"
                >
                  <div className="flex flex-col md:flex-row gap-3">
                    <p className="font-bold">Username: {user.username}</p>
                    <p>Role: {user.role}</p>
                    <p>Status: {user.is_active ? 'Active' : 'Inactive'}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex flex-row gap-2">
                    {/* Edit Modal using shadcn/ui Dialog */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => openEditModal(user)}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit User</DialogTitle>
                          <DialogDescription>
                            Update the details of the user.
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
                              className="w-full"
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
                              className="w-full"
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
                              className="w-full"
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

                    {/* Delete Modal */}
                    <Dialog
                      open={isDeleteModalOpen}
                      onOpenChange={setIsDeleteModalOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setDeleteuserId(user.id);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                        </DialogHeader>
                        <p>
                          This action cannot be undone. Are you sure you want to
                          delete user <strong>{user.username}</strong>?
                        </p>
                        <DialogFooter>
                          <Button
                            variant="secondary"
                            onClick={() => setIsDeleteModalOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteClick(user.id)}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </li>
              ))}
            </ul>
            </React.Fragment>
          )}
        </CardContent>
      </Card>
      <Footer />
    </div>
  );
};

export default usersPage;
