// src/components/TransactionForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../store/slices/transactionsSlice';
import { v4 as uuidv4 } from 'uuid';
import type { AppDispatch } from '../store';
import type { Transaction, TransactionType } from '../store/types';

const CATEGORIES: { [K in TransactionType]: string[] } = {
  income: ['Зарплата', 'Фриланс', 'Подарок', 'Другое'],
  expense: ['Еда', 'Транспорт', 'Жильё', 'Развлечения', 'Здоровье', 'Другое'],
};

type FormErrors = {
  title?: string;
  amount?: string;
  category?: string;
  date?: string;
};

const TransactionForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});

  const categories = CATEGORIES[type];

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!title.trim()) e.title = 'Название не должно быть пустым';
    if (!amount.trim()) e.amount = 'Сумма обязательна';
    else if (Number(amount) <= 0) e.amount = 'Сумма должна быть больше 0';
    if (!category) e.category = 'Выберите категорию';
    if (!date) e.date = 'Выберите дату';
    return e;
  };

  const reset = () => {
    setTitle('');
    setAmount('');
    setType('expense');
    setCategory('');
    setDate('');
    setErrors({});
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }
    const tx: Transaction = {
      id: uuidv4(),
      title: title.trim(),
      amount: parseFloat(amount),
      type,
      category,
      date,
    };
    dispatch(addTransaction(tx));
    reset();
  };

  return (
    <section className="card form-card" aria-label="Форма добавления операции">
      <h2>Добавить операцию</h2>
      <form onSubmit={onSubmit} className="form-grid">
        <div className="field">
          <label>Название операции</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например, Обед в кафе"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="field">
          <label>Сумма</label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>

        <div className="field">
          <label>Тип операции</label>
          <select value={type} onChange={(e) => { setType(e.target.value as TransactionType); setCategory(''); }}>
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
          </select>
        </div>

        <div className="field">
          <label>Категория</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Выберите категорию</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="field">
          <label>Дата</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="field-full">
          <button type="submit" className="btn btn-primary">Добавить</button>
        </div>
      </form>
    </section>
  );
};

export default TransactionForm;
