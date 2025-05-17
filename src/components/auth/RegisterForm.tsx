import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';

const RegisterForm: React.FC = () => {
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { name, email, password, confirmPassword, agreeTerms } = formData;
    if (!name || !email || !password) {
      setError('Будь ласка, заповніть усі поля');
      return;
    }
    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }
    if (!agreeTerms) {
      setError('Ви повинні погодитись з умовами використання');
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password, name);
      navigate('/menu');
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError('Виникла помилка при реєстрації');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Реєстрація</h1>
          <p className="mt-2 text-sm text-gray-600">
            Створіть акаунт для замовлення шаурми
          </p>
        </div>

        {error && (
            <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Ім'я</Label>
            <Input
                id="name"
                name="name"
                type="text"
                placeholder="Іван Іваненко"
                value={formData.name}
                onChange={handleChange}
                required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Підтвердіть пароль</Label>
            <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
              Я погоджуюсь з{' '}
              <Link to="/terms" className="text-primary hover:underline">
                умовами використання
              </Link>{' '}
              та{' '}
              <Link to="/privacy" className="text-primary hover:underline">
                політикою конфіденційності
              </Link>
            </Label>
          </div>

          <Button
              className="w-full bg-primary hover:bg-primary-dark"
              type="submit"
              disabled={isLoading}
          >
            {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
          </Button>
        </form>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Вже є акаунт?{' '}
            <Link to="/auth/login" className="text-primary font-medium hover:underline">
              Увійти
            </Link>
          </p>
        </div>
      </div>
  );
};

export default RegisterForm;
