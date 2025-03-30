import React, { useState, useRef, useEffect } from 'react';
import useChatConversation from '../hooks/useChatConversation';

// Message component for rendering individual messages
const Message: React.FC<{ 
  content: string; 
  isUser: boolean;
}> = ({ content, isUser }) => (
  <div className={`solexys-flex ${isUser ? 'solexys-justify-end' : 'solexys-justify-start'} solexys-mb-3`}>
    <div 
      className={isUser ? 'user-message solexys-px-4 solexys-py-3 solexys-max-w-[80%]' : 'assistant-message solexys-px-4 solexys-py-3 solexys-max-w-[80%]'}
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
        className="input-field solexys-flex-1 solexys-p-3 solexys-focus:outline-none"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className="send-button solexys-px-4 solexys-py-3 solexys-flex solexys-items-center solexys-justify-center"
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
    <div className="chat-bubble solexys-absolute"
      style={{
        left: '4rem',
        bottom: '0',
        marginBottom: '1rem',
        width: '22rem',
        transform: 'translateY(-1rem)'
      }}
    >
      {/* Chat header with anime girl */}
      <div className="chat-header">
        <img 
          src={chrome.runtime.getURL('transparent_header.png')} 
          alt="Anime Girl" 
          className="header-image"
        />
        <div className="chat-title solexys-flex solexys-justify-between solexys-items-center">
          <h3 className="solexys-font-semibold">Solexys AI Assistant</h3>
          <button 
            onClick={onClose} 
            className="solexys-text-white solexys-hover:text-gray-200 solexys-focus:outline-none"
          >
            <svg style={{width: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div> 
      </div>
      
      {/* Chat messages */}
      <div className="chat-body solexys-p-4">
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
      <div className="chat-footer solexys-p-3">
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatBubble; 