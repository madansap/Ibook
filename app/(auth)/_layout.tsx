import { Redirect, Stack, usePathname } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()
  const pathname = usePathname()

  // Only redirect if the user is signed in and not already on the preferences page
  if (isSignedIn && !pathname.includes('/preferences')) {
    return <Redirect href={'/onboarding/preferences'} />
  }

  return <Stack />
} 