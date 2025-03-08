import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from '@/cache';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
    );
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(home)" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding/splash" options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="onboarding/index" options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="onboarding/step1" options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="onboarding/step2" options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="onboarding/step3" options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="onboarding/auth" options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="onboarding/preferences" options={{ headerShown: false, gestureEnabled: false }} />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
