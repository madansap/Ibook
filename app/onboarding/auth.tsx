import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import OnboardingLayout from '../../components/Onboarding/OnboardingLayout';
import AuthForm from '../../components/Onboarding/AuthForm';
import OnboardingButton from '../../components/Onboarding/OnboardingButton';
import { useOnboardingState } from '@/hooks/useOnboardingState';

const AuthScreen = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();
  const { completeOnboarding } = useOnboardingState();

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const handleSubmit = async (data: { email: string; password: string; name?: string }) => {
    console.log('Auth data:', data);
    // In a real app, you would handle authentication here
    
    // Navigate to preferences screen
    router.push('./preferences');
  };

  const handleSkip = async () => {
    // Navigate to preferences screen
    router.push('./preferences');
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

