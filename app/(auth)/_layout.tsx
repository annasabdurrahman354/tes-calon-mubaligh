import { Stack } from 'expo-router'

const Layout = () => (
  <Stack
    screenOptions={{
      animation: 'fade',
      headerShown: false
    }}
  >
    <Stack.Screen name="index" options={{ title: 'Login' }} />
    <Stack.Screen name="signup" options={{ title: 'Signup' }} />
  </Stack>
)

export default Layout
