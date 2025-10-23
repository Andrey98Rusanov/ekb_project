// App constants
export const APP_NAME = 'AI Dashboard';
export const APP_VERSION = '1.0.0';

// API endpoints (когда будет интеграция с реальным backend)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  CHAT: {
    SEND_MESSAGE: '/chat/message',
    GET_HISTORY: '/chat/history',
    CLEAR_HISTORY: '/chat/clear',
  },
  DASHBOARD: {
    GET_STATS: '/dashboard/stats',
    GET_ANALYTICS: '/dashboard/analytics',
  },
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME: 'theme',
  CHAT_HISTORY: 'chatHistory',
};

// Validation rules
export const VALIDATION = {
  EMAIL: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 100,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 100,
    PATTERN: /^(?=.*[a-zA-Z])(?=.*[0-9])/,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
};

// Chart colors
export const CHART_COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  purple: '#8b5cf6',
  pink: '#ec4899',
};

