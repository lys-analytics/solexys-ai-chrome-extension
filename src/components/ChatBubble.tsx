import React, { useState, useRef, useEffect } from 'react';
import useChatConversation from '../hooks/useChatConversation';

// Message component for rendering individual messages
const Message: React.FC<{ 
  content: string; 
  isUser: boolean;
}> = ({ content, isUser }) => (
  <div className={`solexys-flex ${isUser ? 'solexys-justify-end' : 'solexys-justify-start'} solexys-mb-3`}>
    <div 
      className={
        isUser 
          ? 'solexys-bg-[#E32D13] solexys-text-white solexys-px-4 solexys-py-3 solexys-max-w-[80%] solexys-rounded-t-2xl solexys-rounded-bl-2xl solexys-rounded-br-sm' 
          : 'solexys-bg-[#292a3a] solexys-text-[#e9e9f2] solexys-px-4 solexys-py-3 solexys-max-w-[80%] solexys-rounded-t-2xl solexys-rounded-br-2xl solexys-rounded-bl-sm'
      }
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
    <form onSubmit={handleSubmit} className="solexys-flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="solexys-flex-1 solexys-p-3 solexys-focus:outline-none solexys-bg-[#292a3a] solexys-text-[#e9e9f2] solexys-border solexys-border-[#3f3f5c] solexys-rounded-l-2xl placeholder:solexys-text-[#a7a7c5]"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className="solexys-px-4 solexys-py-3 solexys-flex solexys-items-center solexys-justify-center solexys-bg-[#E32D13] solexys-text-white solexys-rounded-r-2xl solexys-transition-colors solexys-duration-200 hover:solexys-bg-[#C02510]"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="solexys-flex solexys-items-center solexys-justify-center">
            <svg className="solexys-animate-spin solexys-h-5 solexys-w-5" viewBox="0 0 24 24">
              <circle 
                className="solexys-opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
                fill="none"
              />
              <path 
                className="solexys-opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        ) : (
          <svg className="solexys-h-6 solexys-w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        )}
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
    <div 
      className="solexys-absolute solexys-bg-[#1e1e2e] solexys-border solexys-border-[#3f3f5c] solexys-rounded-2xl solexys-overflow-hidden solexys-shadow-xl"
      style={{
        left: '4rem',
        bottom: '0',
        marginBottom: '1rem',
        width: '22rem',
        transform: 'translateY(-1rem)'
      }}
    >
      {/* Chat header with anime girl */}
      <div className="solexys-relative solexys-border-b solexys-border-[#3f3f5c] solexys-h-[120px] solexys-overflow-hidden">
        <img 
          src={chrome.runtime.getURL('transparent_header.png')} 
          alt="Anime Girl" 
          className="solexys-w-full solexys-h-full solexys-object-cover solexys-object-center"
        />
        <div className="solexys-absolute solexys-bottom-0 solexys-left-0 solexys-w-full solexys-py-3 solexys-px-4 solexys-bg-gradient-to-t solexys-from-[#1e1e2ee6] solexys-to-transparent solexys-text-[#e9e9f2] solexys-font-semibold solexys-flex solexys-justify-between solexys-items-center">
          <h3 className="solexys-font-semibold">Solexys AI Assistant</h3>
          <button 
            onClick={onClose} 
            className="solexys-text-white hover:solexys-text-gray-200 focus:solexys-outline-none"
          >
            <svg className="solexys-w-5 solexys-h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div> 
      </div>
      
      {/* Chat messages */}
      <div className="solexys-bg-[#1e1e2e] solexys-text-[#e9e9f2] solexys-h-[300px] solexys-overflow-y-auto solexys-p-4">
        {messages.length === 0 ? (
          <div className="solexys-text-center solexys-text-gray-400 solexys-mt-24">
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
          <div className="solexys-text-red-500 solexys-text-center solexys-my-2 solexys-p-2 solexys-bg-red-900/20 solexys-rounded">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="solexys-bg-[#292a3a] solexys-border-t solexys-border-[#3f3f5c] solexys-p-3">
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatBubble; 