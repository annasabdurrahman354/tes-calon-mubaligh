import { Stack } from 'expo-router'

const Layout = () => (
  <Stack
    screenOptions={{
      animation: 'slide_from_bottom',
      headerShown: false
    }}
  >
    <Stack.Screen name="login" options={{ title: 'Login' }} />
    <Stack.Screen name="signup" options={{ title: 'Signup' }} />
  </Stack>
)

export default Layout
