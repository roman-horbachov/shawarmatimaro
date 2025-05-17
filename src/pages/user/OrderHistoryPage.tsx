import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layouts/MainLayout';
import { getUserOrders } from '@/services/firebaseOrderService';
import { OrderStatus, getStatusColor, getStatusLabel } from '@/models/Order';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Loader2, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const OrderHistoryPage: React.FC = () => {
    const { user } = useAuth();
    const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});

    const { data: orders, isLoading, error } = useQuery({
        queryKey: ['orders', user?.uid],
        queryFn: () => user?.uid ? getUserOrders(user.uid) : Promise.resolve([]),
        enabled: !!user, // Only run query when user is logged in
    });

    // If user is not logged in, show login prompt
    if (!user) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-bold">Історія замовлень</h1>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <h3 className="text-lg font-medium mb-4">Увійдіть у свій акаунт</h3>
                            <p className="text-text-muted mb-6">
                                Щоб переглянути історію своїх замовлень, будь ласка, увійдіть у свій акаунт
                            </p>
                            <Link to="/auth/login">
                                <Button className="bg-primary hover:bg-primary-dark">
                                    <LogIn className="h-4 w-4 mr-2" />
                                    Увійти в акаунт
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">Історія замовлень</h1>
                        <div className="flex gap-4">
                            <Link to="/profile">
                                <Button variant="outline">
                                    Повернутися до профілю
                                </Button>
                            </Link>
                            <Link to="/menu">
                                <Button className="bg-primary hover:bg-primary-dark">
                                    Нове замовлення
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
                            <p className="text-red-600">Виникла помилка при завантаженні замовлень.</p>
                            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                                Спробувати знову
                            </Button>
                        </div>
                    ) : orders && orders.length > 0 ? (
                        <div className="space-y-6">
                            {orders.map(order => (
                                <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-medium">Замовлення №{order.id}</h3>
                                                <p className="text-text-muted text-sm">
                                                    {format(new Date(order.createdAt), 'dd.MM.yyyy, HH:mm')}
                                                </p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium mt-2 sm:mt-0 ${getStatusColor(order.status)}`}>
                                                {getStatusLabel(order.status)}
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="space-y-3">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex justify-between">
                                                        <div className="flex items-center">
                                                            <img
                                                                src={item.imageUrl}
                                                                alt={item.name}
                                                                className="w-12 h-12 object-cover rounded mr-3"
                                                            />
                                                            <span>{item.name} x{item.quantity}</span>
                                                        </div>
                                                        <span className="font-medium">{item.price * item.quantity} ₴</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                                                <span className="font-medium">Загальна сума:</span>
                                                <span className="text-lg font-bold">{order.total} ₴</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 px-6 py-3">
                                        <div className="flex justify-between items-end">
                                            <div className="text-sm text-text-muted">
                                                Спосіб оплати: <span className="font-medium">
                                                    {order.paymentMethod === 'cash'
                                                        ? order.changeAmount
                                                            ? `Готівкою кур'єру (потрібна решта з ${order.changeAmount} ₴)`
                                                            : "Готівкою кур'єру"
                                                        : order.paymentMethod === 'card'
                                                            ? "Карткою кур'єру"
                                                            : 'Онлайн оплата'}
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setShowDetails(prev => ({ ...prev, [order.id]: !prev[order.id] }))}>
                                                    {showDetails[order.id] ? 'Приховати деталі' : 'Деталі'}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    {showDetails[order.id] && (
                                        <div className="text-sm text-text-muted px-6 py-3 border-t border-gray-200 mt-2">
                                            <div>Адреса доставки: <span className="font-medium">{order.address}</span></div>
                                            <div>Номер телефону: <span className="font-medium">{order.phone}</span></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <h3 className="text-lg font-medium mb-2">У вас ще немає замовлень</h3>
                            <p className="text-text-muted mb-6">Зробіть своє перше замовлення прямо зараз!</p>
                            <Link to="/menu">
                                <Button className="bg-primary hover:bg-primary-dark">
                                    Перейти до меню
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
};

export default OrderHistoryPage;
