## BudgeterApp (Expo + React Native)

Beginner-friendly budget tracker with add/edit/delete expenses, totals per category, AsyncStorage persistence, and an optional simple prediction using TensorFlow.js (with a naive fallback if TFJS isn't installed).

### 1) Prerequisites
- Node.js 18+ and npm
- Expo Go app on your Android/iOS device (from app store)
- Optional: Android Studio (emulator) or Xcode (iOS simulator; Mac only)

### 2) Install
```bash
cd BudgeterApp
npm install
# Optional ML
npm i @tensorflow/tfjs
```

### 3) Run
```bash
npm run start
# press a for Android emulator, i for iOS simulator (Mac), or scan QR with Expo Go
```

### 4) Features
- Add expenses: amount, category, date, notes
- View list, edit or delete
- Stats: totals per category and overall
- Local storage via AsyncStorage
- Optional prediction card on Stats (next month’s spending)

### 5) Project Structure
```
src/
  components/PredictionCard.js
  context/ExpensesContext.js
  ml/predictor.js
  screens/
    AddEditExpenseScreen.js
    ExpensesListScreen.js
    StatsScreen.js
  storage/expenseStorage.js
App.js
```

### 6) Common beginner errors
- Metro bundler stuck: Stop all terminals, run `npm start -c` to clear cache.
- Android emulator not found: Open Android Studio > Device Manager > Start a device, then `a` in Expo.
- iOS build requires Mac: Use Expo Go on a physical iPhone by scanning the QR.
- AsyncStorage errors: Ensure `@react-native-async-storage/async-storage` installed; re-run `npx expo install ...` if needed.
- TFJS not installed: Prediction falls back to average; install `@tensorflow/tfjs` for linear regression.

### 7) Small extra features to try next
- Charts using `react-native-svg` and `react-native-svg-charts` or `victory-native`.
- Export to CSV with `expo-file-system` and `share` APIs.
- Monthly budget goals and progress bars.
- Categories with colors and icons.
- Filter/search by date range or category.

### 8) Notes
- All screens are intentionally simple and well-commented for learning.
- Data is stored locally only; uninstalling the app wipes data.


