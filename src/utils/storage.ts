// src/utils/storage.ts

import type { Transaction } from '../store/types';

const STORAGE_KEY = 'finance_transactions_v1';

export const loadFromStorage = (): Transaction[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Transaction[]) : [];
  } catch {
    return [];
  }
};

export const saveToStorage = (transactions: Transaction[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};