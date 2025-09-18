import React from 'react';
import { FlatList, View } from 'react-native';
import { List, IconButton, Text } from 'react-native-paper';
import { useExpenses } from '../context/ExpensesContext';
import { format } from 'date-fns';

export default function ExpensesListScreen({ navigation }) {
  const { expenses, deleteExpense } = useExpenses();

  const renderItem = ({ item }) => (
    <List.Item
      title={`${item.category} - $${item.amount.toFixed(2)}`}
      description={`${format(new Date(item.date), 'PPP')}  ${item.notes || ''}`}
      right={() => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton icon="pencil" onPress={() => navigation.navigate('Add', { expense: item })} />
          <IconButton icon="delete" onPress={() => deleteExpense(item.id)} />
        </View>
      )}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {expenses.length === 0 ? (
        <View style={{ padding: 16 }}>
          <Text>No expenses yet. Tap Add to create one.</Text>
        </View>
      ) : (
        <FlatList data={expenses} keyExtractor={(e) => e.id} renderItem={renderItem} />
      )}
    </View>
  );
}


