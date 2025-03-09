import * as React from 'react'
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter, Link } from 'expo-router'
import { Envelope, GoogleLogo, AppleLogo } from 'phosphor-react-native'
import { AuthLayout, AuthButton } from '@/components/Auth'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded || isLoading) return

    setIsLoading(true)
    setError(null)

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      setError(err.errors?.[0]?.message || 'An error occurred during sign up')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded || isLoading) return

    setIsLoading(true)
    setError(null)

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/onboarding/preferences')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
        setError('Verification failed. Please try again.')
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      setError(err.errors?.[0]?.message || 'An error occurred during verification')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailAuth = () => {
    router.push('/email-auth' as any)
  }

  const handleGoogleSignUp = () => {
    // Implement Google sign-up
    console.log('Google sign-up')
  }

  const handleAppleSignUp = () => {
    // Implement Apple sign-up
    console.log('Apple sign-up')
  }

  if (pendingVerification) {
    return (
      <AuthLayout 
        title="Verify your email"
        subtitle="Enter the verification code sent to your email"
      >
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter verification code"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          onChangeText={(code) => setCode(code)}
          keyboardType="number-pad"
        />
        <AuthButton
          title="Verify Email"
          onPress={onVerifyPress}
          isLoading={isLoading}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>Sign in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </AuthLayout>
    )
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
      />
      
      <AuthButton
        title="Continue with Google"
        onPress={handleGoogleSignUp}
        icon={<GoogleLogo size={20} color="#FFFFFF" weight="bold" />}
        variant="secondary"
      />
      
      <AuthButton
        title="Continue with Apple"
        onPress={handleAppleSignUp}
        icon={<AppleLogo size={20} color="#FFFFFF" weight="bold" />}
        variant="secondary"
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