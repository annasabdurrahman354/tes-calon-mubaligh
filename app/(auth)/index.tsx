import { Image } from 'expo-image'
import { Formik } from 'formik'
import React, { useState } from 'react'
import {
  Button,
  Surface,
  TextInput,
  HelperText,
  Text,
  useTheme,
  Snackbar,
} from 'react-native-paper'
import * as Yup from 'yup'
import { styles } from '@/lib'
import { View } from 'react-native'
import * as HeroIconsOutline from "react-native-heroicons/outline"
import { router } from 'expo-router'
import { useAuth } from '@/lib/services/useAuth'

const Login = () => {
  const { loginCredential } = useAuth()
  const theme = useTheme()

  // State to manage the visibility of the Snackbar
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const onLoginSubmit = async (values: { username: string; password: string }) => {
    try {
      // Attempt to login using the credentials
      const sessionData = await loginCredential(values.username, values.password)
      
      // If successful, redirect to home page
      if (sessionData) {
        console.log(sessionData);
        router.replace('/(app)/home')
      }
    } catch (error: unknown) {
      // Check if the error is an instance of AxiosError or regular Error
      if (error instanceof Error) {
        // AxiosError or other types of Error
        setSnackbarMessage(error.message || 'Login failed. Please try again.')
      } else {
        // In case the error is not an instance of Error
        setSnackbarMessage('An unexpected error occurred!')
      }
      
      setSnackbarVisible(true)
    }
  }

  return (
    <Surface style={{ ...styles.screen, alignItems: undefined }}>
      <Image
        alt="Logo"
        source={require('@/assets/images/logo.png')}
        style={{
          height: 150,
          width: 150,
          borderRadius: 16,
          marginBottom: 16,
          marginHorizontal: 'auto',
        }}
      />

      <Text variant="headlineLarge" style={{ textAlign: 'center', fontWeight: 700 }}>
        Tes Calon Mubaligh
      </Text>
      <Text variant="bodyLarge" style={{ textAlign: 'center', marginBottom: 16 }}>
        Silahkan Masuk untuk Melanjutkan.
      </Text>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Isi username terlebih dahulu!'),
          password: Yup.string().required('Isi password terlebih dahulu!'),
        })}
        onSubmit={onLoginSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <>
            <Surface elevation={0}>
              <TextInput
                maxLength={64}
                mode="outlined"
                label="Username"
                value={values.username}
                error={!!errors.username}
                onBlur={handleBlur('username')}
                placeholder="Masukkan username..."
                onChangeText={handleChange('username')}
              />
              <HelperText type="error" visible={!!errors.username}>
                {errors.username}
              </HelperText>
            </Surface>

            <Surface elevation={0} style={{ marginTop: -16 }}>
              <TextInput
                maxLength={64}
                mode="outlined"
                label="Password"
                value={values.password}
                error={!!errors.password}
                onBlur={handleBlur('password')}
                placeholder="Masukkan password..."
                onChangeText={handleChange('password')}
              />
              <HelperText type="error" visible={!!errors.password}>
                {errors.password}
              </HelperText>
            </Surface>

            <Button mode="contained" onPress={() => handleSubmit()}>
              Masuk
            </Button>
          </>
        )}
      </Formik>

      <Text style={{ textAlign: 'center', color: theme.colors.outline }}>atau</Text>

      <View
        style={{
          alignSelf: 'center',
          borderRadius: 32,
          borderWidth: 1,
          borderStyle: 'dashed',
          padding: 28,
          borderColor: theme.colors.outline,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <View style={{ backgroundColor: theme.colors.inversePrimary, padding: 6, borderRadius: 16 }}>
          <HeroIconsOutline.CreditCardIcon color={theme.colors.onPrimary} size={40} />
        </View>
        <Text variant="titleMedium" style={{ color: theme.colors.inversePrimary, textAlign: 'center' }}>
          Tap Smartcard untuk Login
        </Text>
      </View>

      {/* Snackbar for displaying errors */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'OK',
          onPress: () => {
            setSnackbarVisible(false)
          },
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </Surface>
  )
}

export default Login
