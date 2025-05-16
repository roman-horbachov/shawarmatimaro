
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Контакти</h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Зв'яжіться з нами</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div className="ml-3">
                      <p className="font-medium">Адреса</p>
                      <p className="text-text-light">м. Київ, вул. Хрещатик, 22</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div className="ml-3">
                      <p className="font-medium">Телефон</p>
                      <a 
                        href="tel:+380991234567" 
                        className="text-text-light hover:text-primary"
                      >
                       +380 (99) 123-45-67
                      </a> 
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div className="ml-3">
                      <p className="font-medium">Email</p>
                      <a 
                        href="mailto:info@timaro.com.ua" 
                        className="text-text-light hover:text-primary"
                      >
                        info@timaro.com.ua
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div className="ml-3">
                      <p className="font-medium">Години роботи</p>
                      <p className="text-text-light">Пн-Нд: 10:00 - 22:00</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Соціальні мережі</h3>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com" className="text-text-light hover:text-primary transition-colors">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://instagram.com" className="text-text-light hover:text-primary transition-colors">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.272.644 1.772 1.153.509.5.902 1.104 1.153 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427-.25.668-.644 1.272-1.153 1.772-.5.509-1.104.902-1.772 1.153-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465-.668-.25-1.272-.644-1.772-1.153-.509-.5-.902-1.104-1.153-1.772-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427.25-.668.644-1.272 1.153-1.772.5-.509 1.104-.902 1.772-1.153.636-.247 1.363-.416 2.427-.465C9.486 2.013 9.83 2 12.26 2h.055z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M12.2 6.8a5.23 5.23 0 00-5.2 5.2 5.23 5.23 0 005.2 5.2 5.23 5.23 0 005.2-5.2 5.23 5.23 0 00-5.2-5.2zm0 8.6a3.4 3.4 0 110-6.8 3.4 3.4 0 010 6.8zm6.27-8.8a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="https://twitter.com" className="text-text-light hover:text-primary transition-colors">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100">
                <iframe
                  title="Карта розташування шаурма TIAMO"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2540.5302295873557!2d30.5205717!3d50.4498503!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce56884f4f6f%3A0xcd06ffbc5e9276c0!2z0LLRg9C70LjRhtGPINCl0YDQtdGJ0LDRgtC40LosIDIyLCDQmtC40ZfQsiwgMDIwMDA!5e0!3m2!1suk!2sua!4v1747355262853!5m2!1suk!2sua"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '300px' }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default ContactsPage;
