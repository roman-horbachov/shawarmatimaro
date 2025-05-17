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
                          <g transform="translate(0, 1)"> {/* Adjust the translation value (e.g., 1 or 0.5) to fine-tune centering */}
                            <path fillRule="evenodd" d="M12 0C8.73 0 8.32 0 7.06 0.06 5.8 0.11 4.95 0.28 4.17 0.57 3.39 0.85 2.74 1.27 2.14 1.87 1.54 2.47 1.12 3.12 0.84 3.9 0.56 4.68 0.39 5.53 0.34 6.8 0.28 8.06 0.28 8.47 0.28 12s0 3.53 0.06 4.8c0.05 1.27 0.22 2.12 0.51 2.9 0.28 0.78 0.7 1.43 1.3 2.03 0.6 0.6 1.25 1.02 2.03 1.3 0.78 0.28 1.63 0.45 2.9 0.5 1.27 0.06 1.68 0.06 4.94 0.06s3.68 0 4.94-0.06c1.27-0.05 2.12-0.22 2.9-0.51 0.78-0.28 1.43-0.7 2.03-1.3 0.6-0.6 1.02-1.25 1.3-2.03 0.28-0.78 0.45-1.63 0.5-2.9 0.06-1.27 0.06-1.68 0.06-4.94s0-3.53-0.06-4.8c-0.05-1.27-0.22-2.12-0.51-2.9-0.28-0.78-0.7-1.43-1.3-2.03-0.6-0.6-1.25-1.02-2.03-1.3-0.78-0.28-1.63-0.45-2.9-0.5-1.26-0.06-1.67-0.06-4.93-0.06zm0 2.16c3.2 0 3.58 0.01 4.84 0.06 1.18 0.04 1.7 0.19 2.04 0.32 0.34 0.13 0.56 0.26 0.72 0.42 0.16 0.16 0.29 0.38 0.42 0.72 0.13 0.34 0.28 0.86 0.32 2.04 0.05 1.26 0.06 1.64 0.06 4.84s-0.01 3.58-0.06 4.84c-0.04 1.18-0.19 1.7-0.32 2.04-0.13 0.34-0.26 0.56-0.42 0.72-0.16 0.16-0.38 0.29-0.72 0.42-0.34 0.13-0.86 0.28-2.04 0.32-1.26 0.05-1.64 0.06-4.84 0.06s-3.58-0.01-4.84-0.06c-1.18-0.04-1.7-0.19-2.04-0.32-0.34-0.13-0.56-0.26-0.72-0.42-0.16-0.16-0.29-0.38-0.42-0.72-0.13-0.34-0.28-0.86-0.32-2.04-0.05-1.26-0.06-1.64-0.06-4.84s.01-3.58.06-4.84c.04-1.18.19-1.7.32-2.04.13-.34.26-.56.42-.72.16-.16.38-.29.72-.42.34-.13.86-.28 2.04-.32 1.26-.05 1.64-.06 4.84-.06zm0 4.38c-2.41 0-4.38 1.97-4.38 4.38s1.97 4.38 4.38 4.38 4.38-1.97 4.38-4.38-1.97-4.38-4.38-4.38zm0 2.16c1.24 0 2.22 1 2.22 2.22s-0.98 2.22-2.22 2.22-2.22-1-2.22-2.22 0.98-2.22 2.22-2.22zm6.35-3.48c-0.64 0-1.16 0.52-1.16 1.16s0.52 1.16 1.16 1.16 1.16-0.52 1.16-1.16-0.52-1.16-1.16-1.16z" clipRule="evenodd" />
                          </g>
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
