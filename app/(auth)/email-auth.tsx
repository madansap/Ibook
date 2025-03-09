import React, { useState } from 'react';
import { 
  Text, 
  TextInput, 
  View, 
  StyleSheet, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { AuthLayout, AuthButton } from '@/components/Auth';

export default function EmailAuthScreen() {
  const router = useRouter();
  const { signIn, setActive: setSignInActive, isLoaded: isSignInLoaded } = useSignIn();
  const { signUp, setActive: setSignUpActive, isLoaded: isSignUpLoaded } = useSignUp();
  
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setError(null);
  };

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required');
      return false;
    }
    
    if (authMode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSignIn = async () => {
    if (!isSignInLoaded || isLoading || !validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setSignInActive({ session: signInAttempt.createdSessionId });
        router.replace('/onboarding/preferences');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        setError('Sign in failed. Please check your credentials and try again.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors?.[0]?.message || 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!isSignUpLoaded || isLoading || !validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors?.[0]?.message || 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!isSignUpLoaded || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (signUpAttempt.status === 'complete') {
        await setSignUpActive({ session: signUpAttempt.createdSessionId });
        router.replace('/onboarding/preferences');
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
        setError('Verification failed. Please try again.');
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setError(err.errors?.[0]?.message || 'An error occurred during verification');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    if (authMode === 'login') {
      handleSignIn();
    } else {
      handleSignUp();
    }
  };

  if (pendingVerification) {
    return (
      <AuthLayout 
        title="Verify your email"
        subtitle="Enter the verification code sent to your email"
      >
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          style={styles.input}
          value={verificationCode}
          placeholder="Enter verification code"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          onChangeText={setVerificationCode}
          keyboardType="number-pad"
        />
        <AuthButton
          title="Verify Email"
          onPress={handleVerification}
          isLoading={isLoading}
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title={authMode === 'login' ? "Sign in to your account" : "Create an account"}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {error && <Text style={styles.error}>{error}</Text>}
          
          <TextInput
            style={styles.input}
            value={email}
            placeholder="Email address"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            onChangeText={setPassword}
            secureTextEntry
          />
          
          {authMode === 'signup' && (
            <TextInput
              style={styles.input}
              value={confirmPassword}
              placeholder="Confirm password"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          )}
          
          <AuthButton
            title={authMode === 'login' ? "Sign In" : "Sign Up"}
            onPress={handleSubmit}
            isLoading={isLoading}
          />
          
          <TouchableOpacity 
            style={styles.switchMode} 
            onPress={toggleAuthMode}
          >
            <Text style={styles.switchModeText}>
              {authMode === 'login' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  error: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'center',
  },
  switchMode: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchModeText: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
}); 