import { useState } from 'react';
import { Maximize2, HelpCircle } from 'lucide-react';

interface ProgressCircleProps {
  title: string;
  percentage: number;
}

const ProgressCircle = ({ title, percentage }: ProgressCircleProps) => {
  const [showInfo, setShowInfo] = useState(false);
  
  // Calculate the circle properties
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const formattedPercentage = percentage.toFixed(1);
  
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
        <div className="flex items-center">
          <button 
            className="text-gray-400 hover:text-white p-1 rounded-md"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          >
            <HelpCircle size={16} />
          </button>
          <button className="text-gray-400 hover:text-white p-1 rounded-md">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
      
      {showInfo && (
        <div className="absolute z-10 bg-navy-700 text-white p-2 rounded-md text-xs shadow-md max-w-xs">
          This chart shows the percentage of {title.toLowerCase()} tasks that have been completed.
        </div>
      )}
      
      <div className="flex justify-center items-center">
        <div className="relative w-44 h-44">
          <svg className="w-full h-full" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#334155"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#00aaff"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 80 80)"
            />
            {/* Center text */}
            <text
              x="80"
              y="75"
              textAnchor="middle"
              fontSize="36"
              fontWeight="bold"
              fill="#fff"
            >
              {formattedPercentage}%
            </text>
            <text
              x="80"
              y="100"
              textAnchor="middle"
              fontSize="14"
              fill="#94a3b8"
            >
              completed
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;