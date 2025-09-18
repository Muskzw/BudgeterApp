import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ExpensesProvider } from './src/context/ExpensesContext';
import ExpensesListScreen from './src/screens/ExpensesListScreen';
import AddEditExpenseScreen from './src/screens/AddEditExpenseScreen';
import StatsScreen from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <ExpensesProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: true,
              tabBarIcon: ({ color, size }) => {
                const iconMap = {
                  Expenses: 'list',
                  Add: 'add-circle-outline',
                  Stats: 'insights',
                };
                const name = iconMap[route.name] || 'circle';
                return <MaterialIcons name={name} size={size} color={color} />;
              },
            })}
          >
            <Tab.Screen name="Expenses" component={ExpensesListScreen} />
            <Tab.Screen name="Add" component={AddEditExpenseScreen} />
            <Tab.Screen name="Stats" component={StatsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ExpensesProvider>
    </PaperProvider>
  );
}
