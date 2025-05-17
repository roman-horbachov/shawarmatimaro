import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Truck, Clock, MapPin, Info } from 'lucide-react';

const DeliveryPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Доставка</h1>
        
        <div className="max-w-3xl mx-auto bg-secondary/10 p-6 rounded-lg border border-secondary mb-12">
          <div className="flex items-center mb-4">
            <Info className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-xl font-bold">Інформація про доставку</h2>
          </div>
          <p className="text-lg mb-4">
            Вартість доставки по місту Київ становить <strong>60 грн</strong> на будь-яке замовлення.
            Для віддалених районів умови доставки уточнюйте у оператора.
          </p>
          <p className="text-lg">
            Доставку здійснюють кур'єри компанії iPost. Також є можливість замовити доставку через Glovo, 
            але ціна може варіюватися, і може стягуватися додатковий сервісний збір. 
            Вказана на сайті ціна доставки (60 грн) актуальна для адресної доставки iPost.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Доставка 60 грн</h3>
            <p className="text-gray-600">
              На будь-яке замовлення в межах міста Київ доставка 60 грн. 
              Для віддалених районів умови уточнюйте у оператора.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Швидка доставка</h3>
            <p className="text-gray-600">
              Ми гарантуємо доставку протягом 30-60 хвилин в залежності від району міста. 
              Якщо затримуємось — компенсуємо!
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Зона доставки</h3>
            <p className="text-gray-600">
              Ми доставляємо по всьому Києву. Для уточнення можливості доставки 
              у ваш район, будь ласка, зв'яжіться з нами.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-4">Умови доставки</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
              <span>Ми приймаємо замовлення щодня з 10:00 до 22:00</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
              <span>Вартість доставки - 60 грн</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
              <span>За бажанням, ви можете оплатити замовлення готівкою при отриманні або карткою онлайн</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
              <span>Наш кур'єр зателефонує вам перед доставкою</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
              <span>Якщо є особливі побажання щодо доставки, вкажіть це в коментарі до замовлення</span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
              <span>Доставку здійснюють кур'єри iPost, також можливе замовлення через Glovo</span>
            </li>
          </ul>
        </div>
        
        <div className="text-center">
          <p className="text-lg mb-4">Виникли питання щодо доставки?</p>
          <p className="text-xl font-bold mb-2">Зв'яжіться з нами:</p>
          <p className="text-primary text-2xl font-bold">+380 (99) 123-45-67</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default DeliveryPage;
