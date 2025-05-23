import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ScheduleForm from '../components/Pickup/ScheduleForm';

const SchedulePage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Schedule a Pickup</h1>
        <p className="text-gray-600 mt-1">
          Fill out the form below to arrange for an e-waste collection
        </p>
      </div>
      
      <ScheduleForm />
    </div>
  );
};

export default SchedulePage;