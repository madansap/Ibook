import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the splash screen on initial app load
  return <Redirect href="/onboarding/splash" />;
} 