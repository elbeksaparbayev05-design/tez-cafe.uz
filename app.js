// // const { useState, useEffect, useMemo } = React;

// // const FAST_FOOD_CATALOG = [
// //   {
// //     id: 101,
// //     name: "Double Cheese Beef Burger",
// //     category: "burgers",
// //     price: 42000,
// //     prepTime: "6-8 min",
// //     tag: "Bestseller",
// //     isSpicy: false,
// //     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
// //     description: "2x Sharbatli mol go'shti kotleti, erigan Cheddar pishlog'i va maxsus TezQafe burger sousi.",
// //     customizations: ["Pishloq (+4000)", "Jalapeno (+3000)", "Qo'shimcha Kotlet (+14000)"]
// //   },
// //   {
// //     id: 102,
// //     name: "Mega Combo Set #1",
// //     category: "combos",
// //     price: 58000,
// //     prepTime: "8-10 min",
// //     tag: "-20% Aksiya",
// //     isSpicy: true,
// //     image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=700&q=80",
// //     description: "Double Cheeseburger + Qarsillama Fri + Muzdek Coca-Cola 0.5L.",
// //     customizations: ["Kola 0.5L", "Fanta 0.5L", "Sprite 0.5L"]
// //   },
// //   {
// //     id: 103,
// //     name: "Qarsillama Tovuq Strips (6 dona)",
// //     category: "chicken",
// //     price: 36000,
// //     prepTime: "5-7 min",
// //     tag: "Tavsiya",
// //     isSpicy: true,
// //     image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80",
// //     description: "Maxsus ziravorli un bilan qovurilgan yumshoq tovuq lahm go'shti stripslari.",
// //     customizations: ["Garlic sous (+2000)", "BBQ sous (+2000)"]
// //   },
// //   {
// //     id: 104,
// //     name: "Pepperoni Special Pitsa 32sm",
// //     category: "pizza",
// //     price: 75000,
// //     prepTime: "12-15 min",
// //     tag: "Pitsa",
// //     isSpicy: false,
// //     image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80",
// //     description: "Mozzarella pishlog'i, Pepperoni kolbasalari va pomidor sousi.",
// //     customizations: ["Yupqa xamir", "Qalin xamir", "Pishloqli bortik (+12000)"]
// //   }
// // ];

// // const FAST_FOOD_CATEGORIES = [
// //   { id: "all", label: "Barchasi" },
// //   { id: "combos", label: "Kombolar & Aksiya" },
// //   { id: "burgers", label: "Burgerlar" },
// //   { id: "chicken", label: "Qovurilgan Tovuq" },
// //   { id: "pizza", label: "Pitsa va Lavash" }
// // ];

// // const INITIAL_QUEUED_ORDERS = [
// //   {
// //     orderId: "#TQ-1088",
// //     customer: "Doston M.",
// //     type: "takeaway",
// //     time: "17:10",
// //     status: "preparing",
// //     items: [
// //       { name: "Double Cheese Beef Burger", qty: 2, price: 42000, options: ["Pishloq (+4000)"] }
// //     ],
// //     total: 88000,
// //     paymentMethod: "click"
// //   }
// // ];

// // function App() {
// //   // Authentication & Current User State
// //   const [currentUser, setCurrentUser] = useState(null); // { name, role: 'customer'|'seller'|'admin', email, phone, restaurantName }
// //   const [authMode, setAuthMode] = useState("customer-login"); // 'customer-login', 'customer-register', 'seller-login', 'admin-login'
  
// //   // Auth Form Inputs
// //   const [authInputEmail, setAuthInputEmail] = useState("");
// //   const [authInputPassword, setAuthInputPassword] = useState("");
// //   const [authInputName, setAuthInputName] = useState("");
// //   const [authError, setAuthError] = useState("");

// //   // App Navigation & Data State
// //   const [activeTab, setActiveTab] = useState("pos"); // 'pos', 'queue', 'catalog', 'reports', 'admin', 'profile'
// //   const [products, setProducts] = useState(FAST_FOOD_CATALOG);
// //   const [ordersQueue, setOrdersQueue] = useState(INITIAL_QUEUED_ORDERS);
// //   const [selectedCategory, setSelectedCategory] = useState("all");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [isDarkMode, setIsDarkMode] = useState(false);

// //   // Profile Edit Local State
// //   const [profileEditName, setProfileEditName] = useState("");
// //   const [profileEditPhone, setProfileEditPhone] = useState("");
// //   const [restaurantStatus, setRestaurantStatus] = useState("open"); // 'open' | 'closed'
// //   const [profileSuccessMsg, setProfileSuccessMsg] = useState("");

// //   // Cart & POS Cashier State
// //   const [cart, setCart] = useState([
// //     { id: 101, name: "Double Cheese Beef Burger", price: 42000, qty: 1, selectedOptions: ["Pishloq (+4000)"] }
// //   ]);
// //   const [orderType, setOrderType] = useState("takeaway");
// //   const [paymentMethod, setPaymentMethod] = useState("cash");
// //   const [customerName, setCustomerName] = useState("Mijoz #104");

// //   // Modals
// //   const [customizingItem, setCustomizingItem] = useState(null);
// //   const [tempOptions, setTempOptions] = useState([]);
// //   const [isReceiptOpen, setIsReceiptOpen] = useState(false);
// //   const [activeReceipt, setActiveReceipt] = useState(null);
// //   const [isProductModalOpen, setIsProductModalOpen] = useState(false);
// //   const [editingProduct, setEditingProduct] = useState(null);

// //   useEffect(() => {
// //     if (window.lucide) {
// //       window.lucide.createIcons();
// //     }
// //   }, [currentUser, activeTab, products, cart, ordersQueue, customizingItem, isReceiptOpen, isProductModalOpen, authMode]);

// //   useEffect(() => {
// //     if (isDarkMode) {
// //       document.documentElement.classList.add('dark');
// //     } else {
// //       document.documentElement.classList.remove('dark');
// //     }
// //   }, [isDarkMode]);

// //   // Sync profile editable fields when user logs in
// //   useEffect(() => {
// //     if (currentUser) {
// //       setProfileEditName(currentUser.name || "");
// //       setProfileEditPhone(currentUser.phone || "+998 90 123 45 67");
// //     }
// //   }, [currentUser]);

// //   // Authentication Handlers
// //   const handleLoginSubmit = (e) => {
// //     e.preventDefault();
// //     setAuthError("");

// //     if (!authInputEmail || !authInputPassword) {
// //       setAuthError("Iltimos, barchamaydonlarni to'ldiring!");
// //       return;
// //     }

// //     if (authMode === "admin-login") {
// //       if (authInputEmail === "admin@tezqafe.uz" && authInputPassword === "admin123") {
// //         setCurrentUser({ 
// //           name: "Super Admin", 
// //           role: "admin", 
// //           email: authInputEmail, 
// //           phone: "+998 71 200 00 00",
// //           joinedDate: "12-Yanvar, 2025"
// //         });
// //         setActiveTab("admin");
// //       } else {
// //         setAuthError("Admin ma'lumotlari noto'g'ri!");
// //       }
// //     } else if (authMode === "seller-login") {
// //       if (authInputPassword.length < 4) {
// //         setAuthError("Parol kamida 4 ta belgidan iborat bo'lishi kerak.");
// //         return;
// //       }
// //       setCurrentUser({ 
// //         name: "Sotuvchi (Chorsu)", 
// //         role: "seller", 
// //         email: authInputEmail, 
// //         phone: "+998 93 555 44 33",
// //         restaurantName: "TezQafe Chorsu Filiali",
// //         address: "Toshkent shahri, Chorsu maydoni 12-uy",
// //         workingHours: "08:00 - 23:00"
// //       });
// //       setActiveTab("queue");
// //     } else {
// //       setCurrentUser({ 
// //         name: authInputName || authInputEmail.split('@')[0] || "Hurmatli Mijoz", 
// //         role: "customer", 
// //         email: authInputEmail,
// //         phone: "+998 99 888 77 66",
// //         savedAddress: "Toshkent sh., Yunusobod 4-mavze"
// //       });
// //       setActiveTab("pos");
// //     }
// //   };

// //   const handleLogout = () => {
// //     setCurrentUser(null);
// //     setAuthInputEmail("");
// //     setAuthInputPassword("");
// //     setAuthInputName("");
// //     setAuthError("");
// //   };

// //   const handleSaveProfile = (e) => {
// //     e.preventDefault();
// //     setCurrentUser(prev => ({
// //       ...prev,
// //       name: profileEditName,
// //       phone: profileEditPhone
// //     }));
// //     setProfileSuccessMsg("Profil ma'lumotlari muvaffaqiyatli saqlandi!");
// //     setTimeout(() => setProfileSuccessMsg(""), 3000);
// //   };

// //   const formatMoney = (amount) => {
// //     return amount.toLocaleString('uz-UZ') + ' UZS';
// //   };

// //   const subtotal = useMemo(() => {
// //     return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
// //   }, [cart]);

// //   const packagingFee = orderType === "takeaway" || orderType === "delivery" ? 3000 : 0;
// //   const grandTotal = subtotal + packagingFee;

// //   const openCustomizer = (product) => {
// //     setCustomizingItem(product);
// //     setTempOptions([]);
// //   };

// //   const toggleTempOption = (opt) => {
// //     setTempOptions(prev => 
// //       prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
// //     );
// //   };

// //   const addCustomizedItemToCart = () => {
// //     if (!customizingItem) return;
// //     setCart(prev => [
// //       ...prev,
// //       {
// //         id: customizingItem.id,
// //         name: customizingItem.name,
// //         price: customizingItem.price,
// //         qty: 1,
// //         selectedOptions: [...tempOptions]
// //       }
// //     ]);
// //     setCustomizingItem(null);
// //     setTempOptions([]);
// //   };

// //   const updateCartQty = (idx, delta) => {
// //     setCart(prev => {
// //       return prev.map((item, i) => {
// //         if (i === idx) {
// //           const newQty = item.qty + delta;
// //           return newQty > 0 ? { ...item, qty: newQty } : null;
// //         }
// //         return item;
// //       }).filter(Boolean);
// //     });
// //   };

// //   const handleCompleteOrder = () => {
// //     if (cart.length === 0) return;
// //     const newOrderObj = {
// //       orderId: `#TQ-${Math.floor(1000 + Math.random() * 9000)}`,
// //       customer: customerName || currentUser?.name || "Mijoz",
// //       type: orderType,
// //       time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
// //       status: "new",
// //       items: [...cart],
// //       subtotal,
// //       packagingFee,
// //       total: grandTotal,
// //       paymentMethod
// //     };
// //     setOrdersQueue(prev => [newOrderObj, ...prev]);
// //     setActiveReceipt(newOrderObj);
// //     setIsReceiptOpen(true);
// //   };

// //   const closeReceiptAndResetCart = () => {
// //     setIsReceiptOpen(false);
// //     setCart([]);
// //   };

// //   const updateOrderStatus = (orderId, nextStatus) => {
// //     setOrdersQueue(prev => prev.map(o => o.orderId === orderId ? { ...o, status: nextStatus } : o));
// //   };

// //   const handleSaveProduct = (e) => {
// //     e.preventDefault();
// //     const formData = new FormData(e.target);
// //     const newProduct = {
// //       id: editingProduct ? editingProduct.id : Date.now(),
// //       name: formData.get("name"),
// //       category: formData.get("category"),
// //       price: Number(formData.get("price")),
// //       prepTime: "5-7 min",
// //       tag: "Yangi",
// //       image: formData.get("image") || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
// //       description: formData.get("description"),
// //       customizations: ["Pishloq qo'shish"]
// //     };

// //     if (editingProduct) {
// //       setProducts(prev => prev.map(p => p.id === editingProduct.id ? newProduct : p));
// //     } else {
// //       setProducts(prev => [newProduct, ...prev]);
// //     }
// //     setIsProductModalOpen(false);
// //     setEditingProduct(null);
// //   };

// //   const filteredProducts = useMemo(() => {
// //     return products.filter(p => {
// //       const matchCat = selectedCategory === "all" || p.category === selectedCategory;
// //       const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
// //       return matchCat && matchSearch;
// //     });
// //   }, [products, selectedCategory, searchQuery]);

// //   // ==========================================
// //   // RENDER: LOGIN / AUTHENTICATION SCREEN
// //   // ==========================================
// //   if (!currentUser) {
// //     return (
// //       <div className="min-h-full flex items-center justify-center p-4 bg-[#FFF8EC] dark:bg-[#121212]">
// //         <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl border border-[#E2D8C0] dark:border-gray-800 p-8 shadow-xl">
          
// //           <div className="text-center mb-6">
// //             <div className="w-12 h-12 rounded-2xl bg-[#D62828] mx-auto flex items-center justify-center text-[#FFC300] font-black text-2xl shadow-md mb-2">
// //               <i data-lucide="flame" className="w-7 h-7 fill-[#FFC300]"></i>
// //             </div>
// //             <h1 className="text-2xl font-black font-display text-[#5C3A21] dark:text-amber-200">tez<span className="text-[#D62828]">qafe</span>ga xush kelibsiz</h1>
// //             <p className="text-xs text-gray-500 mt-1">Express Fast Food Tizimiga kirish</p>
// //           </div>

