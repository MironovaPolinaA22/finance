import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from '../types';

type TransactionsState = {
  transactions: Transaction[];
};

const initialState: TransactionsState = { transactions: [] };

const slice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions(state: TransactionsState, action: PayloadAction<Transaction[]>) {
      state.transactions = action.payload;
    },
    addTransaction(state: TransactionsState, action: PayloadAction<Transaction>) {
      state.transactions.push(action.payload);
    },
    deleteTransaction(state: TransactionsState, action: PayloadAction<string>) {
      state.transactions = state.transactions.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setTransactions, addTransaction, deleteTransaction } = slice.actions;
export default slice.reducer;
