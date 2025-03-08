import * as React from 'react'
import { Text, TextInput, Button, View, StyleSheet } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter, Link } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

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
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

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
    }
  }

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify your email</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          style={styles.input}
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
          keyboardType="number-pad"
        />
        <Button title="Verify" onPress={onVerifyPress} />
        <View style={styles.linkContainer}>
          <Text>Already have an account?</Text>
          <Link href="/sign-in">
            <Text style={styles.link}>Sign in</Text>
          </Link>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(email) => setEmailAddress(email)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Continue" onPress={onSignUpPress} />
      <View style={styles.linkContainer}>
        <Text>Already have an account?</Text>
        <Link href="/sign-in">
          <Text style={styles.link}>Sign in</Text>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  link: {
    color: 'blue',
    fontWeight: 'bold',
  },
}) 