// //           <div className="grid grid-cols-3 gap-1 bg-[#FFF8EC] dark:bg-[#2A2A2A] p-1.5 rounded-2xl mb-6 border border-[#E2D8C0] dark:border-gray-700 text-xs font-black">
// //             <button 
// //               onClick={() => { setAuthMode("customer-login"); setAuthError(""); }}
// //               className={`py-2 rounded-xl transition-all ${authMode.startsWith('customer') ? 'bg-[#D62828] text-white shadow' : 'text-[#5C3A21] dark:text-gray-300'}`}>
// //               Mijoz
// //             </button>
// //             <button 
// //               onClick={() => { setAuthMode("seller-login"); setAuthError(""); }}
// //               className={`py-2 rounded-xl transition-all ${authMode === 'seller-login' ? 'bg-[#D62828] text-white shadow' : 'text-[#5C3A21] dark:text-gray-300'}`}>
// //               Sotuvchi
// //             </button>
// //             <button 
// //               onClick={() => { setAuthMode("admin-login"); setAuthError(""); }}
// //               className={`py-2 rounded-xl transition-all ${authMode === 'admin-login' ? 'bg-[#5C3A21] text-amber-200 shadow' : 'text-gray-500 dark:text-gray-400'}`}>
// //               Admin
// //             </button>
// //           </div>

// //           {authError && (
// //             <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl text-center">
// //               {authError}
// //             </div>
// //           )}

// //           <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
// //             {authMode === "customer-register" && (
// //               <div>
// //                 <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Ismingiz</label>
// //                 <input 
// //                   type="text" 
// //                   value={authInputName}
// //                   onChange={(e) => setAuthInputName(e.target.value)}
// //                   placeholder="Ism va Familiya" 
// //                   required 
// //                   className="w-full p-3 bg-gray-50 dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 rounded-xl font-bold focus:outline-none focus:border-[#D62828]" 
// //                 />
// //               </div>
// //             )}

// //             <div>
// //               <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
// //                 {authMode === "admin-login" ? "Admin Email" : "Email yoki Telefon raqam"}
// //               </label>
// //               <input 
// //                 type="text" 
// //                 value={authInputEmail}
// //                 onChange={(e) => setAuthInputEmail(e.target.value)}
// //                 placeholder={authMode === "admin-login" ? "admin@tezqafe.uz" : "+998 90 123 45 67"} 
// //                 required 
// //                 className="w-full p-3 bg-gray-50 dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 rounded-xl font-bold focus:outline-none focus:border-[#D62828]" 
// //               />
// //             </div>

// //             <div>
// //               <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Parol</label>
// //               <input 
// //                 type="password" 
// //                 value={authInputPassword}
// //                 onChange={(e) => setAuthInputPassword(e.target.value)}
// //                 placeholder="••••••••" 
// //                 required 
// //                 className="w-full p-3 bg-gray-50 dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 rounded-xl font-bold focus:outline-none focus:border-[#D62828]" 
// //               />
// //             </div>

// //             <button 
// //               type="submit" 
// //               className="w-full py-3.5 bg-[#D62828] hover:bg-[#B81D1D] text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-95">
// //               {authMode === "customer-register" ? "Ro'yxatdan O'tish" : "Tizimga Kirish"}
// //             </button>
// //           </form>

// //           {authMode.startsWith("customer") && (
// //             <div className="mt-4 text-center">
// //               {authMode === "customer-login" ? (
// //                 <button 
// //                   onClick={() => setAuthMode("customer-register")}
// //                   className="text-xs font-bold text-[#5C3A21] dark:text-amber-200 hover:underline">
// //                   Hisobingiz yo'qmi? Ro'yxatdan o'tish
// //                 </button>
// //               ) : (
// //                 <button 
// //                   onClick={() => setAuthMode("customer-login")}
// //                   className="text-xs font-bold text-[#5C3A21] dark:text-amber-200 hover:underline">
// //                   Akkauntingiz bormi? Kirish
// //                 </button>
// //               )}
// //             </div>
// //           )}

// //           {authMode === "admin-login" && (
// //             <p className="mt-4 text-[10px] text-center text-gray-400">
// //               Demo Admin uchun: <strong>admin@tezqafe.uz</strong> / <strong>admin123</strong>
// //             </p>
// //           )}

// //         </div>
// //       </div>
// //     );
// //   }

// //   // ==========================================
// //   // RENDER: MAIN APPLICATION (ROLES & PROFILES)
// //   // ==========================================
// //   return (
// //     <div className="min-h-full flex flex-col">
      
// //       {/* Top Header Navbar */}
// //       <header className="bg-white dark:bg-[#1E1E1E] border-b border-[#E2D8C0] dark:border-gray-800 sticky top-0 z-30 shadow-sm transition-colors">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex items-center justify-between h-16 gap-3">
            
// //             <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab(currentUser.role === 'customer' ? 'pos' : currentUser.role === 'seller' ? 'queue' : 'admin')}>
// //               <div className="w-10 h-10 rounded-xl bg-[#D62828] flex items-center justify-center text-[#FFC300] font-black text-xl shadow-md">
// //                 <i data-lucide="flame" className="w-6 h-6 fill-[#FFC300]"></i>
// //               </div>
// //               <div>
// //                 <span className="text-2xl font-black font-display tracking-tight text-[#5C3A21] dark:text-amber-200">tez<span className="text-[#D62828]">qafe</span></span>
// //                 <span className="block text-[10px] font-extrabold tracking-widest text-[#D62828] uppercase -mt-1">Express Fast Food</span>
// //               </div>
// //             </div>

// //             {/* Role-based Navigation Tabs */}
// //             <nav className="hidden md:flex items-center gap-1 bg-[#FFF8EC] dark:bg-[#2A2A2A] p-1 rounded-xl border border-[#E2D8C0] dark:border-gray-700">
              
// //               {currentUser.role === "customer" && (
// //                 <>
// //                   <button onClick={() => setActiveTab("pos")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "pos" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
// //                     <i data-lucide="shopping-bag" className="w-4 h-4"></i> Menyudan Tanlash
// //                   </button>
// //                   <button onClick={() => setActiveTab("queue")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "queue" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
// //                     <i data-lucide="clock" className="w-4 h-4"></i> Buyurtmalar Holati
// //                   </button>
// //                 </>
// //               )}

// //               {currentUser.role === "seller" && (
// //                 <>
// //                   <button onClick={() => setActiveTab("queue")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "queue" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
// //                     <i data-lucide="clock" className="w-4 h-4"></i> Oshxona Navbati
// //                   </button>
// //                   <button onClick={() => setActiveTab("catalog")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "catalog" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
// //                     <i data-lucide="utensils-crossed" className="w-4 h-4"></i> Mahsulotlarni Boshqarish
// //                   </button>
// //                   <button onClick={() => setActiveTab("reports")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "reports" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
// //                     <i data-lucide="bar-chart-2" className="w-4 h-4"></i> Kunlik Hisobot
// //                   </button>
// //                 </>
// //               )}

// //               {currentUser.role === "admin" && (
// //                 <>
// //                   <button onClick={() => setActiveTab("admin")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "admin" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
// //                     <i data-lucide="shield-check" className="w-4 h-4"></i> Admin Markazi
// //                   </button>
// //                   <button onClick={() => setActiveTab("catalog")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "catalog" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
// //                     <i data-lucide="utensils-crossed" className="w-4 h-4"></i> Barcha Menyular
// //                   </button>
// //                   <button onClick={() => setActiveTab("reports")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "reports" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
// //                     <i data-lucide="bar-chart-2" className="w-4 h-4"></i> Moliya
// //                   </button>
// //                 </>
// //               )}

// //               {/* Profile Tab Link */}
// //               <button onClick={() => setActiveTab("profile")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "profile" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
// //                 <i data-lucide="user" className="w-4 h-4"></i> Profil & Sozlamalar
// //               </button>

// //             </nav>

// //             <div className="flex items-center gap-2">
// //               <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 rounded-xl text-[#5C3A21] dark:text-amber-200">
// //                 <i data-lucide={isDarkMode ? "sun" : "moon"} className="w-4 h-4"></i>
// //               </button>
              
// //               <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
// //                 <div 
// //                   onClick={() => setActiveTab("profile")}
// //                   className="w-8 h-8 rounded-full bg-[#FFC300] text-[#5C3A21] font-black flex items-center justify-center text-xs cursor-pointer hover:scale-105 transition-transform"
// //                   title="Profilni ochish">
// //                   {currentUser.name.charAt(0)}
// //                 </div>
// //                 <div className="hidden xl:block text-left cursor-pointer" onClick={() => setActiveTab("profile")}>
// //                   <p className="text-xs font-black text-[#1F1F1F] dark:text-gray-200 leading-tight">{currentUser.name}</p>
// //                   <p className="text-[10px] text-[#D62828] font-bold uppercase">{currentUser.role}</p>
// //                 </div>
// //                 <button 
// //                   onClick={handleLogout}
// //                   title="Tizimdan chiqish"
// //                   className="p-1.5 bg-red-50 hover:bg-red-100 text-[#D62828] rounded-xl ml-1 transition-all">
// //                   <i data-lucide="log-out" className="w-4 h-4"></i>
// //                 </button>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </header>

// //       {/* ========================================== */}
// //       {/* 1. CUSTOMER POS & ORDERING VIEW */}
// //       {/* ========================================== */}
// //       {activeTab === "pos" && currentUser.role === "customer" && (
// //         <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row gap-5">
// //           <section className="flex-1 flex flex-col gap-4 min-w-0">
// //             <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#D62828] to-[#5C3A21] text-white p-5 shadow-md">
// //               <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#FFC300] text-[#5C3A21] text-[11px] font-black mb-2 uppercase">
// //                 Aksiya
// //               </span>
// //               <h1 className="text-2xl font-black font-display text-white">Xush kelibsiz, {currentUser.name}!</h1>
// //               <p className="text-xs text-amber-100 mt-1">Eng mazali fast-food mahsulotlarini buyurtma qiling.</p>
// //             </div>

// //             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
// //               {FAST_FOOD_CATEGORIES.map(cat => (
// //                 <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'bg-[#D62828] text-white shadow-md' : 'bg-white dark:bg-[#1E1E1E] text-[#5C3A21] dark:text-gray-200 border'}`}>
// //                   {cat.label}
// //                 </button>
// //               ))}
// //             </div>

// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //               {filteredProducts.map(food => (
// //                 <div key={food.id} className="bg-white dark:bg-[#1E1E1E] rounded-2xl border overflow-hidden flex flex-col justify-between">
// //                   <div>
// //                     <div className="relative h-36 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
// //                       <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
// //                       <div className="absolute top-2 left-2">
// //                         <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-[#FFC300] text-[#5C3A21]">{food.tag}</span>
// //                       </div>
// //                     </div>
// //                     <div className="p-3.5">
// //                       <h3 className="text-xs font-black text-[#5C3A21] dark:text-amber-100 line-clamp-1">{food.name}</h3>
// //                       <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{food.description}</p>
// //                     </div>
// //                   </div>
// //                   <div className="px-3.5 pb-3.5 pt-1 flex items-center justify-between border-t mt-auto">
// //                     <span className="text-xs font-black text-[#D62828]">{formatMoney(food.price)}</span>
// //                     <button onClick={() => openCustomizer(food)} className="px-3 py-1.5 rounded-xl bg-[#D62828] text-white text-xs font-black">Qo'shish</button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </section>

// //           {/* Cart sidebar */}
// //           <aside className="w-full lg:w-[380px] bg-white dark:bg-[#1E1E1E] rounded-2xl border p-4 flex flex-col shadow-sm h-fit sticky top-20">
// //             <h2 className="text-sm font-black text-[#5C3A21] dark:text-amber-200 mb-3">Sizning Savatingiz</h2>
// //             <div className="max-h-[260px] overflow-y-auto space-y-2 my-2">
// //               {cart.length === 0 ? (
// //                 <p className="text-xs text-center text-gray-400 py-6">Savat bo'sh</p>
// //               ) : (
// //                 cart.map((item, idx) => (
// //                   <div key={idx} className="p-2 bg-[#FFF8EC] dark:bg-[#2A2A2A] rounded-xl border flex justify-between items-center text-xs">
// //                     <div>
// //                       <p className="font-bold">{item.name}</p>
// //                       <p className="text-[10px] text-[#D62828]">{formatMoney(item.price)}</p>
// //                     </div>
// //                     <div className="flex items-center gap-1.5">
// //                       <button onClick={() => updateCartQty(idx, -1)} className="px-2 bg-white dark:bg-gray-800 rounded font-bold">-</button>
// //                       <span>{item.qty}</span>
// //                       <button onClick={() => updateCartQty(idx, 1)} className="px-2 bg-white dark:bg-gray-800 rounded font-bold">+</button>
// //                     </div>
// //                   </div>
// //                 ))
// //               )}
// //             </div>
// //             <div className="pt-3 border-t space-y-3">
// //               <div className="flex justify-between text-sm font-black text-[#5C3A21] dark:text-amber-200">
// //                 <span>JAMI:</span>
// //                 <span className="text-[#D62828]">{formatMoney(grandTotal)}</span>
// //               </div>
// //               <button onClick={handleCompleteOrder} disabled={cart.length === 0} className="w-full py-3 bg-[#D62828] disabled:bg-gray-300 text-white font-black text-xs rounded-xl">
// //                 Buyurtma Berish
// //               </button>
// //             </div>
// //           </aside>
// //         </main>
// //       )}

