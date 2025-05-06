# iBook: An AI-Powered Reading App

Ibook is a mobile reading application built with **Expo** and **React Native**, featuring an engaging user interface, a multi-step onboarding process, and core reading functionalities. It is designed to integrate backend services via **Supabase** and handle user authentication using **Clerk**. The project aims to provide an enhanced reading experience, including features like text highlighting, note-taking, and AI-assisted comprehension (as outlined in the `requirements.md`).

This repository contains the front-end code for the Ibook mobile application.

## ✨ Features

Based on the current structure and files, the project includes implementation or structure for:

*   **Multi-step Onboarding Flow:** Guides new users through initial setup steps and preferences.
*   **Authentication:** Integrates with Clerk for email/password sign-up/sign-in and structured placeholders for OAuth (Google, Apple).
*   **User Flow Management:** Tracks onboarding and preference completion using Async Storage.
*   **Tab-Based Navigation:** Core app screens (Home, Library, Notes, Chat) accessed via a custom tab bar.
*   **Homepage Dashboard:** Displays user profile, daily lessons, continue reading section, reading progress, streaks, and books read (components are present).
*   **Library View:** Displays a grid of books with basic search and add book placeholders (components are present).
*   **Notes/Highlights View:** Organized interface for viewing notes and highlights, including a daily lesson section (components are present).
*   **Reading Content Display:** Basic text rendering with touch handling.
*   **Interactive Text Selection:** Functionality for selecting text within the reading view.
*   **Text Selection Menu:** Custom menu for selected text with actions (Explain, Highlight, Save - actions are placeholders).
*   **Highlighting:** Basic implementation for adding highlights to text.
*   **Chat Sheet:** An overlay chat interface, potentially for AI interaction related to the book content (UI components are present).
*   **Database Schema:** Defined schema for books, users, user progress, highlights, notes, collections, reading stats, and AI explanations using PostgreSQL (designed for Supabase).

## 📦 Tech Stack

*   **Framework:** Expo
*   **UI Library:** React Native
*   **Navigation:** Expo Router (File-based routing)
*   **Authentication:** Clerk (with Expo SDK and SecureStore)
*   **Backend:** Supabase (Database - PostgreSQL with RLS, potentially Storage, Auth extensions)
*   **Styling:** React Native `StyleSheet`
*   **Animation:** React Native Reanimated
*   **Gestures:** React Native Gesture Handler
*   **Icons:** Phosphor React Native, Expo Symbols (iOS), MaterialIcons (Android/Web fallback)
*   **State Management:** React Hooks, Async Storage (for user flow)
*   **Other:** Expo Web Browser, `react-native-url-polyfill`

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v16 or higher recommended)
*   npm or yarn
*   An Expo account (optional, for using development builds)
*   A Clerk account and API keys
*   A Supabase project and API keys

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/madansap-ibook.git
    cd madansap-ibook
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Variables

This project uses environment variables, particularly for Clerk. You'll need to set these up.

1.  Create a `.env` file in the root of the project.
2.  Add your Clerk Publishable Key:
    ```env
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_CLERK_PUBLISHABLE_KEY
    ```
    (Replace `pk_test_YOUR_CLERK_PUBLISHABLE_KEY` with your actual key from the Clerk Dashboard)

    *   **Note:** Supabase keys are not explicitly used in the provided frontend files but would be required for backend integration. You may need to add them here later if implementing the Supabase integration fully.

### Running the App

1.  Start the Expo development server:
    ```bash
    npx expo start
    # or
    yarn start
    ```

2.  In the output, you'll find options to open the app in:
    *   An Expo Go app (on your device or simulator)
    *   A custom development build (recommended for native features)
    *   Android emulator
    *   iOS simulator
    *   Web browser

Press the corresponding key in the terminal (e.g., `a` for Android, `i` for iOS, `w` for web).

### Supabase Database Setup

If you plan to connect to a Supabase backend and utilize the defined schema:

1.  Create a new project on [Supabase](https://supabase.com/).
2.  Go to the `SQL Editor`.
3.  Copy the content from `lib/database/schema.sql`.
4.  Paste and run the script in the Supabase SQL Editor to create the necessary tables, enums, and RLS policies.

## 📁 Project Structure

The project uses Expo Router for file-based routing. Key directories include:

*   `app/`: Contains the application screens and routes.
    *   `(auth)/`: Authentication flows (Sign In, Sign Up, Email Auth).
    *   `(home)/`: Redirects to `(tabs)`.
    *   `(tabs)/`: Tab-based screens (Home, Library, Notes, Chat).
    *   `onboarding/`: Multi-step onboarding flow.
    *   `lib/database/`: Database schema and types.
    *   `utils/`: Utility functions (user flow, OAuth helpers).
*   `components/`: Reusable UI components, organized by feature area (Auth, Chat, Homepage, Onboarding, Reading, ui).
*   `assets/`: Static assets like fonts and images.
*   `constants/`: Application-wide constants (e.g., colors).
*   `hooks/`: Custom React hooks.
*   `screens/`: Standalone screens not managed by Expo Router's file structure (e.g., `BookDetailScreen` - note: `(tabs)` contains a `book-detail` route which might make this file redundant or used differently).
*   `scripts/`: Helper scripts (e.g., for resetting project state).

## 🔄 User Flow & Authentication

*   The `app/index.tsx` file acts as the main router entry point, checking the user's authentication status (via Clerk) and onboarding/preferences completion status (via Async Storage).
*   New users are directed through the `onboarding` flow.
*   Users who completed onboarding but are not signed in are directed to the `(auth)/sign-in` screen.
*   Authenticated users who haven't completed preferences are directed to the `onboarding/preferences` screen.
*   Fully onboarded and authenticated users are directed to the `(tabs)` interface.
*   Clerk authentication is handled in `app/(auth)/`, using `expo-secure-store` for token caching. OAuth handlers in `sign-in.tsx` and `sign-up.tsx` are currently simplified placeholders (`__DEV__` blocks).

## 📚 Reading Features

*   The `app/(tabs)/reading/content.tsx` screen displays book content.
*   The content is rendered using `TextInput` components within a `ScrollView` to enable native text selection handles.
*   A custom text selection menu (`components/Reading/TextSelectionMenu.tsx`) is positioned relative to the selected text, offering actions like "Explain", "Highlight", and "Save".
*   Basic highlighting functionality is implemented using the `HighlightedText` component.
*   Tapping the screen toggles a top toolbar and a bottom chat button. The chat button opens the `ChatSheet` overlay.

## 🔧 Scripts

The `package.json` includes several helper scripts:

*   `npm start` / `yarn start`: Starts the Expo development server.
*   `npm run android` / `yarn android`: Starts the app on a connected Android device or emulator.
*   `npm run ios` / `yarn ios`: Starts the app on a connected iOS device or simulator.
*   `npm run web` / `yarn web`: Starts the app in a web browser.
*   `npm test` / `yarn test`: Runs tests (using Jest).
*   `npm run lint` / `yarn lint`: Runs ESLint/TypeScript checks.
*   `npm run reset-project`: Resets the project to a blank state (moves existing `app`, `components`, etc. to `app-example` and creates a new blank `app` directory). **Use with caution.**
*   `npm run reset-onboarding`: Attempts to clear the onboarding completion status from Async Storage in the development environment.
*   `npm run reset-user-flow`: Attempts to clear both onboarding and preferences completion status from Async Storage in the development environment.

## 👋 Contributing

Contributions are welcome! Please feel free to open issues or pull requests.
