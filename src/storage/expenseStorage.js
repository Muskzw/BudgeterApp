import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'BUDGETER_EXPENSES_V1';

export async function loadExpenses() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (error) {
    console.warn('loadExpenses error', error);
    return [];
  }
}

export async function saveExpenses(expenses) {
  try {
    const json = JSON.stringify(expenses);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.warn('saveExpenses error', error);
  }
}


