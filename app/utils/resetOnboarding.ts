import AsyncStorage from '@react-native-async-storage/async-storage';

export const ONBOARDING_COMPLETED_KEY = 'onboarding_completed';

/**
 * Resets the onboarding state so the user will see the onboarding flow again
 */
export const resetOnboarding = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_COMPLETED_KEY);
    console.log('Onboarding state reset successfully');
  } catch (error) {
    console.error('Error resetting onboarding state:', error);
  }
}; 