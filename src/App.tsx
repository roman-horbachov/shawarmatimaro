import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CartProvider } from "@/hooks/useCart";
import AdminAuthGuard from "@/components/auth/AdminAuthGuard";

// Обычные импорты страниц
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import UserProfilePage from "./pages/user/UserProfilePage";
import OrderHistoryPage from "./pages/user/OrderHistoryPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminPanelPage from "./pages/admin/AdminPanelPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import NotFound from "./pages/NotFound";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import DeliveryPage from "./pages/DeliveryPage";

const queryClient = new QueryClient();

const App: React.FC = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <CartProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Index />} />
                        <Route path="/menu" element={<MenuPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/order-success" element={<OrderSuccessPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contacts" element={<ContactsPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/delivery" element={<DeliveryPage />} />

                        {/* Auth Routes */}
                        <Route path="/auth/login" element={<LoginPage />} />
                        <Route path="/auth/register" element={<RegisterPage />} />
                        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

                        {/* User Routes */}
                        <Route path="/profile" element={<UserProfilePage />} />
                        <Route path="/order-history" element={<OrderHistoryPage />} />

                        {/* Admin Routes with Authentication */}
                        <Route path="/admin/login" element={<AdminLoginPage />} />
                        <Route
                            path="/adminpanel"
                            element={
                                <AdminAuthGuard>
                                    <AdminPanelPage />
                                </AdminAuthGuard>
                            }
                        />
                        <Route
                            path="/admin/products"
                            element={
                                <AdminAuthGuard>
                                    <AdminProductsPage />
                                </AdminAuthGuard>
                            }
                        />
                        <Route
                            path="/admin/orders"
                            element={
                                <AdminAuthGuard>
                                    <AdminOrdersPage />
                                </AdminAuthGuard>
                            }
                        />

                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
