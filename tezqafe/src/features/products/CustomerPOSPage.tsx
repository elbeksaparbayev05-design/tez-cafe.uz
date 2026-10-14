// ============================================================
// Customer POS / Ordering Page
// ============================================================

import React, { useMemo, useState } from 'react';
import { Search, ShoppingCart, Plus, Minus, Trash2, X, Flame, Truck, Store, Package, CreditCard, Banknote, Smartphone } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FOOD_CATEGORIES } from '../../data/seedData';
import { formatMoney } from '../../utils/helpers';
import type { Product, CartItem, OrderType, PaymentMethod } from '../../types';
import { Modal, EmptyState } from '../../components/ui/SharedUI';

// ---- Product Card ----
function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) {
  return (
    <div className="fastfood-card bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col justify-between">
      <div>
        <div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80'; }}
          />
          <div className="absolute top-2 left-2 flex gap-1">
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-[#FFC300] text-[#5C3A21]">
              {product.tag}
            </span>
            {product.isSpicy && (
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-[#D62828] text-white flex items-center gap-0.5">
                <Flame className="w-2.5 h-2.5" /> Achchiq
              </span>
            )}
          </div>
        </div>
        <div className="p-3.5">
          <h3 className="text-xs font-black text-[#5C3A21] dark:text-amber-100 line-clamp-1">{product.name}</h3>
          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{product.description}</p>
          <p className="text-[10px] text-gray-400 mt-1">{product.prepTime}</p>
        </div>
      </div>
      <div className="px-3.5 pb-3.5 pt-1 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 mt-auto">
        <span className="text-sm font-black text-[#D62828]">{formatMoney(product.price)}</span>
        <button
          onClick={() => onAddToCart(product)}
          className="px-3 py-1.5 rounded-xl bg-[#D62828] hover:bg-[#B81D1D] text-white text-xs font-black transition-all active:scale-95 flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Qo'shish
        </button>
      </div>
    </div>
  );
}

// ---- Cart Sidebar ----
interface CartSidebarProps {
  cart: CartItem[];
  onUpdateQty: (idx: number, delta: number) => void;
  onRemove: (idx: number) => void;
  onCheckout: (type: OrderType, payment: PaymentMethod, address: string) => void;
}

function CartSidebar({ cart, onUpdateQty, onRemove, onCheckout }: CartSidebarProps) {
  const [orderType, setOrderType] = useState<OrderType>('takeaway');
  const [payment, setPayment] = useState<PaymentMethod>('cash');
  const [address, setAddress] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  const packagingFee = orderType === 'takeaway' ? 3000 : 0;
  const grandTotal = subtotal + packagingFee;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    onCheckout(orderType, payment, address);
    setIsCheckoutOpen(false);
  };

  return (
    <aside className="w-full lg:w-[380px] bg-white dark:bg-[#1E1E1E] rounded-2xl border border-gray-100 dark:border-gray-800 p-4 flex flex-col shadow-sm lg:sticky lg:top-20 lg:max-h-[calc(100vh-100px)]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-black text-[#5C3A21] dark:text-amber-200 flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-[#D62828]" /> Sizning Savatingiz
        </h2>
        {cart.length > 0 && (
          <span className="text-xs text-gray-500">{cart.length} mahsulot</span>
        )}
      </div>

      {/* Cart items */}
      <div className="flex-1 overflow-y-auto space-y-2 my-2 min-h-0">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <ShoppingCart className="w-10 h-10 text-gray-300 dark:text-gray-700 mb-2" />
            <p className="text-xs text-gray-400 font-bold">Savat bo'sh</p>
            <p className="text-[11px] text-gray-300 dark:text-gray-600 mt-1">Menyu'dan mahsulot tanlang</p>
          </div>
        ) : (
          cart.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="p-2.5 bg-[#FFF8EC] dark:bg-[#2A2A2A] rounded-xl border border-amber-100 dark:border-gray-700 flex justify-between items-center text-xs"
            >
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#1F1F1F] dark:text-gray-200 truncate">{item.name}</p>
                <p className="text-[10px] text-[#D62828] font-black mt-0.5">{formatMoney(item.price)}</p>
                {item.selectedOptions.length > 0 && (
                  <p className="text-[10px] text-gray-400 truncate">{item.selectedOptions.join(', ')}</p>
                )}
              </div>
              <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                <button
                  onClick={() => onUpdateQty(idx, -1)}
                  className="w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center font-bold text-[#D62828] hover:bg-red-50 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-5 text-center font-black">{item.qty}</span>
                <button
                  onClick={() => onUpdateQty(idx, 1)}
                  className="w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center font-bold text-[#D62828] hover:bg-red-50 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
                <button
                  onClick={() => onRemove(idx)}
                  className="w-6 h-6 bg-red-50 dark:bg-red-950/30 rounded-lg flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-100 transition-colors ml-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Order summary */}
      {cart.length > 0 && (
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3">
          {/* Order type */}
          <div className="grid grid-cols-3 gap-1 bg-gray-50 dark:bg-[#2A2A2A] p-1 rounded-xl text-[10px] font-black">
            {([
              { val: 'dine-in', label: "Zalda", icon: <Store className="w-3 h-3" /> },
              { val: 'takeaway', label: 'Olib ketish', icon: <Package className="w-3 h-3" /> },
              { val: 'delivery', label: "Yetkazish", icon: <Truck className="w-3 h-3" /> },
            ] as { val: OrderType; label: string; icon: React.ReactNode }[]).map((opt) => (
              <button
                key={opt.val}
                onClick={() => setOrderType(opt.val)}
                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
                  orderType === opt.val
                    ? 'bg-[#D62828] text-white shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>

          {/* Delivery address if needed */}
          {orderType === 'delivery' && (
            <input
              type="text"
              placeholder="Yetkazib berish manzili..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 text-xs border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-[#2A2A2A] font-bold focus:outline-none focus:border-[#D62828]"
            />
          )}

          {/* Totals */}
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>Mahsulotlar:</span>
              <span className="font-bold">{formatMoney(subtotal)}</span>
            </div>
            {packagingFee > 0 && (
              <div className="flex justify-between text-gray-500">
                <span>Qadoqlash:</span>
                <span className="font-bold">{formatMoney(packagingFee)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black text-[#5C3A21] dark:text-amber-200 pt-1 border-t border-gray-100 dark:border-gray-800">
              <span>JAMI:</span>
              <span className="text-[#D62828]">{formatMoney(grandTotal)}</span>
            </div>
          </div>

          {/* Checkout button */}
          <button
            onClick={() => setIsCheckoutOpen(true)}
            disabled={cart.length === 0}
            className="w-full py-3 bg-[#D62828] hover:bg-[#B81D1D] disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-black text-xs rounded-xl transition-all active:scale-95 disabled:active:scale-100 disabled:cursor-not-allowed"
          >
            Buyurtma Berish →
          </button>
        </div>
      )}

      {/* Checkout confirmation modal */}
      <Modal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        title="Buyurtmani tasdiqlash"
        maxWidth="max-w-sm"
      >
        <div className="p-6 space-y-4">
          {/* Payment method */}
          <div>
            <p className="text-xs font-black text-[#5C3A21] dark:text-amber-200 mb-2">To'lov usuli</p>
            <div className="grid grid-cols-2 gap-2">
              {([
                { val: 'cash', label: 'Naqd pul', icon: <Banknote className="w-4 h-4" /> },
                { val: 'card', label: 'Karta', icon: <CreditCard className="w-4 h-4" /> },
                { val: 'click', label: 'Click', icon: <Smartphone className="w-4 h-4" /> },
                { val: 'payme', label: 'Payme', icon: <Smartphone className="w-4 h-4" /> },
              ] as { val: PaymentMethod; label: string; icon: React.ReactNode }[]).map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setPayment(opt.val)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                    payment === opt.val
                      ? 'border-[#D62828] bg-red-50 dark:bg-red-950/30 text-[#D62828]'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-gray-300'
                  }`}
                >
                  {opt.icon} {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="p-3 bg-[#FFF8EC] dark:bg-[#2A2A2A] rounded-xl text-xs space-y-1">
            <div className="flex justify-between font-bold">
              <span>Buyurtma turi:</span>
              <span>{orderType === 'dine-in' ? "Zalda o'tirish" : orderType === 'takeaway' ? 'Olib ketish' : 'Yetkazish'}</span>
            </div>
            <div className="flex justify-between font-black text-[#D62828]">
              <span>Jami to'lov:</span>
              <span>{formatMoney(grandTotal)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="flex-1 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-xs rounded-xl"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleCheckout}
              className="flex-1 py-2.5 bg-[#D62828] hover:bg-[#B81D1D] text-white font-black text-xs rounded-xl transition-all active:scale-95"
            >
              Tasdiqlash ✓
            </button>
          </div>
        </div>
      </Modal>
    </aside>
  );
}

// ---- Receipt Modal ----
interface ReceiptModalProps {
  order: { orderId: string; total: number; items: { name: string; qty: number; price: number }[] } | null;
  isOpen: boolean;
  onClose: () => void;
}

function ReceiptModal({ order, isOpen, onClose }: ReceiptModalProps) {
  if (!order || !isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        id="printable-receipt"
        className="bg-white dark:bg-[#1E1E1E] w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800"
      >
        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-950/30 mx-auto flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-[#3A7D44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-black text-[#D62828]">Buyurtma Qabul Qilindi!</h2>
          <p className="text-xs text-gray-500 mt-1">Chek raqami: <strong>{order.orderId}</strong></p>
        </div>

        <div className="space-y-1.5 mb-4 text-xs">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>{item.qty}x {item.name}</span>
              <span className="font-bold">{formatMoney(item.price * item.qty)}</span>
            </div>
          ))}
          <div className="flex justify-between font-black text-[#D62828] pt-2 border-t border-gray-100 dark:border-gray-800">
            <span>Jami:</span>
            <span>{formatMoney(order.total)}</span>
          </div>
        </div>

        <p className="text-[10px] text-center text-gray-400 mb-4">
          Buyurtmangiz tayyorlanmoqda. Taxminiy kutish vaqti: 10-15 daqiqa.
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="flex-1 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold text-xs rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Chop etish
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-[#D62828] text-white font-black text-xs rounded-xl hover:bg-[#B81D1D] transition-all active:scale-95"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Main Customer POS Page ----
export function CustomerPOSPage() {
  const { currentUser, products, cart, addToCart, updateCartQty, removeFromCart, clearCart, placeOrder, showToast } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReceipt, setActiveReceipt] = useState<ReturnType<typeof placeOrder> | null>(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // Only show available products
  const availableProducts = useMemo(() => products.filter((p) => p.isAvailable), [products]);

  const filteredProducts = useMemo(() => {
    return availableProducts.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchCat && matchSearch;
    });
  }, [availableProducts, selectedCategory, searchQuery]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleCheckout = (type: OrderType, payment: PaymentMethod, address: string) => {
    try {
      const order = placeOrder(cart, type, payment, address);
      setActiveReceipt(order);
      setIsReceiptOpen(true);
      clearCart();
    } catch (err) {
      showToast('Xatolik yuz berdi. Qayta urinib ko\'ring.');
    }
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col lg:flex-row gap-5">
      {/* Menu section */}
      <section className="flex-1 flex flex-col gap-4 min-w-0">
        {/* Hero banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#D62828] to-[#5C3A21] text-white p-5 shadow-md">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#FFC300] text-[#5C3A21] text-[11px] font-black mb-2 uppercase">
              Aksiya
            </span>
            <h1 className="text-2xl font-black font-display">
              Xush kelibsiz, {currentUser?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-xs text-amber-100 mt-1">
              Eng mazali fast-food mahsulotlarini buyurtma qiling.
            </p>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[80px] opacity-10 select-none">🍔</div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Taom qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold focus:outline-none focus:border-[#D62828] focus:ring-1 focus:ring-[#D62828] shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {FOOD_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all flex-shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#D62828] text-white shadow-md'
                  : 'bg-white dark:bg-[#1E1E1E] text-[#5C3A21] dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-[#D62828]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <EmptyState
            icon={<Search className="w-6 h-6" />}
            title="Mahsulot topilmadi"
            description={searchQuery ? `"${searchQuery}" bo'yicha natija yo'q.` : "Bu kategoriyada mahsulot mavjud emas."}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>

      {/* Cart */}
      <CartSidebar
        cart={cart}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Receipt modal */}
      <ReceiptModal
        order={activeReceipt}
        isOpen={isReceiptOpen}
        onClose={() => { setIsReceiptOpen(false); setActiveReceipt(null); }}
      />
    </main>
  );
}
