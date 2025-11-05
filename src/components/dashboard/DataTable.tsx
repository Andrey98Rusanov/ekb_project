import { FiTrash2 } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteDataRow } from '../../store/slices/dashboardDataSlice';

const DataTable = () => {
  const data = useAppSelector((state) => state.dashboardData.data);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту запись?')) {
      dispatch(deleteDataRow(id));
    }
  };

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Таблица данных</h3>
        <p className="text-sm text-gray-600">Управление данными для диаграмм и графиков</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Название</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Категория</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Значение</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Дата</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Действия</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  Нет данных. Добавьте запись через форму.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-gray-900">{row.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {row.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {row.value.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{row.date}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="inline-flex items-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Удалить"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
