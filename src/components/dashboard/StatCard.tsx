import { IconType } from 'react-icons';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: IconType;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

const StatCard = ({ title, value, change, trend, icon: Icon, color }: StatCardProps) => {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          <div className="flex items-center">
            {trend === 'up' ? (
              <FiArrowUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <FiArrowDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs прошлый месяц</span>
          </div>
        </div>
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;

