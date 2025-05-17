import React from 'react';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
      <Button
        variant={selectedCategory === null ? "default" : "outline"}
        className={selectedCategory === null ? "bg-primary" : ""}
        onClick={() => onSelectCategory(null)}
      >
        Все
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className={selectedCategory === category ? "bg-primary" : ""}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
