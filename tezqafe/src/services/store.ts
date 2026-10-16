// ============================================================
// App Store — Single source of truth for TezQafe
// Persists to localStorage so data survives page refreshes.
// NOTE: This is a DEMO store. In production, replace with
// a real backend API (REST or GraphQL).
// ============================================================

import type { Product, Order, User, AppState, Favorites } from '../types';
import { SEED_PRODUCTS, SEED_ORDERS, DEMO_USERS } from '../data/seedData';

const STORAGE_KEYS = {
  products: 'tezqafe_products',
  orders: 'tezqafe_orders',
  users: 'tezqafe_users',
  favorites: 'tezqafe_favorites',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('localStorage save failed:', err);
  }
}

// Initialize storage with seed data on first run
function initStorage(): void {
  if (!localStorage.getItem(STORAGE_KEYS.products)) {
    saveToStorage(STORAGE_KEYS.products, SEED_PRODUCTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.orders)) {
    saveToStorage(STORAGE_KEYS.orders, SEED_ORDERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    saveToStorage(STORAGE_KEYS.users, DEMO_USERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.favorites)) {
    saveToStorage(STORAGE_KEYS.favorites, {} as Favorites);
  }
}

initStorage();

// ============================================================
// Product Service
// ============================================================
export const productService = {
  getAll(): Product[] {
    return loadFromStorage<Product[]>(STORAGE_KEYS.products, SEED_PRODUCTS);
  },

  getAvailable(): Product[] {
    return this.getAll().filter((p) => p.isAvailable);
  },

  getById(id: number): Product | undefined {
    return this.getAll().find((p) => p.id === id);
  },

  create(product: Omit<Product, 'id' | 'createdAt'>): Product {
    const products = this.getAll();
    const newProduct: Product = {
      ...product,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    saveToStorage(STORAGE_KEYS.products, [newProduct, ...products]);
    return newProduct;
  },

  update(id: number, updates: Partial<Product>): Product | null {
    const products = this.getAll();
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    products[idx] = { ...products[idx], ...updates };
    saveToStorage(STORAGE_KEYS.products, products);
    return products[idx];
  },

  delete(id: number): boolean {
    const products = this.getAll();
    const next = products.filter((p) => p.id !== id);
    if (next.length === products.length) return false;
    saveToStorage(STORAGE_KEYS.products, next);
    return true;
  },

  toggleAvailability(id: number): Product | null {
    const product = this.getById(id);
    if (!product) return null;
    return this.update(id, { isAvailable: !product.isAvailable });
  },
};

// ============================================================
// Order Service
// ============================================================
export const orderService = {
  getAll(): Order[] {
    return loadFromStorage<Order[]>(STORAGE_KEYS.orders, SEED_ORDERS);
  },

  getByCustomerId(customerId: string): Order[] {
    return this.getAll().filter((o) => o.customerId === customerId);
  },

  getById(orderId: string): Order | undefined {
    return this.getAll().find((o) => o.orderId === orderId);
  },

  create(order: Order): Order {
    const orders = this.getAll();
    // Add createdAt timestamp if not provided
    if (!order.createdAt) {
      const now = new Date();
      order.createdAt = now.toISOString();
      // Set date and time from createdAt if not provided
      if (!order.date) {
        order.date = now.toISOString().split('T')[0];
      }
      if (!order.time) {
        order.time = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit', hour12: false });
      }
    }
    saveToStorage(STORAGE_KEYS.orders, [order, ...orders]);
    return order;
  },

  updateStatus(orderId: string, status: Order['status']): Order | null {
    const orders = this.getAll();
    const idx = orders.findIndex((o) => o.orderId === orderId);
    if (idx === -1) return null;
    orders[idx] = { ...orders[idx], status };
    saveToStorage(STORAGE_KEYS.orders, orders);
    return orders[idx];
  },
};

// ============================================================
// Favorites Service
// ============================================================
export const favoritesService = {
  getAll(): Favorites {
    return loadFromStorage<Favorites>(STORAGE_KEYS.favorites, {} as Favorites);
  },

  getByUserId(userId: string): number[] {
    const all = this.getAll();
    return all[userId] || [];
  },

  toggleFavorite(userId: string, productId: number): boolean {
    const all = this.getAll();
    const userFavorites = all[userId] || [];
    const index = userFavorites.indexOf(productId);
    
    if (index > -1) {
      // Remove from favorites
      userFavorites.splice(index, 1);
    } else {
      // Add to favorites
      userFavorites.push(productId);
    }
    
    all[userId] = userFavorites;
    saveToStorage(STORAGE_KEYS.favorites, all);
    return index === -1; // Returns true if added, false if removed
  },

  isFavorite(userId: string, productId: number): boolean {
    const userFavorites = this.getByUserId(userId);
    return userFavorites.includes(productId);
  },

  removeFavorite(userId: string, productId: number): boolean {
    const all = this.getAll();
    const userFavorites = all[userId] || [];
    const index = userFavorites.indexOf(productId);
    
    if (index > -1) {
      userFavorites.splice(index, 1);
      all[userId] = userFavorites;
      saveToStorage(STORAGE_KEYS.favorites, all);
      return true;
    }
    return false;
  },
};

// ============================================================
// User / Auth Service
// ============================================================
export const userService = {
  getAll(): User[] {
    return loadFromStorage<User[]>(STORAGE_KEYS.users, DEMO_USERS);
  },

  getById(id: string): User | undefined {
    return this.getAll().find((u) => u.id === id);
  },

  findByEmail(email: string): User | undefined {
    return this.getAll().find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  create(user: User): User {
    const users = this.getAll();
    saveToStorage(STORAGE_KEYS.users, [...users, user]);
    return user;
  },

  update(id: string, updates: Partial<User>): User | null {
    const users = this.getAll();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...updates };
    saveToStorage(STORAGE_KEYS.users, users);
    return users[idx];
  },

  delete(id: string): boolean {
    const users = this.getAll();
    const next = users.filter((u) => u.id !== id);
    if (next.length === users.length) return false;
    saveToStorage(STORAGE_KEYS.users, next);
    return true;
  },
};

// ============================================================
// Auth Service
// NOTE: Demo only. Passwords are NOT stored or verified
// against a real hash. Admin credentials are hardcoded for
// demonstration. In production, use a real auth backend.
// ============================================================
const SESSION_KEY = 'tezqafe_session';

export const authService = {
  getCurrentUser(): User | null {
    const id = sessionStorage.getItem(SESSION_KEY);
    if (!id) return null;
    return userService.getById(id) ?? null;
  },

  loginAdmin(email: string, password: string): User | null {
    // DEMO: hardcoded admin credentials
    // In production, use a secure backend API
    if (email === 'admin@tezqafe.uz' && password === 'admin123') {
      const admin = userService.findByEmail(email);
      if (admin) {
        sessionStorage.setItem(SESSION_KEY, admin.id);
        return admin;
      }
    }
    return null;
  },

  loginSeller(email: string, _password: string): User | null {
    // DEMO: any email/password with length >= 4 works as a seller
    // In production use a real credential check
    if (_password.length < 4) return null;
    let seller = userService.findByEmail(email);
    if (!seller) {
      // Auto-create a new seller account for demo
      seller = userService.create({
        id: `seller-${Date.now()}`,
        name: email.split('@')[0] || 'Sotuvchi',
        email,
        phone: '+998 00 000 00 00',
        role: 'seller',
        restaurantName: 'TezQafe Yangi Filiali',
        restaurantAddress: "Manzil ko'rsatilmagan",
        workingHours: '08:00 - 22:00',
        restaurantStatus: 'open',
        isApproved: true,
        joinedDate: new Date().toISOString().split('T')[0],
      });
    }
    sessionStorage.setItem(SESSION_KEY, seller.id);
    return seller;
  },

  loginCustomer(name: string, email: string, _password: string): User | null {
    let customer = userService.findByEmail(email);
    if (!customer) {
      customer = userService.create({
        id: `customer-${Date.now()}`,
        name: name || email.split('@')[0] || 'Hurmatli Mijoz',
        email,
        phone: '+998 00 000 00 00',
        role: 'customer',
        savedAddress: '',
        joinedDate: new Date().toISOString().split('T')[0],
      });
    } else {
      // Update name if provided on re-login
      if (name && customer.name !== name) {
        customer = userService.update(customer.id, { name }) ?? customer;
      }
    }
    sessionStorage.setItem(SESSION_KEY, customer.id);
    return customer;
  },

  logout(): void {
    sessionStorage.removeItem(SESSION_KEY);
  },
};

// Expose for debugging in dev
export function getFullAppState(): AppState {
  return {
    users: userService.getAll(),
    products: productService.getAll(),
    orders: orderService.getAll(),
    currentUser: authService.getCurrentUser(),
    favorites: favoritesService.getAll(),
  };
}
