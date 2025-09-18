import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider, IconButton } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ExpensesProvider } from './src/context/ExpensesContext';
import { ThemeProvider, useThemeMode } from './src/context/ThemeContext';
import ExpensesListScreen from './src/screens/ExpensesListScreen';
import AddEditExpenseScreen from './src/screens/AddEditExpenseScreen';
import StatsScreen from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();

function AppInner() {
  const { isDark, setMode, mode } = useThemeMode();
  const base = isDark ? MD3DarkTheme : MD3LightTheme;
  const theme = {
    ...base,
    colors: {
      ...base.colors,
      primary: '#3b82f6',
      secondary: '#22c55e',
    },
  };
  const cycleMode = () => {
    setMode(mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light');
  };
  const modeIcon = mode === 'light' ? 'light-mode' : mode === 'dark' ? 'dark-mode' : 'settings-brightness';
  return (
    <PaperProvider theme={theme}>
      <ExpensesProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: true,
              headerRight: () => (
                <IconButton icon={modeIcon} onPress={cycleMode} accessibilityLabel="Toggle theme" />
              ),
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

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
