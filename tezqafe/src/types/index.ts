// ============================================================
// Core Application Types — TezQafe
// ============================================================

export type UserRole = 'customer' | 'seller' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  joinedDate?: string;
  // Profile picture (base64 encoded for demo - in production use server URLs)
  avatar?: string;
  // Customer-specific
  savedAddress?: string;
  // Seller-specific
  restaurantName?: string;
  restaurantAddress?: string;
  workingHours?: string;
  restaurantStatus?: 'open' | 'closed';
  isApproved?: boolean;
}

export type ProductCategory =
  | 'all'
  | 'burgers'
  | 'combos'
  | 'chicken'
  | 'pizza'
  | 'sides'
  | 'drinks'
  | 'desserts';

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  prepTime: string;
  tag: string;
  isSpicy: boolean;
  isAvailable: boolean;
  image: string;
  description: string;
  customizations: string[];
  sellerId?: string;
  createdAt?: string;
}

export interface CategoryDef {
  id: ProductCategory;
  label: string;
}

export type OrderStatus = 'new' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
export type OrderType = 'dine-in' | 'takeaway' | 'delivery';
export type PaymentMethod = 'cash' | 'click' | 'payme' | 'card';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  selectedOptions: string[];
}

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
  options: string[];
}

export interface Order {
  orderId: string;
  customerId: string;
  customer: string;
  type: OrderType;
  time: string;
  date: string;
  createdAt?: string; // ISO timestamp when order was created
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  packagingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  deliveryAddress?: string;
  note?: string;
  sellerId?: string;
}

export interface AppState {
  users: User[];
  products: Product[];
  orders: Order[];
  currentUser: User | null;
  favorites: Favorites; // Per-user favorites
}

export interface Favorites {
  [userId: string]: number[]; // Map of userId to array of product IDs
}

export type AppTab =
  | 'pos'
  | 'queue'
  | 'catalog'
  | 'reports'
  | 'admin'
  | 'profile'
  | 'my-orders'
  | 'favorites';
