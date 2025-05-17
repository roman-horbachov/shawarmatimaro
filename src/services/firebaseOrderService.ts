import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  setDoc,
  DocumentReference,
  WithFieldValue
} from "firebase/firestore";
import { Order, OrderStatus } from "@/models/Order";

const ORDERS_COLLECTION = "orders";
const LOCAL_STORAGE_ORDERS_KEY = "shawarma_timaro_orders";

export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
  try {

    const orderWithTimestamp: Omit<Order, 'id'> = {
      ...orderData,
      changeAmount: orderData.paymentMethod === 'cash'
          ? (orderData.changeAmount ?? null)
          : null,
      createdAt: new Date().toISOString(),
      status: OrderStatus.ACCEPTED
    };

    const docRef = await addDoc(
        collection(db, ORDERS_COLLECTION),
        orderWithTimestamp as WithFieldValue<Omit<Order, 'id'>>
    );
    const orderId = docRef.id;

    const newOrder: Order = {
      ...orderWithTimestamp,
      id: orderId,
    };

    saveOrderToLocalStorage(newOrder);
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);
    // fallback: local order
    const fallbackOrderId = `LOCAL-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const fallbackOrder: Order = {
      ...orderData,
      id: fallbackOrderId,
      createdAt: new Date().toISOString(),
      status: OrderStatus.ACCEPTED,
      changeAmount: orderData.paymentMethod === 'cash'
          ? (orderData.changeAmount ?? null)
          : null,
    };
    saveOrderToLocalStorage(fallbackOrder);
    return fallbackOrder;
  }
};

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const q = query(
        collection(db, ORDERS_COLLECTION),
        orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Order));
  } catch (error) {
    console.error("Error getting all orders:", error);
    return getOrdersFromLocalStorage();
  }
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const q = query(
        collection(db, ORDERS_COLLECTION),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Order));
  } catch (error) {
    console.error("Error getting user orders:", error);
    const allOrders = getOrdersFromLocalStorage();
    return allOrders.filter(order => order.userId === userId);
  }
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const orderDoc = await getDoc(doc(db, ORDERS_COLLECTION, orderId));
    if (orderDoc.exists()) {
      return {
        ...orderDoc.data(),
        id: orderDoc.id
      } as Order;
    }
    return null;
  } catch (error) {
    console.error("Error getting order by ID:", error);
    const allOrders = getOrdersFromLocalStorage();
    return allOrders.find(order => order.id === orderId) || null;
  }
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<Order> => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, { status });

    const updatedDoc = await getDoc(orderRef);
    const updatedOrder = {
      ...updatedDoc.data(),
      id: orderId
    } as Order;

    updateOrderInLocalStorage(updatedOrder);

    return updatedOrder;
  } catch (error) {
    console.error("Error updating order status:", error);
    return updateOrderStatusLocally(orderId, status);
  }
};

// =======================
// LocalStorage helpers
// =======================
function saveOrderToLocalStorage(order: Order): void {
  const orders = getOrdersFromLocalStorage();
  const existingOrderIndex = orders.findIndex(o => o.id === order.id);

  if (existingOrderIndex !== -1) {
    orders[existingOrderIndex] = order;
  } else {
    orders.push(order);
  }

  localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
}

function getOrdersFromLocalStorage(): Order[] {
  const storedOrders = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
  if (storedOrders) {
    try {
      const parsedOrders = JSON.parse(storedOrders);
      return Array.isArray(parsedOrders) ? parsedOrders : [];
    } catch (error) {
      console.error("Failed to parse stored orders from localStorage:", error);
    }
  }
  return [];
}

function updateOrderInLocalStorage(updatedOrder: Order): void {
  const orders = getOrdersFromLocalStorage();
  const orderIndex = orders.findIndex(order => order.id === updatedOrder.id);

  if (orderIndex !== -1) {
    orders[orderIndex] = updatedOrder;
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
  } else {
    console.warn(`Order with ID ${updatedOrder.id} not found in localStorage for update.`);
  }
}

function updateOrderStatusLocally(orderId: string, status: OrderStatus): Order {
  const orders = getOrdersFromLocalStorage();
  const orderIndex = orders.findIndex(order => order.id === orderId);

  if (orderIndex === -1) {
    console.error(`Order with ID ${orderId} not found in localStorage`);
    return { id: orderId, status, items: [], total: 0, address: '', paymentMethod: 'cash', createdAt: new Date().toISOString() };
  }

  orders[orderIndex] = {
    ...orders[orderIndex],
    status
  };

  localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
  return orders[orderIndex];
}

export const initializeOrders = async (): Promise<void> => {
  try {
    const querySnapshot = await getDocs(collection(db, ORDERS_COLLECTION));
    if (querySnapshot.empty) {
      const orders = getOrdersFromLocalStorage();

      if (orders.length > 0) {
        console.log(`Found ${orders.length} orders in localStorage, uploading to Firestore...`);
        for (const order of orders) {
          await addDoc(collection(db, ORDERS_COLLECTION), order as WithFieldValue<Order>);
        }
        console.log("Orders initialized from localStorage");
      }
    }
  } catch (error) {
    console.error("Error initializing orders:", error);
  }
};
