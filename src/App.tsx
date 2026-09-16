// src/App.tsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store'; // type-only импорт
import { setTransactions } from './store/slices/transactionsSlice';
import { loadFromStorage, saveToStorage } from './utils/storage';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import StatsPanel from './components/StatsPanel';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);

  useEffect(() => {
    const loaded = loadFromStorage();
    if (loaded.length) {
      dispatch(setTransactions(loaded));
    }
  }, [dispatch]);

  useEffect(() => {
    saveToStorage(transactions);
  }, [transactions]);

  return (
    <div className="container">
      <h1 className="title">Финансы: учёт доходов и расходов</h1>
      <StatsPanel transactions={transactions} />
      <div className="grid">
        <TransactionForm />
        <TransactionList />
      </div>
    </div>
  );
}

export default App;