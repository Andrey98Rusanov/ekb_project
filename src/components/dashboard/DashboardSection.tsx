import { FiActivity, FiDollarSign, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { useAppSelector } from '../../store/hooks';
import AddDataForm from './AddDataForm';
import AnalyticsChart from './AnalyticsChart';
import DataTable from './DataTable';
import PieChartComponent from './PieChartComponent';
import StatCard from './StatCard';

const DashboardSection = () => {
  const data = useAppSelector((state) => state.dashboardData.data);

  // Вычисляем статистику из данных таблицы
  const totalValue = data.reduce((sum, row) => sum + row.value, 0);
  const categoriesCount = new Set(data.map((row) => row.category)).size;
  const avgValue = data.length > 0 ? totalValue / data.length : 0;

  const stats = [
    {
      title: 'Всего записей',
      value: data.length.toString(),
      change: '+0%',
      trend: 'up' as const,
      icon: FiUsers,
      color: 'blue' as const,
    },
    {
      title: 'Всего значений',
      value: totalValue.toLocaleString(),
      change: '+0%',
      trend: 'up' as const,
      icon: FiActivity,
      color: 'green' as const,
    },
    {
      title: 'Среднее значение',
      value: Math.round(avgValue).toLocaleString(),
      change: '+0%',
      trend: 'up' as const,
      icon: FiDollarSign,
      color: 'purple' as const,
    },
    {
      title: 'Категорий',
      value: categoriesCount.toString(),
      change: '+0%',
      trend: 'up' as const,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart />
          <PieChartComponent />
        </div>

        {/* Form and Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AddDataForm />
          </div>
          <div className="lg:col-span-2">
            <DataTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
