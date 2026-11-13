# Little Lemon - React Native Capstone

A complete React Native application built with Expo for the **Meta React Native / Coursera Capstone** project.

---

## 🚀 How to Run the App

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the Expo development server:**
   ```bash
   npx expo start
   ```

3. **Open on Android:**
   - Scan the QR code using the **Expo Go** app on your Android device (ensure both computer and phone are connected to the same Wi-Fi network).
   - Alternatively, press `a` in the terminal to launch in an Android Emulator.

---

## 🛠️ Tech Stack & Libraries
- **Framework:** React Native (Expo SDK 51), React 18
- **Navigation:** `@react-navigation/native`, `@react-navigation/native-stack`
- **Safe Area:** `react-native-safe-area-context`
- **Storage:** `@react-native-async-storage/async-storage` (persisting profile, onboarding flag, and remote menu cache)
- **Image Picker:** `expo-image-picker` (for user profile avatar selection)
- **Menu API:** Meta Working-With-Data Remote API

---

## 📋 Features Mapped to Coursera Rubric (12 Questions)

| # | Coursera Rubric Criterion | Implementation Details |
|---|---|---|
| **1** | **Onboarding screen contains a header with Little Lemon logo** | Rendered via `<Header />` with brand title and styling at the top of `Onboarding.js`. |
| **2** | **Onboarding screen contains First Name and Email inputs** | Input fields for First Name (letters and spaces only) and Email format validation. |
| **3** | **Next button is disabled until name and email are valid** | "Next" button validates both inputs with regex. Button opacity and background change visibly when disabled/enabled. |
| **4** | **Clicking Next navigates to Home screen and saves state** | Saves `{ firstName, lastName: '', email, phone: '', image: null, notif: {...} }` and `onboarded = true` to AsyncStorage, dynamically transitioning the navigation stack. |
| **5** | **Home screen contains Header with logo and clickable avatar** | Header contains Little Lemon branding and user avatar (shows chosen photo or initials). Tapping avatar navigates to the Profile screen. |
| **6** | **Hero section on Home screen** | Green background (`#495E57`), yellow title (`#F4CE14`), Chicago subtitle, descriptive restaurant copy, hero image, and an interactive search bar. |
| **7** | **Menu fetched from remote server & cached** | Fetches JSON from Meta GitHub endpoint. Immediately loads cached dishes from AsyncStorage for instant offline access and updates when fetched. |
| **8** | **Category breakdown / filter chips** | Selectable category chips (*Starters*, *Mains*, *Desserts*, *Drinks*). Supports multi-select and toggling off to reset. Selected chips are clearly highlighted. |
| **9** | **Search bar filters dishes by title** | Real-time search query filtering dishes by title, combined with any active category chips. |
| **10** | **Profile screen contains user inputs & avatar actions** | Allows updating First Name, Last Name, Email, Phone (validated to 10 digits), and 4 Email Notification checkboxes (*Order statuses*, *Password changes*, *Special offers*, *Newsletter*). Includes **Change** and **Remove** buttons using `expo-image-picker`. |
| **11** | **Save & Discard changes work and persist** | "Save changes" writes to AsyncStorage (retained across app restarts). "Discard changes" resets to last saved values. |
| **12** | **Log out button clears data and returns to Onboarding** | Yellow "Log out" button clears AsyncStorage and resets navigation back to the Onboarding screen. |

---

## 📐 Wireframe
- Export your Figma wireframe design as **`wireframe.jpg`** and commit it directly to the root of this project before submitting.

---

## 📁 Project Structure

```
little-lemon/
├── App.js                     # Root component, AuthContext, Stack Navigator
├── screens/
│   ├── Onboarding.js          # Onboarding registration & validation
│   ├── Home.js                # Hero, search, category chips, FlatList menu
│   ├── Profile.js             # User profile, avatar picker, notification toggles
│   └── Header.js              # Reusable header with logo, back button & avatar
├── package.json               # Dependencies & scripts
├── README.md                  # Rubric mapping & run instructions
├── .gitignore                 # node_modules and .expo ignore
└── wireframe.jpg              # Figma wireframe image (added prior to submission)
```
