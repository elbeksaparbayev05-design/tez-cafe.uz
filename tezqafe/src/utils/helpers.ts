// ============================================================
// Utility Helpers — TezQafe
// ============================================================

export function formatMoney(amount: number): string {
  return amount.toLocaleString('uz-UZ') + ' UZS';
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function formatTime(): string {
  return new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
}

export function formatToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function generateOrderId(): string {
  return `#TQ-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    new: 'Yangi',
    preparing: 'Tayyorlanmoqda',
    ready: 'Tayyor',
    delivered: 'Yetkazildi',
    cancelled: 'Bekor qilindi',
  };
  return labels[status] || status;
}

export function getStatusClasses(status: string): string {
  const classes: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    preparing: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    ready: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    delivered: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
    cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  };
  return classes[status] || 'bg-gray-100 text-gray-600';
}

export function getOrderTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'dine-in': "Zalda o'tirish",
    takeaway: 'Olib ketish',
    delivery: "Yetkazib berish",
  };
  return labels[type] || type;
}

export function truncate(str: string, maxLen: number): string {
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str;
}
