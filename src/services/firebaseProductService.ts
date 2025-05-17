import { db, storage } from "@/lib/firebase";
import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, setDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Product } from "@/components/ui/ProductCard";

const PRODUCTS_COLLECTION = "products";

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        category: data.category
      } as Product;
    });

    localStorage.setItem("shawarma_timaro_products", JSON.stringify(products));
    return products;
  } catch (error) {
    console.error("Error getting products:", error);
    const savedProducts = localStorage.getItem("shawarma_timaro_products");
    if (savedProducts) {
      return JSON.parse(savedProducts);
    }
    return [];
  }
};

// Get product by ID
export const getProductById = async (productId: string): Promise<Product | null> => {
  try {
    const productDoc = await getDoc(doc(db, PRODUCTS_COLLECTION, productId));
    if (productDoc.exists()) {
      return {
        id: productDoc.id,
        ...productDoc.data() as Omit<Product, "id">
      } as Product;
    }
    return null;
  } catch (error) {
    console.error("Error getting product:", error);
    return null;
  }
};

// Add new product
export const addProduct = async (product: Omit<Product, "id">, imageFile?: File): Promise<Product> => {
  try {
    let imageUrl = product.imageUrl;

    if (imageFile) {
      const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const productData = {
      ...product,
      imageUrl
    };

    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productData);

    const newProduct: Product = {
      id: docRef.id,
      ...productData
    };

    const savedProducts = localStorage.getItem("shawarma_timaro_products");
    if (savedProducts) {
      const products: Product[] = JSON.parse(savedProducts);
      products.push(newProduct);
      localStorage.setItem("shawarma_timaro_products", JSON.stringify(products));
    } else {
      localStorage.setItem("shawarma_timaro_products", JSON.stringify([newProduct]));
    }

    return newProduct;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product");
  }
};

// Update product
export const updateProduct = async (productId: string, product: Partial<Product>, imageFile?: File): Promise<Product> => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    const updateData = { ...product }; // тут const вместо let

    if (imageFile) {
      try {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const newImageUrl = await getDownloadURL(storageRef);
        updateData.imageUrl = newImageUrl;
      } catch (e) {
        console.error("Error uploading new image:", e);
      }
    }

    await updateDoc(productRef, updateData);

    const updatedProductDoc = await getDoc(productRef);
    const updatedProduct: Product = {
      id: productId,
      ...(updatedProductDoc.data() as Omit<Product, "id">)
    };

    const savedProducts = localStorage.getItem("shawarma_timaro_products");
    if (savedProducts) {
      const products: Product[] = JSON.parse(savedProducts);
      const index = products.findIndex(p => p.id === productId);
      if (index !== -1) {
        products[index] = updatedProduct;
        localStorage.setItem("shawarma_timaro_products", JSON.stringify(products));
      }
    }

    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update product");
  }
};

// Delete product
export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));

    const savedProducts = localStorage.getItem("shawarma_timaro_products");
    if (savedProducts) {
      const products: Product[] = JSON.parse(savedProducts);
      const updatedProducts = products.filter(p => p.id !== productId);
      localStorage.setItem("shawarma_timaro_products", JSON.stringify(updatedProducts));
    }

    console.log("Product deleted successfully:", productId);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
};

// Initialize Firebase products from localStorage if collection is empty
export const initializeProducts = async (): Promise<void> => {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    if (querySnapshot.empty) {
      const savedProducts = localStorage.getItem("shawarma_timaro_products");
      if (savedProducts) {
        const products = JSON.parse(savedProducts) as Product[];
        for (const product of products) {
          const { id, ...productWithoutId } = product;
          await setDoc(doc(db, PRODUCTS_COLLECTION, id), productWithoutId);
        }
        console.log("Products initialized from localStorage");
      }
    } else {
      console.log("Products collection already exists in Firestore");
    }
  } catch (error) {
    console.error("Error initializing products:", error);
  }
};
