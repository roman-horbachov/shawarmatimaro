
export enum OrderStatus {
    ACCEPTED = "accepted",
    PREPARING = "preparing",
    DELIVERING = "delivering",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

export interface Order {
    id: string;
    items: OrderItem[];
    status: OrderStatus;
    total: number;
    createdAt: string;
    userId?: string | null;
    userEmail?: string | null;
    userName?: string | null;
    address?: string | null;
    phone?: string | null;
    paymentMethod: "cash" | "card" | "online";
    changeAmount?: string; // For change amount when paying with cash
    deliveryFee?: number; // Added delivery fee
}

export const getStatusLabel = (status: OrderStatus): string => {
    switch (status) {
        case OrderStatus.ACCEPTED:
            return "Прийнято";
        case OrderStatus.PREPARING:
            return "Готується";
        case OrderStatus.DELIVERING:
            return "Доставляється";
        case OrderStatus.DELIVERED:
            return "Доставлено";
        case OrderStatus.CANCELLED:
            return "Скасовано";
        default:
            return "Невідомий статус";
    }
}

export const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
        case OrderStatus.ACCEPTED:
            return "bg-blue-100 text-blue-800";
        case OrderStatus.PREPARING:
            return "bg-purple-100 text-purple-800";
        case OrderStatus.DELIVERING:
            return "bg-orange-100 text-orange-800";
        case OrderStatus.DELIVERED:
            return "bg-green-100 text-green-800";
        case OrderStatus.CANCELLED:
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
}
