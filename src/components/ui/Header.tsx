import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User as UserIcon, History, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const toggleMenu = () => setIsMenuOpen(o => !o);

  const handleLogout = async () => {
    await logout();
    navigate('/auth/login');
  };

  return (
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">

          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Логотип Шаурма ТіМаРо" className="h-16 w-auto mr-2" />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium text-text-muted hover:text-primary transition-colors">Головна</Link>
            <Link to="/menu" className="font-medium text-text-muted hover:text-primary transition-colors">Меню</Link>
            <Link to="/about" className="font-medium text-text-muted hover:text-primary transition-colors">Про нас</Link>
            <Link to="/contacts" className="font-medium text-text-muted hover:text-primary transition-colors">Контакти</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Корзина */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
                )}
              </Button>
            </Link>

            {loading ? (
                <div>Loading...</div>
            ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <UserIcon className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center space-x-2 w-full">
                        <UserIcon className="h-4 w-4" />
                        <span>Особистий кабінет</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/order-history" className="flex items-center space-x-2 w-full">
                        <History className="h-4 w-4" />
                        <span>Історія</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={handleLogout} className="flex items-center space-x-2">
                      <LogOut className="h-4 w-4" />
                      <span>Вийти</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <>
                  <Link to="/auth/login">
                    <Button variant="ghost" size="icon">
                      <UserIcon className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/auth/login">
                    <Button variant="outline" size="sm">Увійти</Button>
                  </Link>
                  <Link to="/auth/register">
                    <Button className="bg-primary hover:bg-primary-light" size="sm">Реєстрація</Button>
                  </Link>
                </>
            )}
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
            <div className="md:hidden mt-4 animate-fade-in bg-white">
              <div className="flex flex-col space-y-2 pb-4">
                <Link to="/" className="px-4 py-2 font-medium text-text-muted hover:text-primary hover:bg-accent rounded-md">Головна</Link>
                <Link to="/menu" className="px-4 py-2 font-medium text-text-muted hover:text-primary hover:bg-accent rounded-md">Меню</Link>
                <Link to="/about" className="px-4 py-2 font-medium text-text-muted hover:text-primary hover:bg-accent rounded-md">Про нас</Link>
                <Link to="/contacts" className="px-4 py-2 font-medium text-text-muted hover:text-primary hover:bg-accent rounded-md">Контакти</Link>
                <hr className="border-t border-gray-200" />

                {user ? (
                    <>
                      <Link to="/profile" className="px-4 py-2 flex items-center space-x-2 hover:bg-accent rounded-md">
                        <UserIcon className="h-4 w-4" />
                        <span>Профіль</span>
                      </Link>
                      <Link to="/order-history" className="px-4 py-2 flex items-center space-x-2 hover:bg-accent rounded-md">
                        <History className="h-4 w-4" />
                        <span>Історія</span>
                      </Link>
                      <button
                          onClick={handleLogout}
                          className="px-4 py-2 text-white bg-primary font-medium rounded-md text-left"
                      >
                        Вийти
                      </button>
                    </>
                ) : (
                    <>
                      <Link to="/auth/login" className="px-4 py-2 font-medium text-primary hover:bg-accent rounded-md">Увійти</Link>
                      <Link to="/auth/register" className="px-4 py-2 bg-primary text-white font-medium rounded-md text-center">Реєстрація</Link>
                    </>
                )}
              </div>
            </div>
        )}
      </header>
  );
};

export default Header;
