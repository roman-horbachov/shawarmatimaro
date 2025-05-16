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
  setDoc as firestoreSetDoc, // Keep setDoc in case initializeOrders or other functions use it
} from "firebase/firestore";
import { Order, OrderItem, OrderStatus } from "@/models/Order";

const ORDERS_COLLECTION = "orders";
const COUNTERS_COLLECTION = "counters";
const ORDER_COUNTER_ID = "orderCounter";
const LOCAL_STORAGE_ORDERS_KEY = "shawarma_timaro_orders"; // Define the key for localStorage

// Create a new order with Firebase-generated ID
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
  try {
    console.log("Attempting to create order in Firebase with auto-generated ID:", orderData); // Log data being sent

    // Add createdAt field and ensure status is set
    const orderWithTimestamp = {
      ...orderData,
      createdAt: new Date().toISOString(),
      status: OrderStatus.ACCEPTED // Ensure status is set
    };

    // Prepare data for Firestore - exclude undefined or null fields
    const firestoreOrderData: any = {};
    for (const key in orderWithTimestamp) {
      // Check if the value is not undefined and not null
      if (orderWithTimestamp[key as keyof typeof orderWithTimestamp] !== undefined && orderWithTimestamp[key as keyof typeof orderWithTimestamp] !== null) {
        firestoreOrderData[key] = orderWithTimestamp[key as keyof typeof orderWithTimestamp];
      }
    }

    // Add to Firestore - addDoc generates a unique ID
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), firestoreOrderData); // Use firestoreOrderData
    const orderId = docRef.id;
    console.log("Order successfully written to Firestore with ID:", orderId); // Success log

    // Create the complete order object with the generated ID
    // Combine original data with the generated ID
    const newOrder: Order = {
      ...orderData, // Start with original orderData
      ...firestoreOrderData as any, // Override with filtered data (should be the same except for undefined/null fields) - use 'any' to avoid strict type issues temporarily
      id: orderId, // Add the generated ID
      createdAt: orderWithTimestamp.createdAt, // Ensure createdAt is present
      status: orderWithTimestamp.status // Ensure status is present
    };

    // Also save to localStorage for offline access
    saveOrderToLocalStorage(newOrder);
    return newOrder;
  } catch (error) {
    console.error("Error creating order:", error);

    // Fallback to localStorage only (without sequential ID logic from Firebase)
    console.log("Falling back to local storage for order:", orderData); // Log fallback
    // We need a way to generate a unique ID locally if Firebase fails completely
    // For simplicity here, we'll use a timestamp-based approach for local fallback ID
    const fallbackOrderId = `LOCAL-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const fallbackOrder: Order = {
      ...orderData,
      id: fallbackOrderId,
      createdAt: new Date().toISOString(),
      status: OrderStatus.ACCEPTED // Ensure status is set
    };
    saveOrderToLocalStorage(fallbackOrder);
    return fallbackOrder;
  }
};

// Get all orders
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

    // Fallback to localStorage
    return getOrdersFromLocalStorage();
  }
};

// Get orders for a specific user
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

    // Fallback to localStorage
    const allOrders = getOrdersFromLocalStorage();
    return allOrders.filter(order => order.userId === userId);
  }
};

// Get order by ID
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

    // Fallback to localStorage
    const allOrders = getOrdersFromLocalStorage();
    return allOrders.find(order => order.id === orderId) || null;
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<Order> => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, { status });

    // Get updated order
    const updatedDoc = await getDoc(orderRef);
    const updatedOrder = {
      ...updatedDoc.data(),
      id: orderId
    } as Order;

    // Update in localStorage too
    updateOrderInLocalStorage(updatedOrder);

    return updatedOrder;
  } catch (error) {
    console.error("Error updating order status:", error);

    // Fallback to localStorage only
    return updateOrderStatusLocally(orderId, status);
  }
};

// Helper function for creating/updating documents (Keep this function)
const setDoc = async (docRef: any, data: any) => {
  try {
    // Use Firestore setDoc with merge option
    await firestoreSetDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error("Error in setDoc:", error);
    throw error;
  }
};


// Helper functions for localStorage operations

// Create order in localStorage with sequential ID
async function createOrderLocally(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
  // Try to get the latest order number from localStorage
  const orders = getOrdersFromLocalStorage();
  let nextNumber = 32801; // Default starting number

  if (orders.length > 0) {
    // Extract numbers from order IDs like "ORD-XXXXX"
    const orderNumbers = orders
      .map(order => {
        const match = order.id.match(/ORD-(\d+)/);
        return match ? parseInt(match[1]) : 0; // Use 0 if no match (e.g., LOCAL- IDs)
      })
      .filter(num => !isNaN(num));

    if (orderNumbers.length > 0) {
      nextNumber = Math.max(...orderNumbers) + 1;
    }
  }

  const newOrder: Order = {
    ...orderData,
    id: `ORD-${nextNumber}`, // Still use sequential ID for local fallback
    createdAt: new Date().toISOString()
  };

  saveOrderToLocalStorage(newOrder);

  return newOrder;
}


// Update order status in localStorage
function updateOrderStatusLocally(orderId: string, status: OrderStatus): Order {
  const orders = getOrdersFromLocalStorage();
  const orderIndex = orders.findIndex(order => order.id === orderId);

  if (orderIndex === -1) {
    console.error(`Order with ID ${orderId} not found in localStorage`);
    // Return a dummy order or throw an error depending on desired behavior
    // For now, let's return a partial order with updated status if not found
     return { id: orderId, status, items: [], total: 0, address: '', paymentMethod: 'cash', createdAt: new Date().toISOString() };
  }

  orders[orderIndex] = {
    ...orders[orderIndex],
    status
  };

  localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));

  return orders[orderIndex];
}


// Save order to localStorage
function saveOrderToLocalStorage(order: Order): void {
  const orders = getOrdersFromLocalStorage();
  // Check if the order already exists
  const existingOrderIndex = orders.findIndex(o => o.id === order.id);

  if (existingOrderIndex !== -1) {
    // Update existing order
    orders[existingOrderIndex] = order;
  } else {
    // Add new order
    orders.push(order);
  }

  localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
}


// Update order in localStorage (used for general updates, not just status)
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


// Get all orders from localStorage
function getOrdersFromLocalStorage(): Order[] {
  const storedOrders = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
  if (storedOrders) {
    try {
      const parsedOrders = JSON.parse(storedOrders);
      // Ensure parsed data is an array, default to empty array if not
      return Array.isArray(parsedOrders) ? parsedOrders : [];
    } catch (error) {
      console.error("Failed to parse stored orders from localStorage:", error);
    }
  }
  return []; // Return empty array if no data or parse failed
}


// Initialize Firebase orders collection from localStorage
export const initializeOrders = async (): Promise<void> => {
  try {
    // Check if orders collection is empty
    const querySnapshot = await getDocs(collection(db, ORDERS_COLLECTION));
    if (querySnapshot.empty) {
      // Get orders from localStorage
      const orders = getOrdersFromLocalStorage();

      if (orders.length > 0) {
        console.log(`Found ${orders.length} orders in localStorage, uploading to Firestore...`);

        // Add all orders to Firestore
        for (const order of orders) {
          // Use the existing order ID from localStorage
          // Use addDoc to create with a new Firebase ID, which is allowed by rules
          await addDoc(collection(db, ORDERS_COLLECTION), order);
        }
        console.log("Orders initialized from localStorage");

      }
    }
  } catch (error) {
    console.error("Error initializing orders:", error);
  }
};
