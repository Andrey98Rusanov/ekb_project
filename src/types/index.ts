export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface DashboardStat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}


