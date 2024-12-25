import { MaterialCommunityIcons } from '@expo/vector-icons'
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono'
import { NotoSans_400Regular } from '@expo-google-fonts/noto-sans'
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { router, SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper'
import { Setting, StackHeader, Themes } from '@/lib'

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router'

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = { initialRouteName: '(auth)' }

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [loaded, error] = useFonts({
    NotoSans_400Regular,
    JetBrainsMono_400Regular,
    ...MaterialCommunityIcons.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error
  }, [error])

  React.useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

const RootLayoutNav = () => {
  const [settings, setSettings] = React.useState<Setting>({
    theme: 'light', // Changed default theme to 'light'
    color: 'green',
  })

  // Load settings from the device
  React.useEffect(() => {
      setSettings({ ...settings, theme: 'light' }) // Set default to 'light' for web
  }, [])

  const theme =
    Themes[settings.theme][settings.color] // Directly use 'settings.theme'

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationDark: NavDarkTheme,
    reactNavigationLight: NavLightTheme,
    materialDark: Themes.dark.lime,
    materialLight: Themes.light.lime,
  })

  return (
    <ThemeProvider
      value={
        settings.theme === 'light'
          ? { ...LightTheme, fonts: NavLightTheme.fonts }
          : { ...DarkTheme, fonts: NavDarkTheme.fonts }
      }
    >
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            animation: 'fade',
            headerShown: false,
            header: (props) => (
              <StackHeader navProps={props} children={undefined} />
            ),
          }}
        >
          <Stack.Screen name="(auth)" /> 
          <Stack.Screen name="(app)" />
        </Stack>
      </PaperProvider>

      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

export default RootLayout
