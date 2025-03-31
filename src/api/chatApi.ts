import axios from 'axios';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/api/chat`;

// Types for the API responses
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  message: ChatMessage;
  conversationId?: string;
}

// Mock statistics data structure
export interface Statistics {
  totalUsers: number;
  activeNow: number;
  successRate: number;
  updatedAt: string;
}

// The chat API service
const chatApi = {
  // Send a message to the Solexys AI API
  sendMessage: async (message: string, conversationId?: string): Promise<ChatResponse> => {
    try {
      const response = await axios.post(API_URL, {
        message,
        conversationId
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message to Solexys AI:', error);
      throw error;
    }
  },

  // Fetch statistics (mock implementation for MVP)
  getStatistics: async (): Promise<Statistics> => {
    // For MVP, return mock data
    // In production, this would be a real API call
    return {
      totalUsers: Math.floor(Math.random() * 10000) + 5000,
      activeNow: Math.floor(Math.random() * 1000) + 200,
      successRate: 92 + (Math.random() * 7),
      updatedAt: new Date().toISOString()
    };
  }
};

export default chatApi; 