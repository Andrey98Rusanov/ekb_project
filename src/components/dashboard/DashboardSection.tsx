import { FiActivity, FiDollarSign, FiTrendingUp, FiUsers } from 'react-icons/fi';
import AnalyticsChart from './AnalyticsChart';
import RecentActivity from './RecentActivity';
import StatCard from './StatCard';

const DashboardSection = () => {
  const stats = [
    {
      title: 'Всего пользователей',
      value: '2,543',
      change: '+12.5%',
      trend: 'up' as const,
      icon: FiUsers,
      color: 'blue' as const,
    },
    {
      title: 'Активные сессии',
      value: '1,234',
      change: '+8.2%',
      trend: 'up' as const,
      icon: FiActivity,
      color: 'green' as const,
    },
    {
      title: 'Доход',
      value: '$45,678',
      change: '+23.1%',
      trend: 'up' as const,
      icon: FiDollarSign,
      color: 'purple' as const,
    },
    {
      title: 'Конверсия',
      value: '3.24%',
      change: '-2.4%',
      trend: 'down' as const,
      icon: FiTrendingUp,
      color: 'orange' as const,
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Обзор</h2>
          <p className="text-gray-600 mt-1">Добро пожаловать в вашу панель управления</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <AnalyticsChart />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
