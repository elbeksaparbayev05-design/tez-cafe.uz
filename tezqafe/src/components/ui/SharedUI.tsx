// ============================================================
// Shared UI Components — TezQafe
// ============================================================

import React from 'react';
import { CheckCircle, AlertTriangle, X } from 'lucide-react';

// ---- Brand Logo ----
export function TezQafeLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-14 h-14' : 'w-10 h-10';
  const textSize = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-4xl' : 'text-2xl';

  return (
    <div className="flex items-center gap-2.5">
      <img 
        src="/logo.jpg" 
        alt="TezQafe Logo" 
        className={`${iconSize} rounded-xl object-contain shadow-md`}
      />
      <div>
        <span className={`${textSize} font-black font-display tracking-tight text-[#5C3A21] dark:text-amber-200`}>
          tez<span className="text-[#D62828]">qafe</span>
        </span>
        <span className="block text-[10px] font-extrabold tracking-widest text-[#D62828] uppercase -mt-1">
          Express Fast Food
        </span>
      </div>
    </div>
  );
}

// ---- Toast Notification ----
export function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="fixed top-20 right-4 z-[100] bg-[#3A7D44] text-white px-4 py-3 rounded-xl shadow-lg text-xs font-black flex items-center gap-2 animate-pulse">
      <CheckCircle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

// ---- Modal Wrapper ----
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={`bg-white dark:bg-[#1E1E1E] w-full ${maxWidth} rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[90vh] overflow-y-auto`}>
        {title && (
          <div className="flex justify-between items-center p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-base font-black font-display text-[#5C3A21] dark:text-amber-200">{title}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// ---- Confirm Dialog ----
interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  confirmClass?: string;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "O'chirish",
  confirmClass = 'bg-[#D62828] text-white',
}: ConfirmDialogProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div className="bg-white dark:bg-[#1E1E1E] w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-gray-200 dark:border-gray-800 text-center">
        <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/40 mx-auto flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6 text-[#D62828]" />
        </div>
        <h4 className="text-base font-black text-[#5C3A21] dark:text-amber-200 mb-2">{title}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-xs rounded-xl hover:bg-gray-300 transition-all"
          >
            Bekor qilish
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 font-black text-xs rounded-xl transition-all active:scale-95 ${confirmClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Status Badge ----
export function StatusBadge({ status }: { status: string }) {
  const classes: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    preparing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    ready: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    delivered: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  };
  const labels: Record<string, string> = {
    new: 'Yangi',
    preparing: 'Tayyorlanmoqda',
    ready: 'Tayyor',
    delivered: 'Yetkazildi',
    cancelled: 'Bekor qilindi',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase ${classes[status] || 'bg-gray-100 text-gray-600'}`}>
      {labels[status] || status}
    </span>
  );
}

// ---- Empty State ----
export function EmptyState({ icon, title, description }: { icon: React.ReactNode; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 text-gray-400">
        {icon}
      </div>
      <p className="text-sm font-black text-gray-600 dark:text-gray-400">{title}</p>
      {description && <p className="text-xs text-gray-400 mt-1 max-w-xs">{description}</p>}
    </div>
  );
}

// ---- Spinner ----
export function Spinner() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-8 h-8 border-4 border-[#D62828]/20 border-t-[#D62828] rounded-full animate-spin" />
    </div>
  );
}

// ---- Stat Card ----
export function StatCard({ label, value, color = 'text-[#D62828]', icon }: { label: string; value: string | number; color?: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wide">{label}</p>
          <p className={`text-2xl font-black mt-1 ${color}`}>{value}</p>
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