// //       {/* ========================================== */}
// //       {/* 2. QUEUE & ORDERS TAB */}
// //       {/* ========================================== */}
// //       {activeTab === "queue" && (
// //         <main className="max-w-7xl w-full mx-auto px-4 py-6">
// //           <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border p-6 shadow-sm">
// //             <h2 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200 mb-4">Buyurtmalar Navbati</h2>
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //               {ordersQueue.map(order => (
// //                 <div key={order.orderId} className="bg-[#FFF8EC] dark:bg-[#2A2A2A] rounded-2xl p-4 border flex flex-col justify-between">
// //                   <div>
// //                     <div className="flex justify-between pb-2 border-b">
// //                       <span className="text-sm font-black text-[#5C3A21] dark:text-amber-100">{order.orderId} ({order.customer})</span>
// //                       <span className="text-xs">{order.time}</span>
// //                     </div>
// //                     <div className="my-2 space-y-1 text-xs">
// //                       {order.items.map((it, i) => (
// //                         <div key={i} className="flex justify-between">
// //                           <span>{it.qty}x {it.name}</span>
// //                           <span className="font-bold">{formatMoney(it.price * it.qty)}</span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                   <div className="pt-3 border-t space-y-2">
// //                     <div className="flex justify-between items-center text-xs">
// //                       <span className="font-black text-[#D62828]">{formatMoney(order.total)}</span>
// //                       <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-white">{order.status}</span>
// //                     </div>
// //                     {currentUser.role !== "customer" && order.status === "new" && (
// //                       <button onClick={() => updateOrderStatus(order.orderId, "preparing")} className="w-full py-1.5 bg-[#FFC300] text-[#5C3A21] font-black text-xs rounded-xl">Tayyorlashga o'tish</button>
// //                     )}
// //                     {currentUser.role !== "customer" && order.status === "preparing" && (
// //                       <button onClick={() => updateOrderStatus(order.orderId, "ready")} className="w-full py-1.5 bg-[#3A7D44] text-white font-black text-xs rounded-xl">Tayyor</button>
// //                     )}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </main>
// //       )}

// //       {/* ========================================== */}
// //       {/* 3. CATALOG & MENU MANAGEMENT */}
// //       {/* ========================================== */}
// //       {activeTab === "catalog" && currentUser.role !== "customer" && (
// //         <main className="max-w-7xl w-full mx-auto px-4 py-6">
// //           <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border p-6 shadow-sm">
// //             <div className="flex justify-between items-center pb-4 border-b">
// //               <h2 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200">Mahsulotlar Va Menyu</h2>
// //               <button onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }} className="px-4 py-2 bg-[#D62828] text-white font-black text-xs rounded-xl">Yangi Taom Qo'shish</button>
// //             </div>
// //             <table className="w-full text-left text-xs mt-4">
// //               <thead>
// //                 <tr className="border-b text-gray-400 uppercase text-[10px]">
// //                   <th className="py-2">Rasm</th><th className="py-2">Nomi</th><th className="py-2">Kategoriya</th><th className="py-2">Narxi</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y">
// //                 {products.map(p => (
// //                   <tr key={p.id}>
// //                     <td className="py-2"><img src={p.image} className="w-10 h-10 rounded-lg object-cover" /></td>
// //                     <td className="py-2 font-black">{p.name}</td>
// //                     <td className="py-2 uppercase text-[10px] text-gray-500">{p.category}</td>
// //                     <td className="py-2 font-black text-[#D62828]">{formatMoney(p.price)}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </main>
// //       )}

// //       {/* ========================================== */}
// //       {/* 4. REPORTS */}
// //       {/* ========================================== */}
// //       {activeTab === "reports" && currentUser.role !== "customer" && (
// //         <main className="max-w-7xl w-full mx-auto px-4 py-6 space-y-5">
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //             <div className="bg-white dark:bg-[#1E1E1E] p-5 rounded-2xl border">
// //               <p className="text-xs text-gray-400 font-bold uppercase">Bugungi Tushum</p>
// //               <p className="text-2xl font-black text-[#D62828] mt-1">5 480 000 UZS</p>
// //             </div>
// //           </div>
// //         </main>
// //       )}

// //       {/* ========================================== */}
// //       {/* 5. ADMIN PANEL */}
// //       {/* ========================================== */}
// //       {activeTab === "admin" && currentUser.role === "admin" && (
// //         <main className="max-w-7xl w-full mx-auto px-4 py-6 space-y-5">
// //           <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border p-6 shadow-sm">
// //             <h2 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200 mb-2">TezQafe Universal Admin Boshqaruv Markazi</h2>
// //             <p className="text-xs text-gray-500 mb-6">Faqat super adminlar uchun himoyalangan zona.</p>
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //               <div className="p-4 bg-[#FFF8EC] dark:bg-[#2A2A2A] rounded-xl border">
// //                 <h3 className="font-black text-sm text-[#D62828] mb-1">Sotuvchilar Nazorati</h3>
// //                 <p className="text-xs text-gray-600 dark:text-gray-300">Barcha restoran va kafelar ro'yxati.</p>
// //               </div>
// //             </div>
// //           </div>
// //         </main>
// //       )}

// //       {/* ========================================== */}
// //       {/* 6. ROLE-BASED PROFILE & SETTINGS TAB       */}
// //       {/* ========================================== */}
// //       {activeTab === "profile" && (
// //         <main className="max-w-4xl w-full mx-auto px-4 py-6 space-y-6">
          
// //           <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E2D8C0] dark:border-gray-800 p-6 sm:p-8 shadow-sm">
            
// //             {/* Header info */}
// //             <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
// //               <div className="w-20 h-20 rounded-2xl bg-[#FFC300] text-[#5C3A21] font-black text-3xl flex items-center justify-center shadow-md">
// //                 {currentUser.name.charAt(0)}
// //               </div>
// //               <div className="text-center sm:text-left flex-1">
// //                 <h1 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200">{currentUser.name}</h1>
// //                 <p className="text-xs text-gray-500 mt-0.5">{currentUser.email}</p>
// //                 <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 dark:bg-red-950 text-[#D62828] text-xs font-black rounded-xl uppercase">
// //                   <i data-lucide="shield" className="w-3.5 h-3.5"></i> Rol: {currentUser.role}
// //                 </div>
// //               </div>
// //               <button 
// //                 onClick={handleLogout}
// //                 className="px-4 py-2 bg-red-50 hover:bg-red-100 text-[#D62828] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all">
// //                 <i data-lucide="log-out" className="w-4 h-4"></i> Chiqish
// //               </button>
// //             </div>

// //             {profileSuccessMsg && (
// //               <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-xl text-center">
// //                 {profileSuccessMsg}
// //               </div>
// //             )}

// //             {/* Role-Specific Profile Content */}
// //             <div className="mt-6 space-y-6">
              
// //               {/* CUSTOMER PROFILE */}
// //               {currentUser.role === "customer" && (
// //                 <>
// //                   <div>
// //                     <h3 className="text-sm font-black text-[#5C3A21] dark:text-amber-200 mb-3 flex items-center gap-2">
// //                       <i data-lucide="user-pen" className="w-4 h-4 text-[#D62828]"></i> Shaxsiy Ma'lumotlarni Tahrirlash
// //                     </h3>
// //                     <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
// //                       <div>
// //                         <label className="block font-bold mb-1">F.I.Sh</label>
// //                         <input type="text" value={profileEditName} onChange={e => setProfileEditName(e.target.value)} required className="w-full p-2.5 bg-gray-50 dark:bg-[#2A2A2A] border rounded-xl font-bold" />
// //                       </div>
// //                       <div>
// //                         <label className="block font-bold mb-1">Telefon Raqam</label>
// //                         <input type="text" value={profileEditPhone} onChange={e => setProfileEditPhone(e.target.value)} required className="w-full p-2.5 bg-gray-50 dark:bg-[#2A2A2A] border rounded-xl font-bold" />
// //                       </div>
// //                       <div className="sm:col-span-2 flex justify-end">
// //                         <button type="submit" className="px-5 py-2.5 bg-[#D62828] text-white font-black rounded-xl shadow">O'zgarishlarni Saqlash</button>
// //                       </div>
// //                     </form>
// //                   </div>

// //                   <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
// //                     <h3 className="text-sm font-black text-[#5C3A21] dark:text-amber-200 mb-3">Saqlangan Yetkazib Berish Manzili</h3>
// //                     <div className="p-3 bg-[#FFF8EC] dark:bg-[#2A2A2A] rounded-xl border text-xs flex justify-between items-center">
// //                       <span className="font-bold">{currentUser.savedAddress || "Manzil belgilanmagan"}</span>
// //                       <span className="text-[#3A7D44] font-bold text-[10px]">Asosiy</span>
// //                     </div>
// //                   </div>
// //                 </>
// //               )}

// //               {/* SELLER PROFILE */}
// //               {currentUser.role === "seller" && (
// //                 <>
// //                   <div>
// //                     <h3 className="text-sm font-black text-[#5C3A21] dark:text-amber-200 mb-3 flex items-center gap-2">
// //                       <i data-lucide="store" className="w-4 h-4 text-[#D62828]"></i> Restoran & Kafe Ma'lumotlari
// //                     </h3>
// //                     <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
// //                       <div>
// //                         <label className="block font-bold mb-1">Restoran Nomi</label>
// //                         <input type="text" defaultValue={currentUser.restaurantName} className="w-full p-2.5 bg-gray-50 dark:bg-[#2A2A2A] border rounded-xl font-bold" />
// //                       </div>
// //                       <div>
// //                         <label className="block font-bold mb-1">Ish Vaqti</label>
// //                         <input type="text" defaultValue={currentUser.workingHours} className="w-full p-2.5 bg-gray-50 dark:bg-[#2A2A2A] border rounded-xl font-bold" />
// //                       </div>
// //                       <div className="sm:col-span-2">
// //                         <label className="block font-bold mb-1">Manzil</label>
// //                         <input type="text" defaultValue={currentUser.address} className="w-full p-2.5 bg-gray-50 dark:bg-[#2A2A2A] border rounded-xl font-bold" />
// //                       </div>
// //                       <div className="sm:col-span-2 flex items-center justify-between pt-2">
// //                         <div>
// //                           <p className="font-bold">Restoran Holati:</p>
// //                           <p className="text-[10px] text-gray-500">Mijozlarga ochiq yoki vaqtincha yopiq</p>
// //                         </div>
// //                         <select value={restaurantStatus} onChange={e => setRestaurantStatus(e.target.value)} className="p-2 border rounded-xl font-bold bg-white dark:bg-[#2A2A2A]">
// //                           <option value="open">Ochiq (Ishlamoqda)</option>
// //                           <option value="closed">Yopiq (Tanaffus)</option>
// //                         </select>
// //                       </div>
// //                       <div className="sm:col-span-2 flex justify-end mt-2">
// //                         <button type="submit" className="px-5 py-2.5 bg-[#D62828] text-white font-black rounded-xl shadow">Restoran Ma'lumotlarini Saqlash</button>
// //                       </div>
// //                     </form>
// //                   </div>
// //                 </>
// //               )}

// //               {/* ADMIN PROFILE */}
// //               {currentUser.role === "admin" && (
// //                 <>
// //                   <div>
// //                     <h3 className="text-sm font-black text-[#5C3A21] dark:text-amber-200 mb-3 flex items-center gap-2">
// //                       <i data-lucide="shield-alert" className="w-4 h-4 text-[#D62828]"></i> Super Admin Xavfsizlik Sozlamalari
// //                     </h3>
// //                     <div className="space-y-3 text-xs">
// //                       <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 flex justify-between items-center">
// //                         <div>
// //                           <p className="font-black text-red-800 dark:text-red-300">Tizim Darajasidagi Huquqlar</p>
// //                           <p className="text-[10px] text-gray-600 dark:text-gray-400">Sizda barcha restoranlar va moliyaviy oqimlarni boshqarish huquqi bor.</p>
// //                         </div>
// //                         <span className="px-2.5 py-1 bg-[#D62828] text-white font-bold rounded-lg text-[10px]">Faol</span>
// //                       </div>
// //                       <div>
// //                         <label className="block font-bold mb-1">Yangi Parol O'rnatish</label>
// //                         <input type="password" placeholder="Yangi maxfiy parol" className="w-full p-2.5 bg-gray-50 dark:bg-[#2A2A2A] border rounded-xl" />
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </>
// //               )}

// //             </div>

// //           </div>

// //         </main>
// //       )}

// //       {/* Modals */}
// //       {customizingItem && (
// //         <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
// //           <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-2xl p-6 shadow-2xl">
// //             <h3 className="text-base font-black text-[#5C3A21] dark:text-amber-200 mb-2">{customizingItem.name}</h3>
// //             <div className="space-y-2 my-4">
// //               {customizingItem.customizations?.map((opt, i) => (
// //                 <label key={i} onClick={() => toggleTempOption(opt)} className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold cursor-pointer ${tempOptions.includes(opt) ? 'bg-red-50 border-[#D62828] text-[#D62828]' : 'bg-gray-50 dark:bg-gray-800'}`}>
// //                   <span>{opt}</span>
// //                   <input type="checkbox" checked={tempOptions.includes(opt)} readOnly className="accent-[#D62828]" />
// //                 </label>
// //               ))}
// //             </div>
// //             <div className="flex justify-end gap-2">
// //               <button onClick={() => setCustomizingItem(null)} className="px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold rounded-xl">Bekor qilish</button>
// //               <button onClick={addCustomizedItemToCart} className="px-4 py-2 bg-[#D62828] text-white text-xs font-black rounded-xl">Qo'shish</button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {isReceiptOpen && activeReceipt && (
// //         <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
// //           <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-sm rounded-2xl p-6 shadow-2xl text-center">
// //             <h2 className="text-lg font-black text-[#D62828]">Buyurtma Qabul Qilindi!</h2>
// //             <p className="text-xs text-gray-500 mb-4">Chek raqami: {activeReceipt.orderId}</p>
// //             <button onClick={closeReceiptAndResetCart} className="w-full py-2 bg-[#D62828] text-white font-bold text-xs rounded-xl">Yopish</button>
// //           </div>
// //         </div>
// //       )}

