import React from 'react';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { Link } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left side - Image */}
            <div className="lg:w-1/2 bg-primary relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-white z-10 max-w-md">
                        <Link to="/" className="flex items-center mb-8">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-3">
                                <span className="text-primary font-bold text-xl">ТМ</span>
                            </div>
                            <span className="font-heading font-bold text-2xl">Шаурма ТіМаРо</span>
                        </Link>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Відновлення паролю</h2>
                        <p className="text-lg mb-6">
                            Забули пароль? Не хвилюйтеся! Ми надішлемо вам інструкції щодо зміни паролю на вашу електронну пошту.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="lg:w-1/2 flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <div className="lg:hidden mb-8">
                        <Link to="/" className="flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-2">
                                <span className="text-white font-bold text-lg">ТМ</span>
                            </div>
                            <span className="font-heading font-bold text-xl">Шаурма ТіМаРо</span>
                        </Link>
                    </div>
                    <ForgotPasswordForm />
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;