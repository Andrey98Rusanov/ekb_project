# Примеры расширения функционала

## 🔌 Интеграция с OpenAI API

### 1. Установка библиотеки

```bash
npm install openai
```

### 2. Создание API сервиса

Создайте файл `src/services/openaiService.ts`:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Только для демо! В продакшене используйте backend
});

export const sendMessageToAI = async (message: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Вы полезный AI ассистент для аналитической панели.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || 'Извините, не могу ответить.';
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw new Error('Ошибка при обращении к AI');
  }
};
```

### 3. Использование в ChatSection

Обновите `src/components/chat/ChatSection.tsx`:

```typescript
import { sendMessageToAI } from '../../services/openaiService';

const handleSendMessage = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!inputValue.trim() || isLoading) return;

  const userMessage = {
    id: Date.now().toString(),
    text: inputValue,
    sender: 'user' as const,
    timestamp: new Date(),
  };

  dispatch(addMessage(userMessage));
  setInputValue('');
  dispatch(setLoading(true));

  try {
    const aiResponse = await sendMessageToAI(inputValue);
    
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      text: aiResponse,
      sender: 'ai' as const,
      timestamp: new Date(),
    };
    
    dispatch(addMessage(aiMessage));
  } catch (error) {
    dispatch(setError('Ошибка при получении ответа от AI'));
  } finally {
    dispatch(setLoading(false));
  }
};
```

## 🔐 Реальная авторизация

### 1. Добавление JWT токенов

Обновите `src/utils/api.ts`:

```typescript
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    // Сохраняем токен
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(user));
    
    return { user, token };
  },
  
  logout: async () => {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },
};
```

### 2. Автоматический вход при загрузке

Создайте `src/app/AuthProvider.tsx`:

```typescript
import { useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { loginSuccess } from '../store/slices/authSlice';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch(loginSuccess(user));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, [dispatch]);

  return <>{children}</>;
};
```

## 📊 Добавление новых виджетов на дашборд

### Пример: Виджет задач

Создайте `src/components/dashboard/TasksWidget.tsx`:

```typescript
import { FiCheckCircle, FiClock, FiAlertCircle } from 'react-icons/fi';

interface Task {
  id: string;
  title: string;
  status: 'completed' | 'pending' | 'urgent';
  dueDate: string;
}

const tasks: Task[] = [
  { id: '1', title: 'Обновить документацию', status: 'completed', dueDate: '2024-01-15' },
  { id: '2', title: 'Провести код-ревью', status: 'pending', dueDate: '2024-01-16' },
  { id: '3', title: 'Исправить баг #123', status: 'urgent', dueDate: '2024-01-14' },
];

const statusConfig = {
  completed: { icon: FiCheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  pending: { icon: FiClock, color: 'text-blue-600', bg: 'bg-blue-100' },
  urgent: { icon: FiAlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
};

const TasksWidget = () => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Задачи</h3>
      <div className="space-y-3">
        {tasks.map((task) => {
          const config = statusConfig[task.status];
          const Icon = config.icon;
          
          return (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${config.bg}`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <p className="text-xs text-gray-500">До {task.dueDate}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TasksWidget;
```

Добавьте в `src/components/dashboard/DashboardSection.tsx`:

```typescript
import TasksWidget from './TasksWidget';

// В компоненте DashboardSection
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
    <AnalyticsChart />
  </div>
  <div className="space-y-6">
    <RecentActivity />
    <TasksWidget />
  </div>
</div>
```

## 🌙 Тёмная тема

### 1. Создание контекста темы

Создайте `src/contexts/ThemeContext.tsx`:

```typescript
import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
```

### 2. Кнопка переключения темы

Добавьте в Header:

```typescript
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ user, onLogout }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-dark-200 border-b border-gray-200 dark:border-gray-700">
      {/* ... остальной код */}
      <button
        onClick={toggleTheme}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
      </button>
      {/* ... */}
    </header>
  );
};
```

## 📱 Уведомления

### Установка библиотеки

```bash
npm install react-hot-toast
```

### Использование

```typescript
import toast, { Toaster } from 'react-hot-toast';

// В App.tsx
function App() {
  return (
    <>
      <Toaster position="top-right" />
      {/* остальной код */}
    </>
  );
}

// Использование в компонентах
toast.success('Сообщение отправлено!');
toast.error('Ошибка при отправке');
toast.loading('Загрузка...');
```

## 🔄 WebSocket для real-time обновлений

### Создание WebSocket сервиса

```typescript
// src/services/websocketService.ts
class WebSocketService {
  private ws: WebSocket | null = null;
  private listeners: Map<string, Function[]> = new Map();

  connect(url: string) {
    this.ws = new WebSocket(url);
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.emit(data.type, data.payload);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  emit(event: string, data: unknown) {
    this.listeners.get(event)?.forEach((callback) => callback(data));
  }

  send(type: string, payload: unknown) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }));
    }
  }

  disconnect() {
    this.ws?.close();
  }
}

export const wsService = new WebSocketService();
```

## 🎯 Заключение

Эти примеры помогут вам расширить функционал приложения. 
Все компоненты построены модульно, поэтому добавление новых функций не должно вызвать проблем.


