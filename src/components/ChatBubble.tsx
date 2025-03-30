import React, { useState, useRef, useEffect } from 'react';
import useChatConversation from '../hooks/useChatConversation';

// Message component for rendering individual messages
const Message: React.FC<{ 
  content: string; 
  isUser: boolean;
}> = ({ content, isUser }) => (
  <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
    <div 
      className={isUser ? 'user-message px-4 py-3 max-w-[80%]' : 'assistant-message px-4 py-3 max-w-[80%]'}
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
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="input-field flex-1 p-3 focus:outline-none"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className="send-button px-4 py-3 flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div className="chat-bubble absolute"
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
        <div className="chat-title flex justify-between items-center">
          <h3 className="font-semibold">Solexys AI Assistant</h3>
          <button 
            onClick={onClose} 
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <svg style={{width: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div> 
      </div>
      
      {/* Chat messages */}
      <div className="chat-body p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-24">
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
          <div className="text-red-500 text-center my-2 p-2 bg-red-900/20 rounded">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="chat-footer p-3">
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatBubble; 