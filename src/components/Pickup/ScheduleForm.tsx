import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePickups } from '../../context/PickupContext';
import { PickupItem } from '../../types';
import { Plus, Minus, Trash2, Loader } from 'lucide-react';

const wasteTypes = [
  'Desktop Computer',
  'Laptop',
  'Mobile Phone',
  'Tablet',
  'Monitor',
  'Television',
  'Printer',
  'Scanner',
  'Gaming Console',
  'Cables & Wires',
  'Battery',
  'Other Electronic Device'
];

const ScheduleForm: React.FC = () => {
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [items, setItems] = useState<PickupItem[]>([
    { id: '1', type: wasteTypes[0], quantity: 1 }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { schedulePickup } = usePickups();
  const navigate = useNavigate();
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];
  
  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), type: wasteTypes[0], quantity: 1 }
    ]);
  };
  
  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };
  
  const updateItem = (id: string, field: keyof PickupItem, value: string | number) => {
    setItems(
      items.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    schedulePickup(address, date, time, items);
    setIsLoading(false);
    navigate('/progress', { state: { success: true } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pickup Location</h3>
        
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Full Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            rows={3}
            placeholder="Enter your complete address including street, city, state, and zip code"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Pickup Date
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={minDate}
              required
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Time
            </label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select a time slot</option>
              <option value="09:00 - 11:00">09:00 - 11:00</option>
              <option value="11:00 - 13:00">11:00 - 13:00</option>
              <option value="13:00 - 15:00">13:00 - 15:00</option>
              <option value="15:00 - 17:00">15:00 - 17:00</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">E-Waste Items</h3>
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </button>
        </div>
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border border-gray-200 rounded-md">
              <div className="flex-grow">
                <label className="sr-only">Item Type</label>
                <select
                  value={item.type}
                  onChange={(e) => updateItem(item.id, 'type', e.target.value)}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {wasteTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <label className="sr-only">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    type="button"
                    onClick={() => item.quantity > 1 && updateItem(item.id, 'quantity', item.quantity - 1)}
                    className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                    min="1"
                    className="w-12 text-center border-0 focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={() => updateItem(item.id, 'quantity', item.quantity + 1)}
                    className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                disabled={items.length === 1}
                className={`p-2 rounded-md ${
                  items.length === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-red-500 hover:text-red-700 hover:bg-red-50'
                } focus:outline-none transition-colors duration-300`}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-right">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader className="animate-spin h-5 w-5 mr-2" />
              Scheduling...
            </span>
          ) : (
            'Schedule Pickup'
          )}
        </button>
      </div>
    </form>
  );
};

export default ScheduleForm;