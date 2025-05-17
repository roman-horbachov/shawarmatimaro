import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
      <div className="relative bg-gradient-to-r from-primary to-primary-light text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Смак сходу<br />до вашого столу
              </h1>
              <p className="text-lg mb-8 max-w-md">
                Свіжі інгредієнти, чудовий смак та швидка доставка.
                Шаурма ТіМаРо — ваш ідеальний вибір для швидкого та смачного перекусу!
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0">
                <Link to="/menu">
                  <Button className="bg-white text-primary hover:bg-gray-100 font-medium px-6 py-3 rounded-lg w-full sm:w-auto">
                    Замовити зараз
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative w-full h-64 md:h-80 lg:h-96">
                <img
                    src="https://images.unsplash.com/photo-1530469912745-a215c6b256ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Шаурма"
                    className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground rounded-full p-6 shadow-xl">
                  <div className="text-center">
                    <p className="font-bold text-2xl">від 160₴</p>
                    <p className="text-sm">Доставка<br />від 30 хв</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary opacity-20 rounded-tr-full"></div>
      </div>
  );
};

export default Hero;
