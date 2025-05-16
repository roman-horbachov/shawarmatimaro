
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { User as UserIcon, Save } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { updateUserProfile } from '@/services/firebaseUserService';

const UserProfilePage: React.FC = () => {
    const { user, userProfile, updateUserData } = useAuth();
    const { toast } = useToast();
    
    // Profile form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });

    // Load profile data from Firebase auth and userProfile
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: userProfile?.displayName || user.displayName || '',
                email: user.email || '',
                address: userProfile?.address || ''
            }));
        }
    }, [user, userProfile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
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

        try {
            // Update profile in Firebase
            await updateUserData({
                displayName: formData.name,
                address: formData.address
            });
            
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
                                <Label htmlFor="address">Адреса доставки</Label>
                                <Input 
                                    id="address" 
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Введіть вашу адресу доставки"
                                />
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
