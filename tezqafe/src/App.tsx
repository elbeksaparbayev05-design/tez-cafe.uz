import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Toast } from './components/ui/SharedUI';
import { AuthPage } from './features/auth/AuthPage';
import { CustomerPOSPage } from './features/products/CustomerPOSPage';
import { ProfilePage } from './features/profile/ProfilePage';
import { FavoritesPage } from './features/profile/FavoritesPage';
import { formatMoney } from './utils/helpers';
import { Clock, Calendar } from 'lucide-react';

function MainAppContent() {
  const {
    currentUser,
    activeTab,
    toast,
    orders,
    updateOrderStatus,
    products,
    deleteProduct,
  } = useApp();

  // Helper function to format date from ISO string or date string
  const formatOrderDate = (date: string, createdAt?: string): string => {
    if (createdAt) {
      const dateObj = new Date(createdAt);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = dateObj.getFullYear();
      return `${day}.${month}.${year}`;
    }
    if (date) {
      // Format from existing date string (YYYY-MM-DD to DD.MM.YYYY)
      const parts = date.split('-');
      if (parts.length === 3) {
        return `${parts[2]}.${parts[1]}.${parts[0]}`;
      }
    }
    return 'Sana mavjud emas';
  };

  // Helper function to format time from ISO string or time string
  const formatOrderTime = (time: string, createdAt?: string): string => {
    if (createdAt) {
      const dateObj = new Date(createdAt);
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return time || '--:--';
  };

  if (!currentUser) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FFF8EC] dark:bg-[#121212] text-[#1F1F1F] dark:text-gray-100 transition-colors">
      <Navbar />
      <Toast message={toast} />

      {/* POS / Customer Ordering */}
      {activeTab === 'pos' && <CustomerPOSPage />}

      {/* Favorites Page */}
      {activeTab === 'favorites' && <FavoritesPage />}

      {/* Orders Queue / Oshxona Navbati */}
      {(activeTab === 'queue' || activeTab === 'my-orders') && (
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E2D8C0] dark:border-gray-800 p-6 shadow-sm transition-colors">
            <h2 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#D62828]" />
              {currentUser.role === 'customer' ? 'Mening Buyurtmalarim' : 'Oshxona Navbati'}
            </h2>

            {/* Filter orders: customers see only their own, sellers/admins see all */}
            {(() => {
              const displayOrders = currentUser.role === 'customer'
                ? orders.filter(order => order.customerId === currentUser.id)
                : orders;

              return displayOrders.length === 0 ? (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-10">
                  {currentUser.role === 'customer' ? 'Sizda hali buyurtmalar mavjud emas.' : 'Buyurtmalar mavjud emas.'}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayOrders.map((order) => (
                  <div
                    key={order.orderId}
                    className="bg-[#FFF8EC] dark:bg-[#2A2A2A] rounded-2xl p-4 border border-[#E2D8C0] dark:border-gray-700 flex flex-col justify-between shadow-sm transition-colors"
                  >
                    <div>
                      <div className="flex justify-between pb-2 border-b border-[#E2D8C0] dark:border-gray-700">
                        <span className="text-sm font-black text-[#5C3A21] dark:text-amber-100">
                          {order.orderId} ({order.customer})
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatOrderTime(order.time, order.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Buyurtma sanasi: {formatOrderDate(order.date, order.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Buyurtma vaqti: {formatOrderTime(order.time, order.createdAt)}</span>
                        </div>
                      </div>
                      <div className="my-2.5 space-y-1.5 text-xs text-[#1F1F1F] dark:text-gray-300">
                        {order.items.map((it, i) => (
                          <div key={i} className="flex justify-between">
                            <span>
                              {it.qty}x {it.name}
                            </span>
                            <span className="font-bold">{formatMoney(it.price * it.qty)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E2D8C0] dark:border-gray-700 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-black text-[#D62828]">{formatMoney(order.total)}</span>
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase ${
                            order.status === 'new'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300'
                              : order.status === 'preparing'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                              : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                          }`}
                        >
                          {order.status === 'new'
                            ? 'Yangi'
                            : order.status === 'preparing'
                            ? 'Tayyorlanmoqda'
                            : 'Tayyor'}
                        </span>
                      </div>

                      {currentUser.role !== 'customer' && order.status === 'new' && (
                        <button
                          onClick={() => updateOrderStatus(order.orderId, 'preparing')}
                          className="w-full py-2 bg-[#FFC300] hover:bg-amber-400 text-[#5C3A21] font-black text-xs rounded-xl shadow-xs transition-colors"
                        >
                          Tayyorlashga o'tish
                        </button>
                      )}
                      {currentUser.role !== 'customer' && order.status === 'preparing' && (
                        <button
                          onClick={() => updateOrderStatus(order.orderId, 'ready')}
                          className="w-full py-2 bg-[#3A7D44] hover:bg-green-700 text-white font-black text-xs rounded-xl shadow-xs transition-colors"
                        >
                          Tayyor bo'ldi ✓
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
            })()}
          </div>
        </main>
      )}

      {/* Product Management / Catalog CRUD */}
      {activeTab === 'catalog' && (
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E2D8C0] dark:border-gray-800 p-6 shadow-sm transition-colors">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-[#E2D8C0] dark:border-gray-800 gap-3">
              <div>
                <h2 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200">
                  Mahsulotlar Va Menyu
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Fast-food taomlarini qo'shish, tahrirlash va boshqarish
                </p>
              </div>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2D8C0] dark:border-gray-800 text-gray-500 dark:text-gray-400 uppercase text-[10px] font-black">
                    <th className="py-3 px-3">Rasm</th>
                    <th className="py-3 px-3">Nomi</th>
                    <th className="py-3 px-3">Kategoriya</th>
                    <th className="py-3 px-3">Narxi</th>
                    <th className="py-3 px-3 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2D8C0] dark:divide-gray-800">
                  {products.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-[#FFF8EC] dark:hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="py-3 px-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-11 h-11 rounded-xl object-cover border border-[#E2D8C0] dark:border-gray-700 shadow-2xs"
                        />
                      </td>
                      <td className="py-3 px-3 font-black text-[#5C3A21] dark:text-amber-100">
                        {p.name}
                      </td>
                      <td className="py-3 px-3 uppercase text-[10px] text-gray-500 dark:text-gray-400 font-bold">
                        {p.category}
                      </td>
                      <td className="py-3 px-3 font-black text-[#D62828]">{formatMoney(p.price)}</td>
                      <td className="py-3 px-3 text-right space-x-2">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="px-3 py-1.5 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-950/60 font-extrabold rounded-xl transition-colors"
                        >
                          O'chirish
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* Daily Reports */}
      {activeTab === 'reports' && (
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-3xl border border-[#E2D8C0] dark:border-gray-800 shadow-sm transition-colors">
            <h2 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200 mb-4">
              Kunlik Moliyaviy Hisobot
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 p-4 rounded-2xl transition-colors">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Bugungi Tushum</p>
                <p className="text-2xl font-black text-[#D62828] mt-1">5 480 000 UZS</p>
              </div>
              <div className="bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 p-4 rounded-2xl transition-colors">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Jami Buyurtmalar</p>
                <p className="text-2xl font-black text-[#5C3A21] dark:text-amber-100 mt-1">42 ta</p>
              </div>
              <div className="bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 p-4 rounded-2xl transition-colors">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">O'rtacha Chek</p>
                <p className="text-2xl font-black text-[#5C3A21] dark:text-amber-100 mt-1">130 500 UZS</p>
              </div>
              <div className="bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 p-4 rounded-2xl transition-colors">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Eng Ommabop Taom</p>
                <p className="text-base font-black text-[#3A7D44] mt-2">Double Cheese Burger</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Admin Panel */}
      {activeTab === 'admin' && (
        <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-3xl border border-[#E2D8C0] dark:border-gray-800 shadow-sm transition-colors">
            <h2 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200">
              Admin Boshqaruv Markazi
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-6">
              Barcha filiallar, mijozlar va tizim faoliyati monitoringi.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 p-4 rounded-2xl transition-colors">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Faol Filiallar</p>
                <p className="text-2xl font-black text-[#5C3A21] dark:text-amber-100 mt-1">3 ta filial</p>
                <p className="text-[10px] text-green-600 dark:text-green-400 font-bold mt-1">Barchasi ochiq</p>
              </div>
              <div className="bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 p-4 rounded-2xl transition-colors">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Foydalanuvchilar</p>
                <p className="text-2xl font-black text-[#5C3A21] dark:text-amber-100 mt-1">1 280 nafar</p>
                <p className="text-[10px] text-gray-400 mt-1">+14 yangi bugun</p>
              </div>
              <div className="bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 p-4 rounded-2xl transition-colors">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Platforma holati</p>
                <p className="text-2xl font-black text-[#3A7D44] mt-1">99.9% Barqaror</p>
                <p className="text-[10px] text-gray-400 mt-1">Server javob vaqti: 24ms</p>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* User Profile */}
      {activeTab === 'profile' && <ProfilePage />}

      {/* Footer */}
      <footer className="bg-white dark:bg-[#1E1E1E] border-t border-[#E2D8C0] dark:border-gray-800 py-4 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>&copy; 2026 <strong>TezQafe</strong> — Express Fast Food Platformasi. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
