
import { Product } from '@/components/ui/ProductCard';

export const products: Product[] = [
  {
    id: 1,
    name: 'Класична шаурма',
    description: 'Традиційна шаурма з куркою, свіжими овочами та соусом',
    price: 160,
    imageUrl: '/classic.png',
    category: 'Шаурма'
  },
  {
    id: 2,
    name: 'Шаурма з яловичиною',
    description: 'Шаурма з соковитою яловичиною, овочами та фірмовим соусом',
    price: 180,
    imageUrl: '/beef.png',
    category: 'Шаурма'
  },
  {
    id: 3,
    name: 'Шаурма вегетаріанська',
    description: 'Вегетаріанська шаурма з фалафелем, хумусом та овочами',
    price: 200,
    imageUrl: '/veg.png',
    category: 'Вегетаріанське'
  },
  {
    id: 4,
    name: 'Шаурма гостра',
    description: 'Гостра шаурма з куркою, халапеньйо та гострим соусом',
    price: 170,
    imageUrl: '/spicy.png',
    category: 'Гостре'
  },
  {
    id: 5,
    name: 'Шаурма XXL',
    description: 'Велика шаурма з подвійною порцією м\'яса та овочами',
    price: 220,
    imageUrl: '/XXL.png',
    category: 'Великі порції'
  },
  {
    id: 6,
    name: 'Шаурма з бараниною',
    description: 'Шаурма з ніжною бараниною, овочами та йогуртовим соусом',
    price: 190,
    imageUrl: '/sheep.png',
    category: 'Шаурма'
  },
  {
    id: 7,
    name: 'Шаурма по-київськи',
    description: 'Шаурма з куркою, картоплею фрі та капустою по-київськи',
    price: 250,
    imageUrl: '/kyiv.png',
    category: 'Шаурма'
  },
  {
    id: 8,
    name: 'Фалафель в лаваше',
    description: 'Фалафель, хумус, овочі та соус в тонкому лаваші',
    price: 220,
    imageUrl: '/flf.png',
    category: 'Вегетаріанське'
  },
  {
    id: 9,
    name: 'Картопля фрі',
    description: 'Хрустка картопля фрі з сіллю',
    price: 70,
    imageUrl: '/fry.png',
    category: 'Гарніри'
  },
  {
    id: 10,
    name: 'Кока-Кола 0.5л',
    description: 'Газований напій Coca-Cola',
    price: 35,
    imageUrl: '/CocaCola.png',
    category: 'Напої'
  }
];

export const categories = [...new Set(products.map(product => product.category))];
