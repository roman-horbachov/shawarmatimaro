import { db, storage } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Product } from "@/components/ui/ProductCard";

const PRODUCTS_COLLECTION = "products";

export const getAllProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
  return querySnapshot.docs.map(doc => {
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
};

export const getProductById = async (productId: string): Promise<Product | null> => {
  const productDoc = await getDoc(doc(db, PRODUCTS_COLLECTION, productId));
  if (productDoc.exists()) {
    return {
      id: productDoc.id,
      ...productDoc.data() as Omit<Product, "id">
    } as Product;
  }
  return null;
};

export const addProduct = async (
    product: Omit<Product, "id">,
    imageFile?: File
): Promise<Product> => {
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

  return {
    id: docRef.id,
    ...productData
  };
};

export const updateProduct = async (
    productId: string,
    product: Partial<Product>,
    imageFile?: File
): Promise<Product> => {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);
  const updateData = { ...product };

  if (imageFile) {
    const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const newImageUrl = await getDownloadURL(storageRef);
    updateData.imageUrl = newImageUrl;
  }

  await updateDoc(productRef, updateData);

  const updatedProductDoc = await getDoc(productRef);
  return {
    id: productId,
    ...(updatedProductDoc.data() as Omit<Product, "id">)
  };
};

export const deleteProduct = async (productId: string): Promise<void> => {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
};

export const initializeProducts = async (products: Omit<Product, "id">[]) => {
  for (const product of products) {
    await addDoc(collection(db, PRODUCTS_COLLECTION), product);
  }
};
