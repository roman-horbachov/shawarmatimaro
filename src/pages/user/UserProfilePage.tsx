import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Этот импорт останется, но для номера телефона будем использовать InputMask
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { User as UserIcon, Save } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { updateUserProfile } from '@/services/firebaseUserService';

// Импортируем InputMask
import InputMask from 'react-input-mask';

const UserProfilePage: React.FC = () => {
    const { user, userProfile, updateUserData } = useAuth();
    const { toast } = useToast();

    // Profile form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        // Инициализация может остаться такой же или использовать пустую строку для InputMask
        phoneNumber: userProfile?.phone || ''
    });

    // Load profile data from Firebase auth and userProfile
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: userProfile?.displayName || user.displayName || '',
                email: user.email || '',
                address: userProfile?.address || '',
                phoneNumber: userProfile?.phone || ''
            }));
        }
    }, [user, userProfile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const value = e.target.value;

        // Теперь логика handleChange для phoneNumber будет проще,
        // так как InputMask сам обрабатывает маскирование
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };


    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            toast({
                title: "Помилка",
                description: "Ви повинні бути авторизовані для зміни профілю",
                variant: "destructive"
            });
            return;
        }

        // Валидация номера телефона теперь должна учитывать, что InputMask возвращает
        // отформатированную строку. Если поле не полностью заполнено по маске,
        // его можно считать невалидным (если не пустая строка)
        const phoneRegex = /^\+380\d{9}$/;
        // Убираем символы маски перед валидацией
        const cleanedPhoneNumber = formData.phoneNumber.replace(/[^0-9+]/g, '');

        if (cleanedPhoneNumber !== '' && !phoneRegex.test(cleanedPhoneNumber)) {
            toast({
                title: "Помилка формату",
                description: "Будь ласка, введіть коректний номер телефону у форматі +380XXXXXXXXX або залиште поле порожнім.",
                variant: "destructive"
            });
            return;
        }


        try {
            // Подготовка данных для обновления:
            // Если поле пустое после маскирования (т.е. только префикс), сохраняем null
            const updateData: { displayName?: string; address?: string; phone?: string | null } = {
                displayName: formData.name,
                address: formData.address,
                phone: cleanedPhoneNumber === '+380' || cleanedPhoneNumber === '' ? null : cleanedPhoneNumber
            };


            // Update profile in Firebase
            await updateUserData(updateData);

            // Show success message
            toast({
                title: "Зміни збережено",
                description: "Ваші особисті дані було успішно оновлено.",
            });
        } catch (error) {
            console.error("Error saving profile:", error);
            toast({
                title: "Помилка",
                description: "Не вдалося зберегти зміни профілю",
                variant: "destructive"
            });
        }
    };

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">Особистий кабінет</h1>
                        <Link to="/order-history">
                            <Button variant="outline" className="flex items-center gap-2">
                                <UserIcon className="h-4 w-4" />
                                <span>Історія замовлень</span>
                            </Button>
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-6">Особисті дані</h2>

                        <form className="space-y-6" onSubmit={handleSave}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Ім'я</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">Номер телефону</Label>
                                {/* Используем InputMask вместо Input */}
                                <InputMask
                                    mask="+380999999999" // Маска: +380 и 9 цифр (9 означает любую цифру от 0 до 9)
                                    maskChar="" // Символ, используемый для незаполненных позиций
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="+380XXXXXXXXX" // Placeholder можно оставить для визуального примера
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" // Сохраняем стили вашего Input
                                >
                                    {/* InputMask работает как компонент-обертка, передавая пропсы во внутренний input */}
                                    {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => <Input {...inputProps} />}
                                </InputMask>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Button variant="outline" type="reset">Скасувати</Button>
                                <Button className="bg-primary hover:bg-primary-dark" type="submit">
                                    <Save className="h-4 w-4 mr-2" />
                                    Зберегти зміни
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-6">Безпека</h2>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium">Зміна паролю</h3>
                                    <p className="text-sm text-text-muted">Змініть пароль для вашого облікового запису</p>
                                </div>
                                <Link to="/auth/forgot-password">
                                    <Button variant="outline">Змінити пароль</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
export default UserProfilePage;
