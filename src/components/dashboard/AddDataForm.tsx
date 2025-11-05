import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addDataRow } from '../../store/slices/dashboardDataSlice';

const AddDataForm = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    value: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ['Категория 1', 'Категория 2', 'Категория 3'];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Название обязательно';
    }

    if (!formData.category) {
      newErrors.category = 'Выберите категорию';
    }

    if (!formData.value || Number(formData.value) <= 0) {
      newErrors.value = 'Значение должно быть больше 0';
    }

    if (!formData.date) {
      newErrors.date = 'Дата обязательна';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    dispatch(
      addDataRow({
        name: formData.name.trim(),
        category: formData.category,
        value: Number(formData.value),
        date: formData.date,
      }),
    );

    // Сброс формы
    setFormData({
      name: '',
      category: '',
      value: '',
      date: new Date().toISOString().split('T')[0],
    });
    setErrors({});
  };

  return (
    <div className="card">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Добавить данные</h3>
        <p className="text-sm text-gray-600">Новая запись появится в таблице и диаграммах</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Название
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.name ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Введите название"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Категория
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.category ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Выберите категорию</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
            Значение
          </label>
          <input
            type="number"
            id="value"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.value ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Введите значение"
            min="1"
          />
          {errors.value && <p className="mt-1 text-sm text-red-600">{errors.value}</p>}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Дата
          </label>
          <input
            type="date"
            id="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
              errors.date ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Добавить запись
        </button>
      </form>
    </div>
  );
};

export default AddDataForm;
