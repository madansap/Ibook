import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { isOnboardingCompleted, isPreferencesCompleted } from './utils/userFlow';

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);
  const [preferencesCompleted, setPreferencesCompleted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check user flow state
  useEffect(() => {
    const checkUserFlowState = async () => {
      try {
        const onboardingDone = await isOnboardingCompleted();
        const preferencesDone = await isPreferencesCompleted();
        
        setOnboardingCompleted(onboardingDone);
        setPreferencesCompleted(preferencesDone);
      } catch (error) {
        console.error('Error checking user flow state:', error);
        setOnboardingCompleted(false);
        setPreferencesCompleted(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserFlowState();
  }, []);
  
  // Wait for both auth and user flow state to load
  if (!isLoaded || isLoading) return null;
  
  // If user is signed in
  if (isSignedIn) {
    // If preferences are not completed, redirect to preferences
    if (!preferencesCompleted) {
      return <Redirect href="/onboarding/preferences" />;
    }
    // Otherwise, redirect to tabs
    return <Redirect href="/(tabs)" />;
  }
  
  // If user is not signed in but has completed onboarding, go to sign-in
  if (onboardingCompleted) {
    return <Redirect href="/(auth)/sign-in" />;
  }
  
  // If user is not signed in and hasn't completed onboarding, start from splash
  return <Redirect href="/onboarding/splash" />;
} 