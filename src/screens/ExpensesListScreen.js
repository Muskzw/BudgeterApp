import React from 'react';
import { FlatList, View } from 'react-native';
import { List, IconButton, Text, FAB } from 'react-native-paper';
import { useExpenses } from '../context/ExpensesContext';
import { format } from 'date-fns';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CATEGORY_ICONS } from '../constants/categories';

export default function ExpensesListScreen({ navigation }) {
  const { expenses, deleteExpense } = useExpenses();

  const renderItem = ({ item }) => (
    <List.Item
      title={`${item.category}`}
      description={`${format(new Date(item.date), 'PPP')}  ${item.notes || ''}`}
      left={() => (
        <MaterialIcons
          name={CATEGORY_ICONS[item.category] || 'circle'}
          size={24}
          style={{ alignSelf: 'center', marginHorizontal: 8 }}
        />
      )}
      right={() => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 8 }}>${item.amount.toFixed(2)}</Text>
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
      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        onPress={() => navigation.navigate('Add')}
      />
    </View>
  );
}


