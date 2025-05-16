import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Plus, Search, Save, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Product } from '@/components/ui/ProductCard';
import { getAllProducts, addProduct, updateProduct, deleteProduct } from '@/services/firebaseProductService';

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    category: 'Шаурма',
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const categories = ['Шаурма', 'Напої', 'Снеки', 'Десерти'];

  // Load products from Firebase
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const firebaseProducts = await getAllProducts();
        setProducts(firebaseProducts);
        setLoading(false);
      } catch (error) {
        console.error('Помилка при завантаженні товарів:', error);
        toast({
          title: "Помилка завантаження",
          description: "Не вдалося завантажити товари",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [toast]);

  // Filter products by search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct(productId);
      
      // Update local state
      const updatedProducts = products.filter(product => product.id !== productId);
      setProducts(updatedProducts);
      
      toast({
        title: "Товар видалено",
        description: "Товар було успішно видалено з меню",
      });
    } catch (error) {
      console.error('Помилка при видаленні товару:', error);
      toast({
        title: "Помилка",
        description: "Не вдалося видалити товар",
        variant: "destructive"
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleUpdateProduct = async () => {
    if (!currentProduct) return;
    
    try {
      // Update product in Firebase
      const updatedProduct = await updateProduct(currentProduct.id, currentProduct);
      
      // Update local state
      const productIndex = products.findIndex(p => p.id === currentProduct.id);
      if (productIndex !== -1) {
        const updatedProducts = [...products];
        updatedProducts[productIndex] = updatedProduct;
        setProducts(updatedProducts);
      }
      
      // Close dialog and reset state
      setIsEditDialogOpen(false);
      setCurrentProduct(null);
      
      toast({
        title: "Товар оновлено",
        description: "Товар було успішно оновлено",
      });
    } catch (error) {
      console.error('Помилка при оновленні товару:', error);
      toast({
        title: "Помилка",
        description: "Не вдалося оновити товар",
        variant: "destructive"
      });
    }
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.imageUrl) {
      toast({
        title: "Помилка",
        description: "Будь ласка, заповніть всі поля",
        variant: "destructive"
      });
      return;
    }

    try {
      // Add product to Firebase
      const productToAdd = {
        ...newProduct,
        price: Number(newProduct.price)
      } as Omit<Product, 'id'>;
      
      const addedProduct = await addProduct(productToAdd);
      
      // Update local state
      setProducts([...products, addedProduct]);
      
      // Reset form and close dialog
      setIsAddDialogOpen(false);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        category: 'Шаурма',
      });
      
      toast({
        title: "Товар додано",
        description: "Новий товар було успішно додано до меню",
      });
    } catch (error) {
      console.error('Помилка при додаванні товару:', error);
      toast({
        title: "Помилка",
        description: "Не вдалося додати товар",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentProduct) return;
    
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev!,
      [name]: value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setNewProduct(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleEditCategoryChange = (value: string) => {
    if (!currentProduct) return;
    
    setCurrentProduct(prev => ({
      ...prev!,
      category: value
    }));
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Управління товарами</h1>
          <p className="text-text-light">Додавайте, редагуйте та видаляйте товари з меню</p>
        </div>
        <Button className="bg-primary hover:bg-primary-dark" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Додати товар
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Пошук товарів..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                      Товар
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                      Категорія
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-light uppercase tracking-wider">
                      Ціна
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-text-light uppercase tracking-wider">
                      Дії
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt={product.name} />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.price} ₴
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-500"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-text-light">
                        Товари не знайдені
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-text-light">
                Всього товарів: {filteredProducts.length}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Dialog for adding new product */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Додати новий товар</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Назва
              </Label>
              <Input
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Ціна
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Категорія
              </Label>
              <Select 
                value={newProduct.category} 
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Виберіть категорію" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                URL зображення
              </Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right">
                Опис
              </Label>
              <Textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Скасувати
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleAddProduct}>
              <Save className="h-4 w-4 mr-2" />
              Зберегти товар
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for editing product */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Редагувати товар</DialogTitle>
          </DialogHeader>
          
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Назва
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Ціна
                </Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={currentProduct.price}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Категорія
                </Label>
                <Select 
                  value={currentProduct.category} 
                  onValueChange={handleEditCategoryChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Виберіть категорію" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  URL зображення
                </Label>
                <Input
                  id="edit-imageUrl"
                  name="imageUrl"
                  value={currentProduct.imageUrl}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Опис
                </Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Скасувати
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleUpdateProduct}>
              <Save className="h-4 w-4 mr-2" />
              Оновити товар
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProductsPage;
