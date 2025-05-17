import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, updateQuantity, getItemQuantity } = useCart();
    const quantity = getItemQuantity(product.id);

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="product-card flex flex-col">
            <div className="relative w-full aspect-w-1 aspect-h-1">
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-contain w-full h-full"
                />
                <div className="absolute top-2 right-2 bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm font-medium">
                    {product.category}
                </div>
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-heading font-bold text-lg mb-2">{product.name}</h3>
                <p className="text-text-light text-sm mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between">
                    <p className="text-primary font-bold text-lg">{product.price} ₴</p>
                    {quantity === 0 ? (
                        <Button
                            className="bg-primary hover:bg-primary-light"
                            size="sm"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            У кошик
                        </Button>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium">{quantity}</span>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={handleAddToCart}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
