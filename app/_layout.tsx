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
import { Platform, LogBox } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore error
});

// Ignore specific warnings that might affect Android
LogBox.ignoreLogs(['Warning: ...']); // you can specify warnings to ignore

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  useEffect(() => {
    if (error) {
      console.error('Error loading fonts:', error);
    }
  }, [error]);

  useEffect(() => {
    const hideSplash = async () => {
      try {
        if (loaded) {
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.error('Error hiding splash screen:', e);
      }
    };

    hideSplash();
  }, [loaded]);

  if (!publishableKey) {
    console.error('Missing Publishable Key');
    return null;
  }

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{
              animation: Platform.OS === 'android' ? 'none' : 'default',
            }}>
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
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </ThemeProvider>
        </ClerkLoaded>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
