// src/utils/date.ts

export const toDateInputValue = (d: Date = new Date()): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // yyyy-mm-dd
};

export const formatDateDisplay = (isoDate: string): string => {
  if (!isoDate) return '';
  // Ожидаем yyyy-mm-dd
  const parts = isoDate.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    if (year && month && day) return `${day}-${month}-${year}`;
  }
  // Фолбэк на безопасный способ
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return isoDate;
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};