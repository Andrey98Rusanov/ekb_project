import axios from 'axios';

// Создаем instance axios для API запросов
export const apiClient = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor для добавления токена авторизации
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

// API методы для чата
export const chatApi = {
  sendMessage: async (_message: string) => {
    // Здесь будет интеграция с AI backend
    // Пример:
    // const response = await apiClient.post('/chat/message', { message });
    // return response.data;

    // Временная mock-реализация
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          message: 'Ответ от AI ассистента',
          timestamp: new Date(),
        });
      }, 1000);
    });
  },
};

// API методы для аутентификации
export const authApi = {
  login: async (email: string, _password: string) => {
    // const response = await apiClient.post('/auth/login', { email, password });
    // return response.data;

    // Временная mock-реализация
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: '1', email, name: email.split('@')[0] },
          token: 'mock-token',
        });
      }, 500);
    });
  },

  register: async (name: string, email: string, _password: string) => {
    // const response = await apiClient.post('/auth/register', { name, email, password });
    // return response.data;

    // Временная mock-реализация
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: '1', email, name },
          token: 'mock-token',
        });
      }, 500);
    });
  },
};
