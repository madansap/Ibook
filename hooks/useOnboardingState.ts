import { useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_COMPLETED_KEY = 'onboarding_completed';

/**
 * Hook to manage onboarding state
 * This ensures new users start from the splash screen
 * Returning users who completed onboarding will go directly to the homepage
 */
export function useOnboardingState() {
  const router = useRouter();
  const segments = useSegments();
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean | null>(null);
  
  // Check if onboarding has been completed before
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
        const completed = value === 'true';
        setIsOnboardingCompleted(completed);
        
        // Only navigate after the root layout is mounted
        // The segments array will be populated once the navigation is ready
        if (segments.length > 0) {
          const currentRoute = segments.join('/');
          
          // If onboarding is completed, go to homepage
          // Otherwise, go to splash screen
          // But don't redirect if we're already in the onboarding flow
          if (completed && !currentRoute.includes('onboarding')) {
            router.replace('/(tabs)');
          } else if (!completed && currentRoute === '') {
            // Only redirect to splash from the main index
            router.replace('/onboarding/splash');
          }
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        // Default to showing onboarding if there's an error
        if (segments.length > 0 && segments.join('/') === '') {
          router.replace('/onboarding/splash');
        }
      }
    };
    
    checkOnboardingStatus();
  }, [segments]);
  
  // Function to mark onboarding as completed
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      setIsOnboardingCompleted(true);
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };
  
  // Function to reset onboarding status (for testing)
  const resetOnboarding = async () => {
    try {
      await AsyncStorage.removeItem(ONBOARDING_COMPLETED_KEY);
      setIsOnboardingCompleted(false);
    } catch (error) {
      console.error('Error resetting onboarding status:', error);
    }
  };
  
  return {
    isOnboardingCompleted,
    completeOnboarding,
    resetOnboarding
  };
} 