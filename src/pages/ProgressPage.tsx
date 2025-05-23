import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePickups } from '../context/PickupContext';
import PickupCard from '../components/Dashboard/PickupCard';
import ProgressChart from '../components/Progress/ProgressChart';
import { CheckCircle } from 'lucide-react';

type FilterStatus = 'all' | 'scheduled' | 'completed' | 'cancelled';

const ProgressPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const { isAuthenticated, isLoading } = useAuth();
  const { pickups, loading, cancelPickup, completedPickups, scheduledPickups, totalPoints } = usePickups();
  const location = useLocation();
  
  const showSuccess = location.state?.success;
  
  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const filteredPickups = pickups.filter(pickup => {
    if (filterStatus === 'all') return true;
    return pickup.status === filterStatus;
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showSuccess && (
        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
          <div>
            <h3 className="text-green-800 font-medium">Pickup scheduled successfully!</h3>
            <p className="text-green-700 text-sm">
              Your pickup has been scheduled. Our team will collect your e-waste at the specified date and time.
            </p>
          </div>
        </div>
      )}
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>
        <p className="text-gray-600 mt-1">
          Track your recycling journey and environmental impact
        </p>
      </div>
      
      <div className="mb-8">
        <ProgressChart 
          completedPickups={completedPickups} 
          scheduledPickups={scheduledPickups}
          totalPoints={totalPoints}
        />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Pickup History</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                filterStatus === 'all'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('scheduled')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                filterStatus === 'scheduled'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              Scheduled
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                filterStatus === 'completed'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilterStatus('cancelled')}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                filterStatus === 'cancelled'
                  ? 'bg-red-600 text-white'
                  : 'bg-red-50 text-red-700 hover:bg-red-100'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>
        
        {filteredPickups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPickups.map(pickup => (
              <PickupCard 
                key={pickup.id} 
                pickup={pickup} 
                onCancel={cancelPickup}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">No pickups found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;