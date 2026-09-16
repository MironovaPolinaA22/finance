// src/components/TransactionItem.tsx
import React from 'react';
import { formatCurrency } from '../utils/currency';
import { useDispatch } from 'react-redux';
import { deleteTransaction } from '../store/slices/transactionsSlice';
import type { Transaction } from '../store/types';

type Props = {
  transaction: Transaction;
};

const TransactionItem = ({ transaction }: Props) => {
  const dispatch = useDispatch();

  const colorClass = transaction.type === 'income' ? 'income' : 'expense';
  
  return (
    <li className={`transaction-item ${colorClass}`} aria-label={`Операция: ${transaction.title}`}>
      <div className="item-left">
        <div className="item-title">{transaction.title}</div>
        <div className="item-meta">
          {transaction.category} • {transaction.date}
        </div>
      </div>
      <div className="item-right">
        <div className="item-amount">{formatCurrency(transaction.amount)}</div>
        <button
          className="btn btn-icon"
          onClick={() => {
            dispatch(deleteTransaction(transaction.id));
          }}
          aria-label="Удалить"
        >
          &times;
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;
