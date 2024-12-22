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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import { styles } from '@/lib'

const Login = () => {

  const theme = useTheme();

  // ref
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
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
            onSubmit={(values) => console.log(values)}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .required('Isi username terlebih dahulu!'),
              password: Yup.string()
                .required('Isi password terlebih dahulu!'),
            })}
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

                <Button style={{marginTop:16}} mode="contained" onPress={() => handleSubmit()}>
                  Masuk
                </Button>
              </>
            )}
          </Formik>
      
          <Button
            mode="contained-tonal"
            onPress={handlePresentModalPress}
          >
            Gunakan Smartcard
          </Button>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            enableDismissOnClose={true}
            enablePanDownToClose={true}
            keyboardBehavior={'interactive'}
            keyboardBlurBehavior={'restore'}
            handleStyle={{borderTopLeftRadius:16, borderTopRightRadius: 16, backgroundColor:theme.colors.elevation.level5}}
            style={{
              borderTopLeftRadius:16, 
              borderTopRightRadius: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.9,
              shadowRadius: 10.32,

              elevation: 16,
            }}
          >
            <BottomSheetView style={{paddingVertical: 16, backgroundColor: theme.colors.inverseOnSurface}}>
            <Button
            mode="contained-tonal"
            onPress={handlePresentModalPress}
          >
            Gunakan Smartcard
          </Button>

            </BottomSheetView>
        </BottomSheetModal>
        </Surface>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default Login
