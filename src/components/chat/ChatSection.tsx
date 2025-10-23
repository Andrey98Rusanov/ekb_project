import { useEffect, useRef, useState } from 'react';
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addMessage, setLoading } from '../../store/slices/chatSlice';
import ChatMessage from './ChatMessage';

interface ChatSectionProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ChatSection = ({ isOpen, onToggle }: ChatSectionProps) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    // Симуляция ответа AI
    // Здесь будет интеграция с реальным AI API
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: `Спасибо за ваше сообщение! Я AI ассистент и готов помочь вам. В будущем здесь будет полноценная интеграция с AI backend для обработки запросов.`,
        sender: 'ai' as const,
        timestamp: new Date(),
      };
      dispatch(addMessage(aiMessage));
      dispatch(setLoading(false));
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors z-10"
      >
        <FiMessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 flex flex-col shadow-xl z-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">AI Ассистент</h3>
            <p className="text-xs text-white/80">Всегда на связи</p>
          </div>
        </div>
        <button
          onClick={onToggle}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                <FiMessageSquare className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Начните общение
              </h4>
              <p className="text-sm text-gray-600 max-w-xs mx-auto">
                Задайте вопрос AI ассистенту и получите помощь в реальном времени
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-start space-x-2">
                <div className="flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <div className="bg-white rounded-lg px-4 py-3 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Напишите сообщение..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          AI может допускать ошибки. Проверяйте важную информацию.
        </p>
      </div>
    </div>
  );
};

export default ChatSection;

