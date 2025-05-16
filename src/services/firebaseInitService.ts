
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { createOrUpdateUser } from "./firebaseUserService";
import { initializeProducts } from "./firebaseProductService";
import { initializeOrders } from "./firebaseOrderService";
import { doc, getDoc, setDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";

// Initialize all Firebase services
export const initializeFirebaseServices = async () => {
  try {
    console.log("Initializing Firebase services...");

    // Initialize orders collection
    await initializeOrders();

    console.log("Firebase services initialized successfully");
  } catch (error) {
    console.error("Error initializing Firebase services:", error);
  }
};

// Listen for auth state changes to create/update user profiles
export const initializeAuthListener = () => {
  console.log("Setting up auth listener");
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("Auth state changed, user logged in:", user.displayName || user.email);
      try {
        // When user logs in, create or update their profile
        await createOrUpdateUser(user);
      } catch (error) {
        console.error("Error in auth listener:", error);
      }
    } else {
      console.log("Auth state changed, user logged out");
    }
  });
};

