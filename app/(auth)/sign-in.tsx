import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, StyleSheet } from 'react-native'
import React from 'react'

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)

  // Handle the submission of the sign-in form
  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return

    setError(null)

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/onboarding/preferences')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
        setError('Sign in failed. Please check your credentials and try again.')
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      setError(err.errors?.[0]?.message || 'An error occurred during sign in')
    }
  }, [isLoaded, emailAddress, password])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign in" onPress={onSignInPress} />
      <View style={styles.linkContainer}>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text style={styles.link}>Sign up</Text>
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