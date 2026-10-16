// ============================================================
// CategoryNavBar — reference-style icon strip, TezQafe colors
// ============================================================

import React from 'react';
import { Soup, Flame, Sandwich, Drumstick, Pizza, CupSoda } from 'lucide-react';
import type { CategoryDef } from '../types';

function IconFries({ className = 'w-7 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 10h12l-1.4 10.2H7.4L6 10z" />
      <path d="M7.2 10V6.2h1.8V10" />
      <path d="M9.6 10V4.5h1.8V10" />
      <path d="M12.1 10V5.4h1.8V10" />
      <path d="M14.6 10V6.8h1.8V10" />
    </svg>
  );
}

interface CategoryItemMeta {
  shortLabel: string;
  icon: React.ReactNode;
}

function categoryMeta(id: string, iconClass: string): CategoryItemMeta {
  const icons: Record<string, React.ReactNode> = {
    all: <Soup className={iconClass} strokeWidth={1.6} />,
    combos: <Flame className={iconClass} strokeWidth={1.6} />,
    burgers: <Sandwich className={iconClass} strokeWidth={1.6} />,
    chicken: <Drumstick className={iconClass} strokeWidth={1.6} />,
    pizza: <Pizza className={iconClass} strokeWidth={1.6} />,
    sides: <IconFries className={iconClass} />,
    drinks: <CupSoda className={iconClass} strokeWidth={1.6} />,
  };

  const labels: Record<string, string> = {
    all: 'BARCHASI',
    combos: 'KOMBOLAR',
    burgers: 'BURGERLAR',
    chicken: 'TOVUQ',
    pizza: 'PITSA',
    sides: 'QOSHIMCHA',
    drinks: 'ICHIMLIKLAR',
  };

  return {
    shortLabel: labels[id] || id.toUpperCase(),
    icon: icons[id] || <Soup className={iconClass} strokeWidth={1.6} />,
  };
}

interface CategoryNavBarProps {
  categories: CategoryDef[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function CategoryNavBar({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryNavBarProps) {
  return (
    <nav
      aria-label="Taom kategoriyalari"
      className="w-full overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1A1A1A] shadow-sm"
    >
      <div className="flex items-stretch overflow-x-auto no-scrollbar">
        {categories.map((cat, index) => {
          const isSelected = selectedCategory === cat.id;
          const meta = categoryMeta(cat.id, 'w-7 h-7');

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`relative flex-1 min-w-[88px] py-3 px-1.5 flex flex-col items-center justify-center gap-1.5 select-none cursor-pointer group transition-colors ${
                isSelected
                  ? 'bg-gradient-to-r from-[#D62828] via-[#C01F1F] to-[#9A1616] text-white'
                  : 'bg-transparent hover:bg-[#FFF8EC] dark:hover:bg-white/[0.04]'
              }`}
            >
              {index > 0 && (
                <span
                  aria-hidden
                  className={`absolute left-0 top-[16%] bottom-[16%] w-px ${
                    isSelected ? 'bg-white/15' : 'bg-[#E8D5B5] dark:bg-[#3A2A18]'
                  }`}
                />
              )}

              <span
                className={`transition-transform duration-200 ${
                  isSelected
                    ? 'text-[#FFC300] scale-110'
                    : 'text-[#C9971A] dark:text-[#FFC300] group-hover:scale-110 group-hover:text-[#D62828] dark:group-hover:text-[#FFC300]'
                }`}
              >
                {meta.icon}
              </span>

              <span
                className={`text-[10px] font-black tracking-wider uppercase whitespace-nowrap text-center ${
                  isSelected
                    ? 'text-white'
                    : 'text-[#5C3A21] dark:text-[#FFC300] group-hover:text-[#D62828] dark:group-hover:text-white'
                }`}
              >
                {meta.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
