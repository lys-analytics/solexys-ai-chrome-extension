import React, { useState, useRef, useEffect } from 'react';
import useChatConversation from '../hooks/useChatConversation';

// Message component for rendering individual messages
const Message: React.FC<{ 
  content: string; 
  isUser: boolean;
}> = ({ content, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
    <div 
      className={`max-w-[80%] rounded-lg px-4 py-2 ${
        isUser 
          ? 'bg-primary text-white rounded-br-none' 
          : 'bg-gray-200 text-gray-800 rounded-bl-none'
      }`}
    >
      {content}
    </div>
  </div>
);

// Chat input component
const ChatInput: React.FC<{ 
  onSendMessage: (message: string) => void; 
  isLoading: boolean;
}> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex mt-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className={`px-4 py-2 bg-primary text-white rounded-r-lg ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark'
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
                fill="none"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        ) : 'Send'}
      </button>
    </form>
  );
};

// Main ChatBubble component
const ChatBubble: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { messages, sendMessage, isLoading, error } = useChatConversation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  if (!isOpen) return null;
  
  return (
    <div className="absolute left-16 bottom-0 mb-4 w-80 bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden z-50 transition-all duration-300 ease-in-out transform -translate-y-4">
      {/* Chat header */}
      <div className="bg-primary text-white px-4 py-3 flex justify-between items-center">
        <h3 className="font-semibold">Solexys AI Assistant</h3>
        <button 
          onClick={onClose} 
          className="text-white hover:text-gray-200 focus:outline-none"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Chat messages */}
      <div className="h-80 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-24">
            Ask Solexys AI anything about this platform!
          </div>
        ) : (
          messages.map((msg) => (
            <Message 
              key={msg.id} 
              content={msg.content} 
              isUser={msg.role === 'user'} 
            />
          ))
        )}
        
        {error && (
          <div className="text-red-500 text-center my-2 p-2 bg-red-50 rounded">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="p-3 border-t border-gray-200">
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatBubble; 