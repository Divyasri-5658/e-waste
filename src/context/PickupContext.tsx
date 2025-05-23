import React, { createContext, useContext, useState, useEffect } from 'react';
import { Pickup, PickupItem } from '../types';
import { useAuth } from './AuthContext';

interface PickupContextType {
  pickups: Pickup[];
  loading: boolean;
  schedulePickup: (address: string, date: string, time: string, items: PickupItem[]) => void;
  cancelPickup: (id: string) => void;
  totalPoints: number;
  completedPickups: number;
  scheduledPickups: number;
}

const PickupContext = createContext<PickupContextType>({
  pickups: [],
  loading: false,
  schedulePickup: () => {},
  cancelPickup: () => {},
  totalPoints: 0,
  completedPickups: 0,
  scheduledPickups: 0
});

export const usePickups = () => useContext(PickupContext);

export const PickupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load pickups from localStorage or would be from API in a real app
      const storedPickups = localStorage.getItem(`pickups-${user.id}`);
      if (storedPickups) {
        setPickups(JSON.parse(storedPickups));
      } else {
        // Mock data for demo
        const mockPickups: Pickup[] = [
          {
            id: '1',
            userId: user.id,
            address: '123 Green St, Eco City',
            date: '2025-02-15',
            time: '10:00',
            status: 'completed',
            items: [
              { id: '1', type: 'Computer', quantity: 1 },
              { id: '2', type: 'Mobile Phone', quantity: 2 }
            ],
            pointsEarned: 50,
            createdAt: '2025-02-10T10:00:00Z'
          },
          {
            id: '2',
            userId: user.id,
            address: '456 Recycle Ave, Eco City',
            date: '2025-03-20',
            time: '14:00',
            status: 'scheduled',
            items: [
              { id: '3', type: 'Television', quantity: 1 },
              { id: '4', type: 'Printer', quantity: 1 }
            ],
            createdAt: '2025-03-15T09:30:00Z'
          }
        ];
        setPickups(mockPickups);
        localStorage.setItem(`pickups-${user.id}`, JSON.stringify(mockPickups));
      }
    }
    setLoading(false);
  }, [user]);

  const schedulePickup = (address: string, date: string, time: string, items: PickupItem[]) => {
    if (!user) return;

    const newPickup: Pickup = {
      id: Date.now().toString(),
      userId: user.id,
      address,
      date,
      time,
      status: 'scheduled',
      items,
      createdAt: new Date().toISOString()
    };

    const updatedPickups = [...pickups, newPickup];
    setPickups(updatedPickups);
    localStorage.setItem(`pickups-${user.id}`, JSON.stringify(updatedPickups));
  };

  const cancelPickup = (id: string) => {
    if (!user) return;

    const updatedPickups = pickups.map(pickup => 
      pickup.id === id ? { ...pickup, status: 'cancelled' } : pickup
    );
    
    setPickups(updatedPickups);
    localStorage.setItem(`pickups-${user.id}`, JSON.stringify(updatedPickups));
  };

  // Calculate metrics
  const totalPoints = user?.points || 0;
  const completedPickups = pickups.filter(p => p.status === 'completed').length;
  const scheduledPickups = pickups.filter(p => p.status === 'scheduled').length;

  return (
    <PickupContext.Provider value={{
      pickups,
      loading,
      schedulePickup,
      cancelPickup,
      totalPoints,
      completedPickups,
      scheduledPickups
    }}>
      {children}
    </PickupContext.Provider>
  );
};