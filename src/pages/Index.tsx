import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import Hero from '@/components/ui/Hero';
import ProductCard, { Product } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { getAllProducts } from '@/services/firebaseProductService';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const allProducts = await getAllProducts();
        setFeaturedProducts(allProducts.slice(0, 4)); // показываем первые 4
      } catch (e) {
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
      <MainLayout>
        <Hero />

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text mb-2">Популярне меню</h2>
              <p className="text-text-light max-w-lg mx-auto">
                Спробуйте наші найпопулярніші страви, які замовляють найчастіше
              </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {featuredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                  ))}
                </div>
            )}

            <div className="text-center">
              <Link to="/menu">
                <Button className="bg-primary hover:bg-primary-dark" size="lg">
                  Дивитися все меню
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text mb-2">Чому обирають нас</h2>
              <p className="text-text-light max-w-lg mx-auto">
                Завжди свіжі інгредієнти, швидка доставка та відмінна якість
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* ...оставь как было, фичи не трогаем... */}
              <div className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Швидка доставка</h3>
                <p className="text-text-light">Ми гарантуємо доставку протягом 30-60 хвилин в залежності від району міста. Якщо затримуємось — компенсуємо!</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Якість та свіжість</h3>
                <p className="text-text-light">Використовуємо тільки свіжі продукти вищої якості</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Зручне замовлення</h3>
                <p className="text-text-light">Простий і швидкий спосіб замовлення через додаток</p>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
  );
};

export default Index;
