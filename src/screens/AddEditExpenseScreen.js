import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, HelperText, Text, Chip } from 'react-native-paper';
import { useExpenses } from '../context/ExpensesContext';
import { format } from 'date-fns';
import { DEFAULT_CATEGORIES } from '../constants/categories';

const defaultExpense = {
  amount: '',
  category: '',
  date: new Date().toISOString(),
  notes: '',
};

export default function AddEditExpenseScreen({ route, navigation }) {
  const { addExpense, updateExpense } = useExpenses();
  const editing = route?.params?.expense || null;
  const [form, setForm] = useState(defaultExpense);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editing) {
      setForm({
        amount: String(editing.amount),
        category: editing.category,
        date: editing.date,
        notes: editing.notes || '',
      });
    }
  }, [editing]);

  const onSave = () => {
    const amountNum = Number(form.amount);
    if (Number.isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }
    if (!form.category) {
      setError('Please enter a category');
      return;
    }
    setError('');
    if (editing) {
      updateExpense(editing.id, {
        amount: amountNum,
        category: form.category,
        date: form.date,
        notes: form.notes,
      });
    } else {
      addExpense({
        amount: amountNum,
        category: form.category,
        date: form.date,
        notes: form.notes,
      });
    }
    navigation.navigate('Expenses');
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <TextInput
        label="Amount"
        value={String(form.amount)}
        keyboardType="decimal-pad"
        onChangeText={(t) => setForm((f) => ({ ...f, amount: t }))}
      />
      <TextInput
        label="Category"
        value={form.category}
        onChangeText={(t) => setForm((f) => ({ ...f, category: t }))}
      />
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
        {DEFAULT_CATEGORIES.map((c) => (
          <Chip
            key={c}
            selected={form.category === c}
            onPress={() => setForm((f) => ({ ...f, category: c }))}
            style={{ marginVertical: 4 }}
          >
            {c}
          </Chip>
        ))}
      </View>
      <TextInput
        label="Date"
        value={format(new Date(form.date), 'yyyy-MM-dd')}
        onChangeText={(t) => {
          const safe = new Date(t);
          if (!isNaN(safe.getTime())) setForm((f) => ({ ...f, date: safe.toISOString() }));
        }}
        placeholder="YYYY-MM-DD"
      />
      <TextInput
        label="Notes"
        value={form.notes}
        onChangeText={(t) => setForm((f) => ({ ...f, notes: t }))}
        multiline
      />
      {!!error && (
        <HelperText type="error" visible>
          {error}
        </HelperText>
      )}
      <Button mode="contained" onPress={onSave}>
        {editing ? 'Update Expense' : 'Add Expense'}
      </Button>
    </View>
  );
}


