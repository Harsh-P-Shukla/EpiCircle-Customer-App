# EpiCircle Customer App

A modern, production-ready React Native (Expo) app for customers to schedule and manage scrap pickups.

---

## 🚀 Features
- **Authentication:** Login with phone number, OTP verification (mocked)
- **Dashboard:** Welcome banner, recent pickups, prominent schedule button
- **Schedule Pickup:** Form with date, time slot, address, Google Maps link
- **Order History:** Filterable, compact cards, status badges, approval flow
- **Persistent Session:** Uses AsyncStorage for login/session
- **Modern UI/UX:** Responsive, clean, card-based design, error handling, loading states
- **Reusable Components:** Cards, buttons, error messages, spinners, status badges
- **Logout:** Clears session and resets navigation

---

## 🧱 Tech Stack
- **React Native (Expo SDK 50+)**
- **React Navigation (Stack)**
- **Context API** for state management
- **AsyncStorage** for session persistence
- **react-native-vector-icons** for icons
- **expo-linear-gradient** for gradients
- **No real backend:** All data is local/mock

---

## 📂 Folder Structure
```
EpiCircle/
  ├── App.js
  ├── app.json
  ├── package.json
  ├── assets/                # App icons, splash, etc.
  ├── components/            # Reusable UI components
  ├── contexts/              # Context API logic (PickupContext.js)
  ├── screens/               # All app screens
  └── ...
```

---

## ⚡ Getting Started

1. **Clone the repo:**
   ```sh
   git clone <your-repo-url>
   cd EpiCircle
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start Expo:**
   ```sh
   npx expo start
   ```
4. **Run on device:**
   - Use Expo Go app (iOS/Android) or run on emulator/simulator

---

## 📝 Usage Notes
- **Login:** Enter any 10-digit phone number
- **OTP:** Use `123456` as the OTP (mocked)
- **Schedule Pickup:** Fill all fields, submit to add a pickup
- **Order History:** Filter by status, approve pickups, view codes
- **Logout:** Tap the logout icon in the header

---

## 🎨 Design Principles
- Material Design & iOS HIG inspired
- Card-based, soft colors, rounded corners, shadows
- Responsive and touch-friendly
- All errors and loading states are visible to the user

---

## 📦 Dependencies
- `@react-navigation/native`
- `@react-navigation/stack`
- `@react-native-async-storage/async-storage`
- `react-native-vector-icons`
- `expo-linear-gradient`
- `expo`

---

## 🛠️ Customization
- To change mock data, edit `contexts/PickupContext.js`
- To update branding, replace images in `assets/`

---

## 📄 License
MIT 