import React, { useMemo } from 'react';
import { View } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { useExpenses } from '../context/ExpensesContext';
import PredictionCard from '../components/PredictionCard';

function computeTotals(expenses) {
  const totalsByCategory = {};
  let overall = 0;
  for (const e of expenses) {
    const amt = Number(e.amount) || 0;
    overall += amt;
    totalsByCategory[e.category] = (totalsByCategory[e.category] || 0) + amt;
  }
  return { totalsByCategory, overall };
}

export default function StatsScreen() {
  const { expenses } = useExpenses();

  const { totalsByCategory, overall } = useMemo(() => computeTotals(expenses), [expenses]);

  const rows = Object.entries(totalsByCategory).sort((a, b) => b[1] - a[1]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="titleLarge" style={{ marginBottom: 8 }}>
        Totals By Category
      </Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title numeric>Amount</DataTable.Title>
        </DataTable.Header>
        {rows.map(([cat, amt]) => (
          <DataTable.Row key={cat}>
            <DataTable.Cell>{cat}</DataTable.Cell>
            <DataTable.Cell numeric>${amt.toFixed(2)}</DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Row>
          <DataTable.Cell>
            <Text variant="titleMedium">Overall</Text>
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <Text variant="titleMedium">${overall.toFixed(2)}</Text>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      <PredictionCard expenses={expenses} />
    </View>
  );
}


