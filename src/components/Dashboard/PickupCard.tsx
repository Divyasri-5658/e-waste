import React from 'react';
import { Pickup } from '../../types';
import { Calendar, Clock, MapPin, Package, Award } from 'lucide-react';

interface PickupCardProps {
  pickup: Pickup;
  onCancel?: (id: string) => void;
}

const PickupCard: React.FC<PickupCardProps> = ({ pickup, onCancel }) => {
  const isScheduled = pickup.status === 'scheduled';
  const isCompleted = pickup.status === 'completed';
  const isCancelled = pickup.status === 'cancelled';
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = () => {
    if (isCompleted) return 'bg-green-100 text-green-800 border-green-200';
    if (isCancelled) return 'bg-red-100 text-red-800 border-red-200';
    return 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const getStatusText = () => {
    if (isCompleted) return 'Completed';
    if (isCancelled) return 'Cancelled';
    return 'Scheduled';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                {getStatusText()}
              </span>
              {isCompleted && pickup.pointsEarned && (
                <span className="ml-2 flex items-center text-green-600 text-sm">
                  <Award className="h-4 w-4 mr-1" />
                  {pickup.pointsEarned} points earned
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Pickup #{pickup.id.slice(0, 8)}</h3>
          </div>
          <p className="text-sm text-gray-500">
            Created: {formatDate(pickup.createdAt)}
          </p>
        </div>
        
        <div className="space-y-3 mt-4">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-gray-700">{pickup.address}</p>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
            <p className="text-gray-700">{pickup.date}</p>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
            <p className="text-gray-700">{pickup.time}</p>
          </div>
          
          <div className="flex items-start">
            <Package className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-gray-700 font-medium mb-1">Items:</p>
              <ul className="list-disc list-inside pl-1 text-gray-600 text-sm">
                {pickup.items.map(item => (
                  <li key={item.id}>{item.quantity} x {item.type}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {isScheduled && onCancel && (
          <div className="mt-5 pt-4 border-t border-gray-100">
            <button
              onClick={() => onCancel(pickup.id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-300"
            >
              Cancel Pickup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupCard;