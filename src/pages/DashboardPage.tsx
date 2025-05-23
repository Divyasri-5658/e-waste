import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePickups } from '../context/PickupContext';
import StatCard from '../components/Dashboard/StatCard';
import PickupCard from '../components/Dashboard/PickupCard';
import { 
  Package, Award, Truck, Calendar, ArrowRight 
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { pickups, loading, totalPoints, completedPickups, scheduledPickups, cancelPickup } = usePickups();
  
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
  
  // Get the most recent pickups
  const recentPickups = [...pickups]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="text-gray-600 mt-1">
          Monitor your recycling progress and schedule new pickups
        </p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Points" 
          value={totalPoints} 
          icon={Award} 
          iconColor="bg-green-600"
          description="Redeem for rewards"
        />
        
        <StatCard 
          title="Scheduled Pickups" 
          value={scheduledPickups} 
          icon={Calendar} 
          iconColor="bg-blue-600"
          description="Waiting for collection"
        />
        
        <StatCard 
          title="Completed Pickups" 
          value={completedPickups} 
          icon={Truck} 
          iconColor="bg-teal-600"
          description="Successfully recycled"
        />
        
        <StatCard 
          title="Items Recycled" 
          value={pickups.reduce((total, pickup) => 
            total + pickup.items.reduce((sum, item) => sum + item.quantity, 0), 0
          )}
          icon={Package} 
          iconColor="bg-purple-600"
          description="Total items collected"
        />
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link 
          to="/schedule" 
          className="bg-green-50 border border-green-200 rounded-lg p-6 flex items-center hover:bg-green-100 transition-colors duration-300"
        >
          <div className="p-3 bg-green-100 rounded-full mr-4">
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-green-900">Schedule a Pickup</h3>
            <p className="text-green-700 text-sm">Book a new collection</p>
          </div>
        </Link>
        
        <Link 
          to="/progress" 
          className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-center hover:bg-blue-100 transition-colors duration-300"
        >
          <div className="p-3 bg-blue-100 rounded-full mr-4">
            <Truck className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-900">View Pickups</h3>
            <p className="text-blue-700 text-sm">Check status of all pickups</p>
          </div>
        </Link>
        
        <Link 
          to="/rewards"
          className="bg-purple-50 border border-purple-200 rounded-lg p-6 flex items-center hover:bg-purple-100 transition-colors duration-300"
        >
          <div className="p-3 bg-purple-100 rounded-full mr-4">
            <Award className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium text-purple-900">Rewards Center</h3>
            <p className="text-purple-700 text-sm">Redeem points for rewards</p>
          </div>
        </Link>
      </div>
      
      {/* Recent Pickups */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Pickups</h2>
          <Link 
            to="/progress" 
            className="text-sm text-green-600 hover:text-green-800 flex items-center"
          >
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {recentPickups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPickups.map(pickup => (
              <PickupCard 
                key={pickup.id} 
                pickup={pickup} 
                onCancel={cancelPickup}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500 mb-4">You haven't scheduled any pickups yet.</p>
            <Link 
              to="/schedule" 
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Schedule Your First Pickup
            </Link>
          </div>
        )}
      </div>
      
      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Environmental Impact</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-70 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">CO₂ Reduction</h3>
            <p className="text-2xl font-bold text-gray-800">{completedPickups * 20} kg</p>
            <p className="text-xs text-gray-500 mt-1">Equivalent to planting {Math.round(completedPickups * 0.5)} trees</p>
          </div>
          
          <div className="bg-white bg-opacity-70 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Waste Diverted</h3>
            <p className="text-2xl font-bold text-gray-800">{completedPickups * 5} kg</p>
            <p className="text-xs text-gray-500 mt-1">Kept out of landfills</p>
          </div>
          
          <div className="bg-white bg-opacity-70 p-4 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Water Saved</h3>
            <p className="text-2xl font-bold text-gray-800">{completedPickups * 1000} L</p>
            <p className="text-xs text-gray-500 mt-1">From electronics manufacturing</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;