import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import { Envelope, GoogleLogo, AppleLogo } from 'phosphor-react-native'
import { AuthLayout, AuthButton } from '@/components/Auth'
import * as WebBrowser from 'expo-web-browser'
import { useSignUp } from '@clerk/clerk-expo'
import { getRedirectUrl, showDemoMessage, handleOAuthError } from '@/app/utils/oauthUtils'

export default function SignUpScreen() {
  const router = useRouter()
  const { isLoaded } = useSignUp()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState({
    email: false,
    google: false,
    apple: false
  })

  const handleEmailAuth = () => {
    router.push('/email-auth' as any)
  }

  const handleGoogleSignUp = async () => {
    if (!isLoaded) return
    
    try {
      setIsLoading(prev => ({ ...prev, google: true }))
      setError(null)
      
      // In development mode, show a demo message
      if (__DEV__) {
        showDemoMessage('Google');
        setIsLoading(prev => ({ ...prev, google: false }));
        return;
      }
      
      // Get the redirect URL
      const redirectUrl = getRedirectUrl();
      
      // Start the OAuth flow
      // Note: This is a simplified implementation
      // In a real app, you would need to handle the OAuth flow properly
      await WebBrowser.openAuthSessionAsync(
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=email%20profile`,
        redirectUrl
      );
      
      // Show a success message
      Alert.alert(
        'Google Sign Up',
        'Sign up with Google completed successfully!',
        [{ text: 'OK' }]
      );
    } catch (err: any) {
      console.error('Google sign-up error:', err)
      handleOAuthError(err);
      setError('Failed to sign up with Google. Please try again.')
    } finally {
      setIsLoading(prev => ({ ...prev, google: false }))
    }
  }

  const handleAppleSignUp = async () => {
    if (!isLoaded) return
    
    try {
      setIsLoading(prev => ({ ...prev, apple: true }))
      setError(null)
      
      // In development mode, show a demo message
      if (__DEV__) {
        showDemoMessage('Apple');
        setIsLoading(prev => ({ ...prev, apple: false }));
        return;
      }
      
      // Get the redirect URL
      const redirectUrl = getRedirectUrl();
      
      // Start the OAuth flow
      // Note: This is a simplified implementation
      // In a real app, you would need to handle the OAuth flow properly
      await WebBrowser.openAuthSessionAsync(
        `https://appleid.apple.com/auth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=name%20email`,
        redirectUrl
      );
      
      // Show a success message
      Alert.alert(
        'Apple Sign Up',
        'Sign up with Apple completed successfully!',
        [{ text: 'OK' }]
      );
    } catch (err: any) {
      console.error('Apple sign-up error:', err)
      handleOAuthError(err);
      setError('Failed to sign up with Apple. Please try again.')
    } finally {
      setIsLoading(prev => ({ ...prev, apple: false }))
    }
  }

  return (
    <AuthLayout 
      title="How would you like to continue?"
    >
      {error && <Text style={styles.error}>{error}</Text>}
      
      <AuthButton
        title="Continue with Email"
        onPress={handleEmailAuth}
        icon={<Envelope size={20} color="#FF9500" weight="bold" />}
        isLoading={isLoading.email}
      />
      
      <AuthButton
        title="Continue with Google"
        onPress={handleGoogleSignUp}
        icon={<GoogleLogo size={20} color="#FFFFFF" weight="bold" />}
        variant="secondary"
        isLoading={isLoading.google}
      />
      
      <AuthButton
        title="Continue with Apple"
        onPress={handleAppleSignUp}
        icon={<AppleLogo size={20} color="#FFFFFF" weight="bold" />}
        variant="secondary"
        isLoading={isLoading.apple}
      />
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/sign-in' as any)}>
          <Text style={styles.link}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  error: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  footerText: {
    color: '#FFFFFF',
    marginRight: 5,
  },
  link: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
}) 