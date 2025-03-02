import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingLayout from '../../components/Onboarding/OnboardingLayout';
import AuthForm from '../../components/Onboarding/AuthForm';
import OnboardingButton from '../../components/Onboarding/OnboardingButton';

const AuthScreen = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const handleSubmit = (data: { email: string; password: string; name?: string }) => {
    console.log('Auth data:', data);
    // In a real app, you would handle authentication here
    // For now, we'll just navigate to the preferences screen
    router.push('/onboarding/preferences');
  };

  const handleSkip = () => {
    // Allow users to skip authentication for now
    router.push('/onboarding/preferences');
  };

  return (
    <OnboardingLayout>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <AuthForm 
            mode={authMode} 
            onSubmit={handleSubmit} 
            onToggleMode={toggleAuthMode} 
          />
          
          <View style={styles.skipContainer}>
            <OnboardingButton 
              label="Skip for now" 
              onPress={handleSkip} 
              variant="text" 
            />
          </View>
        </View>
      </ScrollView>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  skipContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default AuthScreen;

