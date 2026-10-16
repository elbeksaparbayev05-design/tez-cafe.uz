// ============================================================
// App Context — React context for shared app state
// ============================================================

import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import type { User, Product, Order, CartItem, AppTab } from '../types';
import { authService, productService, orderService, userService, favoritesService } from '../services/store';
import { generateOrderId, formatTime, formatToday } from '../utils/helpers';

// ---- State & Actions Interface ----

interface AppContextValue {
  // Auth
  currentUser: User | null;
  loginAdmin: (email: string, password: string) => boolean;
  loginSeller: (email: string, password: string) => boolean;
  loginCustomer: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;

  // Navigation
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;

  // Products (shared single source of truth)
  products: Product[];
  refreshProducts: () => void;
  createProduct: (p: Omit<Product, 'id' | 'createdAt'>) => Product;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  toggleProductAvailability: (id: number) => void;

  // Orders (shared)
  orders: Order[];
  refreshOrders: () => void;
  placeOrder: (cart: CartItem[], type: Order['type'], payment: Order['paymentMethod'], address?: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, options?: string[]) => void;
  updateCartQty: (idx: number, delta: number) => void;
  removeFromCart: (idx: number) => void;
  clearCart: () => void;

  // UI
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toast: string;
  showToast: (msg: string) => void;

  // Favorites
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  removeFavorite: (productId: number) => void;

  // Admin helpers
  allUsers: User[];
  refreshUsers: () => void;
  deleteUser: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => authService.getCurrentUser());
  const [activeTab, setActiveTab] = useState<AppTab>('pos');
  const [products, setProducts] = useState<Product[]>(() => productService.getAll());
  const [orders, setOrders] = useState<Order[]>(() => orderService.getAll());
  const [allUsers, setAllUsers] = useState<User[]>(() => userService.getAll());
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tezqafe_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (currentUser) {
      return favoritesService.getByUserId(currentUser.id);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('tezqafe_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Update favorites when user changes
  useEffect(() => {
    if (currentUser) {
      setFavorites(favoritesService.getByUserId(currentUser.id));
    } else {
      setFavorites([]);
    }
  }, [currentUser]);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tezqafe_theme');
      if (saved !== null) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return true;
    }
  });
  const [toast, setToast] = useState('');

  // Apply dark mode and persist
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('tezqafe_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('tezqafe_theme', 'light');
      }
    } catch {}
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => setIsDarkMode((v) => !v), []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }, []);

  // ---- Auth ----
  const loginAdmin = useCallback((email: string, password: string): boolean => {
    const user = authService.loginAdmin(email, password);
    if (user) {
      setCurrentUser(user);
      setActiveTab('admin');
      return true;
    }
    return false;
  }, []);

  const loginSeller = useCallback((email: string, password: string): boolean => {
    const user = authService.loginSeller(email, password);
    if (user) {
      setCurrentUser(user);
      setActiveTab('catalog');
      return true;
    }
    return false;
  }, []);

  const loginCustomer = useCallback((name: string, email: string, password: string): boolean => {
    const user = authService.loginCustomer(name, email, password);
    if (user) {
      setCurrentUser(user);
      setActiveTab('pos');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setCurrentUser(null);
    setCart([]);
    setActiveTab('pos');
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = userService.update(currentUser.id, updates);
    if (updated) {
      setCurrentUser(updated);
      setAllUsers(userService.getAll());
    }
  }, [currentUser]);

  // ---- Products ----
  const refreshProducts = useCallback(() => setProducts(productService.getAll()), []);

  const createProduct = useCallback((p: Omit<Product, 'id' | 'createdAt'>): Product => {
    const created = productService.create({ ...p, sellerId: currentUser?.id });
    setProducts(productService.getAll());
    return created;
  }, [currentUser]);

  const updateProduct = useCallback((id: number, updates: Partial<Product>) => {
    productService.update(id, updates);
    setProducts(productService.getAll());
  }, []);

  const deleteProduct = useCallback((id: number) => {
    productService.delete(id);
    setProducts(productService.getAll());
  }, []);

  const toggleProductAvailability = useCallback((id: number) => {
    productService.toggleAvailability(id);
    setProducts(productService.getAll());
  }, []);

  // ---- Orders ----
  const refreshOrders = useCallback(() => setOrders(orderService.getAll()), []);

  const placeOrder = useCallback((
    cartItems: CartItem[],
    type: Order['type'],
    payment: Order['paymentMethod'],
    address?: string,
  ): Order => {
    if (!currentUser) throw new Error('Not logged in');
    const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
    const packagingFee = type === 'takeaway' ? 3000 : 0;
    const now = new Date();
    const order: Order = {
      orderId: generateOrderId(),
      customerId: currentUser.id,
      customer: currentUser.name,
      type,
      time: formatTime(),
      date: formatToday(),
      createdAt: now.toISOString(), // Add ISO timestamp
      status: 'new',
      items: cartItems.map((i) => ({ name: i.name, qty: i.qty, price: i.price, options: i.selectedOptions })),
      subtotal,
      packagingFee,
      total: subtotal + packagingFee,
      paymentMethod: payment,
      deliveryAddress: address,
    };
    orderService.create(order);
    setOrders(orderService.getAll());
    return order;
  }, [currentUser]);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    orderService.updateStatus(orderId, status);
    setOrders(orderService.getAll());
  }, []);

  // ---- Cart ----
  const addToCart = useCallback((product: Product, options: string[] = []) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1, selectedOptions: options }];
    });
    showToast(`${product.name} savatga qo'shildi!`);
  }, [showToast]);

  const updateCartQty = useCallback((idx: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item, i) => {
          if (i === idx) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  }, []);

  const removeFromCart = useCallback((idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  // ---- Favorites ----
  const toggleFavorite = useCallback((productId: number) => {
    if (!currentUser) return;
    const added = favoritesService.toggleFavorite(currentUser.id, productId);
    setFavorites(favoritesService.getByUserId(currentUser.id));
    showToast(added ? 'Sevimlilarga qo\'shildi!' : 'Sevimlilardan olib tashlandi!');
  }, [currentUser, showToast]);

  const isFavorite = useCallback((productId: number) => {
    if (!currentUser) return false;
    return favoritesService.isFavorite(currentUser.id, productId);
  }, [currentUser]);

  const removeFavorite = useCallback((productId: number) => {
    if (!currentUser) return;
    favoritesService.removeFavorite(currentUser.id, productId);
    setFavorites(favoritesService.getByUserId(currentUser.id));
  }, [currentUser]);

  // ---- Admin ----
  const refreshUsers = useCallback(() => setAllUsers(userService.getAll()), []);
  const deleteUser = useCallback((id: string) => {
    userService.delete(id);
    setAllUsers(userService.getAll());
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loginAdmin,
        loginSeller,
        loginCustomer,
        logout,
        updateProfile,
        activeTab,
        setActiveTab,
        products,
        refreshProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        toggleProductAvailability,
        orders,
        refreshOrders,
        placeOrder,
        updateOrderStatus,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        isDarkMode,
        toggleDarkMode,
        toast,
        showToast,
        allUsers,
        refreshUsers,
        deleteUser,
        favorites,
        toggleFavorite,
        isFavorite,
        removeFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within <AppProvider>');
  return ctx;
}
