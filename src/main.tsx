import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import { AuthProvider } from '@/hooks/useAuth';
import { CartProvider } from '@/hooks/useCart';

import { initializeFirebaseServices } from '@/services/firebaseInitService';

const AppWithFirebase = () => {
  useEffect(() => {

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

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithFirebase />
  </React.StrictMode>
);
