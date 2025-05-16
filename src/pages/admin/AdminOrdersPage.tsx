
import React, { useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllOrders, updateOrderStatus } from '@/services/firebaseOrderService';
import { Order, OrderStatus, getStatusColor, getStatusLabel } from '@/models/Order';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Loader2, Truck, X } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const AdminOrdersPage: React.FC = () => {
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const { data: orders, isLoading } = useQuery({
        queryKey: ['admin-orders'],
        queryFn: getAllOrders,
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ orderId, status }: { orderId: string, status: OrderStatus }) => {
            return updateOrderStatus(orderId, status);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
            toast({
                title: "Статус замовлення оновлено",
                description: "Зміни успішно збережено.",
            });
        },
        onError: (error) => {
            toast({
                title: "Помилка!",
                description: "Не вдалося оновити статус замовлення.",
                variant: "destructive",
            });
        },
    });

    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        updateStatusMutation.mutate({ orderId, status: newStatus });
    };

    const viewOrderDetails = (order: Order) => {
        setSelectedOrder(order);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Управління замовленнями</h1>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : orders && orders.length > 0 ? (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Дата</TableHead>
                                    <TableHead>Клієнт</TableHead>
                                    <TableHead>Сума</TableHead>
                                    <TableHead>Статус</TableHead>
                                    <TableHead>Дії</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>
                                            {format(new Date(order.createdAt), 'dd.MM.yyyy HH:mm')}
                                        </TableCell>
                                        <TableCell>{order.userName || order.userEmail || 'Гість'}</TableCell>
                                        <TableCell>{order.total} ₴</TableCell>
                                        <TableCell>
                                            <Select defaultValue={order.status} onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}>
                                                <SelectTrigger className={`w-[140px] ${getStatusColor(order.status)}`}>
                                                    <SelectValue placeholder={getStatusLabel(order.status)} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value={OrderStatus.ACCEPTED}>Прийнято</SelectItem>
                                                    <SelectItem value={OrderStatus.PREPARING}>Готується</SelectItem>
                                                    <SelectItem value={OrderStatus.DELIVERING}>Доставляється</SelectItem>
                                                    <SelectItem value={OrderStatus.DELIVERED}>Доставлено</SelectItem>
                                                    <SelectItem value={OrderStatus.CANCELLED}>Скасовано</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => viewOrderDetails(order)}
                                            >
                                                Деталі
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <h3 className="text-lg font-medium">Немає замовлень</h3>
                        <p className="text-text-muted mt-2">Замовлення відображатимуться тут, коли клієнти зроблять покупки.</p>
                    </div>
                )}
            </div>

            {/* Order Details Dialog */}
            <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Деталі замовлення #{selectedOrder?.id}</DialogTitle>
                        <DialogDescription>
                            {selectedOrder && format(new Date(selectedOrder.createdAt), 'dd.MM.yyyy HH:mm')}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedOrder && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-medium mb-2">Інформація про клієнта</h3>
                                    <div className="space-y-1 text-sm">
                                        <p><span className="text-text-muted">Ім'я:</span> {selectedOrder.userName || 'Не вказано'}</p>
                                        <p><span className="text-text-muted">Email:</span> {selectedOrder.userEmail || 'Не вказано'}</p>
                                        <p><span className="text-text-muted">Адреса:</span> {selectedOrder.address || 'Не вказано'}</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Деталі замовлення</h3>
                                    <div className="space-y-1 text-sm">
                                        <p>
                                            <span className="text-text-muted">Статус:</span>
                                            <span className={`inline-block px-2 py-1 ml-2 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                                                {getStatusLabel(selectedOrder.status)}
                                            </span>
                                        </p>
                                        <p>
                                            <span className="text-text-muted">Спосіб оплати:</span>{' '}
                                            {selectedOrder.paymentMethod === 'cash' ? 'Готівка' :
                                                selectedOrder.paymentMethod === 'card' ? 'Картка' : 'Онлайн'}
                                        </p>
                                        <p><span className="text-text-muted">Загальна сума:</span> {selectedOrder.total} ₴</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium mb-3">Товари</h3>
                                <div className="border rounded-md overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                                                Товар
                                            </th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                                                Кількість
                                            </th>
                                            <th className="px-4 py-2 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                                                Ціна
                                            </th>
                                            <th className="px-4 py-2 text-right text-xs font-medium text-text-muted uppercase tracking-wider">
                                                Сума
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {selectedOrder.items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <img src={item.imageUrl} alt={item.name} className="h-8 w-8 rounded-md object-cover mr-2" />
                                                        {item.name}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-right">
                                                    {item.price} ₴
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-right font-medium">
                                                    {item.price * item.quantity} ₴
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                        <tfoot>
                                        <tr className="bg-gray-50">
                                            <td className="px-4 py-2 text-left font-medium" colSpan={3}>
                                                Загальна сума
                                            </td>
                                            <td className="px-4 py-2 text-right font-bold">
                                                {selectedOrder.total} ₴
                                            </td>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t">
                                <div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                                        onClick={() => handleStatusChange(selectedOrder.id, OrderStatus.CANCELLED)}
                                        disabled={selectedOrder.status === OrderStatus.DELIVERED || selectedOrder.status === OrderStatus.CANCELLED}
                                    >
                                        <X className="h-4 w-4 mr-1" /> Скасувати
                                    </Button>
                                </div>

                                <Select
                                    defaultValue={selectedOrder.status}
                                    onValueChange={(value) => handleStatusChange(selectedOrder.id, value as OrderStatus)}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Змінити статус" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={OrderStatus.ACCEPTED}>Прийнято</SelectItem>
                                        <SelectItem value={OrderStatus.PREPARING}>Готується</SelectItem>
                                        <SelectItem value={OrderStatus.DELIVERING}>Доставляється</SelectItem>
                                        <SelectItem value={OrderStatus.DELIVERED}>Доставлено</SelectItem>
                                        <SelectItem value={OrderStatus.CANCELLED}>Скасовано</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default AdminOrdersPage;