// //       {isProductModalOpen && (
// //         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
// //           <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-2xl p-6 shadow-2xl">
// //             <h3 className="text-lg font-black text-[#5C3A21] dark:text-amber-200 mb-4">Yangi Taom Qo'shish</h3>
// //             <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
// //               <input name="name" placeholder="Taom nomi" required className="w-full p-2 border rounded-xl dark:bg-[#2A2A2A]" />
// //               <select name="category" className="w-full p-2 border rounded-xl dark:bg-[#2A2A2A]">
// //                 <option value="burgers">Burgerlar</option>
// //                 <option value="combos">Kombolar</option>
// //               </select>
// //               <input name="price" type="number" placeholder="Narxi (UZS)" required className="w-full p-2 border rounded-xl dark:bg-[#2A2A2A]" />
// //               <input name="image" placeholder="Rasm URL" className="w-full p-2 border rounded-xl dark:bg-[#2A2A2A]" />
// //               <textarea name="description" placeholder="Tavsif" className="w-full p-2 border rounded-xl dark:bg-[#2A2A2A]"></textarea>
// //               <div className="flex justify-end gap-2 pt-2">
// //                 <button type="button" onClick={() => setIsProductModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-xl">Bekor qilish</button>
// //                 <button type="submit" className="px-4 py-2 bg-[#D62828] text-white font-bold rounded-xl">Saqlash</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       <footer className="bg-white dark:bg-[#1E1E1E] border-t py-3 mt-auto">
// //         <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
// //           <p>&copy; 2026 <strong>tezqafe.demo</strong> - Professional Profil va Hisob Sozlamalari Tizimi.</p>
// //         </div>
// //       </footer>

// //     </div>
// //   );
// // }

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(<App />);



// const { useState, useEffect, useMemo } = React;

// const DEFAULT_FAST_FOOD_CATALOG = [
//   {
//     id: 101,
//     name: "Double Cheese Beef Burger",
//     category: "burgers",
//     price: 42000,
//     prepTime: "6-8 min",
//     tag: "Bestseller",
//     isSpicy: false,
//     image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
//     description: "2x Sharbatli mol go'shti kotleti, erigan Cheddar pishlog'i va maxsus TezQafe burger sousi.",
//     customizations: ["Pishloq (+4000)", "Jalapeno (+3000)", "Qo'shimcha Kotlet (+14000)"]
//   },
//   {
//     id: 102,
//     name: "Mega Combo Set #1",
//     category: "combos",
//     price: 58000,
//     prepTime: "8-10 min",
//     tag: "-20% Aksiya",
//     isSpicy: true,
//     image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=700&q=80",
//     description: "Double Cheeseburger + Qarsillama Fri + Muzdek Coca-Cola 0.5L.",
//     customizations: ["Kola 0.5L", "Fanta 0.5L", "Sprite 0.5L"]
//   },
//   {
//     id: 103,
//     name: "Qarsillama Tovuq Strips (6 dona)",
//     category: "chicken",
//     price: 36000,
//     prepTime: "5-7 min",
//     tag: "Tavsiya",
//     isSpicy: true,
//     image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80",
//     description: "Maxsus ziravorli un bilan qovurilgan yumshoq tovuq lahm go'shti stripslari.",
//     customizations: ["Garlic sous (+2000)", "BBQ sous (+2000)"]
//   },
//   {
//     id: 104,
//     name: "Pepperoni Special Pitsa 32sm",
//     category: "pizza",
//     price: 75000,
//     prepTime: "12-15 min",
//     tag: "Pitsa",
//     isSpicy: false,
//     image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80",
//     description: "Mozzarella pishlog'i, Pepperoni kolbasalari va pomidor sousi.",
//     customizations: ["Yupqa xamir", "Qalin xamir", "Pishloqli bortik (+12000)"]
//   }
// ];

// const FAST_FOOD_CATEGORIES = [
//   { id: "all", label: "Barchasi" },
//   { id: "combos", label: "Kombolar & Aksiya" },
//   { id: "burgers", label: "Burgerlar" },
//   { id: "chicken", label: "Qovurilgan Tovuq" },
//   { id: "pizza", label: "Pitsa va Lavash" }
// ];

// const INITIAL_QUEUED_ORDERS = [
//   {
//     orderId: "#TQ-1088",
//     customer: "Doston M.",
//     type: "takeaway",
//     time: "17:10",
//     status: "preparing",
//     items: [
//       { name: "Double Cheese Beef Burger", qty: 2, price: 42000, options: ["Pishloq (+4000)"] }
//     ],
//     total: 88000,
//     paymentMethod: "click"
//   }
// ];

// function App() {
//   // Authentication State
//   const [currentUser, setCurrentUser] = useState(null); 
//   const [authMode, setAuthMode] = useState("customer-login"); // 'customer-login', 'customer-register', 'seller-login', 'admin-login'
//   const [authInputEmail, setAuthInputEmail] = useState("");
//   const [authInputPassword, setAuthInputPassword] = useState("");
//   const [authInputName, setAuthInputName] = useState("");
//   const [authError, setAuthError] = useState("");

//   // App Navigation & Data State
//   const [activeTab, setActiveTab] = useState("pos"); 
//   const [products, setProducts] = useState(() => {
//     const saved = localStorage.getItem("tezqafe_products");
//     return saved ? JSON.parse(saved) : DEFAULT_FAST_FOOD_CATALOG;
//   });

//   const [ordersQueue, setOrdersQueue] = useState(INITIAL_QUEUED_ORDERS);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDarkMode, setIsDarkMode] = useState(true);

//   // Profile Edit Local State
//   const [profileEditName, setProfileEditName] = useState("");
//   const [profileEditPhone, setProfileEditPhone] = useState("");
//   const [restaurantStatus, setRestaurantStatus] = useState("open");
//   const [profileSuccessMsg, setProfileSuccessMsg] = useState("");

//   // Cart & POS Cashier State
//   const [cart, setCart] = useState([
//     { id: 101, name: "Double Cheese Beef Burger", price: 42000, qty: 1, selectedOptions: ["Pishloq (+4000)"] }
//   ]);
//   const [orderType, setOrderType] = useState("takeaway");
//   const [paymentMethod, setPaymentMethod] = useState("cash");
//   const [customerName, setCustomerName] = useState("Mijoz #104");

//   // Modals & Notifications
//   const [customizingItem, setCustomizingItem] = useState(null);
//   const [tempOptions, setTempOptions] = useState([]);
//   const [isReceiptOpen, setIsReceiptOpen] = useState(false);
//   const [activeReceipt, setActiveReceipt] = useState(null);
//   const [isProductModalOpen, setIsProductModalOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [deleteConfirmId, setDeleteConfirmId] = useState(null);
//   const [notificationMsg, setNotificationMsg] = useState("");

//   useEffect(() => {
//     localStorage.setItem("tezqafe_products", JSON.stringify(products));
//   }, [products]);

//   useEffect(() => {
//     if (window.lucide) {
//       window.lucide.createIcons();
//     }
//   }, [currentUser, activeTab, products, cart, ordersQueue, customizingItem, isReceiptOpen, isProductModalOpen, deleteConfirmId, notificationMsg, authMode]);

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, [isDarkMode]);

//   useEffect(() => {
//     if (currentUser) {
//       setProfileEditName(currentUser.name || "");
//       setProfileEditPhone(currentUser.phone || "+998 90 123 45 67");
//     }
//   }, [currentUser]);

//   const showToast = (msg) => {
//     setNotificationMsg(msg);
//     setTimeout(() => setNotificationMsg(""), 3000);
//   };

//   // Authentication Handlers
//   const handleLoginSubmit = (e) => {
//     e.preventDefault();
//     setAuthError("");

//     if (!authInputEmail || !authInputPassword) {
//       setAuthError("Iltimos, barcha maydonlarni to'ldiring!");
//       return;
//     }

//     if (authMode === "admin-login") {
//       if (authInputEmail === "admin@tezqafe.uz" && authInputPassword === "admin123") {
//         setCurrentUser({ 
//           name: "Super Admin", 
//           role: "admin", 
//           email: authInputEmail, 
//           phone: "+998 71 200 00 00"
//         });
//         setActiveTab("admin");
//       } else {
//         setAuthError("Admin ma'lumotlari noto'g'ri! (admin@tezqafe.uz / admin123)");
//       }
//     } else if (authMode === "seller-login") {
//       if (authInputPassword.length < 4) {
//         setAuthError("Parol kamida 4 ta belgidan iborat bo'lishi kerak.");
//         return;
//       }
//       setCurrentUser({ 
//         name: authInputEmail.split('@')[0] || "Sotuvchi", 
//         role: "seller", 
//         email: authInputEmail, 
//         phone: "+998 93 555 44 33",
//         restaurantName: "TezQafe Chorsu Filiali"
//       });
//       setActiveTab("catalog");
//     } else {
//       setCurrentUser({ 
//         name: authInputName || authInputEmail.split('@')[0] || "Hurmatli Mijoz", 
//         role: "customer", 
//         email: authInputEmail,
//         phone: "+998 99 888 77 66",
//         savedAddress: "Toshkent sh., Yunusobod 4-mavze"
//       });
//       setActiveTab("pos");
//     }
//   };

//   const handleLogout = () => {
//     setCurrentUser(null);
//     setAuthInputEmail("");
//     setAuthInputPassword("");
//     setAuthInputName("");
//     setAuthError("");
//   };

//   const handleSaveProfile = (e) => {
//     e.preventDefault();
//     setCurrentUser(prev => ({
//       ...prev,
//       name: profileEditName,
//       phone: profileEditPhone
//     }));
//     setProfileSuccessMsg("Profil ma'lumotlari muvaffaqiyatli saqlandi!");
//     setTimeout(() => setProfileSuccessMsg(""), 3000);
//   };

//   const formatMoney = (amount) => {
//     return amount.toLocaleString('uz-UZ') + ' UZS';
//   };

//   const subtotal = useMemo(() => {
//     return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
//   }, [cart]);

//   const packagingFee = orderType === "takeaway" || orderType === "delivery" ? 3000 : 0;
//   const grandTotal = subtotal + packagingFee;

//   const openCustomizer = (product) => {
//     setCustomizingItem(product);
//     setTempOptions([]);
//   };

//   const toggleTempOption = (opt) => {
//     setTempOptions(prev => 
//       prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
//     );
//   };

//   const addCustomizedItemToCart = () => {
//     if (!customizingItem) return;
//     setCart(prev => [
//       ...prev,
//       {
//         id: customizingItem.id,
//         name: customizingItem.name,
//         price: customizingItem.price,
//         qty: 1,
//         selectedOptions: [...tempOptions]
//       }
//     ]);
//     setCustomizingItem(null);
//     setTempOptions([]);
//   };

//   const updateCartQty = (idx, delta) => {
//     setCart(prev => {
//       return prev.map((item, i) => {
//         if (i === idx) {
//           const newQty = item.qty + delta;
//           return newQty > 0 ? { ...item, qty: newQty } : null;
//         }
//         return item;
//       }).filter(Boolean);
//     });
//   };

//   const handleCompleteOrder = () => {
//     if (cart.length === 0) return;
//     const newOrderObj = {
//       orderId: `#TQ-${Math.floor(1000 + Math.random() * 9000)}`,
//       customer: customerName || currentUser?.name || "Mijoz",
//       type: orderType,
//       time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
//       status: "new",
//       items: [...cart],
//       subtotal,
//       packagingFee,
//       total: grandTotal,
//       paymentMethod
//     };
//     setOrdersQueue(prev => [newOrderObj, ...prev]);
//     setActiveReceipt(newOrderObj);
//     setIsReceiptOpen(true);
//   };

//   const closeReceiptAndResetCart = () => {
//     setIsReceiptOpen(false);
//     setCart([]);
//   };

//   const updateOrderStatus = (orderId, nextStatus) => {
//     setOrdersQueue(prev => prev.map(o => o.orderId === orderId ? { ...o, status: nextStatus } : o));
//   };

//   // PRODUCT CRUD: Save (Create or Update)
//   const handleSaveProduct = (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const updatedProduct = {
//       id: editingProduct ? editingProduct.id : Date.now(),
//       name: formData.get("name"),
//       category: formData.get("category"),
//       price: Number(formData.get("price")),
//       prepTime: "5-7 min",
//       tag: "Yangi",
//       image: formData.get("image") || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
//       description: formData.get("description"),
//       customizations: ["Pishloq qo'shish", "Achchiq sous"]
//     };

//     if (editingProduct) {
//       setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p));
//       showToast("Mahsulot muvaffaqiyatli yangilandi!");
//     } else {
//       setProducts(prev => [updatedProduct, ...prev]);
//       showToast("Yangi mahsulot qo'shildi!");
//     }

