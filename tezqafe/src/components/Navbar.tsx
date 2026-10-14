// ============================================================
// Navbar Component — TezQafe
// ============================================================

import React from 'react';
import {
  ShoppingBag, Clock, UtensilsCrossed, BarChart2,
  ShieldCheck, User, Sun, Moon, LogOut, ListOrdered,
} from 'lucide-react';
import { TezQafeLogo } from './ui/SharedUI';
import { useApp } from '../context/AppContext';
import type { AppTab } from '../types';

interface NavItem {
  tab: AppTab;
  label: string;
  icon: React.ReactNode;
}

export function Navbar() {
  const { currentUser, activeTab, setActiveTab, isDarkMode, toggleDarkMode, logout, cart } = useApp();

  if (!currentUser) return null;

  const customerNav: NavItem[] = [
    { tab: 'pos', label: 'Menyudan Tanlash', icon: <ShoppingBag className="w-4 h-4" /> },
    { tab: 'my-orders', label: 'Buyurtmalarim', icon: <ListOrdered className="w-4 h-4" /> },
  ];

  const sellerNav: NavItem[] = [
    { tab: 'queue', label: 'Oshxona Navbati', icon: <Clock className="w-4 h-4" /> },
    { tab: 'catalog', label: "Mahsulotlarni Boshqarish", icon: <UtensilsCrossed className="w-4 h-4" /> },
    { tab: 'reports', label: 'Kunlik Hisobot', icon: <BarChart2 className="w-4 h-4" /> },
  ];

  const adminNav: NavItem[] = [
    { tab: 'admin', label: 'Admin Markazi', icon: <ShieldCheck className="w-4 h-4" /> },
    { tab: 'catalog', label: 'Barcha Menyular', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { tab: 'queue', label: 'Barcha Buyurtmalar', icon: <Clock className="w-4 h-4" /> },
  ];

  const navItems =
    currentUser.role === 'customer'
      ? customerNav
      : currentUser.role === 'seller'
      ? sellerNav
      : adminNav;

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const homeTab: AppTab =
    currentUser.role === 'customer' ? 'pos' : currentUser.role === 'seller' ? 'catalog' : 'admin';

  return (
    <header className="bg-white dark:bg-[#1E1E1E] border-b border-[#E2D8C0] dark:border-gray-800 sticky top-0 z-30 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <button
            onClick={() => setActiveTab(homeTab)}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <TezQafeLogo size="sm" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FFF8EC] dark:bg-[#2A2A2A] p-1 rounded-xl border border-[#E2D8C0] dark:border-gray-700">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeTab === item.tab
                    ? 'bg-[#D62828] text-white shadow-sm'
                    : 'text-[#5C3A21] dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === 'profile'
                  ? 'bg-[#D62828] text-white shadow-sm'
                  : 'text-[#5C3A21] dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-700/60'
              }`}
            >
              <User className="w-4 h-4" /> Profil
            </button>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-2">
            {/* Cart badge for customer */}
            {currentUser.role === 'customer' && cartCount > 0 && (
              <button
                onClick={() => setActiveTab('pos')}
                className="relative p-2 bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 rounded-xl text-[#D62828]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D62828] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            )}

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 rounded-xl text-[#5C3A21] dark:text-amber-200 hover:opacity-80 transition-opacity"
              title={isDarkMode ? 'Yorug\' rejim' : 'Tungi rejim'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User info & logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('profile')}
                className="w-8 h-8 rounded-full bg-[#FFC300] text-[#5C3A21] font-black flex items-center justify-center text-xs cursor-pointer hover:scale-105 transition-transform flex-shrink-0"
                title="Profilni ochish"
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </button>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-black text-[#1F1F1F] dark:text-gray-200 leading-tight truncate max-w-[120px]">
                  {currentUser.name}
                </p>
                <p className="text-[10px] text-[#D62828] font-bold uppercase">{currentUser.role}</p>
              </div>
              <button
                onClick={logout}
                title="Tizimdan chiqish"
                className="p-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50 text-[#D62828] rounded-xl ml-1 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto pb-2 border-t border-gray-100 dark:border-gray-800 pt-2">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1 ${
                activeTab === item.tab
                  ? 'bg-[#D62828] text-white'
                  : 'text-[#5C3A21] dark:text-gray-300 bg-gray-100 dark:bg-gray-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1 ${
              activeTab === 'profile'
                ? 'bg-[#D62828] text-white'
                : 'text-[#5C3A21] dark:text-gray-300 bg-gray-100 dark:bg-gray-800'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Profil
          </button>
        </div>
      </div>
    </header>
  );
}
