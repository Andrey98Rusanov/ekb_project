import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useAppSelector } from '../../store/hooks';
import { DataRow } from '../../store/slices/dashboardDataSlice';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

const PieChartComponent = () => {
  const data = useAppSelector((state) => state.dashboardData.data);

  // Группируем данные по категориям
  const categoryMap = data.reduce((acc: Record<string, number>, row: DataRow) => {
    acc[row.category] = (acc[row.category] || 0) + row.value;
    return acc;
  }, {});

  const chartData: CategoryData[] = Object.entries(categoryMap).map(([name, value], index) => ({
    name,
    value: value as number,
    color: COLORS[index % COLORS.length],
  }));

  if (chartData.length === 0) {
    return (
      <div className="card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Распределение по категориям</h3>
          <p className="text-sm text-gray-600">Данные из таблицы</p>
        </div>
        <div className="flex items-center justify-center h-[300px] text-gray-500">
          Нет данных для отображения
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Распределение по категориям</h3>
        <p className="text-sm text-gray-600">Данные из таблицы</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
