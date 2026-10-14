// ============================================================
// Auth Page — Login & Registration
// ============================================================

import React, { useState } from 'react';
import { Flame, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

type AuthMode = 'customer-login' | 'customer-register' | 'seller-login' | 'admin-login';

export function AuthPage() {
  const { loginAdmin, loginSeller, loginCustomer } = useApp();

  const [authMode, setAuthMode] = useState<AuthMode>('customer-login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clearForm = (mode: AuthMode) => {
    setAuthMode(mode);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError("Iltimos, barcha majburiy maydonlarni to'ldiring!");
      return;
    }
    if (password.length < 4) {
      setError("Parol kamida 4 ta belgidan iborat bo'lishi kerak.");
      return;
    }
    if (authMode === 'customer-register' && !name.trim()) {
      setError('Ismingizni kiriting.');
      return;
    }

    setIsLoading(true);
    // Simulate slight delay for UX
    await new Promise((r) => setTimeout(r, 400));

    let success = false;
    if (authMode === 'admin-login') {
      success = loginAdmin(email.trim(), password);
      if (!success) setError("Admin ma'lumotlari noto'g'ri! Demo: admin@tezqafe.uz / admin123");
    } else if (authMode === 'seller-login') {
      success = loginSeller(email.trim(), password);
      if (!success) setError("Parol kamida 4 ta belgidan iborat bo'lishi kerak.");
    } else {
      success = loginCustomer(name.trim(), email.trim(), password);
      if (!success) setError("Kirish amalga oshmadi. Qayta urinib ko'ring.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FFF8EC] dark:bg-[#121212]">
      <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl border border-[#E2D8C0] dark:border-gray-800 p-8 shadow-xl">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#D62828] mx-auto flex items-center justify-center shadow-md mb-3">
            <Flame className="w-8 h-8 text-[#FFC300] fill-[#FFC300]" />
          </div>
          <h1 className="text-2xl font-black font-display text-[#5C3A21] dark:text-amber-200">
            tez<span className="text-[#D62828]">qafe</span>ga xush kelibsiz
          </h1>
          <p className="text-xs text-gray-500 mt-1">Express Fast Food Tizimiga kirish</p>
        </div>

        {/* Role selector */}
        <div className="grid grid-cols-3 gap-1 bg-[#FFF8EC] dark:bg-[#2A2A2A] p-1.5 rounded-2xl mb-6 border border-[#E2D8C0] dark:border-gray-700 text-xs font-black">
          <button
            type="button"
            onClick={() => clearForm('customer-login')}
            className={`py-2 rounded-xl transition-all ${
              authMode.startsWith('customer')
                ? 'bg-[#D62828] text-white shadow'
                : 'text-[#5C3A21] dark:text-gray-300 hover:bg-white/60'
            }`}
          >
            Mijoz
          </button>
          <button
            type="button"
            onClick={() => clearForm('seller-login')}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'seller-login'
                ? 'bg-[#D62828] text-white shadow'
                : 'text-[#5C3A21] dark:text-gray-300 hover:bg-white/60'
            }`}
          >
            Sotuvchi
          </button>
          <button
            type="button"
            onClick={() => clearForm('admin-login')}
            className={`py-2 rounded-xl transition-all ${
              authMode === 'admin-login'
                ? 'bg-[#5C3A21] text-amber-200 shadow'
                : 'text-gray-500 dark:text-gray-400 hover:bg-white/60'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-bold rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Name field for customer register */}
          {authMode === 'customer-register' && (
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Ism va Familiya
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Doston Mirzayev"
                required
                className="w-full p-3 bg-gray-50 dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 rounded-xl font-bold focus:outline-none focus:border-[#D62828] focus:ring-1 focus:ring-[#D62828]"
              />
            </div>
          )}

          {/* Email / Phone */}
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              {authMode === 'admin-login' ? 'Admin Email' : 'Email yoki Telefon'}
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={authMode === 'admin-login' ? 'admin@tezqafe.uz' : '+998 90 123 45 67'}
              required
              className="w-full p-3 bg-gray-50 dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 rounded-xl font-bold focus:outline-none focus:border-[#D62828] focus:ring-1 focus:ring-[#D62828]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Parol</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full p-3 pr-10 bg-gray-50 dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 rounded-xl font-bold focus:outline-none focus:border-[#D62828] focus:ring-1 focus:ring-[#D62828]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#D62828] hover:bg-[#B81D1D] disabled:bg-gray-400 text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-95 disabled:active:scale-100"
          >
            {isLoading
              ? 'Yuklanmoqda...'
              : authMode === 'customer-register'
              ? "Ro'yxatdan O'tish"
              : 'Tizimga Kirish'}
          </button>
        </form>

        {/* Toggle login/register for customer */}
        {authMode.startsWith('customer') && (
          <div className="mt-4 text-center">
            {authMode === 'customer-login' ? (
              <button
                onClick={() => clearForm('customer-register')}
                className="text-xs font-bold text-[#5C3A21] dark:text-amber-200 hover:underline"
              >
                Hisobingiz yo'qmi? Ro'yxatdan o'tish
              </button>
            ) : (
              <button
                onClick={() => clearForm('customer-login')}
                className="text-xs font-bold text-[#5C3A21] dark:text-amber-200 hover:underline"
              >
                Akkauntingiz bormi? Kirish
              </button>
            )}
          </div>
        )}

        {/* Admin demo hint */}
        {authMode === 'admin-login' && (
          <p className="mt-4 text-[10px] text-center text-gray-400">
            Demo Admin: <strong>admin@tezqafe.uz</strong> / <strong>admin123</strong>
          </p>
        )}

        {/* Seller demo hint */}
        {authMode === 'seller-login' && (
          <p className="mt-4 text-[10px] text-center text-gray-400">
            Istalgan email va kamida 4 ta belgili parol bilan kiring.
          </p>
        )}
      </div>
    </div>
  );
}
