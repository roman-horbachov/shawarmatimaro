
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Separator } from "@/components/ui/separator";

const AboutPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-text">Про нас</h1>
          <Separator className="my-6" />
          
          <div className="flex flex-col md:flex-row gap-10 mb-12">
            <div className="md:w-1/2">
              <img 
                src="/founders/team.jpg"
                alt="Наша команда" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 text-text">Наша історія</h2>
              <p className="text-text-light mb-4">
                Шаурма ТіМаРо заснована у 2025 році трьома друзями, які мали спільну мрію — принести автентичний смак східної кухні до України.
              </p>
              <p className="text-text-light mb-4">
                Сьогодні мережа ТіМаРо налічує 1 заклад у Києві, і ми продовжуємо розширюватися. Наша місія залишається незмінною — готувати найсмачнішу шаурму з найсвіжіших інгредієнтів.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4 text-text">Наші цінності</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Якість</h3>
              <p className="text-text-light text-center">Ми використовуємо тільки найсвіжіші інгредієнти та найкращі спеції для наших страв.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Швидкість</h3>
              <p className="text-text-light text-center">Ми цінуємо ваш час, тому працюємо швидко та ефективно, не втрачаючи в якості.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Задоволення клієнтів</h3>
              <p className="text-text-light text-center">Ми робимо все, щоб кожен клієнт пішов від нас з посмішкою та бажанням повернутися.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-10 mb-12">
            <div className="md:w-1/2">
              <h2 className="text-2xl font-bold mb-4 text-text">Наша кухня</h2>
              <p className="text-text-light mb-4">
                Ми поєднуємо традиційні східні рецепти з українськими кулінарними традиціями, щоб створити неповторний смак, який полюбили тисячі наших клієнтів. Наші шеф-кухарі постійно експериментують та вдосконалюють меню, додаючи нові цікаві позиції.
              </p>
              <p className="text-text-light mb-4">
                Кожен інгредієнт ретельно відбирається нашими постачальниками, а майстерність наших кухарів перетворює ці інгредієнти на справжні кулінарні шедеври.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1561651823-34feb02250e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Наша кухня" 
                className="rounded-lg shadow-md w-full h-auto"
              />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-text">Наша команда</h2>
          <p className="text-text-light mb-8 text-center max-w-2xl mx-auto">
            Команда ТіМаРо — це дружня родина професіоналів своєї справи, які щодня працюють, щоб дарувати вам найкращі враження від східної кухні.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              {name: "Роман Горбачов", role: "Засновник і технічний директор", image: "/founders/roman.jpg"},
              {name: "Тимофій Білецький", role: "Засновник і директор з розвитку та маркетингу", image: "/founders/timofii.jpg"},
              {name: "Максим Гладкоскок", role: "Засновник і операційний директор", image: "/founders/maksim.jpg"}
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold mb-1">{member.name}</h3>
                <p className="text-text-light text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
