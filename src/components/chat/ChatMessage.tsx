import { FiUser } from 'react-icons/fi';
import { Message } from '../../store/slices/chatSlice';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex items-start space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${
          isUser ? 'bg-gray-200 text-gray-700' : 'bg-primary-100 text-primary-600'
        }`}
      >
        {isUser ? (
          <FiUser className="w-5 h-5" />
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        )}
      </div>

      {/* Message Bubble */}
      <div className="flex-1 max-w-[80%]">
        <div
          className={`rounded-lg px-4 py-3 shadow-sm ${
            isUser
              ? 'bg-primary-600 text-white rounded-tr-none'
              : 'bg-white text-gray-900 rounded-tl-none'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
        </div>
        <p className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {new Date(message.timestamp).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;

