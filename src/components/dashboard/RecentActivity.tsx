import { FiAlertCircle, FiCheckCircle, FiDollarSign, FiUser } from 'react-icons/fi';

const activities = [
  {
    icon: FiUser,
    color: 'blue',
    title: 'Новый пользователь',
    description: 'john@example.com зарегистрировался',
    time: '5 мин назад',
  },
  {
    icon: FiDollarSign,
    color: 'green',
    title: 'Новый платеж',
    description: 'Получен платеж $299',
    time: '12 мин назад',
  },
  {
    icon: FiCheckCircle,
    color: 'purple',
    title: 'Задача выполнена',
    description: 'Обновление базы данных завершено',
    time: '1 час назад',
  },
  {
    icon: FiAlertCircle,
    color: 'orange',
    title: 'Предупреждение',
    description: 'Использование памяти 85%',
    time: '2 часа назад',
  },
];

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

const RecentActivity = () => {
  return (
    <div className="card h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Последняя активность</h3>
        <p className="text-sm text-gray-600">Недавние события в системе</p>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-start space-x-3">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                  colorClasses[activity.color as keyof typeof colorClasses]
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;