//     setIsProductModalOpen(false);
//     setEditingProduct(null);
//   };

//   // PRODUCT CRUD: Delete by unique ID
//   const confirmDeleteProduct = (id) => {
//     setProducts(prev => prev.filter(p => p.id !== id));
//     setDeleteConfirmId(null);
//     showToast("Mahsulot o'chirildi!");
//   };

//   const filteredProducts = useMemo(() => {
//     return products.filter(p => {
//       const matchCat = selectedCategory === "all" || p.category === selectedCategory;
//       const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchCat && matchSearch;
//     });
//   }, [products, selectedCategory, searchQuery]);

//   // ==========================================
//   // RENDER: LOGIN SCREEN (IF NOT LOGGED IN)
//   // ==========================================
//   if (!currentUser) {
//     return (
//       <div className="min-h-full flex items-center justify-center p-4 bg-[#FFF8EC] dark:bg-[#121212]">
//         <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl border border-[#E2D8C0] dark:border-gray-800 p-8 shadow-xl">
          
//           <div className="text-center mb-6">
//             <div className="w-12 h-12 rounded-2xl bg-[#D62828] mx-auto flex items-center justify-center text-[#FFC300] font-black text-2xl shadow-md mb-2">
//               <i data-lucide="flame" className="w-7 h-7 fill-[#FFC300]"></i>
//             </div>
//             <h1 className="text-2xl font-black font-display text-[#5C3A21] dark:text-amber-200">tez<span className="text-[#D62828]">qafe</span>ga xush kelibsiz</h1>
//             <p className="text-xs text-gray-500 mt-1">Express Fast Food Tizimiga kirish</p>
//           </div>

//           <div className="grid grid-cols-3 gap-1 bg-[#FFF8EC] dark:bg-[#2A2A2A] p-1.5 rounded-2xl mb-6 border border-[#E2D8C0] dark:border-gray-700 text-xs font-black">
//             <button 
//               onClick={() => { setAuthMode("customer-login"); setAuthError(""); }}
//               className={`py-2 rounded-xl transition-all ${authMode.startsWith('customer') ? 'bg-[#D62828] text-white shadow' : 'text-[#5C3A21] dark:text-gray-300'}`}>
//               Mijoz
//             </button>
//             <button 
//               onClick={() => { setAuthMode("seller-login"); setAuthError(""); }}
//               className={`py-2 rounded-xl transition-all ${authMode === 'seller-login' ? 'bg-[#D62828] text-white shadow' : 'text-[#5C3A21] dark:text-gray-300'}`}>
//               Sotuvchi
//             </button>
//             <button 
//               onClick={() => { setAuthMode("admin-login"); setAuthError(""); }}
//               className={`py-2 rounded-xl transition-all ${authMode === 'admin-login' ? 'bg-[#5C3A21] text-amber-200 shadow' : 'text-gray-500 dark:text-gray-400'}`}>
//               Admin
//             </button>
//           </div>

//           {authError && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl text-center">
//               {authError}
//             </div>
//           )}

//           <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
//             {authMode === "customer-register" && (
//               <div>
//                 <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Ismingiz</label>
//                 <input 
//                   type="text" 
//                   value={authInputName}
//                   onChange={(e) => setAuthInputName(e.target.value)}
//                   placeholder="Ism va Familiya" 
//                   required 
//                   className="w-full p-3 bg-gray-50 dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 rounded-xl font-bold focus:outline-none focus:border-[#D62828]" 
//                 />
//               </div>
//             )}

//             <div>
//               <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
//                 {authMode === "admin-login" ? "Admin Email" : "Email yoki Telefon raqam"}
//               </label>
//               <input 
//                 type="text" 
//                 value={authInputEmail}
//                 onChange={(e) => setAuthInputEmail(e.target.value)}
//                 placeholder={authMode === "admin-login" ? "admin@tezqafe.uz" : "+998 90 123 45 67"} 
//                 required 
//                 className="w-full p-3 bg-gray-50 dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 rounded-xl font-bold focus:outline-none focus:border-[#D62828]" 
//               />
//             </div>

//             <div>
//               <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Parol</label>
//               <input 
//                 type="password" 
//                 value={authInputPassword}
//                 onChange={(e) => setAuthInputPassword(e.target.value)}
//                 placeholder="••••••••" 
//                 required 
//                 className="w-full p-3 bg-gray-50 dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 rounded-xl font-bold focus:outline-none focus:border-[#D62828]" 
//               />
//             </div>

//             <button 
//               type="submit" 
//               className="w-full py-3.5 bg-[#D62828] hover:bg-[#B81D1D] text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-95">
//               {authMode === "customer-register" ? "Ro'yxatdan O'tish" : "Tizimga Kirish"}
//             </button>
//           </form>

//           {authMode.startsWith("customer") && (
//             <div className="mt-4 text-center">
//               {authMode === "customer-login" ? (
//                 <button 
//                   onClick={() => setAuthMode("customer-register")}
//                   className="text-xs font-bold text-[#5C3A21] dark:text-amber-200 hover:underline">
//                   Hisobingiz yo'qmi? Ro'yxatdan o'tish
//                 </button>
//               ) : (
//                 <button 
//                   onClick={() => setAuthMode("customer-login")}
//                   className="text-xs font-bold text-[#5C3A21] dark:text-amber-200 hover:underline">
//                   Akkauntingiz bormi? Kirish
//                 </button>
//               )}
//             </div>
//           )}

//           {authMode === "admin-login" && (
//             <p className="mt-4 text-[10px] text-center text-gray-400">
//               Demo Admin uchun: <strong>admin@tezqafe.uz</strong> / <strong>admin123</strong>
//             </p>
//           )}

//         </div>
//       </div>
//     );
//   }

//   // ==========================================
//   // RENDER: MAIN APPLICATION WITH ALL TABS
//   // ==========================================
//   return (
//     <div className="min-h-full flex flex-col">
      
//       {/* Toast Notification Banner */}
//       {notificationMsg && (
//         <div className="fixed top-20 right-4 z-50 bg-[#3A7D44] text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-black flex items-center gap-2 animate-bounce">
//           <i data-lucide="check-circle" className="w-4 h-4"></i> {notificationMsg}
//         </div>
//       )}

//       {/* Top Header Navbar */}
//       <header className="bg-white dark:bg-[#1E1E1E] border-b border-[#E2D8C0] dark:border-gray-800 sticky top-0 z-30 shadow-sm transition-colors">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 gap-3">
            
//             <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab(currentUser.role === 'customer' ? 'pos' : currentUser.role === 'seller' ? 'catalog' : 'admin')}>
//               <div className="w-10 h-10 rounded-xl bg-[#D62828] flex items-center justify-center text-[#FFC300] font-black text-xl shadow-md">
//                 <i data-lucide="flame" className="w-6 h-6 fill-[#FFC300]"></i>
//               </div>
//               <div>
//                 <span className="text-2xl font-black font-display tracking-tight text-[#5C3A21] dark:text-amber-200">tez<span className="text-[#D62828]">qafe</span></span>
//                 <span className="block text-[10px] font-extrabold tracking-widest text-[#D62828] uppercase -mt-1">Express Fast Food</span>
//               </div>
//             </div>

//             {/* Navigation Tabs based on roles */}
//             <nav className="hidden md:flex items-center gap-1 bg-[#FFF8EC] dark:bg-[#2A2A2A] p-1 rounded-xl border border-[#E2D8C0] dark:border-gray-700">
              
//               {currentUser.role === "customer" && (
//                 <>
//                   <button onClick={() => setActiveTab("pos")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "pos" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
//                     <i data-lucide="shopping-bag" className="w-4 h-4"></i> Menyudan Tanlash
//                   </button>
//                   <button onClick={() => setActiveTab("queue")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "queue" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
//                     <i data-lucide="clock" className="w-4 h-4"></i> Buyurtmalar Holati
//                   </button>
//                 </>
//               )}

//               {currentUser.role === "seller" && (
//                 <>
//                   <button onClick={() => setActiveTab("queue")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "queue" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
//                     <i data-lucide="clock" className="w-4 h-4"></i> Oshxona Navbati
//                   </button>
//                   <button onClick={() => setActiveTab("catalog")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "catalog" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
//                     <i data-lucide="utensils-crossed" className="w-4 h-4"></i> Mahsulotlarni Boshqarish
//                   </button>
//                   <button onClick={() => setActiveTab("reports")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "reports" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
//                     <i data-lucide="bar-chart-2" className="w-4 h-4"></i> Kunlik Hisobot
//                   </button>
//                 </>
//               )}

//               {currentUser.role === "admin" && (
//                 <>
//                   <button onClick={() => setActiveTab("admin")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "admin" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
//                     <i data-lucide="shield-check" className="w-4 h-4"></i> Admin Markazi
//                   </button>
//                   <button onClick={() => setActiveTab("catalog")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "catalog" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
//                     <i data-lucide="utensils-crossed" className="w-4 h-4"></i> Barcha Menyular
//                   </button>
//                   <button onClick={() => setActiveTab("reports")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "reports" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
//                     <i data-lucide="bar-chart-2" className="w-4 h-4"></i> Moliya
//                   </button>
//                 </>
//               )}

//               <button onClick={() => setActiveTab("profile")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "profile" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
//                 <i data-lucide="user" className="w-4 h-4"></i> Profil & Sozlamalar
//               </button>

//             </nav>

//             <div className="flex items-center gap-2">
//               <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 rounded-xl text-[#5C3A21] dark:text-amber-200">
//                 <i data-lucide={isDarkMode ? "sun" : "moon"} className="w-4 h-4"></i>
//               </button>
              
//               <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
//                 <div onClick={() => setActiveTab("profile")} className="w-8 h-8 rounded-full bg-[#FFC300] text-[#5C3A21] font-black flex items-center justify-center text-xs cursor-pointer">
//                   {currentUser.name.charAt(0)}
//                 </div>
//                 <div className="hidden xl:block text-left cursor-pointer" onClick={() => setActiveTab("profile")}>
//                   <p className="text-xs font-black text-[#1F1F1F] dark:text-gray-200 leading-tight">{currentUser.name}</p>
//                   <p className="text-[10px] text-[#D62828] font-bold uppercase">{currentUser.role}</p>
//                 </div>
//                 <button onClick={handleLogout} title="Chiqish" className="p-1.5 bg-red-50 hover:bg-red-100 text-[#D62828] rounded-xl ml-1">
//                   <i data-lucide="log-out" className="w-4 h-4"></i>
//                 </button>
//               </div>
//             </div>

//           </div>
//         </div>
//       </header>

//       {/* ========================================== */}
//       {/* 1. CUSTOMER POS & ORDERING VIEW            */}
//       {/* ========================================== */}
//       {activeTab === "pos" && currentUser.role === "customer" && (
//         <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row gap-5">
//           <section className="flex-1 flex flex-col gap-4 min-w-0">
//             <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#D62828] to-[#5C3A21] text-white p-5 shadow-md">
//               <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#FFC300] text-[#5C3A21] text-[11px] font-black mb-2 uppercase">
//                 Aksiya
//               </span>
//               <h1 className="text-2xl font-black font-display text-white">Xush kelibsiz, {currentUser.name}!</h1>
//               <p className="text-xs text-amber-100 mt-1">Eng mazali fast-food mahsulotlarini buyurtma qiling.</p>
//             </div>

//             <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
//               {FAST_FOOD_CATEGORIES.map(cat => (
//                 <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'bg-[#D62828] text-white shadow-md' : 'bg-white dark:bg-[#1E1E1E] text-[#5C3A21] dark:text-gray-200 border'}`}>
//                   {cat.label}
//                 </button>
//               ))}
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//               {filteredProducts.map(food => (
//                 <div key={food.id} className="bg-white dark:bg-[#1E1E1E] rounded-2xl border overflow-hidden flex flex-col justify-between">
//                   <div>
//                     <div className="relative h-36 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
//                       <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
//                       <div className="absolute top-2 left-2">
//                         <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-[#FFC300] text-[#5C3A21]">{food.tag}</span>
//                       </div>
//                     </div>
//                     <div className="p-3.5">
//                       <h3 className="text-xs font-black text-[#5C3A21] dark:text-amber-100 line-clamp-1">{food.name}</h3>
//                       <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{food.description}</p>
//                     </div>
//                   </div>
//                   <div className="px-3.5 pb-3.5 pt-1 flex items-center justify-between border-t mt-auto">
//                     <span className="text-xs font-black text-[#D62828]">{formatMoney(food.price)}</span>
//                     <button onClick={() => openCustomizer(food)} className="px-3 py-1.5 rounded-xl bg-[#D62828] text-white text-xs font-black">Qo'shish</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Cart sidebar */}
//           <aside className="w-full lg:w-[380px] bg-white dark:bg-[#1E1E1E] rounded-2xl border p-4 flex flex-col shadow-sm h-fit sticky top-20">
//             <h2 className="text-sm font-black text-[#5C3A21] dark:text-amber-200 mb-3">Sizning Savatingiz</h2>
//             <div className="max-h-[260px] overflow-y-auto space-y-2 my-2">
//               {cart.length === 0 ? (
//                 <p className="text-xs text-center text-gray-400 py-6">Savat bo'sh</p>
//               ) : (
//                 cart.map((item, idx) => (
//                   <div key={idx} className="p-2 bg-[#FFF8EC] dark:bg-[#2A2A2A] rounded-xl border flex justify-between items-center text-xs">
//                     <div>
//                       <p className="font-bold">{item.name}</p>
//                       <p className="text-[10px] text-[#D62828]">{formatMoney(item.price)}</p>
//                     </div>
//                     <div className="flex items-center gap-1.5">
//                       <button onClick={() => updateCartQty(idx, -1)} className="px-2 bg-white dark:bg-gray-800 rounded font-bold">-</button>
//                       <span>{item.qty}</span>
//                       <button onClick={() => updateCartQty(idx, 1)} className="px-2 bg-white dark:bg-gray-800 rounded font-bold">+</button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//             <div className="pt-3 border-t space-y-3">
//               <div className="flex justify-between text-sm font-black text-[#5C3A21] dark:text-amber-200">
//                 <span>JAMI:</span>
//                 <span className="text-[#D62828]">{formatMoney(grandTotal)}</span>
//               </div>
//               <button onClick={handleCompleteOrder} disabled={cart.length === 0} className="w-full py-3 bg-[#D62828] disabled:bg-gray-300 text-white font-black text-xs rounded-xl">
//                 Buyurtma Berish
//               </button>
//             </div>
//           </aside>
//         </main>
//       )}

