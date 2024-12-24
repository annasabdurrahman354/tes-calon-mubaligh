import { Image } from 'expo-image'
import { Formik } from 'formik'
import React from 'react'
import {
  Button,
  Surface,
  TextInput,
  HelperText,
  Text,
  useTheme,
} from 'react-native-paper'
import * as Yup from 'yup'
import { styles } from '@/lib'
import { View } from 'react-native'
import * as HeroIconsOutline from "react-native-heroicons/outline";

const Login = () => {
  const theme = useTheme();

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

      <Text variant="headlineLarge" style={{ textAlign: 'center', fontWeight:700 }}>
        Tes Calon Mubaligh
      </Text>
      <Text variant="bodyLarge" style={{ textAlign: 'center', marginBottom: 16 }}>
        Silahkan Masuk untuk Melanjutkan.
      </Text>

      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .required('Isi username terlebih dahulu!'),
          password: Yup.string()
            .required('Isi password terlebih dahulu!'),
        })}
        onSubmit={(values) => console.log(values)}>
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
                right={64 - values.username.length}
                placeholder="Masukkan username..."
                onChangeText={handleChange('username')}
              />
              <HelperText type="error" visible={!!errors.username}>
                {errors.username}
              </HelperText>
            </Surface>

            <Surface elevation={0} style={{marginTop:-16}}>
              <TextInput
                maxLength={64}
                mode="outlined"
                label="Password"
                value={values.password}
                error={!!errors.password}
                onBlur={handleBlur('password')}
                right={64 - values.password.length}
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

      <Text style={{textAlign: 'center', color: theme.colors.outline}}>atau</Text>
  
      <View 
        style={{
          alignSelf: 'center',
          borderRadius: 32,
          borderWidth:1,
          borderStyle: 'dashed',
          padding:28,
          borderColor: theme.colors.outline,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8
      }}>
        <View style={{backgroundColor: theme.colors.inversePrimary, padding: 6, borderRadius: 16}}>
          <HeroIconsOutline.CreditCardIcon color={theme.colors.onPrimary} size={40}></HeroIconsOutline.CreditCardIcon>
        </View>
        <Text variant='titleMedium' style={{color: theme.colors.inversePrimary, textAlign: 'center'}}>Tap Smartcard untuk Login</Text>
      </View>
    </Surface>
  )
}

export default Login
