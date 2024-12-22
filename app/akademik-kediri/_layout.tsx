import { Stack } from 'expo-router'

import { Locales, StackHeader } from '@/lib'

const Layout = () => (
    <Stack
      screenOptions={{
        animation: 'fade',
        header: (props) => (
          <StackHeader navProps={props} children={undefined} />
        ),
      }}
    >
    <Stack.Screen 
      name="index" 
      options={{ title: "Peserta Kediri" }}
    />
    <Stack.Screen 
      name="penilaian" 
      options={{ title: "Penilaian Akademik" }}
    />
  </Stack>
)

export default Layout
