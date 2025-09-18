import 'react-native-get-random-values';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadExpenses, saveExpenses } from '../storage/expenseStorage';
import { v4 as uuidv4 } from 'uuid';

const ExpensesContext = createContext(null);

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await loadExpenses();
        setExpenses(data);
      } catch (error) {
        console.warn('Failed to load expenses', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    // Persist whenever expenses change
    saveExpenses(expenses).catch((e) => console.warn('Failed to save expenses', e));
  }, [expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      id: uuidv4(),
      amount: Number(expense.amount) || 0,
      category: expense.category || 'Other',
      date: expense.date || new Date().toISOString(),
      notes: expense.notes || '',
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const updateExpense = (id, updates) => {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const value = useMemo(
    () => ({ expenses, isLoading, addExpense, updateExpense, deleteExpense }),
    [expenses, isLoading]
  );

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export function useExpenses() {
  const ctx = useContext(ExpensesContext);
  if (!ctx) throw new Error('useExpenses must be used within ExpensesProvider');
  return ctx;
}


