import React from 'react';

interface ChartProps {
  completedPickups: number;
  scheduledPickups: number;
  totalPoints: number;
}

const ProgressChart: React.FC<ChartProps> = ({ 
  completedPickups, 
  scheduledPickups,
  totalPoints 
}) => {
  const totalPickups = completedPickups + scheduledPickups;
  const completedPercentage = totalPickups > 0 
    ? Math.round((completedPickups / totalPickups) * 100) 
    : 0;
  
  // Environmental impact estimates
  const estimatedCO2Saved = completedPickups * 20; // kg
  const estimatedWaterSaved = completedPickups * 1000; // liters
  const estimatedTreesEquivalent = completedPickups * 0.5; // trees
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-5">Your Recycling Impact</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-32 w-32">
            <svg viewBox="0 0 36 36" className="h-32 w-32 transform -rotate-90">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray={`${completedPercentage}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-gray-800">{completedPercentage}%</span>
              <span className="text-xs text-gray-500">Completed</span>
            </div>
          </div>
          <p className="mt-3 text-center text-sm text-gray-600">
            {completedPickups} out of {totalPickups} pickups completed
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{totalPoints}</div>
          <p className="text-gray-600 text-center">Total EcoPoints Earned</p>
          <div className="mt-4 text-sm text-gray-500">
            <p className="text-center">Keep recycling to earn rewards!</p>
          </div>
        </div>
        
        <div className="flex flex-col">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Environmental Impact</h4>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">CO₂ Reduction</span>
                <span className="text-xs font-medium text-gray-700">{estimatedCO2Saved} kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(completedPickups * 5, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">Water Saved</span>
                <span className="text-xs font-medium text-gray-700">{estimatedWaterSaved} L</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(completedPickups * 5, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-gray-500">Trees Equivalent</span>
                <span className="text-xs font-medium text-gray-700">{estimatedTreesEquivalent.toFixed(1)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${Math.min(completedPickups * 10, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;