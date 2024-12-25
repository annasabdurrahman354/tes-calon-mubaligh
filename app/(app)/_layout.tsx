import { Stack } from 'expo-router'

const Layout = () => (
    <Stack
      screenOptions={{
        animation: 'fade',
        headerShown: false
      }}
    >
    <Stack.Screen 
      name="home" 
    />
    <Stack.Screen 
      name="akademik-kediri"
      options={{ title: 'Nilai Akademik Kediri'}}
    />
    <Stack.Screen 
      name="akhlak-kediri"
      options={{ title: 'Nilai Akhlak Kediri'}}
    />
  </Stack>
)

export default Layout
