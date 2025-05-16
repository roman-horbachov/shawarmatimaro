
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const AdminLoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'timaropass') {
      localStorage.setItem('adminAuthenticated', 'true');
      setIsAuthenticated(true);
      toast({
        title: "Успішно!",
        description: "Вхід в адмін панель виконано",
      });
    } else {
      toast({
        title: "Помилка!",
        description: "Невірний пароль",
        variant: "destructive",
      });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/adminpanel" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Вхід до адмін панелі</h1>
          <p className="text-gray-600 mt-2">
            Введіть пароль для доступу до адміністративної панелі
          </p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Введіть пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required
            />
          </div>
          
          <Button type="submit" className="w-full">
            Увійти
          </Button>
          
          <div className="text-center mt-4">
            <a href="/" className="text-sm text-primary hover:underline">
              Повернутися на головну
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
