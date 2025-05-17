import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { CartProvider } from "@/hooks/useCart";
import AdminAuthGuard from "@/components/auth/AdminAuthGuard";

const Index = lazy(() => import("./pages/Index"));
const MenuPage = lazy(() => import("./pages/MenuPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPasswordPage"));
const UserProfilePage = lazy(() => import("./pages/user/UserProfilePage"));
const OrderHistoryPage = lazy(() => import("./pages/user/OrderHistoryPage"));
const AdminProductsPage = lazy(() => import("./pages/admin/AdminProductsPage"));
const AdminPanelPage = lazy(() => import("./pages/admin/AdminPanelPage"));
const AdminOrdersPage = lazy(() => import("./pages/admin/AdminOrdersPage"));
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const DeliveryPage = lazy(() => import("./pages/DeliveryPage"));

const queryClient = new QueryClient();

const App: React.FC = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <CartProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Suspense fallback={<div style={{textAlign:"center",marginTop:"2rem"}}>Загрузка...</div>}>
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/menu" element={<MenuPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/order-success" element={<OrderSuccessPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contacts" element={<ContactsPage />} />
                            <Route path="/terms" element={<TermsPage />} />
                            <Route path="/privacy" element={<PrivacyPage />} />
                            <Route path="/delivery" element={<DeliveryPage />} />
                            <Route path="/auth/login" element={<LoginPage />} />
                            <Route path="/auth/register" element={<RegisterPage />} />
                            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
                            <Route path="/profile" element={<UserProfilePage />} />
                            <Route path="/order-history" element={<OrderHistoryPage />} />
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
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CartProvider>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
