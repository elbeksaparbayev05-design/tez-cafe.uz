// ============================================================
// Favorites Page Component — TezQafe
// ============================================================

import { useApp } from '../../context/AppContext';
import { Heart, ShoppingBag } from 'lucide-react';
import { formatMoney } from '../../utils/helpers';

export function FavoritesPage() {
  const { products, favorites, toggleFavorite, isFavorite, addToCart } = useApp();

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E2D8C0] dark:border-gray-800 p-6 shadow-sm transition-colors">
        <h2 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-[#D62828]" />
          Sevimli Taomlar
        </h2>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Sevimli taomlar mavjud emas</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Mahsulotlarni sevimlilarga qo'shish uchun yurak tugmasini bosing
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#FFF8EC] dark:bg-[#2A2A2A] rounded-2xl overflow-hidden border border-[#E2D8C0] dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-[#1E1E1E] rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                    title="Sevimlilardan o'chirish"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-[#D62828] text-[#D62828]' : 'text-gray-400'}`} />
                  </button>
                  {product.tag && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#D62828] text-white text-[10px] font-black rounded-lg">
                      {product.tag}
                    </span>
                  )}
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-black text-[#5C3A21] dark:text-amber-100 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-[#D62828]">{formatMoney(product.price)}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 bg-[#D62828] text-white rounded-xl hover:bg-[#B81D1D] transition-colors"
                      title="Savatga qo'shish"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
