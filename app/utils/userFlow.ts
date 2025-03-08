import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
export const ONBOARDING_COMPLETED_KEY = 'onboarding_completed';
export const PREFERENCES_COMPLETED_KEY = 'preferences_completed';

/**
 * Marks onboarding as completed
 */
export const markOnboardingCompleted = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
    console.log('Onboarding marked as completed');
  } catch (error) {
    console.error('Error marking onboarding as completed:', error);
  }
};

/**
 * Marks preferences as completed
 */
export const markPreferencesCompleted = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(PREFERENCES_COMPLETED_KEY, 'true');
    console.log('Preferences marked as completed');
  } catch (error) {
    console.error('Error marking preferences as completed:', error);
  }
};

/**
 * Checks if onboarding is completed
 */
export const isOnboardingCompleted = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_COMPLETED_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error checking if onboarding is completed:', error);
    return false;
  }
};

/**
 * Checks if preferences are completed
 */
export const isPreferencesCompleted = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(PREFERENCES_COMPLETED_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error checking if preferences are completed:', error);
    return false;
  }
};

/**
 * Resets the user flow (for testing)
 */
export const resetUserFlow = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_COMPLETED_KEY);
    await AsyncStorage.removeItem(PREFERENCES_COMPLETED_KEY);
    console.log('User flow reset successfully');
  } catch (error) {
    console.error('Error resetting user flow:', error);
  }
}; 