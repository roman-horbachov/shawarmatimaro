import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';

const LoginForm: React.FC = () => {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Обычный логин
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      if (!email || !password) {
        throw new Error('Будь ласка, заповніть усі поля');
      }
      await login(email, password);
      navigate('/menu');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Невідома помилка');
    } finally {
      setIsLoading(false);
    }
  };

  // Логин через Google
  const handleGoogle = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await loginWithGoogle();
      navigate('/menu');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Невідома помилка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        {/* Заголовок */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Увійти в акаунт</h1>
          <p className="mt-2 text-sm text-gray-600">Ласкаво просимо до Шаурма ТіМаРо</p>
        </div>

        {/* Ошибка */}
        {error && (
            <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
        )}

        {/* Форма логина */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Пароль</Label>
              <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                Забули пароль?
              </Link>
            </div>
            <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={val => setRememberMe(val as boolean)}
            />
            <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
              Запам'ятати мене
            </Label>
          </div>

          <Button
              className="w-full bg-primary hover:bg-primary-dark"
              type="submit"
              disabled={isLoading}
          >
            {isLoading ? 'Вхід...' : 'Увійти'}
          </Button>
        </form>

        <Button
            variant="outline"
            className="w-full flex items-center justify-center space-x-2"
            onClick={handleGoogle}
            disabled={isLoading}
        >
          <FaGoogle className="w-5 h-5" />
          <span>Увійти через Google</span>
        </Button>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Немає акаунту?{' '}
            <Link to="/auth/register" className="text-primary font-medium hover:underline">
              Зареєструватися
            </Link>
          </p>
        </div>
      </div>
  );
};

export default LoginForm;
