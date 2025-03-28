import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import chatApi, { ChatMessage } from '../api/chatApi';

export const useChatConversation = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a mutation for sending messages
  const mutation = useMutation({
    mutationFn: ({ message }: { message: string }) => 
      chatApi.sendMessage(message, conversationId),
    onSuccess: (data) => {
      // Add the assistant response to the messages array
      if (data.message) {
        setMessages(prevMessages => [...prevMessages, data.message]);
      }
      // Store the conversation ID if it's returned
      if (data.conversationId) {
        setConversationId(data.conversationId);
      }
      setIsLoading(false);
    },
    onError: (err: any) => {
      setError(err.message || 'An error occurred while sending your message');
      setIsLoading(false);
    }
  });

  // Function to send a message
  const sendMessage = useCallback((content: string) => {
    // Generate a temporary ID for the user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    // Add the user message to the messages array
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);
    
    // Send the message to the API
    mutation.mutate({ message: content });
  }, [mutation]);

  // Function to clear the conversation
  const clearConversation = useCallback(() => {
    setMessages([]);
    setConversationId(undefined);
    setError(null);
  }, []);

  return {
    messages,
    sendMessage,
    clearConversation,
    isLoading,
    error
  };
};

export default useChatConversation; 