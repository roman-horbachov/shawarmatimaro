
// src/pages/OrderSuccessPage.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Button } from '@/components/ui/button';
import { Order } from '@/models/Order';

const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const order = location.state?.order as Order | undefined;

  // Если данных нет — используем рандомный номер
  const orderNumber = order?.id ?? `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

  // Выбор способа оплаты
  const getPaymentLabel = () => {
    if (!order) return 'Готівкою кур\'єру';
    
    switch (order.paymentMethod) {
      case 'cash':
        return order.changeAmount 
          ? `Готівкою кур'єру (потрібна решта з ${order.changeAmount} ₴)`
          : 'Готівкою кур\'єру';
      case 'card':
        return 'Карткою кур\'єру';
      case 'online':
        return 'Онлайн оплата';
      default:
        return 'Готівкою кур\'єру';
    }
  };

  return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Дякуємо за замовлення!
            </h1>

            <p className="text-xl mb-3">
              Ваше замовлення #{orderNumber} успішно оформлено
            </p>

            <p className="text-text-light mb-8">
              Ми надіслали підтвердження замовлення на ваш email. <br />
              Ви можете стежити за статусом замовлення в розділі "Історія замовлень" у вашому особистому кабінеті.
            </p>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-left">
              <h2 className="text-xl font-semibold mb-4">
                Інформація про замовлення:
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-light">Номер замовлення:</span>
                  <span className="font-medium">#{orderNumber}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-light">Статус:</span>
                  <span className="font-medium text-green-600">
                  {order?.status
                      ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
                      : 'Прийнято'}
                </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-light">Приблизний час доставки:</span>
                  <span className="font-medium">30-45 хвилин</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-text-light">Спосіб оплати:</span>
                  <span className="font-medium">{getPaymentLabel()}</span>
                </div>
                
                {order?.address && (
                  <div className="flex justify-between">
                    <span className="text-text-light">Адреса доставки:</span>
                    <span className="font-medium">{order.address}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/menu">
                <Button variant="outline">Повернутися до меню</Button>
              </Link>
              <Link to="/order-history">
                <Button className="bg-primary hover:bg-primary-dark">
                  Історія замовлень
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
  );
};

export default OrderSuccessPage;
