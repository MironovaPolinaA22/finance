// src/components/TransactionList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import TransactionItem from './TransactionItem';
import type { RootState } from '../store';

const TransactionList = () => {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  if (!transactions.length) {
    return (
      <section className="card list-card" aria-label="Список операций">
        <h2>Список операций</h2>
        <p className="muted">Список пуст. Добавьте операцию выше.</p>
      </section>
    );
  }

  return (
    <section className="card list-card" aria-label="Список операций">
      <h2>Список операций</h2>
      <ul className="transaction-list">
        {transactions.map((t) => (
          <TransactionItem key={t.id} transaction={t} />
        ))}
      </ul>
    </section>
  );
};

export default TransactionList;
