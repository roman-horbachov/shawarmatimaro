
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Import providers
import { AuthProvider } from '@/hooks/useAuth';
import { CartProvider } from '@/hooks/useCart';

// Import initialization service
import { initializeFirebaseServices } from '@/services/firebaseInitService';

// Create a wrapper component to initialize Firebase
const AppWithFirebase = () => {
  useEffect(() => {
    // Initialize Firebase services
    initializeFirebaseServices();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  );
};

// Render the app with Firebase initialization
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithFirebase />
  </React.StrictMode>
);
