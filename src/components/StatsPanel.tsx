// src/components/StatsPanel.tsx
import React from 'react';
import { formatCurrency } from '../utils/currency';
import type { Transaction } from '../store/types'; 
import type { FC } from 'react'; 

type Props = { transactions: Transaction[] };

const StatsPanel: FC<Props> = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <section className="stats panel" aria-label="Блок статистики">
      <div className="stat-card">
        <div className="stat-label">Баланс</div>
        <div className={`stat-value ${balance >= 0 ? 'positive' : 'negative'}`}>
          {formatCurrency(balance)}
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Доходы</div>
        <div className="stat-value income">{formatCurrency(totalIncome)}</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Расходы</div>
        <div className="stat-value expense">{formatCurrency(totalExpense)}</div>
      </div>
    </section>
  );
};

export default StatsPanel;
