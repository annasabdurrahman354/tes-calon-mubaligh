import { useAuth } from '@/lib/services/useAuth';
import { Redirect, Stack, useSegments } from 'expo-router'

const Layout = () => {
  const {user} = useAuth()
  const segments = useSegments();
  const inAuthGroup = segments[0] === '(auth)';

  if (user && inAuthGroup) {
    return <Redirect href="/(app)/home" ></Redirect>
  } else if (!user && !inAuthGroup) {
    return <Redirect href="/" ></Redirect>
  }
  
  return <Stack
    screenOptions={{
      animation: 'slide_from_right',
      headerShown: false
    }}
  >
    <Stack.Screen name="index" options={{ title: 'Login' }} />
    <Stack.Screen name="signup" options={{ title: 'Signup' }} />
  </Stack>
}

export default Layout
