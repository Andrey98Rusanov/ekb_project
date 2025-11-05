import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { name: 'Янв', users: 4000, sessions: 2400, revenue: 2400 },
  { name: 'Фев', users: 3000, sessions: 1398, revenue: 2210 },
  { name: 'Мар', users: 2000, sessions: 9800, revenue: 2290 },
  { name: 'Апр', users: 2780, sessions: 3908, revenue: 2000 },
  { name: 'Май', users: 1890, sessions: 4800, revenue: 2181 },
  { name: 'Июн', users: 2390, sessions: 3800, revenue: 2500 },
  { name: 'Июл', users: 3490, sessions: 4300, revenue: 2100 },
];

const AnalyticsChart = () => {
  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Аналитика</h3>
        <p className="text-sm text-gray-600">Обзор ключевых метрик за последние 7 месяцев</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Пользователи"
            dot={{ fill: '#3b82f6', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="sessions"
            stroke="#10b981"
            strokeWidth={2}
            name="Сессии"
            dot={{ fill: '#10b981', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8b5cf6"
            strokeWidth={2}
            name="Доход"
            dot={{ fill: '#8b5cf6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
