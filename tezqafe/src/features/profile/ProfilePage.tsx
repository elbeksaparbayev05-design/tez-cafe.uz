// ============================================================
// Profile Page Component — TezQafe
// ============================================================

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LogOut, ShoppingBag, MapPin, Heart, Camera, X, Pencil, Check, XCircle } from 'lucide-react';

export function ProfilePage() {
  const { currentUser, logout, updateProfile, setActiveTab } = useApp();
  const [editingName, setEditingName] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [tempName, setTempName] = useState(currentUser?.name || '');
  const [tempPhone, setTempPhone] = useState(currentUser?.phone || '');
  const [tempEmail, setTempEmail] = useState(currentUser?.email || '');
  const [showAvatarUpload, setShowAvatarUpload] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(currentUser?.avatar || null);

  if (!currentUser) return null;

  const handleNameSave = () => {
    if (tempName.trim()) {
      updateProfile({ name: tempName.trim() });
      setEditingName(false);
    }
  };

  const handlePhoneSave = () => {
    if (tempPhone.trim()) {
      updateProfile({ phone: tempPhone.trim() });
      setEditingPhone(false);
    }
  };

  const handleEmailSave = () => {
    if (tempEmail.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tempEmail)) {
      updateProfile({ email: tempEmail.trim() });
      setEditingEmail(false);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Faqat rasm fayllari yuklash mumkin!');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Rasm hajmi 2MB dan oshmasligi kerak!');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setAvatarPreview(base64);
      updateProfile({ avatar: base64 });
      setShowAvatarUpload(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    updateProfile({ avatar: undefined });
    setShowAvatarUpload(false);
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      customer: 'MIJOZ',
      seller: 'SOTUVCHI',
      admin: 'ADMIN',
    };
    return labels[role] || role.toUpperCase();
  };

  const menuItems = [
    ...(currentUser.role === 'customer'
      ? [
          { icon: <ShoppingBag className="w-4 h-4" />, label: 'Buyurtmalar tarixi', action: () => setActiveTab('my-orders') },
          { icon: <MapPin className="w-4 h-4" />, label: 'Yetkazib berish manzillari', action: () => {} },
          { icon: <Heart className="w-4 h-4" />, label: 'Sevimli taomlar', action: () => setActiveTab('favorites') },
        ]
      : []),
  ];

  return (
    <main className="max-w-2xl w-full mx-auto px-4 py-6">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-[#E2D8C0] dark:border-gray-800 p-4 sm:p-6 shadow-sm transition-colors">
        {/* Header with Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-5 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#FFC300] text-[#5C3A21] font-black flex items-center justify-center text-2xl overflow-hidden border-4 border-[#E2D8C0] dark:border-gray-700">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                getInitials(currentUser.name)
              )}
            </div>
            <button
              onClick={() => setShowAvatarUpload(!showAvatarUpload)}
              className="absolute bottom-0 right-0 w-7 h-7 bg-[#D62828] text-white rounded-full flex items-center justify-center hover:bg-[#B81D1D] transition-colors shadow-sm"
              title="Rasmni o'zgartirish"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="px-3 py-1.5 bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 rounded-lg text-sm font-black text-[#5C3A21] dark:text-amber-100 focus:outline-none focus:ring-2 focus:ring-[#D62828]"
                    autoFocus
                  />
                  <button onClick={handleNameSave} className="p-1 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/60 transition-colors">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => { setEditingName(false); setTempName(currentUser.name); }} className="p-1 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                    <XCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <h1 className="text-xl font-black font-display text-[#5C3A21] dark:text-amber-200">
                  {currentUser.name}
                </h1>
              )}
              {!editingName && (
                <button onClick={() => setEditingName(true)} className="p-1 text-gray-400 hover:text-[#D62828] transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-xs text-[#D62828] font-bold uppercase mb-2">{getRoleLabel(currentUser.role)}</p>
            
            {/* Phone */}
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              {editingPhone ? (
                <div className="flex items-center gap-2">
                  <input
                    type="tel"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    className="px-3 py-1 bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 rounded-lg text-xs text-[#1F1F1F] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]"
                    placeholder="+998 90 123 45 67"
                  />
                  <button onClick={handlePhoneSave} className="p-1 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/60 transition-colors">
                    <Check className="w-3 h-3" />
                  </button>
                  <button onClick={() => { setEditingPhone(false); setTempPhone(currentUser.phone); }} className="p-1 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                    <XCircle className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currentUser.phone}
                </p>
              )}
              {!editingPhone && (
                <button onClick={() => setEditingPhone(true)} className="text-[10px] text-[#D62828] font-bold hover:underline">
                  Tahrirlash
                </button>
              )}
            </div>

            {/* Email */}
            <div className="flex items-center justify-center sm:justify-start gap-2">
              {editingEmail ? (
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    className="px-3 py-1 bg-[#FFF8EC] dark:bg-[#2A2A2A] border border-[#E2D8C0] dark:border-gray-700 rounded-lg text-xs text-[#1F1F1F] dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D62828]"
                  />
                  <button onClick={handleEmailSave} className="p-1 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/60 transition-colors">
                    <Check className="w-3 h-3" />
                  </button>
                  <button onClick={() => { setEditingEmail(false); setTempEmail(currentUser.email); }} className="p-1 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors">
                    <XCircle className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currentUser.email}
                </p>
              )}
              {!editingEmail && (
                <button onClick={() => setEditingEmail(true)} className="text-[10px] text-[#D62828] font-bold hover:underline">
                  Tahrirlash
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Avatar Upload Modal */}
        {showAvatarUpload && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 max-w-sm w-full border border-[#E2D8C0] dark:border-gray-700">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-base font-black text-[#5C3A21] dark:text-amber-200">Rasmni o'zgartirish</h3>
                <button onClick={() => setShowAvatarUpload(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              {avatarPreview && (
                <div className="mb-3 flex justify-center">
                  <img src={avatarPreview} alt="Preview" className="w-28 h-28 rounded-full object-cover border-4 border-[#E2D8C0] dark:border-gray-700" />
                </div>
              )}

              <div className="space-y-2.5">
                <label className="block w-full py-2.5 bg-[#D62828] text-white font-black text-center rounded-xl cursor-pointer hover:bg-[#B81D1D] transition-colors">
                  Rasmni tanlash
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
                {avatarPreview && (
                  <button
                    onClick={handleRemoveAvatar}
                    className="w-full py-2.5 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-black rounded-xl hover:bg-red-200 dark:hover:bg-red-950/60 transition-colors"
                  >
                    Rasmni o'chirish
                  </button>
                )}
              </div>
              
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-2.5 text-center">
                    Maksimal hajm: 2MB. Format: JPG, PNG
                  </p>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="space-y-2 mb-5">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full flex items-center gap-3 p-3 bg-[#FFF8EC] dark:bg-[#2A2A2A] rounded-2xl border border-[#E2D8C0] dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="w-9 h-9 bg-[#FFC300] dark:bg-[#D62828] rounded-xl flex items-center justify-center text-[#5C3A21] dark:text-white group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="flex-1 text-left text-sm font-black text-[#5C3A21] dark:text-gray-200">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 dark:bg-red-950/30 text-[#D62828] font-black rounded-2xl hover:bg-red-100 dark:hover:bg-red-950/50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Tizimdan chiqish
        </button>
      </div>
    </main>
  );
}
