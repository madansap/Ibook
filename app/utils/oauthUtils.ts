import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { Platform, Alert } from 'react-native';
import * as Linking from 'expo-linking';

// Configure the redirect URI based on the platform
export const getRedirectUrl = () => {
  // For standalone apps, use the scheme from app.json
  // For development, use the Expo development scheme
  return makeRedirectUri({
    scheme: 'ibook', // This should match the scheme in your app.json
    path: 'clerk-auth',
  });
};

// Helper function to handle OAuth errors
export const handleOAuthError = (error: any) => {
  console.error('OAuth error:', error);
  
  // Show an error alert
  Alert.alert(
    'Authentication Error',
    'There was a problem authenticating with the provider. Please try again.',
    [{ text: 'OK' }]
  );
};

// Helper function to show a success message
export const showOAuthSuccess = (provider: string) => {
  Alert.alert(
    'Authentication Successful',
    `You have successfully authenticated with ${provider}.`,
    [{ text: 'OK' }]
  );
};

// Helper function to show a demo message (for development)
export const showDemoMessage = (provider: string) => {
  Alert.alert(
    `${provider} Authentication`,
    `This is a demo implementation. In a real app, you would complete the OAuth flow with ${provider} and Clerk.`,
    [{ text: 'OK' }]
  );
}; 