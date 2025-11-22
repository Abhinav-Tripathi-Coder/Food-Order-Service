export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  available?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'placed' | 'confirmed' | 'out-for-delivery' | 'delivered' | 'cancelled';
  placedAt: string; // ISO
  address: string;
  userId?: string;
  userName?: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
  lastLogin?: string;
  phone?: string;
  address?: string;
}

export interface LoginLog {
  id: string;
  userId: string;
  username: string;
  loginTime: string;
  logoutTime?: string;
}
