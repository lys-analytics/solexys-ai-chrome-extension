import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './tailwind.css';
import './content.css';

// Check if we're on one of the supported websites
const hostname = window.location.hostname;
const isSupportedSite = hostname.includes('pump.fun') || hostname.includes('raydium.io');

if (isSupportedSite) {
  // Create container for our app
  const container = document.createElement('div');
  container.id = 'solexys-ai-extension-root';
  // Apply styles directly using classList
  container.classList.add(
    'solexys-absolute',
    'solexys-left-0',
    'solexys-bottom-0',
    'solexys-w-full',
    'solexys-h-full',
    'solexys-z-[2147483647]',
    'solexys-pointer-events-none',
    'solexys-overflow-visible'
  );
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