import { useRouter } from 'expo-router'
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Envelope, GoogleLogo, AppleLogo } from 'phosphor-react-native'
import { AuthLayout, AuthButton } from '@/components/Auth'
import * as WebBrowser from 'expo-web-browser'
import { useSignIn } from '@clerk/clerk-expo'

// Make sure to set up OAuth in your Clerk Dashboard
// https://clerk.com/docs/authentication/social-connections/oauth

export default function SignInScreen() {
  const router = useRouter()
  const { signIn, isLoaded } = useSignIn()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState({
    email: false,
    google: false,
    apple: false
  })

  const handleEmailAuth = () => {
    router.push('/email-auth' as any)
  }

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return
    
    try {
      setIsLoading(prev => ({ ...prev, google: true }))
      setError(null)
      
      // Start the OAuth flow with Google
      const { createdSessionId, setActive } = signIn;
      
      const redirectUrl = 'your-app://clerk/oauth-callback';
      
      // Open the browser for authentication
      await WebBrowser.openAuthSessionAsync(
        `https://clerk.your-domain.com/oauth/google?redirect_url=${encodeURIComponent(redirectUrl)}`,
        redirectUrl
      );
      
      // Note: In a real implementation, you would need to handle the OAuth callback
      // and complete the sign-in process using Clerk's API
      
      // For demo purposes, show a success message
      Alert.alert(
        "Google Sign In",
        "This is a demo implementation. In a real app, you would complete the OAuth flow with Clerk.",
        [{ text: "OK" }]
      );
    } catch (err: any) {
      console.error('Google sign-in error:', err)
      setError('Failed to sign in with Google. Please try again.')
    } finally {
      setIsLoading(prev => ({ ...prev, google: false }))
    }
  }

  const handleAppleSignIn = async () => {
    if (!isLoaded) return
    
    try {
      setIsLoading(prev => ({ ...prev, apple: true }))
      setError(null)
      
      // Start the OAuth flow with Apple
      const { createdSessionId, setActive } = signIn;
      
      const redirectUrl = 'your-app://clerk/oauth-callback';
      
      // Open the browser for authentication
      await WebBrowser.openAuthSessionAsync(
        `https://clerk.your-domain.com/oauth/apple?redirect_url=${encodeURIComponent(redirectUrl)}`,
        redirectUrl
      );
      
      // Note: In a real implementation, you would need to handle the OAuth callback
      // and complete the sign-in process using Clerk's API
      
      // For demo purposes, show a success message
      Alert.alert(
        "Apple Sign In",
        "This is a demo implementation. In a real app, you would complete the OAuth flow with Clerk.",
        [{ text: "OK" }]
      );
    } catch (err: any) {
      console.error('Apple sign-in error:', err)
      setError('Failed to sign in with Apple. Please try again.')
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
        onPress={handleGoogleSignIn}
        icon={<GoogleLogo size={20} color="#FFFFFF" weight="bold" />}
        variant="secondary"
        isLoading={isLoading.google}
      />
      
      <AuthButton
        title="Continue with Apple"
        onPress={handleAppleSignIn}
        icon={<AppleLogo size={20} color="#FFFFFF" weight="bold" />}
        variant="secondary"
        isLoading={isLoading.apple}
      />
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/sign-up' as any)}>
          <Text style={styles.link}>Sign up</Text>
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