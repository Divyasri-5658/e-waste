export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  address?: string;
  phone?: string;
}

export interface Pickup {
  id: string;
  userId: string;
  address: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  items: PickupItem[];
  pointsEarned?: number;
  createdAt: string;
}

export interface PickupItem {
  id: string;
  type: string;
  quantity: number;
  weight?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}