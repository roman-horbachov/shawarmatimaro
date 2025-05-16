
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="bg-text py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="font-heading text-xl font-bold mb-4 text-secondary">Контакти</h3>
              <p className="mb-2">Телефон: +380 (99) 123-45-67</p>
              <p className="mb-2">Email: info@timaro.com.ua</p>
              <p>Адреса: м. Київ, вул. Хрещатик, 22</p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading text-xl font-bold mb-4 text-secondary">Інформація</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="hover:text-secondary transition-colors">Про нас</Link>
                </li>
                <li>
                  <Link to="/delivery" className="hover:text-secondary transition-colors">Доставка та оплата</Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-secondary transition-colors">Політика конфіденційності</Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-secondary transition-colors">Умови використання</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700 text-center">
            <p>&copy; {currentYear} Шаурма ТіМаРо. Всі права захищені.</p>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
