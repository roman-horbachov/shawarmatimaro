import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ForgotPasswordForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // This would be replaced with an actual API call
            console.log('Password reset requested for:', email);

            // Simulate API delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock validation
            if (!email) {
                throw new Error('Будь ласка, вкажіть електронну пошту');
            }

            if (!email.includes('@')) {
                throw new Error('Будь ласка, вкажіть коректну електронну пошту');
            }

            // Mock successful request
            setSuccess(true);
            toast({
                title: "Запит на відновлення паролю надіслано",
                description: "Перевірте вашу електронну пошту для отримання інструкцій щодо відновлення паролю.",
            });

        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
            else setError('Виникла помилка при обробці запиту');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Відновлення паролю</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Введіть вашу електронну пошту для отримання інструкцій
                </p>
            </div>

            {error && (
                <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                    {error}
                </div>
            )}

            {success ? (
                <div className="space-y-6 text-center">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <Mail className="h-8 w-8 text-green-600" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-medium">Перевірте вашу пошту</h3>
                        <p className="text-text-muted">
                            Ми надіслали лист з інструкціями щодо відновлення паролю на адресу <span className="font-medium">{email}</span>
                        </p>
                    </div>

                    <div className="pt-4">
                        <Link to="/auth/login">
                            <Button variant="outline" className="w-full">
                                Повернутися до входу
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        className="w-full bg-primary hover:bg-primary-dark"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Обробка...' : 'Відновити пароль'}
                    </Button>

                    <div className="text-center">
                        <Link to="/auth/login" className="text-sm text-primary hover:underline">
                            Повернутися до входу
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ForgotPasswordForm;