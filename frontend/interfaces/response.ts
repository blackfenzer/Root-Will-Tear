export interface Customer {
  id: number;
  username: string;
  password: string;
  role: string;
  is_active: boolean;
}

export interface CustomerUpdateData {
    username?: string;
    password?: string;
    role?: string;
    is_active?: boolean;
  }