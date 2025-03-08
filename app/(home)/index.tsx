import { SignedIn, SignedOut, useUser, useAuth } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, View, StyleSheet, Button } from 'react-native'

export default function HomePage() {
  const { user } = useUser()
  const { signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.replace('/sign-in')
  }

  return (
    <View style={styles.container}>
      <SignedIn>
        <View style={styles.signedInContainer}>
          <Text style={styles.title}>Welcome to the App!</Text>
          <Text style={styles.subtitle}>
            You are signed in as: {user?.emailAddresses[0].emailAddress}
          </Text>
          <Button title="Sign Out" onPress={handleSignOut} />
        </View>
      </SignedIn>
      
      <SignedOut>
        <View style={styles.signedOutContainer}>
          <Text style={styles.title}>Welcome to the App!</Text>
          <Text style={styles.subtitle}>Please sign in or create an account to continue</Text>
          <View style={styles.buttonContainer}>
            <Link href="/(auth)/sign-in" asChild>
              <Button title="Sign In" />
            </Link>
          </View>
          <View style={styles.buttonContainer}>
            <Link href="/(auth)/sign-up" asChild>
              <Button title="Sign Up" />
            </Link>
          </View>
        </View>
      </SignedOut>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  signedInContainer: {
    alignItems: 'center',
    gap: 20,
  },
  signedOutContainer: {
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 5,
  },
}) 