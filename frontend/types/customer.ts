export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  is_active: boolean;
}

export interface UserUpdateData {
  username?: string;
  password?: string;
  role?: string;
  is_active?: boolean;
}