//       {/* ========================================== */}
//       {/* 2. PRODUCT MANAGEMENT (CRUD) TAB           */}
//       {/* ========================================== */}
//       {activeTab === "catalog" && (
//         <main className="max-w-7xl w-full mx-auto px-4 py-6">
//           <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E2D8C0] dark:border-gray-800 p-6 shadow-sm">
            
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
//               <div>
//                 <h2 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200">Mahsulotlar Va Menyu</h2>
//                 <p className="text-xs text-gray-500">Fast-food taomlarini tahrirlash, yangilash va o‘chirish</p>
//               </div>
//               <button 
//                 onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
//                 className="px-4 py-2 bg-[#D62828] hover:bg-[#B81D1D] text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow">
//                 <i data-lucide="plus-circle" className="w-4 h-4"></i> Yangi Taom Qo'shish
//               </button>
//             </div>

//             <div className="overflow-x-auto mt-4">
//               <table className="w-full text-left text-xs">
//                 <thead>
//                   <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-400 uppercase text-[10px]">
//                     <th className="py-3 px-2">Rasm</th>
//                     <th className="py-3 px-2">Nomi</th>
//                     <th className="py-3 px-2">Kategoriya</th>
//                     <th className="py-3 px-2">Narxi</th>
//                     <th className="py-3 px-2 text-right">Amallar</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
//                   {products.map(p => (
//                     <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
//                       <td className="py-3 px-2">
//                         <img src={p.image} alt={p.name} className="w-11 h-11 rounded-xl object-cover border border-gray-200 dark:border-gray-700" />
//                       </td>
//                       <td className="py-3 px-2 font-black text-[#5C3A21] dark:text-amber-100">{p.name}</td>
//                       <td className="py-3 px-2 uppercase text-[10px] font-bold text-gray-500">{p.category}</td>
//                       <td className="py-3 px-2 font-black text-[#D62828]">{formatMoney(p.price)}</td>
//                       <td className="py-3 px-2 text-right space-x-2">
//                         <button 
//                           onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }}
//                           className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-[#5C3A21] font-extrabold rounded-xl transition-all inline-flex items-center gap-1">
//                           <i data-lucide="pencil" className="w-3.5 h-3.5"></i> Tahrirlash
//                         </button>
//                         <button 
//                           onClick={() => setDeleteConfirmId(p.id)}
//                           className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-600 font-extrabold rounded-xl transition-all inline-flex items-center gap-1">
//                           <i data-lucide="trash-2" className="w-3.5 h-3.5"></i> O'chirish
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//           </div>
//         </main>
//       )}

//       {/* ========================================== */}
//       {/* 3. OTHER TABS (Queue, Reports, Admin, Profile) */}
//       {/* ========================================== */}
//       {activeTab === "queue" && (
//         <main className="max-w-7xl w-full mx-auto px-4 py-6">
//           <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border p-6 shadow-sm">
//             <h2 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200 mb-4">Oshxona Navbati</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {ordersQueue.map(order => (
//                 <div key={order.orderId} className="bg-[#FFF8EC] dark:bg-[#2A2A2A] rounded-2xl p-4 border flex flex-col justify-between">
//                   <div>
//                     <div className="flex justify-between pb-2 border-b">
//                       <span className="text-sm font-black text-[#5C3A21] dark:text-amber-100">{order.orderId} ({order.customer})</span>
//                       <span className="text-xs">{order.time}</span>
//                     </div>
//                     <div className="my-2 space-y-1 text-xs">
//                       {order.items.map((it, i) => (
//                         <div key={i} className="flex justify-between">
//                           <span>{it.qty}x {it.name}</span>
//                           <span className="font-bold">{formatMoney(it.price * it.qty)}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="pt-3 border-t space-y-2">
//                     <div className="flex justify-between items-center text-xs">
//                       <span className="font-black text-[#D62828]">{formatMoney(order.total)}</span>
//                       <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-white">{order.status}</span>
//                     </div>
//                     {currentUser.role !== "customer" && order.status === "new" && (
//                       <button onClick={() => updateOrderStatus(order.orderId, "preparing")} className="w-full py-1.5 bg-[#FFC300] text-[#5C3A21] font-black text-xs rounded-xl">Tayyorlashga o'tish</button>
//                     )}
//                     {currentUser.role !== "customer" && order.status === "preparing" && (
//                       <button onClick={() => updateOrderStatus(order.orderId, "ready")} className="w-full py-1.5 bg-[#3A7D44] text-white font-black text-xs rounded-xl">Tayyor</button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </main>
//       )}

//       {activeTab === "reports" && (
//         <main className="max-w-7xl w-full mx-auto px-4 py-6 space-y-5">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="bg-white dark:bg-[#1E1E1E] p-5 rounded-2xl border">
//               <p className="text-xs text-gray-400 font-bold uppercase">Bugungi Tushum</p>
//               <p className="text-2xl font-black text-[#D62828] mt-1">5 480 000 UZS</p>
//             </div>
//           </div>
//         </main>
//       )}

//       {activeTab === "admin" && currentUser.role === "admin" && (
//         <main className="max-w-7xl w-full mx-auto px-4 py-6 space-y-5">
//           <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border p-6 shadow-sm">
//             <h2 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200 mb-2">TezQafe Universal Admin Boshqaruv Markazi</h2>
//             <p className="text-xs text-gray-500 mb-6">Faqat super adminlar uchun himoyalangan zona.</p>
//           </div>
//         </main>
//       )}

//       {activeTab === "profile" && (
//         <main className="max-w-4xl w-full mx-auto px-4 py-6 space-y-6">
//           <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border p-6 sm:p-8 shadow-sm">
//             <div className="flex items-center gap-4 pb-6 border-b">
//               <div className="w-16 h-16 rounded-2xl bg-[#FFC300] text-[#5C3A21] font-black text-2xl flex items-center justify-center">
//                 {currentUser.name.charAt(0)}
//               </div>
//               <div>
//                 <h1 className="text-lg font-black text-[#5C3A21] dark:text-amber-200">{currentUser.name}</h1>
//                 <p className="text-xs text-gray-500">{currentUser.email}</p>
//                 <span className="inline-block mt-1 px-2.5 py-0.5 bg-red-50 text-[#D62828] text-[10px] font-black rounded-lg uppercase">Rol: {currentUser.role}</span>
//               </div>
//             </div>

//             {profileSuccessMsg && (
//               <div className="mt-4 p-3 bg-green-50 text-green-700 text-xs font-bold rounded-xl text-center">
//                 {profileSuccessMsg}
//               </div>
//             )}

//             <form onSubmit={handleSaveProfile} className="mt-6 space-y-4 text-xs">
//               <div>
//                 <label className="block font-bold mb-1">Ism / Restoran</label>
//                 <input type="text" value={profileEditName} onChange={e => setProfileEditName(e.target.value)} required className="w-full p-2.5 border rounded-xl dark:bg-[#2A2A2A]" />
//               </div>
//               <div>
//                 <label className="block font-bold mb-1">Telefon Raqam</label>
//                 <input type="text" value={profileEditPhone} onChange={e => setProfileEditPhone(e.target.value)} required className="w-full p-2.5 border rounded-xl dark:bg-[#2A2A2A]" />
//               </div>
//               <div className="flex justify-end">
//                 <button type="submit" className="px-5 py-2.5 bg-[#D62828] text-white font-black rounded-xl">Saqlash</button>
//               </div>
//             </form>
//           </div>
//         </main>
//       )}

//       {/* ========================================== */}
//       {/* 4. MODALS (Edit/Create & Delete)           */}
//       {/* ========================================== */}
//       {isProductModalOpen && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
//           <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800">
//             <div className="flex justify-between items-center pb-3 border-b mb-4">
//               <h3 className="text-base font-black font-display text-[#5C3A21] dark:text-amber-200">
//                 {editingProduct ? "Taomni Tahrirlash" : "Yangi Fast-Food Qo'shish"}
//               </h3>
//               <button onClick={() => setIsProductModalOpen(false)} className="text-gray-400 font-bold">✕</button>
//             </div>

//             <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
//               <div>
//                 <label className="block font-bold mb-1">Taom Nomi</label>
//                 <input name="name" defaultValue={editingProduct?.name || ""} placeholder="Masalan: Double Cheese Burger" required className="w-full p-2.5 border rounded-xl dark:bg-[#2A2A2A]" />
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block font-bold mb-1">Kategoriya</label>
//                   <select name="category" defaultValue={editingProduct?.category || "burgers"} className="w-full p-2.5 border rounded-xl dark:bg-[#2A2A2A]">
//                     <option value="burgers">Burgerlar</option>
//                     <option value="combos">Kombolar</option>
//                     <option value="chicken">Qovurilgan Tovuq</option>
//                     <option value="pizza">Pitsa va Lavash</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block font-bold mb-1">Narxi (UZS)</label>
//                   <input name="price" type="number" defaultValue={editingProduct?.price || 35000} required className="w-full p-2.5 border rounded-xl dark:bg-[#2A2A2A]" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block font-bold mb-1">Rasm URL</label>
//                 <input name="image" defaultValue={editingProduct?.image || ""} placeholder="https://images.unsplash.com/..." className="w-full p-2.5 border rounded-xl dark:bg-[#2A2A2A]" />
//               </div>
//               <div>
//                 <label className="block font-bold mb-1">Tavsif</label>
//                 <textarea name="description" defaultValue={editingProduct?.description || ""} rows="3" className="w-full p-2.5 border rounded-xl dark:bg-[#2A2A2A]"></textarea>
//               </div>

//               <div className="flex justify-end gap-2 pt-3 border-t">
//                 <button type="button" onClick={() => setIsProductModalOpen(false)} className="px-4 py-2.5 bg-gray-200 dark:bg-gray-700 font-bold rounded-xl">Bekor qilish</button>
//                 <button type="submit" className="px-5 py-2.5 bg-[#D62828] text-white font-black rounded-xl">Saqlash</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {deleteConfirmId && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
//           <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-sm rounded-3xl p-6 shadow-2xl border text-center">
//             <h4 className="text-base font-black text-[#5C3A21] dark:text-amber-200">Mahsulotni o'chirish</h4>
//             <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 mb-5">Haqiqatan ham ushbu mahsulotni menyudan o'chirmoqchimisiz?</p>
//             <div className="flex justify-center gap-2">
//               <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-gray-200 font-bold text-xs rounded-xl">Bekor qilish</button>
//               <button onClick={() => confirmDeleteProduct(deleteConfirmId)} className="px-4 py-2 bg-[#D62828] text-white font-black text-xs rounded-xl">O'chirish</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <footer className="bg-white dark:bg-[#1E1E1E] border-t py-3 mt-auto">
//         <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
//           <p>&copy; 2026 <strong>tezqafe.demo</strong> - Barcha panellar va login tizimi tiklandi.</p>
//         </div>
//       </footer>

//     </div>
//   );
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);


const { useState, useEffect, useMemo } = React;

const DEFAULT_FAST_FOOD_CATALOG = [
  {
    id: 101,
    name: "Мини чиз бургер",
    category: "burgers",
    price: 20000,
    prepTime: "5 min",
    tag: "Yangi",
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    description: "Жуда кичик аммо тойимли mini burger.",
    customizations: ["Pishloq (+4000)", "Jalapeno (+3000)"]
  },
  {
    id: 102,
    name: "Cheez",
    category: "sides",
    price: 25000,
    prepTime: "3 min",
    tag: "Yangi",
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1552767059-ce182ead8c1b?auto=format&fit=crop&w=700&q=80",
    description: "Pishloq, bu sichqonlarning eng yoqimli taomi ammo sichqonlar uchun emas.",
    customizations: ["Qo'shimcha pishloq"]
  },
  {
    id: 103,
    name: "Double Cheese Beef Burger",
    category: "burgers",
    price: 42000,
    prepTime: "6-8 min",
    tag: "Bestseller",
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
    description: "2x Sharbatli mol go'shti kotleti, erigan Cheddar pishlog'i va maxsus TezQafe burger sousi.",
    customizations: ["Pishloq (+4000)", "Jalapeno (+3000)", "Qo'shimcha Kotlet (+14000)"]
  },
  {
    id: 104,
    name: "Mega Combo Set #1",
    category: "combos",
    price: 58000,
    prepTime: "8-10 min",
    tag: "-20% Aksiya",
    isSpicy: true,
    image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=700&q=80",
    description: "Double Cheeseburger + Qarsillama Fri + Muzdek Coca-Cola 0.5L.",
    customizations: ["Kola 0.5L", "Fanta 0.5L", "Sprite 0.5L"]
  },
  {
    id: 105,
    name: "Qarsillama Tovuq Strips (6 dona)",
    category: "chicken",
    price: 36000,
    prepTime: "5-7 min",
    tag: "Tavsiya",
    isSpicy: true,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=80",
    description: "Maxsus ziravorli un bilan qovurilgan yumshoq tovuq lahm go'shti stripslari.",
    customizations: ["Garlic sous (+2000)", "BBQ sous (+2000)"]
  },
  {
    id: 106,
    name: "Pepperoni Special Pitsa 32sm",
    category: "pizza",
    price: 75000,
    prepTime: "12-15 min",
    tag: "Pitsa",
    isSpicy: false,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80",
    description: "Mozzarella pishlog'i, Pepperoni kolbasalari va pomidor sousi.",
    customizations: ["Yupqa xamir", "Qalin xamir", "Pishloqli bortik (+12000)"]
  }
];

