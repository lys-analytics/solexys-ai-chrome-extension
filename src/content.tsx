import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './content.css';
import './index.css';

// Check if we're on one of the supported websites
const hostname = window.location.hostname;
const isSupportedSite = hostname.includes('pump.fun') || hostname.includes('raydium.io');

if (isSupportedSite) {
  // Create container for our app
  const container = document.createElement('div');
  container.id = 'solexys-ai-extension-root';
  document.body.appendChild(container);

  // Initialize React Query
  const queryClient = new QueryClient();

  // Render our React app
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
} 