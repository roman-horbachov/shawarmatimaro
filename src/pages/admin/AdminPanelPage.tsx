import React from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useQuery } from '@tanstack/react-query';
import { getAllOrders } from '@/services/firebaseOrderService';
import { OrderStatus } from '@/models/Order';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Clock, ShoppingBag, Truck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminPanelPage: React.FC = () => {
    const { data: orders, isLoading } = useQuery({
        queryKey: ['admin-orders'],
        queryFn: getAllOrders,
    });

    const totalOrders = orders?.length || 0;
    const pendingOrders = orders?.filter(o => o.status === OrderStatus.ACCEPTED).length || 0;
    const preparingOrders = orders?.filter(o => o.status === OrderStatus.PREPARING).length || 0;
    const deliveringOrders = orders?.filter(o => o.status === OrderStatus.DELIVERING).length || 0;
    const completedOrders = orders?.filter(o => o.status === OrderStatus.DELIVERED).length || 0;

    // Calculate total revenue
    const totalRevenue = orders?.reduce((sum, order) => {
        if (order.status !== OrderStatus.CANCELLED) {
            return sum + order.total;
        }
        return sum;
    }, 0) || 0;

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Панель керування</h1>
                    <Link to="/admin/orders">
                        <Button className="bg-primary hover:bg-primary-dark">
                            Всі замовлення
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-text-muted">
                                Всього замовлень
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold">{totalOrders}</div>
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <ShoppingBag className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-text-muted">
                                Очікують обробки
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold">{pendingOrders}</div>
                                <div className="p-2 bg-blue-100 rounded-full">
                                    <Clock className="h-5 w-5 text-blue-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-text-muted">
                                Завершені
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold">{completedOrders}</div>
                                <div className="p-2 bg-green-100 rounded-full">
                                    <Check className="h-5 w-5 text-green-600" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-text-muted">
                                Загальний дохід
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold">{totalRevenue} ₴</div>
                                <div className="p-2 bg-green-100 rounded-full">
                                    <span className="text-green-600 font-bold">₴</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Останні замовлення</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <p className="text-center py-4">Завантаження...</p>
                        ) : orders && orders.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-4">ID</th>
                                        <th className="text-left py-3 px-4">Дата</th>
                                        <th className="text-left py-3 px-4">Замовник</th>
                                        <th className="text-left py-3 px-4">Сума</th>
                                        <th className="text-left py-3 px-4">Статус</th>
                                        <th className="text-right py-3 px-4">Дії</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {orders.slice(0, 5).map((order) => {
                                        let statusIcon;
                                        let statusColor;

                                        switch (order.status) {
                                            case OrderStatus.ACCEPTED:
                                                statusIcon = <Clock className="h-4 w-4" />;
                                                statusColor = "text-blue-600";
                                                break;
                                            case OrderStatus.PREPARING:
                                                statusIcon = <ShoppingBag className="h-4 w-4" />;
                                                statusColor = "text-purple-600";
                                                break;
                                            case OrderStatus.DELIVERING:
                                                statusIcon = <Truck className="h-4 w-4" />;
                                                statusColor = "text-orange-600";
                                                break;
                                            case OrderStatus.DELIVERED:
                                                statusIcon = <Check className="h-4 w-4" />;
                                                statusColor = "text-green-600";
                                                break;
                                            case OrderStatus.CANCELLED:
                                                statusIcon = <X className="h-4 w-4" />;
                                                statusColor = "text-red-600";
                                                break;
                                        }

                                        return (
                                            <tr key={order.id} className="border-b">
                                                <td className="py-3 px-4">{order.id}</td>
                                                <td className="py-3 px-4">
                                                    {new Date(order.createdAt).toLocaleString('uk-UA', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>
                                                <td className="py-3 px-4">{order.userName || order.userEmail || 'Гість'}</td>
                                                <td className="py-3 px-4">{order.total} ₴</td>
                                                <td className="py-3 px-4">
                                                    <div className={`flex items-center ${statusColor}`}>
                                                        {statusIcon}
                                                        <span className="ml-1">
                                                            {order.status === OrderStatus.ACCEPTED ? 'Прийнято' :
                                                                order.status === OrderStatus.PREPARING ? 'Готується' :
                                                                    order.status === OrderStatus.DELIVERING ? 'Доставка' :
                                                                        order.status === OrderStatus.DELIVERED ? 'Доставлено' : 'Скасовано'}
                                                          </span>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <Link to={`/admin/orders?id=${order.id}`}>
                                                        <Button variant="outline" size="sm">Деталі</Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-center py-4">Немає замовлень</p>
                        )}

                        <div className="flex justify-center mt-4">
                            <Link to="/admin/orders">
                                <Button variant="outline">Всі замовлення</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
};

export default AdminPanelPage;