const FAST_FOOD_CATEGORIES = [
  { id: "all", label: "Barchasi" },
  { id: "combos", label: "Kombolar & Aksiya" },
  { id: "burgers", label: "Burgerlar" },
  { id: "chicken", label: "Qovurilgan Tovuq" },
  { id: "pizza", label: "Pitsa va Lavash" }
];

const INITIAL_QUEUED_ORDERS = [
  {
    orderId: "#TQ-1088",
    customer: "Doston M.",
    type: "takeaway",
    time: "17:10",
    status: "preparing",
    items: [
      { name: "Double Cheese Beef Burger", qty: 1, price: 42000, options: [] }
    ],
    total: 42000,
    paymentMethod: "click"
  }
];

function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(null); 
  const [authMode, setAuthMode] = useState("customer-login"); 
  const [authInputEmail, setAuthInputEmail] = useState("");
  const [authInputPassword, setAuthInputPassword] = useState("");
  const [authInputName, setAuthInputName] = useState("");
  const [authError, setAuthError] = useState("");

  // App Navigation & Data State
  const [activeTab, setActiveTab] = useState("pos"); 
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("tezqafe_products");
    return saved ? JSON.parse(saved) : DEFAULT_FAST_FOOD_CATALOG;
  });

  const [ordersQueue, setOrdersQueue] = useState(INITIAL_QUEUED_ORDERS);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Profile Edit Local State
  const [profileEditName, setProfileEditName] = useState("");
  const [profileEditPhone, setProfileEditPhone] = useState("");
  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");

  // Cart & POS State
  const [cart, setCart] = useState([
    { id: 103, name: "Double Cheese Beef Burger", price: 42000, qty: 1, selectedOptions: [] }
  ]);
  const [orderType, setOrderType] = useState("takeaway");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // Modals & Notifications
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState("");

  useEffect(() => {
    localStorage.setItem("tezqafe_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [currentUser, activeTab, products, cart, ordersQueue, isReceiptOpen, isProductModalOpen, deleteConfirmId, notificationMsg, authMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (currentUser) {
      setProfileEditName(currentUser.name || "");
      setProfileEditPhone(currentUser.phone || "+998 90 123 45 67");
    }
  }, [currentUser]);

  const showToast = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(""), 3000);
  };

  // Direct Add to Cart Action
  const handleAddToCart = (foodProduct) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === foodProduct.id);
      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex].qty += 1;
        return nextCart;
      } else {
        return [...prevCart, {
          id: foodProduct.id,
          name: foodProduct.name,
          price: foodProduct.price,
          qty: 1,
          selectedOptions: []
        }];
      }
    });
    showToast(`${foodProduct.name} savatga qo'shildi!`);
  };

  // Authentication Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setAuthError("");

    if (!authInputEmail || !authInputPassword) {
      setAuthError("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    if (authMode === "admin-login") {
      if (authInputEmail === "admin@tezqafe.uz" && authInputPassword === "admin123") {
        setCurrentUser({ 
          name: "Super Admin", 
          role: "admin", 
          email: authInputEmail, 
          phone: "+998 71 200 00 00" 
        });
        setActiveTab("admin");
      } else {
        setAuthError("Admin ma'lumotlari noto'g'ri! (admin@tezqafe.uz / admin123)");
      }
    } else if (authMode === "seller-login") {
      setCurrentUser({ 
        name: authInputEmail.split('@')[0] || "Sotuvchi", 
        role: "seller", 
        email: authInputEmail, 
        phone: "+998 93 555 44 33",
        restaurantName: "TezQafe Chorsu Filiali"
      });
      setActiveTab("catalog");
    } else {
      setCurrentUser({ 
        name: authInputName || authInputEmail.split('@')[0] || "Mijoz", 
        role: "customer", 
        email: authInputEmail, 
        phone: "+998 99 888 77 66" 
      });
      setActiveTab("pos");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthInputEmail("");
    setAuthInputPassword("");
    setAuthInputName("");
    setAuthError("");
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setCurrentUser(prev => ({
      ...prev,
      name: profileEditName,
      phone: profileEditPhone
    }));
    setProfileSuccessMsg("Profil ma'lumotlari muvaffaqiyatli saqlandi!");
    setTimeout(() => setProfileSuccessMsg(""), 3000);
  };

  const formatMoney = (amount) => {
    return amount.toLocaleString('uz-UZ') + ' UZS';
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }, [cart]);

  const packagingFee = orderType === "takeaway" ? 3000 : 0;
  const grandTotal = subtotal + packagingFee;

  const updateCartQty = (idx, delta) => {
    setCart(prev => {
      return prev.map((item, i) => {
        if (i === idx) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleCompleteOrder = () => {
    if (cart.length === 0) return;
    const newOrderObj = {
      orderId: `#TQ-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: currentUser?.name || "Mijoz",
      type: orderType,
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      status: "new",
      items: [...cart],
      total: grandTotal,
      paymentMethod
    };
    setOrdersQueue(prev => [newOrderObj, ...prev]);
    setActiveReceipt(newOrderObj);
    setIsReceiptOpen(true);
  };

  const closeReceiptAndResetCart = () => {
    setIsReceiptOpen(false);
    setCart([]);
  };

  const updateOrderStatus = (orderId, nextStatus) => {
    setOrdersQueue(prev => prev.map(o => o.orderId === orderId ? { ...o, status: nextStatus } : o));
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      prepTime: "5 min",
      tag: "Yangi",
      image: formData.get("image") || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80",
      description: formData.get("description"),
      customizations: []
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p));
      showToast("Mahsulot muvaffaqiyatli yangilandi!");
    } else {
      setProducts(prev => [updatedProduct, ...prev]);
      showToast("Yangi mahsulot qo'shildi!");
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const confirmDeleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirmId(null);
    showToast("Mahsulot o'chirildi!");
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // ==========================================
  // RENDER: LOGIN SCREEN
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-full flex items-center justify-center p-4 bg-[#FFF8EC] dark:bg-[#121212]">
        <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl border border-[#E2D8C0] dark:border-gray-800 p-8 shadow-xl">
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#D62828] mx-auto flex items-center justify-center text-[#FFC300] font-black text-2xl shadow-md mb-2">
              <i data-lucide="flame" className="w-7 h-7 fill-[#FFC300]"></i>
            </div>
            <h1 className="text-2xl font-black font-display text-[#5C3A21] dark:text-amber-200">tez<span className="text-[#D62828]">qafe</span>ga xush kelibsiz</h1>
            <p className="text-xs text-gray-500 mt-1">Express Fast Food Tizimiga kirish</p>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-[#FFF8EC] dark:bg-[#2A2A2A] p-1.5 rounded-2xl mb-6 border text-xs font-black">
            <button onClick={() => { setAuthMode("customer-login"); setAuthError(""); }} className={`py-2 rounded-xl transition-all ${authMode.startsWith('customer') ? 'bg-[#D62828] text-white shadow' : 'text-[#5C3A21] dark:text-gray-300'}`}>Mijoz</button>
            <button onClick={() => { setAuthMode("seller-login"); setAuthError(""); }} className={`py-2 rounded-xl transition-all ${authMode === 'seller-login' ? 'bg-[#D62828] text-white shadow' : 'text-[#5C3A21] dark:text-gray-300'}`}>Sotuvchi</button>
            <button onClick={() => { setAuthMode("admin-login"); setAuthError(""); }} className={`py-2 rounded-xl transition-all ${authMode === 'admin-login' ? 'bg-[#5C3A21] text-amber-200 shadow' : 'text-gray-500'}`}>Admin</button>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            {authMode === "customer-register" && (
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Ismingiz</label>
                <input 
                  type="text" 
                  value={authInputName}
                  onChange={(e) => setAuthInputName(e.target.value)}
                  placeholder="Ism va Familiya" 
                  required 
                  className="w-full p-3 bg-gray-50 dark:bg-[#2A2A2A] border rounded-xl font-bold focus:outline-none focus:border-[#D62828]" 
                />
              </div>
            )}

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                {authMode === "admin-login" ? "Admin Email" : "Email yoki Telefon raqam"}
              </label>
              <input 
                type="text" 
                value={authInputEmail}
                onChange={(e) => setAuthInputEmail(e.target.value)}
                placeholder={authMode === "admin-login" ? "admin@tezqafe.uz" : "+998 90 123 45 67"} 
                required 
                className="w-full p-3 bg-gray-50 dark:bg-[#2A2A2A] border rounded-xl font-bold focus:outline-none focus:border-[#D62828]" 
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Parol</label>
              <input 
                type="password" 
                value={authInputPassword}
                onChange={(e) => setAuthInputPassword(e.target.value)}
                placeholder="••••••••" 
                required 
                className="w-full p-3 bg-gray-50 dark:bg-[#2A2A2A] border rounded-xl font-bold focus:outline-none focus:border-[#D62828]" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-[#D62828] hover:bg-[#B81D1D] text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-95">
              {authMode === "customer-register" ? "Ro'yxatdan O'tish" : "Tizimga Kirish"}
            </button>
          </form>

          {authMode.startsWith("customer") && (
            <div className="mt-4 text-center">
              {authMode === "customer-login" ? (
                <button onClick={() => setAuthMode("customer-register")} className="text-xs font-bold text-[#5C3A21] dark:text-amber-200 hover:underline">
                  Hisobingiz yo'qmi? Ro'yxatdan o'tish
                </button>
              ) : (
                <button onClick={() => setAuthMode("customer-login")} className="text-xs font-bold text-[#5C3A21] dark:text-amber-200 hover:underline">
                  Akkauntingiz bormi? Kirish
                </button>
              )}
            </div>
          )}

          {authMode === "admin-login" && (
            <p className="mt-4 text-[10px] text-center text-gray-400">
              Demo Admin uchun: <strong>admin@tezqafe.uz</strong> / <strong>admin123</strong>
            </p>
          )}

        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: MAIN APPLICATION (ALL PANELS)
  // ==========================================
  return (
    <div className="min-h-full flex flex-col">
      
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-20 right-4 z-50 bg-[#3A7D44] text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-black flex items-center gap-2">
          <i data-lucide="check-circle" className="w-4 h-4"></i> {notificationMsg}
        </div>
      )}

      {/* Top Header Navbar */}
      <header className="bg-white dark:bg-[#1E1E1E] border-b border-[#E2D8C0] dark:border-gray-800 sticky top-0 z-30 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab(currentUser.role === 'customer' ? 'pos' : 'catalog')}>
              <div className="w-10 h-10 rounded-xl bg-[#D62828] flex items-center justify-center text-[#FFC300] font-black text-xl shadow-md">
                <i data-lucide="flame" className="w-6 h-6 fill-[#FFC300]"></i>
              </div>
              <div>
                <span className="text-2xl font-black font-display tracking-tight text-[#5C3A21] dark:text-amber-200">tez<span className="text-[#D62828]">qafe</span></span>
                <span className="block text-[10px] font-extrabold tracking-widest text-[#D62828] uppercase -mt-1">Express Fast Food</span>
              </div>
            </div>

            {/* Role-based Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 bg-[#FFF8EC] dark:bg-[#2A2A2A] p-1 rounded-xl border border-[#E2D8C0] dark:border-gray-700">
              
              {currentUser.role === "customer" && (
                <>
                  <button onClick={() => setActiveTab("pos")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "pos" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
                    <i data-lucide="shopping-bag" className="w-4 h-4"></i> Menyudan Tanlash
                  </button>
                  <button onClick={() => setActiveTab("queue")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "queue" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
                    <i data-lucide="clock" className="w-4 h-4"></i> Buyurtmalar Holati
                  </button>
                </>
              )}

              {currentUser.role === "seller" && (
                <>
                  <button onClick={() => setActiveTab("queue")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "queue" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
                    <i data-lucide="clock" className="w-4 h-4"></i> Oshxona Navbati
                  </button>
                  <button onClick={() => setActiveTab("catalog")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "catalog" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
                    <i data-lucide="utensils-crossed" className="w-4 h-4"></i> Mahsulotlarni Boshqarish
                  </button>
                  <button onClick={() => setActiveTab("reports")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "reports" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
                    <i data-lucide="bar-chart-2" className="w-4 h-4"></i> Kunlik Hisobot
                  </button>
                </>
              )}

              {currentUser.role === "admin" && (
                <>
                  <button onClick={() => setActiveTab("admin")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "admin" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
                    <i data-lucide="shield-check" className="w-4 h-4"></i> Admin Markazi
                  </button>
                  <button onClick={() => setActiveTab("catalog")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "catalog" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
                    <i data-lucide="utensils-crossed" className="w-4 h-4"></i> Barcha Menyular
                  </button>
                </>
              )}

              <button onClick={() => setActiveTab("profile")} className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 ${activeTab === "profile" ? "bg-[#D62828] text-white shadow-sm" : "text-[#5C3A21] dark:text-gray-300 hover:bg-white/60"}`}>
                <i data-lucide="user" className="w-4 h-4"></i> Profil & Sozlamalar
              </button>

            </nav>

            <div className="flex items-center gap-2">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 rounded-xl text-[#5C3A21] dark:text-amber-200">
                <i data-lucide={isDarkMode ? "sun" : "moon"} className="w-4 h-4"></i>
              </button>
              
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                <div onClick={() => setActiveTab("profile")} className="w-8 h-8 rounded-full bg-[#FFC300] text-[#5C3A21] font-black flex items-center justify-center text-xs cursor-pointer">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden xl:block text-left cursor-pointer" onClick={() => setActiveTab("profile")}>
                  <p className="text-xs font-black text-[#1F1F1F] dark:text-gray-200 leading-tight">{currentUser.name}</p>
                  <p className="text-[10px] text-[#D62828] font-bold uppercase">{currentUser.role}</p>
                </div>
                <button onClick={handleLogout} title="Chiqish" className="p-1.5 bg-red-50 hover:bg-red-100 text-[#D62828] rounded-xl ml-1">
                  <i data-lucide="log-out" className="w-4 h-4"></i>
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* 1. CUSTOMER MENU & CART (POS VIEW)         */}
      {/* ========================================== */}
      {activeTab === "pos" && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col lg:flex-row gap-5">
          <section className="flex-1 flex flex-col gap-4 min-w-0">
            
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {FAST_FOOD_CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all ${selectedCategory === cat.id ? 'bg-[#D62828] text-white shadow-md' : 'bg-white dark:bg-[#1E1E1E] text-[#5C3A21] dark:text-gray-200 border'}`}>
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(food => (
                <div key={food.id} className="bg-[#1E1E1E] rounded-2xl border border-gray-800 overflow-hidden flex flex-col justify-between p-1">
                  <div>
                    <div className="relative h-36 w-full overflow-hidden rounded-xl bg-gray-800">
                      <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-[#FFC300] text-[#5C3A21]">{food.tag}</span>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-black text-amber-100">{food.name}</h3>
                      <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{food.description}</p>
                    </div>
                  </div>
                  <div className="px-3 pb-3 pt-1 flex items-center justify-between mt-auto">
                    <span className="text-xs font-black text-[#D62828]">{formatMoney(food.price)}</span>
                    
                    <button 
                      onClick={() => handleAddToCart(food)} 
                      className="px-4 py-1.5 rounded-xl bg-[#D62828] hover:bg-[#B81D1D] text-white text-xs font-black shadow transition-transform active:scale-95">
                      Qo'shish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="w-full lg:w-[380px] bg-[#1E1E1E] rounded-2xl border border-gray-800 p-4 flex flex-col shadow-sm h-fit sticky top-20">
            <h2 className="text-sm font-black text-amber-200 mb-3">Sizning Savatingiz</h2>
            
            <div className="max-h-[280px] overflow-y-auto space-y-2 my-2">
              {cart.length === 0 ? (
                <p className="text-xs text-center text-gray-500 py-6">Savatingiz hozircha bo'sh</p>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-[#2A2A2A] rounded-xl border border-gray-700 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-gray-200">{item.name}</p>
                      <p className="text-[10px] text-[#D62828] font-black">{formatMoney(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-[#1E1E1E] px-2 py-1 rounded-lg border border-gray-700">
                      <button onClick={() => updateCartQty(idx, -1)} className="text-xs font-bold text-gray-400 hover:text-white">-</button>
                      <span className="text-xs font-black text-white">{item.qty}</span>
                      <button onClick={() => updateCartQty(idx, 1)} className="text-xs font-bold text-gray-400 hover:text-white">+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-3 border-t border-gray-800 space-y-3">
              <div className="flex justify-between text-sm font-black text-amber-200">
                <span>JAMI:</span>
                <span className="text-[#D62828]">{formatMoney(grandTotal)}</span>
              </div>

              <button 
                onClick={handleCompleteOrder} 
                disabled={cart.length === 0} 
                className="w-full py-3 bg-[#D62828] hover:bg-[#B81D1D] disabled:bg-gray-800 text-white font-black text-xs rounded-xl shadow transition-all active:scale-95">
                Buyurtma Berish
              </button>
            </div>
          </aside>
        </main>
      )}

      {/* ========================================== */}
      {/* 2. PRODUCT MANAGEMENT (CATALOG CRUD)       */}
      {/* ========================================== */}
      {activeTab === "catalog" && (
        <main className="max-w-7xl w-full mx-auto px-4 py-6">
          <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 p-6 shadow-sm">
            <div className="flex justify-between items-center pb-4 border-b border-gray-800">
              <div>
                <h2 className="text-xl font-black font-display text-amber-200">Mahsulotlar Va Menyu</h2>
                <p className="text-xs text-gray-500">Fast-food taomlarini tahrirlash va o‘chirish</p>
              </div>
              <button 
                onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
                className="px-4 py-2 bg-[#D62828] text-white font-black text-xs rounded-xl flex items-center gap-1.5 shadow">
                <i data-lucide="plus-circle" className="w-4 h-4"></i> Yangi Taom Qo'shish
              </button>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-400 uppercase text-[10px]">
                    <th className="py-3 px-2">Rasm</th>
                    <th className="py-3 px-2">Nomi</th>
                    <th className="py-3 px-2">Kategoriya</th>
                    <th className="py-3 px-2">Narxi</th>
                    <th className="py-3 px-2 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-800/40">
                      <td className="py-3 px-2"><img src={p.image} className="w-10 h-10 rounded-xl object-cover" /></td>
                      <td className="py-3 px-2 font-black text-amber-100">{p.name}</td>
                      <td className="py-3 px-2 uppercase text-[10px] text-gray-500">{p.category}</td>
                      <td className="py-3 px-2 font-black text-[#D62828]">{formatMoney(p.price)}</td>
                      <td className="py-3 px-2 text-right space-x-2">
                        <button onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }} className="px-3 py-1.5 bg-amber-100 text-[#5C3A21] font-extrabold rounded-xl">Tahrirlash</button>
                        <button onClick={() => setDeleteConfirmId(p.id)} className="px-3 py-1.5 bg-red-100 text-red-600 font-extrabold rounded-xl">O'chirish</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}

      {/* ========================================== */}
      {/* 3. OTHER TABS                              */}
      {/* ========================================== */}
      {activeTab === "queue" && (
        <main className="max-w-7xl w-full mx-auto px-4 py-6">
          <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 p-6 shadow-sm">
            <h2 className="text-xl font-black font-display text-amber-200 mb-4">Oshxona Navbati</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ordersQueue.map(order => (
                <div key={order.orderId} className="bg-[#2A2A2A] rounded-2xl p-4 border border-gray-700 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between pb-2 border-b border-gray-700">
                      <span className="text-sm font-black text-amber-100">{order.orderId} ({order.customer})</span>
                      <span className="text-xs text-gray-400">{order.time}</span>
                    </div>
                    <div className="my-2 space-y-1 text-xs text-gray-300">
                      {order.items.map((it, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{it.qty}x {it.name}</span>
                          <span className="font-bold">{formatMoney(it.price * it.qty)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-700 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-black text-[#D62828]">{formatMoney(order.total)}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-white">{order.status}</span>
                    </div>
                    {currentUser.role !== "customer" && order.status === "new" && (
                      <button onClick={() => updateOrderStatus(order.orderId, "preparing")} className="w-full py-1.5 bg-[#FFC300] text-[#5C3A21] font-black text-xs rounded-xl">Tayyorlashga o'tish</button>
                    )}
                    {currentUser.role !== "customer" && order.status === "preparing" && (
                      <button onClick={() => updateOrderStatus(order.orderId, "ready")} className="w-full py-1.5 bg-[#3A7D44] text-white font-black text-xs rounded-xl">Tayyor</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {activeTab === "reports" && (
        <main className="max-w-7xl w-full mx-auto px-4 py-6">
          <div className="bg-[#1E1E1E] p-6 rounded-3xl border border-gray-800">
            <p className="text-xs text-gray-400 font-bold uppercase">Bugungi Tushum</p>
            <p className="text-2xl font-black text-[#D62828] mt-1">5 480 000 UZS</p>
          </div>
        </main>
      )}

      {activeTab === "admin" && currentUser.role === "admin" && (
        <main className="max-w-7xl w-full mx-auto px-4 py-6">
          <div className="bg-[#1E1E1E] p-6 rounded-3xl border border-gray-800">
            <h2 className="text-xl font-black text-amber-200">Admin Boshqaruv Markazi</h2>
            <p className="text-xs text-gray-400 mt-1">Barcha restoranlar va tizim sozlamalari nazorati.</p>
          </div>
        </main>
      )}

      {activeTab === "profile" && (
        <main className="max-w-4xl w-full mx-auto px-4 py-6">
          <div className="bg-[#1E1E1E] rounded-3xl border border-gray-800 p-6 sm:p-8 shadow-sm">
            <h1 className="text-xl font-black text-amber-200 mb-4">{currentUser.name} Profili</h1>
            <p className="text-xs text-gray-400 mb-4">Email: {currentUser.email} | Rol: {currentUser.role}</p>

            {profileSuccessMsg && (
              <div className="mb-4 p-3 bg-green-50 text-green-700 text-xs font-bold rounded-xl text-center">
                {profileSuccessMsg}
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1 text-gray-300">Ism</label>
                <input type="text" value={profileEditName} onChange={e => setProfileEditName(e.target.value)} required className="w-full p-2.5 border rounded-xl bg-gray-800 text-white" />
              </div>
              <div>
                <label className="block font-bold mb-1 text-gray-300">Telefon</label>
                <input type="text" value={profileEditPhone} onChange={e => setProfileEditPhone(e.target.value)} required className="w-full p-2.5 border rounded-xl bg-gray-800 text-white" />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-5 py-2.5 bg-[#D62828] text-white font-black rounded-xl">Saqlash</button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* Receipts Modal */}
      {isReceiptOpen && activeReceipt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-gray-800 text-center">
            <h2 className="text-lg font-black text-[#D62828]">Buyurtma Qabul Qilindi!</h2>
            <p className="text-xs text-gray-400 mb-4">Chek #: {activeReceipt.orderId}</p>
            <button onClick={closeReceiptAndResetCart} className="w-full py-2 bg-[#D62828] text-white font-bold text-xs rounded-xl">Yopish</button>
          </div>
        </div>
      )}

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] w-full max-w-lg rounded-3xl p-6 border border-gray-800">
            <h3 className="text-base font-black text-amber-200 mb-4">{editingProduct ? "Taomni Tahrirlash" : "Yangi Taom Qo'shish"}</h3>
            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <input name="name" defaultValue={editingProduct?.name || ""} placeholder="Taom nomi" required className="w-full p-2.5 border rounded-xl bg-gray-800 text-white" />
              <select name="category" defaultValue={editingProduct?.category || "burgers"} className="w-full p-2.5 border rounded-xl bg-gray-800 text-white">
                <option value="burgers">Burgerlar</option>
                <option value="combos">Kombolar</option>
                <option value="chicken">Tovuq</option>
                <option value="pizza">Pitsa</option>
                <option value="sides">Sneklar</option>
              </select>
              <input name="price" type="number" defaultValue={editingProduct?.price || 30000} placeholder="Narxi" required className="w-full p-2.5 border rounded-xl bg-gray-800 text-white" />
              <input name="image" defaultValue={editingProduct?.image || ""} placeholder="Rasm URL" className="w-full p-2.5 border rounded-xl bg-gray-800 text-white" />
              <textarea name="description" defaultValue={editingProduct?.description || ""} placeholder="Tavsif" rows="3" className="w-full p-2.5 border rounded-xl bg-gray-800 text-white"></textarea>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="px-4 py-2 bg-gray-700 text-white font-bold rounded-xl">Bekor qilish</button>
                <button type="submit" className="px-4 py-2 bg-[#D62828] text-white font-black rounded-xl">Saqlash</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E1E1E] w-full max-w-sm rounded-3xl p-6 border border-gray-800 text-center">
            <h4 className="text-base font-black text-amber-200">Mahsulotni o'chirish</h4>
            <p className="text-xs text-gray-400 mt-1 mb-5">Haqiqatan ham ushbu mahsulotni menyudan o'chirmoqchimisiz?</p>
            <div className="flex justify-center gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="px-4 py-2 bg-gray-700 text-white font-bold text-xs rounded-xl">Bekor qilish</button>
              <button onClick={() => confirmDeleteProduct(deleteConfirmId)} className="px-4 py-2 bg-[#D62828] text-white font-black text-xs rounded-xl">O'chirish</button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#1E1E1E] border-t border-gray-800 py-3 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
          <p>&copy; 2026 <strong>tezqafe.demo</strong> - Barcha panellar va funksiyalar muvaffaqiyatli ishlayapti.</p>
        </div>
      </footer>

    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);